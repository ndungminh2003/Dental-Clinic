USE QLPhongKham
GO

--Trigger1
GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_CUSTOMER1]'))
DROP TRIGGER [dbo].[TRIGGER_CUSTOMER1]
GO
CREATE TRIGGER TRIGGER_CUSTOMER1 ON CUSTOMER
FOR INSERT, UPDATE
AS
IF UPDATE(password) or UPDATE(role)
BEGIN
    IF EXISTS (SELECT * FROM inserted WHERE role = N'Guest' and password IS NOT NULL) 
    BEGIN 
        RAISERROR(N'Lỗi: Không thể đặt mật khẩu cho Guest', 16, 1)
        ROLLBACK
    END
	IF EXISTS (SELECT * FROM inserted WHERE LEN(password) <= 10) 
    BEGIN 
        RAISERROR(N'Lỗi: Mật khẩu phải nhiều hơn 10 ký tự', 16, 1)
        ROLLBACK
    END
END

--Trigger2
GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_CUSTOMER2]'))
DROP TRIGGER [dbo].[TRIGGER_CUSTOMER2]
GO
CREATE TRIGGER TRIGGER_CUSTOMER2 ON CUSTOMER
INSTEAD OF UPDATE
AS 
BEGIN
  IF(UPDATE(password))
  BEGIN
    DECLARE @newPassword NVARCHAR(30);
  
    SELECT @newPassword = i.password
    FROM inserted i
    JOIN CUSTOMER c ON c.id = i.id;
  
    IF LEN(@newPassword) > 10
    BEGIN
      UPDATE c
      SET role = 'Customer', password = @newPassword, name = i.name, gender = i.gender, birthday = i.birthday, address = i.address
      FROM CUSTOMER c
      JOIN inserted i ON c.id = i.id;
    END
    ELSE
    BEGIN
      RAISERROR('Lỗi: Mật khẩu phải nhiều hơn 10 ký tự', 16, 1)
      RETURN
    END
  END
  ELSE
	UPDATE c
    SET name = i.name, gender = i.gender, birthday = i.birthday, address = i.address
    FROM CUSTOMER c
    JOIN inserted i ON c.id = i.id;
END

--Trigger3
--R21: Chỉ có tối đa 5 bác sĩ có lịch làm việc cùng thời gian bắt đầu
--R26: Với mọi lịch trình, thời gian bắt đầu phải nhỏ hơn thời gian kết thúc
GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_SCHEDULE]'))
DROP TRIGGER [dbo].[TRIGGER_SCHEDULE]
GO
CREATE TRIGGER TRIGGER_SCHEDULE ON SCHEDULE
FOR INSERT, UPDATE
AS
IF UPDATE(startTime) or UPDATE(endTime) or UPDATE(dentistId) 
BEGIN
	IF EXISTS (SELECT * FROM inserted WHERE (SELECT count(dentistId) FROM SCHEDULE WHERE startTime = inserted.startTime GROUP BY startTime) > 5) 
	BEGIN 
		RAISERROR(N'Lỗi: Tối đa 5 bác sĩ có cùng thời gian làm việc trong lịch trình', 16, 1)
		ROLLBACK
	END
	IF EXISTS (SELECT * FROM inserted WHERE datediff(second,startTime, endTime) != 3600) 
	BEGIN 
		RAISERROR(N'Lỗi: thời gian bắt đầu phải cách thời gian kết thúc 1 giờ', 16, 1)
		ROLLBACK
	END
END

--Trigger4 
--R25: Với mọi cuộc hẹn, thời gian bắt đầu phải trước thời gian kết thúc
--R29: Mỗi cuộc hẹn đã hoàn thành phải có một hồ sơ bệnh án ứng với cuộc hẹn đó.
GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_APPOINTMENT]'))
DROP TRIGGER [dbo].[TRIGGER_APPOINTMENT]
GO
CREATE TRIGGER TRIGGER_APPOINTMENT ON APPOINTMENT
FOR INSERT, UPDATE
AS
BEGIN
	IF UPDATE(startTime) or UPDATE(endTime)
	BEGIN
		IF EXISTS (SELECT * FROM inserted WHERE datediff(second,startTime, endTime) <= 0) 
		BEGIN 
			RAISERROR(N'Lỗi: Thời gian bắt đầu phải trước thời gian kết thúc', 16, 1)
			ROLLBACK
		END
	END
	IF UPDATE(recordId)
	BEGIN
		IF EXISTS (SELECT * FROM APPOINTMENT a WHERE a.startTime != inserted.startTime AND a.dentistId != inserted.dentistId AND a.recordId = inserted.recordId)
		BEGIN 
			RAISERROR (N'Lỗi: Mỗi hồ sơ bệnh án thuộc về một cuộc hẹn duy nhất', 16, 1)
			ROLLBACK
		END
	END
	IF UPDATE(startTime) or UPDATE(customerId)
	BEGIN
		IF EXISTS (SELECT * FROM APPOINTMENT a WHERE a.startTime = inserted.startTime AND a.dentistId != inserted.dentistId AND a.customerId = inserted.customerId)
		BEGIN 
			RAISERROR (N'Lỗi: Trong một khoảng thời gian mỗi bệnh nhân chỉ có một cuộc hẹn với một nha sĩ duy nhất', 16, 1)
			ROLLBACK
		END
	END
	IF UPDATE(status) or UPDATE(recordId)
	BEGIN
		IF EXISTS (SELECT * FROM inserted WHERE inserted.status = N'Hoàn thành' and inserted.recordId IS NULL) 
		BEGIN 
			RAISERROR(N'Lỗi: Mỗi cuộc hẹn đã hoàn thành phải có một hồ sơ bệnh án ứng với cuộc hẹn đó', 16, 1)
			ROLLBACK
		END
	END
