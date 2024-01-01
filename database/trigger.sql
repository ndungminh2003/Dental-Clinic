USE QLPhongKham
GO

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
	IF EXISTS (SELECT 1 FROM inserted WHERE (SELECT count(dentistId) FROM SCHEDULE WHERE startTime = inserted.startTime GROUP BY startTime) > 5) 
	BEGIN 
		RAISERROR(N'Error: There is a maximum of 5 doctors with the same working hours in the schedule', 16, 1)
		ROLLBACK TRAN
	END
	IF EXISTS (SELECT 1 FROM inserted WHERE datediff(second,startTime, endTime) != 3600) 
	BEGIN 
		RAISERROR(N'Error: The start time must be 1 hour from the end time', 16, 1)
		ROLLBACK TRAN
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
	DECLARE @recordId INT = (SELECT recordId FROM inserted)
	DECLARE @startTime DATETIME = (SELECT startTime FROM inserted)
	DECLARE @dentistId INT = (SELECT dentistId FROM inserted)
	DECLARE @customerId INT = (SELECT customerId FROM inserted)
	IF UPDATE(startTime) or UPDATE(endTime)
	BEGIN
		IF EXISTS (SELECT 1 FROM inserted WHERE datediff(second,startTime, endTime) <= 0) 
		BEGIN 
			RAISERROR(N'Error: The start time must be before the end time.', 16, 1)
			ROLLBACK TRAN
		END
	END
	IF UPDATE(recordId)
	BEGIN
		IF EXISTS (SELECT 1 FROM APPOINTMENT a WHERE (a.dentistId != @dentistId OR a.startTime != @startTime) AND a.recordId = @recordId)
		BEGIN 
			RAISERROR (N'Error: Each medical record belongs to a single appointment.', 16, 1)
			ROLLBACK TRAN
		END
	END
	IF UPDATE(startTime) or UPDATE(customerId)
	BEGIN
		IF EXISTS (SELECT 1 FROM APPOINTMENT a WHERE a.startTime = @startTime AND a.dentistId != @dentistId AND a.customerId = @customerId)
		BEGIN 
			RAISERROR (N'Error: Customers can only have one appointment at a time.', 16, 1)
			ROLLBACK TRAN
		END
		-- IF EXISTS (SELECT * FROM inserted i WHERE i.status = N'Đang diễn ra' AND i.status = N'Hoàn thành' AND i.status = N'Creating patient records' )
		-- BEGIN
		-- 	RAISERROR(N'Error: Khách hàng chỉ có thể có một cuộc hẹn trong một thời điểm', 16, 1)
		-- 	ROLLBACK
		-- END
	END
	IF UPDATE(status) or UPDATE(recordId)
	BEGIN
		IF EXISTS (SELECT 1 FROM inserted WHERE inserted.status = N'Completed' and inserted.recordId IS NULL) 
		BEGIN 
			RAISERROR(N'Error: Each completed appointment must have a medical record corresponding to that appointment.', 16, 1)
			ROLLBACK TRAN
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
	DECLARE @totalService FLOAT = (SELECT SUM(price * quantity) FROM SERVICE_USE s JOIN inserted i ON s.recordId = i.recordId)
	DECLARE @totalMedicine FLOAT = (SELECT SUM(price * quantity) FROM PRESCRIBE_MEDICINE p JOIN inserted i ON p.recordId = i.recordId)
	DECLARE @total FLOAT = @totalService + @totalMedicine
	IF UPDATE(date_time) 
	BEGIN
		IF EXISTS (SELECT 1 FROM inserted JOIN PATIENT_RECORD ON PATIENT_RECORD.id = inserted.recordId  WHERE DATEDIFF(second,inserted.date_time, PATIENT_RECORD.date_time) >= 0 ) 
		BEGIN 
			RAISERROR (N'Error: The invoice creation time must be after the medical record creation time.', 16, 1)
			ROLLBACK TRAN
		END
	END
	IF UPDATE(recordId) 
	BEGIN
		UPDATE iv SET total = @total FROM INVOICE iv JOIN INSERTED i ON iv.id = i.id 
	END
	IF UPDATE(total) 
	BEGIN
		IF EXISTS (SELECT 1 FROM inserted i WHERE i.total != @total)
		BEGIN 
			RAISERROR (N'Error: Total payment must equal the total cost of medicines and services used.', 16, 1)
			ROLLBACK TRAN
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
	DECLARE @recordId INT = (SELECT id FROM inserted)
	DECLARE @dateTime DATETIME = (SELECT date_time FROM inserted)
	DECLARE @customerId INT = (SELECT customerId FROM inserted)
	DECLARE @dentistId INT = (SELECT dentistId FROM inserted)
	-- IF UPDATE(date_time)
	-- BEGIN
	-- 	IF EXISTS (SELECT 1 FROM APPOINTMENT WHERE APPOINTMENT.recordId = @recordId AND DATEDIFF(second,@dateTime, APPOINTMENT.startTime) >= 0 ) 
	-- 	BEGIN 
	-- 		RAISERROR (N'Error: The time to create the medical record must be after the appointment start time.', 16, 1)
	-- 		ROLLBACK TRAN
	-- 	END
	-- END
	IF UPDATE(dentistId) or UPDATE(date_time)
	BEGIN
		IF EXISTS (SELECT 1 FROM PATIENT_RECORD p WHERE p.id != @recordId AND p.dentistId = @dentistId AND p.date_time = @dateTime)
		BEGIN
			RAISERROR (N'Error: Currently this dentist can only create one medical record.', 16, 1)
			ROLLBACK TRAN
		END
	END
	IF UPDATE(dentistId) or UPDATE (customerId)
	BEGIN
		IF NOT EXISTS (SELECT 1 FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'In progress')
		BEGIN
			RAISERROR (N'Error: There are no appointments that require the creation of medical records.', 16, 1)
			ROLLBACK TRAN
		END
	END
