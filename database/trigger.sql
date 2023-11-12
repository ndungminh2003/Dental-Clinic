USE QLPhongKham
GO

--R01:
CREATE TRIGGER CUSTOMER_ROLE_PASSWORD ON CUSTOMER
FOR INSERT, UPDATE
AS
IF UPDATE(password) or UPDATE(role)
BEGIN
    IF EXISTS (SELECT * FROM inserted WHERE role = N'Guest' and password IS NOT NULL) 
    BEGIN 
        RAISERROR(N'Lỗi: Người dùng khách không được có mật khẩu', 16, 1)
        ROLLBACK
    END
END

--R02:
CREATE TRIGGER PASSWORD_ROLE ON CUSTOMER
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
      SET role = 'Customer', password = @newPassword
      FROM CUSTOMER c
      JOIN inserted i ON c.id = i.id;
    END
    ELSE
    BEGIN
      RAISERROR('Password length must be greater than 10 characters', 16, 1)
      RETURN
    END
  END
END

--R21: Chỉ có tối đa 5 bác sĩ có lịch làm việc cùng thời gian bắt đầu
GO
CREATE TRIGGER SCHEDULE_START_TIME_DENTIST ON SCHEDULE
FOR INSERT, UPDATE
AS
IF UPDATE(startTime) or UPDATE(dentistId)
BEGIN
	IF EXISTS (SELECT * FROM inserted WHERE (SELECT count(dentistId) FROM SCHEDULE WHERE startTime = inserted.startTime GROUP BY startTime) > 5) 
	BEGIN 
		RAISERROR(N'Lỗi: Chỉ có tối đa 5 bác sĩ có lịch làm việc cùng thời gian bắt đầu', 16, 1)
		ROLLBACK
	END
END

--R25: Với mọi cuộc hẹn, thời gian bắt đầu phải trước thời gian kết thúc
GO
CREATE TRIGGER APPOINTMENT_START_TIME_END_TIME ON APPOINTMENT
FOR INSERT, UPDATE
AS
IF UPDATE(startTime) or UPDATE(endTime)
BEGIN
	IF EXISTS (SELECT * FROM inserted WHERE datediff(second,startTime, endTime) <= 0) 
	BEGIN 
		RAISERROR(N'Lỗi: thời gian bắt đầu phải trước thời gian kết thúc', 16, 1)
		ROLLBACK
	END
END

--R26: Với mọi lịch trình, thời gian bắt đầu phải nhỏ hơn thời gian kết thúc
GO
CREATE TRIGGER SCHEDULE_START_TIME_END_TIME ON SCHEDULE
FOR INSERT, UPDATE
AS
IF UPDATE(startTime) or UPDATE(endTime)
BEGIN
	IF EXISTS (SELECT * FROM inserted WHERE datediff(second,startTime, endTime) <= 0) 
	BEGIN 
		RAISERROR(N'Lỗi: thời gian bắt đầu phải trước thời gian kết thúc', 16, 1)
		ROLLBACK
	END
END

--R27: Thời gian hóa đơn được tạo phải sau thời gian hồ sơ bệnh án được tạo.
GO
CREATE TRIGGER INVOICE_PATIENT_RECORD_DATE_TIME ON INVOICE
FOR INSERT, UPDATE
AS
IF UPDATE(date_time) 
BEGIN
	IF EXISTS (SELECT * FROM inserted JOIN PATIENT_RECORD ON PATIENT_RECORD.id = inserted.recordId  WHERE DATEDIFF(second,inserted.date_time, PATIENT_RECORD.date_time) >= 0 ) 
	BEGIN 
		RAISERROR (N'Lỗi: thời gian bắt đầu phải trước thời gian kết thúc', 16, 1)
		ROLLBACK
	END
END

--R28: Thời gian hồ sơ bệnh án được tạo phải sau thời gian bắt đầu của cuộc hẹn.
GO
CREATE TRIGGER PATIENT_RECORD_APPOINTMENT_DATE_TIME ON PATIENT_RECORD
FOR INSERT, UPDATE
AS
IF UPDATE(date_time) 
BEGIN
	IF EXISTS (SELECT * FROM inserted JOIN APPOINTMENT ON inserted.id = APPOINTMENT.recordId  WHERE DATEDIFF(second,inserted.date_time, APPOINTMENT.startTime) >= 0 ) 
	BEGIN 
		RAISERROR (N'Lỗi: Thời gian hồ sơ bệnh án được tạo phải sau thời gian bắt đầu của cuộc hẹn.', 16, 1)
		ROLLBACK
	END
END

--R29: Mỗi cuộc hẹn đã hoàn thành phải có một hồ sơ bệnh án ứng với cuộc hẹn đó.
GO
CREATE TRIGGER APPOINTMENT_PATIENT_RECORD_COMPLETED ON APPOINTMENT
FOR INSERT, UPDATE
AS
IF UPDATE(status) or UPDATE(recordId)
BEGIN
	IF EXISTS (SELECT * FROM inserted JOIN PATIENT_RECORD ON PATIENT_RECORD.id = inserted.recordId  WHERE inserted.status = N'Hoàn thành' and inserted.recordId IS NULL) 
	BEGIN 
		RAISERROR(N'Lỗi: Mỗi cuộc hẹn đã hoàn thành phải có một hồ sơ bệnh án ứng với cuộc hẹn đó', 16, 1)
		ROLLBACK
	END
END

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