END


--Trigger5
--R27: Thời gian hóa đơn được tạo phải sau thời gian hồ sơ bệnh án được tạo.
GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_INVOICE]'))
DROP TRIGGER [dbo].[TRIGGER_INVOICE]
GO
CREATE TRIGGER TRIGGER_INVOICE ON INVOICE
FOR INSERT, UPDATE
AS
BEGIN
	IF UPDATE(date_time) 
	BEGIN
		IF EXISTS (SELECT * FROM inserted JOIN PATIENT_RECORD ON PATIENT_RECORD.id = inserted.recordId  WHERE DATEDIFF(second,inserted.date_time, PATIENT_RECORD.date_time) >= 0 ) 
		BEGIN 
			RAISERROR (N'Lỗi: thời gian tạo hóa đơn phải sau thời gian tạo hồ sơ bệnh án', 16, 1)
			ROLLBACK
		END
	END
	IF UPDATE(recordId) 
	BEGIN
		IF EXISTS (SELECT * FROM INVOICE i WHERE i.id != inserted.id AND i.recordId = inserted.recordId)
		BEGIN 
			RAISERROR (N'Lỗi: Mỗi hồ sơ bệnh án chỉ có một hóa đơn duy nhất', 16, 1)
			ROLLBACK
		END
	END
END

--Trigger6
--R28: Thời gian hồ sơ bệnh án được tạo phải sau thời gian bắt đầu của cuộc hẹn.
GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_PATIENT_RECORD1]'))
DROP TRIGGER [dbo].[TRIGGER_PATIENT_RECORD1]
GO
CREATE TRIGGER TRIGGER_PATIENT_RECORD1 ON PATIENT_RECORD
FOR UPDATE
AS
BEGIN
	IF UPDATE(date_time)
	BEGIN
		PRINT 1
		DECLARE @recordId INT = (SELECT id FROM inserted)
		DECLARE @dateTime DATETIME = (SELECT date_time FROM inserted)
		IF EXISTS (SELECT * FROM APPOINTMENT WHERE APPOINTMENT.recordId = @recordId AND DATEDIFF(second,@dateTime, APPOINTMENT.startTime) >= 0 ) 
		BEGIN 
			RAISERROR (N'Lỗi: Thời gian tạo hồ sơ bệnh án phải sau thời gian bắt đầu của cuộc hẹn.', 16, 1)
			ROLLBACK
		END
	END
END

IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_PATIENT_RECORD2]'))
DROP TRIGGER [dbo].[TRIGGER_PATIENT_RECORD2]
GO
CREATE TRIGGER TRIGGER_PATIENT_RECORD2 ON PATIENT_RECORD
FOR INSERT
AS
BEGIN
	DECLARE @recordId INT = (SELECT id FROM inserted)
	DECLARE @customerId INT = (SELECT customerId FROM inserted)
	DECLARE @dentistId INT = (SELECT dentistId FROM inserted)
	DECLARE @dateTime DATETIME = (SELECT date_time FROM inserted)
	IF NOT EXISTS (SELECT * FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'Đang tạo hồ sơ bệnh án')
	BEGIN
		RAISERROR (N'Lỗi: Không có cuộc hẹn cần tạo hồ sơ bệnh án', 16, 1)
		ROLLBACK
	END
	IF EXISTS (SELECT * FROM PATIENT_RECORD p WHERE p.id != @recordId AND p.dentistId = @dentistId AND p.date_time = @dateTime)
	BEGIN
		RAISERROR (N'Lỗi: Hiện tại nha sĩ chỉ có thể tạo một hồ sơ bệnh án', 16, 1)
		ROLLBACK
	END
	IF EXISTS (SELECT * FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'Đang tạo hồ sơ bệnh án' AND DATEDIFF(second,@dateTime, a.startTime) >= 0 ) 
	BEGIN 
		RAISERROR (N'Lỗi: Thời gian tạo hồ sơ bệnh án phải sau thời gian bắt đầu của cuộc hẹn.', 16, 1)
		ROLLBACK
	END
	UPDATE a SET a.recordId = @recordId, a.status = N'Hoàn thành' FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'Đang tạo hồ sơ bệnh án'
	DECLARE @price INT = (SELECT price FROM SERVICE WHERE id = 1)
	INSERT INTO SERVICE_USE (recordId, serviceId, price) VALUES(@recordId, 1, @price)