END

--Trigger7
GO
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
	IF NOT EXISTS (SELECT 1 FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'In progress')
	BEGIN
		RAISERROR (N'Error: There are no appointments that require the creation of medical records.', 16, 1)
		ROLLBACK TRAN
	END
	IF EXISTS (SELECT 1 FROM PATIENT_RECORD p WHERE p.id != @recordId AND p.dentistId = @dentistId AND p.date_time = @dateTime)
	BEGIN
		RAISERROR (N'Error: Currently this dentist can only create one medical record.', 16, 1)
		ROLLBACK TRAN
	END
	-- IF EXISTS (SELECT 1 FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'In progress' AND DATEDIFF(second,@dateTime, a.startTime) >= 0 ) 
	-- BEGIN 
	-- 	RAISERROR (N'Error: The time to create the medical record must be after the appointment start time.', 16, 1)
	-- 	ROLLBACK TRAN
	-- END
	UPDATE a SET a.recordId = @recordId, a.status = N'Completed' FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'In progress'
END

GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_PATIENT_RECORD3]'))
DROP TRIGGER [dbo].[TRIGGER_PATIENT_RECORD3]
GO
CREATE TRIGGER TRIGGER_PATIENT_RECORD3 ON PATIENT_RECORD
INSTEAD OF DELETE
AS
BEGIN
	DECLARE @deletedRecordId INT = (SELECT id FROM deleted)
	UPDATE a SET a.recordId = NULL FROM APPOINTMENT a WHERE a.recordId = @deletedRecordId
	DELETE FROM INVOICE WHERE recordId = @deletedRecordId
	DELETE FROM SERVICE_USE WHERE recordId = @deletedRecordId
	DELETE FROM PRESCRIBE_MEDICINE WHERE recordId = @deletedRecordId
	DELETE FROM PATIENT_RECORD WHERE id = @deletedRecordId
END

SELECT * FROM PATIENT_RECORD

--Trigger8
--R30: Số lượng của một loại thuốc trong đơn thuốc phải bé hơn hoặc bằng số lượng của loại thuốc đó ở trong kho.
--R48: Với mỗi loại thuốc được sử dụng trong đơn thuốc thì ngày hết hạn phải sau ngày khám.
GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_PRESCRIBE_MEDICINE]'))
DROP TRIGGER [dbo].[TRIGGER_PRESCRIBE_MEDICINE]
GO
CREATE TRIGGER TRIGGER_PRESCRIBE_MEDICINE ON PRESCRIBE_MEDICINE 
FOR INSERT, UPDATE
AS
BEGIN
	IF UPDATE(quantity)
	BEGIN
		IF EXISTS (
			SELECT 1
			FROM INSERTED as i
			JOIN MEDICINE as m ON i.medicineId = m.id
			WHERE m.quantity < i.quantity
		)
		BEGIN 
			RAISERROR(N'Error: The quantity of a medicine in the prescription must be less than or equal to the quantity of that medicine in stock.', 16, 1)
			ROLLBACK TRANSACTION;
		END;

		DECLARE @MEDICINE_ID INT = (SELECT medicineId FROM INSERTED)
		DECLARE @QUANTITY INT = (SELECT quantity FROM INSERTED)
		DECLARE @MEDICINE_STOCK FLOAT = (SELECT quantity FROM MEDICINE m WHERE m.id = @MEDICINE_ID)
		UPDATE MEDICINE SET quantity = @MEDICINE_STOCK - @QUANTITY WHERE id = @MEDICINE_ID;
	END

	IF UPDATE(price)
	BEGIN
		IF EXISTS (
			SELECT 1
			FROM INSERTED as i
			JOIN MEDICINE as m ON i.medicineId = m.id
			WHERE m.price != i.price
		)
		BEGIN 
			RAISERROR(N'Error: The price of a medicine on the invoice must be the same as the price of that medicine in the warehouse.', 16, 1)
			ROLLBACK TRANSACTION;
		END;
	END

	IF UPDATE(medicineId)
	BEGIN
		IF EXISTS (SELECT 1 FROM inserted i JOIN MEDICINE m ON i.medicineId = m.id JOIN PATIENT_RECORD pr ON i.recordId = pr.id WHERE datediff(second, pr.date_time, m.expirationDate) <= 0) 
		BEGIN 
			RAISERROR(N'Error: The expiration date of the medicine must be after the date of examination.', 16, 1)
			ROLLBACK TRAN
		END
		UPDATE p SET p.medicineName = m.name, p.price = m.price
		FROM PRESCRIBE_MEDICINE p JOIN INSERTED i ON p.medicineId = i.medicineId AND p.recordId = i.recordId JOIN MEDICINE m on m.id = i.medicineId 
	END
END;


-- Trigger10
GO
IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_SERVICE_USE]'))
DROP TRIGGER [dbo].[TRIGGER_SERVICE_USE]
GO
CREATE TRIGGER TRIGGER_SERVICE_USE ON SERVICE_USE 
FOR INSERT, UPDATE
AS
BEGIN
	IF UPDATE(serviceId)
	BEGIN
		UPDATE su SET su.price = s.price FROM SERVICE_USE su JOIN INSERTED i ON su.serviceId = i.serviceId AND su.recordId = i.recordId JOIN SERVICE s ON i.serviceId = s.id
	END
END

--Trigger1
-- GO
-- IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_CUSTOMER1]'))
-- DROP TRIGGER [dbo].[TRIGGER_CUSTOMER1]
-- GO
-- CREATE TRIGGER TRIGGER_CUSTOMER1 ON CUSTOMER
-- FOR INSERT, UPDATE
-- AS
-- IF UPDATE(password) or UPDATE(role)
-- BEGIN
--     IF EXISTS (SELECT 1 FROM inserted WHERE role = N'Guest' and password IS NOT NULL) 
--     BEGIN 
--         RAISERROR(N'Error: Không thể đặt mật khẩu cho Guest', 16, 1)
--         ROLLBACK TRAN
--     END
-- 	IF EXISTS (SELECT 1 FROM inserted WHERE LEN(password) <= 10) 
--     BEGIN 
--         RAISERROR(N'Error: Mật khẩu phải nhiều hơn 10 ký tự', 16, 1)
--         ROLLBACK TRAN
--     END
-- END

-- --Trigger2
-- GO
-- IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[TRIGGER_CUSTOMER2]'))
-- DROP TRIGGER [dbo].[TRIGGER_CUSTOMER2]
-- GO
-- CREATE TRIGGER TRIGGER_CUSTOMER2 ON CUSTOMER
-- INSTEAD OF UPDATE
-- AS 
-- BEGIN
--   IF(UPDATE(password))
--   BEGIN
--     DECLARE @newPassword NVARCHAR(30);
  
--     SELECT @newPassword = i.password
--     FROM inserted i
--     JOIN CUSTOMER c ON c.id = i.id;
  
--     IF LEN(@newPassword) > 10
--     BEGIN
--       UPDATE c
--       SET role = 'Customer', password = @newPassword, name = i.name, gender = i.gender, birthday = i.birthday, address = i.address
--       FROM CUSTOMER c
--       JOIN inserted i ON c.id = i.id;
--     END
--     ELSE
--     BEGIN
--       RAISERROR('Error: Mật khẩu phải nhiều hơn 10 ký tự', 16, 1)
--       ROLLBACK TRAN
--     END
--   END
--   ELSE
-- 	UPDATE c
--     SET name = i.name, gender = i.gender, birthday = i.birthday, address = i.address
--     FROM CUSTOMER c
--     JOIN inserted i ON c.id = i.id;
-- END
--