END

SELECT * FROM SERVICE
SELECT * FROM SERVICE_USE
SELECT * FROM PATIENT_RECORD
SELECT * FROM APPOINTMENT
INSERT INTO PATIENT_RECORD (symptom, advice, diagnostic, date_time, dentistId, customerId) VALUES (N'Đau răng', N'Không', N'Không', '2023-12-12 10:00:00', 1, 1)
UPDATE PATIENT_RECORD SET date_time = '2023-12-12 08:00:00' WHERE id = 5
DELETE FROM PATIENT_RECORD WHERE id = 8
--Trigger7
GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_PATIENT_RECORD2]'))
DROP TRIGGER [dbo].[TRIGGER_PATIENT_RECORD2]
GO
CREATE TRIGGER TRIGGER_PATIENT_RECORD2 ON PATIENT_RECORD
INSTEAD OF INSERT
AS
BEGIN
	DECLARE @recordId INT = (SELECT id FROM inserted)
	DECLARE @customerId INT = (SELECT customerId FROM inserted)
	DECLARE @dentistId INT = (SELECT dentistId FROM inserted)
	INSERT INTO PATIENT_RECORD VALUES()
	INSERT INTO SERVICE_USE (recordId, serviceId) VALUES (@recordId, 1)
	UPDATE a SET a.recordId = @recordId FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'Đang tạo hồ sơ bệnh án'
END

--Trigger9
--R30: Số lượng của một loại thuốc trong đơn thuốc phải bé hơn hoặc bằng số lượng của loại thuốc đó ở trong kho.
GO
CREATE TRIGGER PRESCRIBE_MEDICINE_QUANTITY
ON PRESCRIBE_MEDICINE 
AFTER INSERT, UPDATE
AS
IF UPDATE(quantity)
BEGIN
	IF EXISTS (
		SELECT 1
		FROM INSERTED as i
		JOIN MEDICINE as m ON i.medicineId = m.id
		WHERE m.quantity < i.quantity
	)
	BEGIN 
		RAISERROR(N'Lỗi: Số lượng của một loại thuốc trong đơn thuốc phải bé hơn hoặc bằng số lượng của loại thuốc đó ở trong kho.', 16, 1)
		ROLLBACK TRANSACTION;
	END;
END;

--Trigger10
--R47: Bác sĩ chỉ tạo Patient records cho bệnh nhân chỉ khi bác sĩ và bệnh nhân đó đang có cuộc hẹn với nhau.
GO
CREATE TRIGGER PATIENT_RECORD_APPOINTMENT_CREATING ON PATIENT_RECORD
FOR INSERT, UPDATE
AS
IF UPDATE(customerId) or UPDATE(dentistId)
BEGIN
	IF NOT EXISTS (SELECT * FROM inserted JOIN APPOINTMENT on inserted.customerId = APPOINTMENT.customerId and inserted.dentistId = APPOINTMENT.dentistId  WHERE APPOINTMENT.status = N'Đang tạo hồ sơ bệnh án') 
	BEGIN 
		RAISERROR(N'Lỗi: Bác sĩ chỉ tạo Patient records cho bệnh nhân chỉ khi bác sĩ và bệnh nhân đó đang có cuộc hẹn với nhau.', 16, 1)
		ROLLBACK
	END
END

--R48: Với mỗi loại thuốc được sử dụng trong đơn thuốc thì ngày hết hạn phải sau ngày khám.
GO
CREATE TRIGGER PRESCRIBE_MEDICINE_EXPIRATIONDATE ON PRESCRIBE_MEDICINE
FOR INSERT, UPDATE
AS
IF UPDATE(medicineId)
BEGIN
	IF EXISTS (SELECT * FROM inserted i JOIN MEDICINE m ON i.medicineId = m.id JOIN PATIENT_RECORD pr ON i.recordId = pr.id WHERE datediff(second, pr.date_time, m.expirationDate) <= 0) 
	BEGIN 
		RAISERROR(N'Lỗi: Hạn sử dụng của thuốc phải sau ngày khám', 16, 1)
		ROLLBACK
	END
END