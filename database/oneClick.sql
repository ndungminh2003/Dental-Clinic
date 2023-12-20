-- init -> trigger -> procedure -> privilege -> data
USE MASTER
GO 
IF DB_ID('QLPhongKham') IS NOT NULL
	DROP DATABASE QLPhongKham
GO

CREATE DATABASE QLPhongKham
GO
USE QLPhongKham
GO

CREATE TABLE ADMIN (

  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(50) NOT NULL CHECK(LEN(name) > 0),
  password VARCHAR(50) NOT NULL CHECK(LEN(password) > 0),
  phoneNumber VARCHAR(15) NOT NULL CHECK(ISNUMERIC(phoneNumber) = 1) UNIQUE
);

CREATE TABLE CUSTOMER (

  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(50) NOT NULL CHECK(LEN(name) > 0),
  password VARCHAR(50),
  phoneNumber VARCHAR(15) NOT NULL CHECK(ISNUMERIC(phoneNumber) = 1) UNIQUE,
  role VARCHAR(10) NOT NULL CHECK(role in ('Customer', 'Guest')),
  gender NVARCHAR(6) CHECK(gender in (N'Nam', N'Nữ')),
  address NVARCHAR(120),
  birthday DATE,
  isBlocked BIT NOT NULL DEFAULT(0)
);
select * from customer

CREATE TABLE DENTIST (

  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(50) NOT NULL CHECK(LEN(name) > 0),
  password VARCHAR(50) NOT NULL CHECK (LEN(password) > 0),
  phoneNumber VARCHAR(15) NOT NULL CHECK(ISNUMERIC(phoneNumber) = 1) UNIQUE,
  gender NVARCHAR(6) CHECK(gender IN (N'Nam', N'Nữ')),
  birthday DATE,
  introduction NVARCHAR(500),
  isBlocked BIT NOT NULL DEFAULT(0)
);

CREATE TABLE STAFF (
    
  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(50) NOT NULL CHECK(LEN(name) > 0),
  password VARCHAR(50) NOT NULL CHECK (LEN(password) > 0),
  phoneNumber VARCHAR(15) NOT NULL CHECK(ISNUMERIC(phoneNumber) = 1) UNIQUE,
  gender NVARCHAR(6) CHECK(gender in (N'Nam', N'Nữ')),
  isBlocked BIT NOT NULL DEFAULT(0),
  --startDate DATE
);


CREATE TABLE APPOINTMENT (
 
  dentistId INT NOT NULL,
  customerId INT NOT NULL,
  startTime DATETIME CHECK (CONVERT(char(10), startTime, 108) IN ('07:00:00', '08:00:00', '09:00:00', '10:00:00', '13:00:00','14:00:00', '15:00:00', '16:00:00')),
  endTime DATETIME CHECK (CONVERT(char(10), endTime, 108) IN ('08:00:00', '09:00:00', '10:00:00', '11:00:00', '14:00:00','15:00:00', '16:00:00', '17:00:00')),
  status NVARCHAR(30) CHECK(status IN (N'Đang diễn ra', N'Đang chờ', N'Hoàn thành', N'Hủy', N'Không đến khám', N'Đang tạo hồ sơ bệnh án')),
  staffId INT,
  recordId INT,
  CONSTRAINT PK_APPOINTMENT PRIMARY KEY (dentistId, startTime)
);

CREATE TABLE PATIENT_RECORD(	
  
  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  symptom NVARCHAR(50),
  advice NVARCHAR(100),
  diagnostic NVARCHAR(100),
  date_time DATETIME,
  dentistId INT NOT NULL,
  customerId INT NOT NULL,
);

CREATE TABLE INVOICE (
	
  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  total FLOAT CHECK(total >= 0),
  date_time DATETIME,
  status NVARCHAR(30) CHECK(status IN (N'Đã thanh toán', N'Chưa thanh toán')),
  recordId INT NOT NULL UNIQUE,
  staffId INT NOT NULL,
);

CREATE TABLE SCHEDULE (
	
  dentistId INT,
  startTime DATETIME CHECK (CONVERT(char(10), startTime, 108) IN ('07:00:00', '08:00:00', '09:00:00', '10:00:00', '13:00:00','14:00:00', '15:00:00', '16:00:00')),
  endTime DATETIME CHECK (CONVERT(char(10), endTime, 108) IN ('08:00:00', '09:00:00', '10:00:00', '11:00:00', '14:00:00','15:00:00', '16:00:00', '17:00:00')),
  isBooked BIT NOT NULL DEFAULT(0),
  CONSTRAINT PK_SCHEDULE PRIMARY KEY (dentistId, startTime)
);

CREATE TABLE PRESCRIBE_MEDICINE (
	
  recordId INT NOT NULL,
  medicineId INT,
  medicineName NVARCHAR(30) NOT NULL,
  price FLOAT CHECK(price > 0),
  quantity INT CHECK(quantity >= 0),
  CONSTRAINT PK_PRESCRIBE_MEDICINE PRIMARY KEY (recordId, medicineName)
);

CREATE TABLE MEDICINE (
	
  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(30) UNIQUE CHECK(LEN(name) > 0),
  unit NVARCHAR(10) CHECK(unit IN (N'Viên', N'Vỉ', N'Hộp', N'Chai', N'Ống', N'Gói')),
  description NVARCHAR(100),
  expirationDate DATETIME,
  indication NVARCHAR(50),
  quantity INT CHECK(quantity >= 0),
  price FLOAT CHECK(price > 0)
);

CREATE TABLE SERVICE (
	
  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(50) UNIQUE CHECK(LEN(name) > 0),
  price FLOAT CHECK(price > 0),
  description NVARCHAR(100),
);

CREATE TABLE SERVICE_USE (
  recordId INT NOT NULL,
  serviceId INT NOT NULL,
  price FLOAT CHECK(price > 0)
  CONSTRAINT PK_SERVICE_USE PRIMARY KEY (recordId, serviceId)
);

ALTER TABLE APPOINTMENT
ADD FOREIGN KEY (customerId) REFERENCES CUSTOMER(id);

ALTER TABLE APPOINTMENT
ADD FOREIGN KEY (staffId) REFERENCES STAFF(id);

ALTER TABLE APPOINTMENT
ADD FOREIGN KEY (dentistId) REFERENCES DENTIST(id);

ALTER TABLE APPOINTMENT
ADD FOREIGN KEY (recordId) REFERENCES PATIENT_RECORD(id);

ALTER TABLE SCHEDULE 
ADD FOREIGN KEY (dentistId) REFERENCES DENTIST(id);

ALTER TABLE PATIENT_RECORD 
ADD FOREIGN KEY (customerId) REFERENCES CUSTOMER(id);

ALTER TABLE PATIENT_RECORD 
ADD FOREIGN KEY (dentistId) REFERENCES DENTIST(id);

ALTER TABLE PRESCRIBE_MEDICINE 
ADD FOREIGN KEY (recordId) REFERENCES PATIENT_RECORD(id);

ALTER TABLE PRESCRIBE_MEDICINE 
ADD FOREIGN KEY (medicineId) REFERENCES MEDICINE(id);

ALTER TABLE SERVICE_USE 
ADD FOREIGN KEY (recordId) REFERENCES PATIENT_RECORD(id);

ALTER TABLE SERVICE_USE 
ADD FOREIGN KEY (serviceId) REFERENCES SERVICE(id);

ALTER TABLE INVOICE 
ADD FOREIGN KEY (recordId) REFERENCES PATIENT_RECORD(id);

ALTER TABLE INVOICE 
ADD FOREIGN KEY (staffId) REFERENCES STAFF(id);



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
		RAISERROR(N'Lỗi: Tối đa 5 bác sĩ có cùng thời gian làm việc trong lịch trình', 16, 1)
		ROLLBACK TRAN
	END
	IF EXISTS (SELECT 1 FROM inserted WHERE datediff(second,startTime, endTime) != 3600) 
	BEGIN 
		RAISERROR(N'Lỗi: thời gian bắt đầu phải cách thời gian kết thúc 1 giờ', 16, 1)
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
			RAISERROR(N'Lỗi: Thời gian bắt đầu phải trước thời gian kết thúc', 16, 1)
			ROLLBACK TRAN
		END
	END
	IF UPDATE(recordId)
	BEGIN
		IF EXISTS (SELECT 1 FROM APPOINTMENT a WHERE (a.dentistId != @dentistId OR a.startTime != @startTime) AND a.recordId = @recordId)
		BEGIN 
			RAISERROR (N'Lỗi: Mỗi hồ sơ bệnh án thuộc về một cuộc hẹn duy nhất', 16, 1)
			ROLLBACK TRAN
		END
	END
	IF UPDATE(startTime) or UPDATE(customerId)
	BEGIN
		IF EXISTS (SELECT 1 FROM APPOINTMENT a WHERE a.startTime = @startTime AND a.dentistId != @dentistId AND a.customerId = @customerId)
		BEGIN 
			RAISERROR (N'Lỗi: Khách hàng chỉ có thể có một cuộc hẹn trong một thời điểm', 16, 1)
			ROLLBACK TRAN
		END
		-- IF EXISTS (SELECT * FROM inserted i WHERE i.status = N'Đang diễn ra' AND i.status = N'Hoàn thành' AND i.status = N'Đang tạo hồ sơ bệnh án' )
		-- BEGIN
		-- 	RAISERROR(N'Lỗi: Khách hàng chỉ có thể có một cuộc hẹn trong một thời điểm', 16, 1)
		-- 	ROLLBACK
		-- END
	END
	IF UPDATE(status) or UPDATE(recordId)
	BEGIN
		IF EXISTS (SELECT 1 FROM inserted WHERE inserted.status = N'Hoàn thành' and inserted.recordId IS NULL) 
		BEGIN 
			RAISERROR(N'Lỗi: Mỗi cuộc hẹn đã hoàn thành phải có một hồ sơ bệnh án ứng với cuộc hẹn đó', 16, 1)
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
	DECLARE @totalService FLOAT = (SELECT SUM(price) FROM SERVICE_USE s JOIN inserted i ON s.recordId = i.recordId)
	DECLARE @totalMedicine FLOAT = (SELECT SUM(price * quantity) FROM PRESCRIBE_MEDICINE p JOIN inserted i ON p.recordId = i.recordId)
	DECLARE @total FLOAT = @totalService + @totalMedicine
	IF UPDATE(date_time) 
	BEGIN
		IF EXISTS (SELECT 1 FROM inserted JOIN PATIENT_RECORD ON PATIENT_RECORD.id = inserted.recordId  WHERE DATEDIFF(second,inserted.date_time, PATIENT_RECORD.date_time) >= 0 ) 
		BEGIN 
			RAISERROR (N'Lỗi: thời gian tạo hóa đơn phải sau thời gian tạo hồ sơ bệnh án', 16, 1)
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
			RAISERROR (N'Lỗi: Tổng tiền thanh toán phải bằng tổng tiền thuốc và dịch vụ đã dùng', 16, 1)
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
	IF UPDATE(date_time)
	BEGIN
		IF EXISTS (SELECT 1 FROM APPOINTMENT WHERE APPOINTMENT.recordId = @recordId AND DATEDIFF(second,@dateTime, APPOINTMENT.startTime) >= 0 ) 
		BEGIN 
			RAISERROR (N'Lỗi: Thời gian tạo hồ sơ bệnh án phải sau thời gian bắt đầu của cuộc hẹn.', 16, 1)
			ROLLBACK TRAN
		END
	END
	IF UPDATE(dentistId) or UPDATE(date_time)
	BEGIN
		IF EXISTS (SELECT 1 FROM PATIENT_RECORD p WHERE p.id != @recordId AND p.dentistId = @dentistId AND p.date_time = @dateTime)
		BEGIN
			RAISERROR (N'Lỗi: Hiện tại nha sĩ này chỉ có thể tạo một hồ sơ bệnh án', 16, 1)
			ROLLBACK TRAN
		END
	END
	IF UPDATE(dentistId) or UPDATE (customerId)
	BEGIN
		IF NOT EXISTS (SELECT 1 FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'Đang tạo hồ sơ bệnh án')
		BEGIN
			RAISERROR (N'Lỗi: Không có cuộc hẹn cần tạo hồ sơ bệnh án', 16, 1)
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
	IF NOT EXISTS (SELECT 1 FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'Đang tạo hồ sơ bệnh án')
	BEGIN
		RAISERROR (N'Lỗi: Không có cuộc hẹn cần tạo hồ sơ bệnh án', 16, 1)
		ROLLBACK TRAN
	END
	IF EXISTS (SELECT 1 FROM PATIENT_RECORD p WHERE p.id != @recordId AND p.dentistId = @dentistId AND p.date_time = @dateTime)
	BEGIN
		RAISERROR (N'Lỗi: Hiện tại nha sĩ này chỉ có thể tạo một hồ sơ bệnh án', 16, 1)
		ROLLBACK TRAN
	END
	IF EXISTS (SELECT 1 FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'Đang tạo hồ sơ bệnh án' AND DATEDIFF(second,@dateTime, a.startTime) >= 0 ) 
	BEGIN 
		RAISERROR (N'Lỗi: Thời gian tạo hồ sơ bệnh án phải sau thời gian bắt đầu của cuộc hẹn.', 16, 1)
		ROLLBACK TRAN
	END
	UPDATE a SET a.recordId = @recordId, a.status = N'Hoàn thành' FROM APPOINTMENT a WHERE a.customerId = @customerId AND a.dentistId = @dentistId AND a.status = N'Đang tạo hồ sơ bệnh án'
	PRINT @recordId
	PRINT 'Hi'
	INSERT INTO SERVICE_USE (recordId, serviceId) VALUES(@recordId, 1)
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
			RAISERROR(N'Lỗi: Số lượng của một loại thuốc trong đơn thuốc phải bé hơn hoặc bằng số lượng của loại thuốc đó ở trong kho.', 16, 1)
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
			RAISERROR(N'Lỗi: Giá của 1 loại thuốc trong hóa đơn phải giống với giá của loại thuốc đó ở trong kho.', 16, 1)
			ROLLBACK TRANSACTION;
		END;
	END

	IF UPDATE(medicineId)
	BEGIN
		IF EXISTS (SELECT 1 FROM inserted i JOIN MEDICINE m ON i.medicineId = m.id JOIN PATIENT_RECORD pr ON i.recordId = pr.id WHERE datediff(second, pr.date_time, m.expirationDate) <= 0) 
		BEGIN 
			RAISERROR(N'Lỗi: Hạn sử dụng của thuốc phải sau ngày khám', 16, 1)
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

USE QLPhongKham
GO
-- customer sign up
GO
USE QLPhongKham
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_signUp')
BEGIN
    DROP PROCEDURE sp_signUp
END
GO
CREATE PROC sp_signUp
    @phone VARCHAR(15),
    @password VARCHAR(50),
    @name NVARCHAR(50),
    @gender NVARCHAR(6),
    @birthday DATE,
    @address NVARCHAR(120)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
    BEGIN TRY
        BEGIN TRAN
		IF LEN(@password) < 10
		BEGIN
			RAISERROR(N'Lỗi: Mật khẩu phải nhiều hơn 10 ký tự', 16, 1)
		END
        IF EXISTS (SELECT 1 FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Customer')
        BEGIN
            RAISERROR (N'Lỗi: Số điện thoại đã được đăng ký', 16, 1)
        END
        ELSE IF EXISTS (SELECT 1 FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Guest')
        BEGIN
            UPDATE CUSTOMER 
            SET password = @password, name = @name, gender = @gender, birthday = @birthday, address = @address, role = 'Customer'
            WHERE phoneNumber = @phone
        END
        ELSE
        BEGIN
            INSERT INTO CUSTOMER 
            VALUES(@name, @password, @phone, 'Customer', @gender, @address, @birthday, 0)
			SELECT * FROM CUSTOMER WHERE phoneNumber = @phone
        END
        COMMIT TRAN
    END TRY
    BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
    END CATCH
END

-- login
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_login')
BEGIN
    DROP PROCEDURE sp_login
END
GO
CREATE PROC sp_login
    @phone VARCHAR(15),
    @password VARCHAR(50),
	@role VARCHAR(16)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
    BEGIN TRY
        BEGIN TRAN
			IF @role = 'guest'
			BEGIN
				IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE phoneNumber = @phone AND role = 'Customer' AND password = @password )
				BEGIN
					RAISERROR (N'Error: Incorrect phone number or password', 16, 1)
				END
				IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE phoneNumber = @phone AND role = 'Customer' AND password = @password AND isBlocked = 0)
				BEGIN
					RAISERROR (N'Error: Account has been blocked', 16, 1)
				END
				SELECT * FROM CUSTOMER WHERE phoneNumber = @phone AND role = 'Customer' AND password = @password AND isBlocked = 0
			END

			ELSE IF @role = 'dentist'
			BEGIN
				IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE phoneNumber = @phone AND password = @password )
				BEGIN
					RAISERROR (N'Error: Incorrect phone number or password', 16, 1)
				END
				IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE phoneNumber = @phone AND password = @password AND isBlocked = 0)
				BEGIN
					RAISERROR (N'Error: Account has been blocked', 16, 1)
				END
				SELECT * FROM DENTIST WHERE phoneNumber = @phone AND password = @password AND isBlocked = 0
			END

			ELSE IF @role = 'staff'
			BEGIN
				IF NOT EXISTS (SELECT 1 FROM STAFF WHERE phoneNumber = @phone AND password = @password )
				BEGIN
					RAISERROR (N'Error: Incorrect phone number or password', 16, 1)
				END
				IF NOT EXISTS (SELECT 1 FROM STAFF WHERE phoneNumber = @phone AND password = @password AND isBlocked = 0)
				BEGIN
					RAISERROR (N'Error: Account has been blocked', 16, 1)
				END
				SELECT * FROM STAFF WHERE phoneNumber = @phone AND password = @password AND isBlocked = 0
			END

			ELSE IF @role = 'admin'
			BEGIN
				IF NOT EXISTS (SELECT 1 FROM ADMIN WHERE phoneNumber = @phone AND password = @password )
				BEGIN
					RAISERROR (N'Error: Incorrect phone number or password', 16, 1)
				END
				SELECT * FROM ADMIN WHERE phoneNumber = @phone AND password = @password
			END
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view one customer
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneCustomer')
BEGIN
    DROP PROCEDURE sp_viewOneCustomer
END
GO

-- UNREPEATABLE READ, PHANTOM READ, DIRTY READ (SAME LOGIN)
CREATE PROC sp_viewOneCustomer --STAFF CUSTOMER ADMIN
	@customerId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM CUSTOMER WHERE id = @customerId)
		BEGIN
			RAISERROR(N'Lỗi: Mã khách hàng không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM CUSTOMER WHERE id = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view all customer (ADMIN STAFF)
-- DIRTY READ (Admin thêm người dùng hoặc xóa người dùng, hoặc cập nhật người dùng nhưng lỗi commit)
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllCustomer')
BEGIN
    DROP PROCEDURE sp_viewAllCustomer
END
GO

CREATE PROC sp_viewAllCustomer
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM CUSTOMER
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- DIRTY READ, LOST UPDATE, TỪ ADMIN
-- update customer profile (CUSTOMER ADMIN)
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_updateCustomerProfile')
BEGIN
	DROP PROCEDURE sp_updateCustomerProfile
END
GO

CREATE PROC sp_updateCustomerProfile
	@customerId INT,
	@name NVARCHAR(50),
	@phoneNumber VARCHAR(15),
	@gender NVARCHAR(6),
	@address NVARCHAR(120),
	@birthday DATE
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE id = @customerId)
		BEGIN
			RAISERROR(N'Lỗi: Mã khách hàng không tồn tại',16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS (SELECT 1 FROM CUSTOMER WHERE id != @customerId AND phoneNumber = @phoneNumber)
		BEGIN
			RAISERROR(N'Lỗi: Số điện thoại đã được đăng ký',16, 1)
			ROLLBACK TRAN
		END
		UPDATE CUSTOMER 
		SET name = @name, phoneNumber = @phoneNumber, gender = @gender, birthday = @birthday, address = @address 
		WHERE id = @customerId

		SELECT * FROM CUSTOMER WHERE id = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

--block user
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_blockUser1')
BEGIN
	DROP PROCEDURE sp_blockUser1
END

GO
CREATE PROC sp_blockUser1
	@userId INT,
	@role VARCHAR(16) 
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		DECLARE @id INT
		DECLARE @sql1 NVARCHAR(128) = 'SELECT @id = id FROM '+ quotename(@role) + ' WHERE id = @userId'
		exec sp_executesql @sql1, N'@role VARCHAR(16), @userId INT, @id INT OUTPUT',
		@role = @role, @userId = @userId, @id = @id OUTPUT
		IF @id IS NULL
		BEGIN
			RAISERROR(N'Lỗi: Mã người dùng không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		DECLARE @isBlocked BIT
		DECLARE @sql2 NVARCHAR(128) = 'SELECT @isBlocked = CASE WHEN isBlocked = 1 THEN 0 ELSE 1 END FROM '+ quotename(@role) +' WHERE id = @userId'
		exec sp_executesql @sql2, N'@role VARCHAR(16), @userId INT, @isBlocked BIT OUTPUT',
		@role = @role, @userId = @userId, @isBlocked = @isBlocked OUTPUT

		DECLARE @sql3 NVARCHAR(128) = 'UPDATE '+ quotename(@role) +' SET isBlocked = @isBlocked WHERE id = @userId'
		exec sp_executesql @sql3, N'@isBlocked BIT, @role VARCHAR(16), @userId INT',
		@isBlocked = @isBlocked, @role = @role, @userId = @userId

		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END



-- LOST UPDATE (Admin cùng cập nhật password sẽ bị ghi đè) 
-- change customer password  (CUSTOMER, ADMIN)
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_changeCustomerPassword')
BEGIN
	DROP PROCEDURE sp_changeCustomerPassword
END
GO

CREATE PROC sp_changeCustomerPassword
	@customerId INT,
	@oldPassword VARCHAR(50),
	@newPassword VARCHAR(50)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE id = @customerId)
			BEGIN
				RAISERROR(N'Lỗi: Mã khách hàng không tồn tại', 16, 1)
				ROLLBACK TRAN				
			END
			IF LEN(@newPassword) <= 10
			BEGIN
				RAISERROR(N'Lỗi: Mật khẩu phải nhiều hơn 10 ký tự', 16, 1)
				ROLLBACK TRAN
			END
			IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE id = @customerId AND password = @oldPassword)
			BEGIN
				RAISERROR(N'Lỗi: Mật khẩu cũ không đúng',16, 1)
				ROLLBACK TRAN
			END
			UPDATE CUSTOMER SET password = @newPassword WHERE id = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- create dentist
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_createDentist')
BEGIN
	DROP PROCEDURE sp_createDentist
END
GO

CREATE PROC sp_createDentist
	@name NVARCHAR(50),
	@password VARCHAR(50),
	@phoneNumber VARCHAR(15),
	@gender NVARCHAR(6),
	@birthday DATE,
	@introduction NVARCHAR(500)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF EXISTS (SELECT 1 FROM DENTIST WHERE phoneNumber = @phoneNumber)
		BEGIN
			RAISERROR(N'Số điện thoại đã được đăng ký',16, 1)
			ROLLBACK TRAN
		END
		IF LEN(@password) <= 10
		BEGIN
			RAISERROR(N'Lỗi: Mật khẩu phải nhiều hơn 10 ký tự', 16, 1)
			ROLLBACK TRAN
		END
		INSERT INTO DENTIST VALUES(@name, @password, @phoneNumber, @gender, @birthday, @introduction, 0)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- view one dentist dirty read, phantom read, unrepeatable read
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneDentist')
BEGIN
	DROP PROCEDURE sp_viewOneDentist
END
GO

CREATE PROC sp_viewOneDentist
	@dentistId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Lỗi: Mã nha sĩ không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM DENTIST WHERE id = @dentistId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- view all dentist dirty read
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllDentist')
BEGIN
	DROP PROCEDURE sp_viewAllDentist
END
GO

CREATE PROC sp_viewAllDentist
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
			SELECT * FROM DENTIST
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- update dentist profile, lost update(Admin cùng sửa profile), dirty read(khi 2 người bác sĩ cùng sửa đổi số điện thoại cùng 1 lúc nhưng 1 người được cập nhật số điện thoại mới 1 người không nhưng đến cuối người được cập nhật số điện thoại lại fail commit)
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_updateDentistProfile')
BEGIN
	DROP PROCEDURE sp_updateDentistProfile
END
GO

CREATE PROC sp_updateDentistProfile
	@dentistId INT,
	@name NVARCHAR(50),
	@phoneNumber VARCHAR(15),
	@gender NVARCHAR(6),
	@birthday DATE,
	@introduction NVARCHAR(500)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Lỗi: Mã nha sĩ không tồn tại',16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS (SELECT 1 FROM DENTIST WHERE id != @dentistId AND phoneNumber = @phoneNumber)
		BEGIN
			RAISERROR(N'Lỗi: Số điện thoại đã được đăng ký',16, 1)
			ROLLBACK TRAN
		END
		UPDATE DENTIST SET name = @name, phoneNumber = @phoneNumber, gender = @gender, birthday = @birthday, introduction = @introduction WHERE id = @dentistId
		SELECT * FROM DENTIST WHERE id = @dentistId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


--change dentist password Lost update(Admin cùng thay đổi), Dirty read 
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_changeDentistPassword')
BEGIN
	DROP PROCEDURE sp_changeDentistPassword
END
GO

CREATE PROC sp_changeDentistPassword
	@dentistId INT,
	@oldPassword VARCHAR(50),
	@newPassword VARCHAR(50)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE id = @dentistId)
			BEGIN
				RAISERROR(N'Lỗi: Mã nha sĩ không tồn tại',16, 1)
				ROLLBACK TRAN
			END
			IF LEN(@newPassword) <= 10
			BEGIN
				RAISERROR(N'Lỗi: Mật khẩu phải nhiều hơn 10 ký tự', 16, 1)
				ROLLBACK TRAN
			END
			IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE id = @dentistId AND password = @oldPassword)
			BEGIN
				RAISERROR(N'Lỗi: Mật khẩu cũ không đúng',16, 1)
				ROLLBACK TRAN
			END
			UPDATE DENTIST SET password = @newPassword WHERE id = @dentistId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- create staff
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_createStaff')
BEGIN
	DROP PROCEDURE sp_createStaff
END
GO
CREATE PROC sp_createStaff
	@name NVARCHAR(50),
	@password VARCHAR(50),
	@phoneNumber VARCHAR(15),
	@gender NVARCHAR(6)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF EXISTS (SELECT 1 FROM STAFF WHERE phoneNumber = @phoneNumber)
		BEGIN
			RAISERROR(N'Lỗi: Số điện thoại đã được đăng ký',16, 1)
			ROLLBACK TRAN
		END
		IF LEN(@password) <= 10
		BEGIN
			RAISERROR(N'Lỗi: Mật khẩu phải nhiều hơn 10 ký tự', 16, 1)
			ROLLBACK TRAN
		END
		INSERT INTO STAFF VALUES(@name, @password, @phoneNumber, @gender, 0)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view One staff dirty read, Unreapeateable read
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneStaff')
BEGIN
	DROP PROCEDURE sp_viewOneStaff
END
GO
CREATE PROC sp_viewOneStaff
	@staffId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF EXISTS (SELECT 1 FROM STAFF WHERE id = @staffId)
		BEGIN
			RAISERROR(N'Lỗi: Mã nhân viên không tồn tại',16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM STAFF WHERE id = @staffId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view all staff dirty read
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllStaff')
BEGIN
	DROP PROCEDURE sp_viewAllStaff
END
GO
CREATE PROC sp_viewAllStaff
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
			SELECT * FROM STAFF
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- make appointment 
-- 2 user cung make dirty read, lost update
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_makeAppointment')
BEGIN
    DROP PROCEDURE sp_makeAppointment
END
GO
CREATE PROC sp_makeAppointment
	@phone VARCHAR(15),
	@name NVARCHAR(50),
  	@gender NVARCHAR(6),
 	@birthday DATE,
  	@address NVARCHAR(120),
	@dentistId INT,
	@staffId INT,
	@startTime DATETIME
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF datediff(second, @startTime, GETDATE()) > 0
		BEGIN
			RAISERROR (N'Lỗi: Cuộc hẹn được đặt phải có thời gian bắt đầu sau thời gian hiện tại', 16, 1)
			ROLLBACK TRAN
		END
		IF @staffId IS NOT NULL
		BEGIN
			IF NOT EXISTS (SELECT 1 FROM STAFF WHERE id = @staffId)
			BEGIN
				RAISERROR (N'Lỗi: Mã nhân viên không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
		END
		IF NOT EXISTS (SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId and startTime = @startTime and isBooked = 0)
		BEGIN
			RAISERROR (N'Lỗi: Lịch trình không tồn tại hoặc đã được đặt', 16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE phoneNumber = @phone)
		BEGIN
			INSERT INTO CUSTOMER VALUES(@name, NULL, @phone, 'Guest', @gender, @address, @birthday, 0)
		END
		ELSE IF EXISTS (SELECT 1 FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Guest')
		BEGIN
			UPDATE CUSTOMER SET name = @name, gender = @gender, address = @address, birthday = @birthday 
			WHERE phoneNumber = @phone and role = 'Guest'
		END
		DECLARE @customerId INT
		SELECT @customerId = id FROM CUSTOMER WHERE phoneNumber = @phone and isBlocked = 0
		IF @customerId IS NULL
		BEGIN
			RAISERROR (N'Lỗi: Số điện thoại không đặt được cuộc hẹn vì đã bị khóa', 16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS (SELECT 1 FROM APPOINTMENT a WHERE a.startTime = @startTime AND a.dentistId != @dentistId AND a.customerId = @customerId)
		BEGIN 
			RAISERROR (N'Lỗi: Khách hàng chỉ có thể có một cuộc hẹn với một nha sĩ trong một thời điểm', 16, 1)
			ROLLBACK TRAN
		END
		DECLARE @endTime DATETIME
		SET @endTime = DATEADD(HOUR, 1, @startTime)
		INSERT INTO APPOINTMENT VALUES(@dentistId, @customerId, @startTime, @endTime, N'Đang chờ', @staffId, NULL)
		UPDATE SCHEDULE SET isBooked = 1 WHERE dentistId = @dentistId and startTime = @startTime and endTime = @endTime
		SELECT * FROM APPOINTMENT a WHERE a.startTime = @startTime AND a.dentistId = @dentistId AND a.customerId = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- cancel appointment, 
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_cancelAppointment')
BEGIN
    DROP PROCEDURE sp_cancelAppointment
END  
GO

CREATE PROC sp_cancelAppointment
	@dentistId INT,
	@startTime DATETIME,
	@customerId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM APPOINTMENT WHERE dentistId = @dentistId and startTime = @startTime and customerId = @customerId)
		BEGIN
			RAISERROR (N'Lỗi: Cuộc hẹn không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS (SELECT 1 FROM APPOINTMENT WHERE dentistId = @dentistId and startTime = @startTime and customerId = @customerId and status != N'Đang chờ')
		BEGIN
			RAISERROR (N'Lỗi: Không thể huỷ cuộc hẹn', 16, 1)
			ROLLBACK TRAN
		END
		DELETE FROM APPOINTMENT WHERE dentistId = @dentistId and startTime = @startTime and customerId = @customerId
		UPDATE SCHEDULE SET isBooked = 0 WHERE dentistId = @dentistId and startTime = @startTime
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- delete appointment  
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_deleteAppointment')
BEGIN
    DROP PROCEDURE sp_deleteAppointment
END  
GO
CREATE PROC sp_deleteAppointment
	@dentistId INT,
	@startTime DATETIME,
	@customerId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM APPOINTMENT WHERE dentistId = @dentistId and startTime = @startTime and customerId = @customerId)
		BEGIN
			RAISERROR (N'Lỗi: Cuộc hẹn không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		DECLARE @recordId INT = (SELECT recordId FROM APPOINTMENT WHERE dentistId = @dentistId and startTime = @startTime and customerId = @customerId)
		DELETE FROM PATIENT_RECORD WHERE id = @recordId
		DELETE FROM APPOINTMENT WHERE dentistId = @dentistId and startTime = @startTime and customerId = @customerId
		UPDATE SCHEDULE SET isBooked = 0 WHERE dentistId = @dentistId and startTime = @startTime
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- update appointment status
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_updateAppointmentStatus')
BEGIN
	DROP PROCEDURE sp_updateAppointmentStatus
END
GO
CREATE PROC sp_updateAppointmentStatus
	@dentistId INT,
	@startTime DATETIME,
	@status NVARCHAR(30)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM APPOINTMENT WHERE dentistId = @dentistId AND startTime = @startTime)
		BEGIN
			RAISERROR (N'Lỗi: Cuộc hẹn không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		UPDATE APPOINTMENT SET status = @status WHERE dentistId = @dentistId AND startTime = @startTime
		SELECT * FROM APPOINTMENT WHERE dentistId = @dentistId AND startTime = @startTime
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- view one appointment, dirty read, phantom read, 
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneAppointment')
BEGIN
	DROP PROCEDURE sp_viewOneAppointment
END
GO
CREATE PROC sp_viewOneAppointment
	@dentistId INT,
	@startTime DATETIME
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM APPOINTMENT WHERE dentistId = @dentistId and startTime = @startTime)
		BEGIN
			RAISERROR (N'Lỗi: Cuộc hẹn không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM APPOINTMENT WHERE dentistId = @dentistId and startTime = @startTime
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view all appointment dirty read, 
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllAppointment')
BEGIN
	DROP PROCEDURE sp_viewAllAppointment
END
GO
CREATE PROC sp_viewAllAppointment
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT A.startTime,A.endTime,A.recordId,A.status,D.name AS dentistName, C.name AS customerName, S.name AS staffName
			FROM APPOINTMENT A
			JOIN DENTIST D ON A.dentistId = D.id
			JOIN CUSTOMER C ON A.customerId = C.id
			LEFT JOIN STAFF S ON A.staffId = S.id
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view customer's appointment dirty read, phantom read (khi customer thêm vào 1 appointment mới hoặc hủy)
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewCustomerAppointment')
BEGIN
	DROP PROCEDURE sp_viewCustomerAppointment
END
GO
CREATE PROC sp_viewCustomerAppointment
	@customerId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE id = @customerId)
		BEGIN
			RAISERROR (N'Lỗi: Mã khách hàng không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS (SELECT 1 FROM APPOINTMENT WHERE customerId = @customerId)
		BEGIN
			RAISERROR (N'Lỗi: Không có cuộc hẹn nào', 16, 1)
			ROLLBACK TRAN
		END
		SELECT a.*, dt.name FROM APPOINTMENT a JOIN DENTIST dt ON a.dentistId = dt.id WHERE customerId = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- dirty read, phantom read (khi customer thêm vào 1 appointment mới hoặc hủy)
-- view dentist's appointment
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewDentistAppointment')
BEGIN
	DROP PROCEDURE sp_viewDentistAppointment
END
GO
CREATE PROC sp_viewDentistAppointment
	@dentistId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR (N'Lỗi: Mã nha sĩ không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS (SELECT 1 FROM APPOINTMENT WHERE dentistId = @dentistId)
		BEGIN
			RAISERROR (N'Lỗi: Không có cuộc hẹn nào', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM APPOINTMENT WHERE dentistId = @dentistId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- create patient record dirty read(khi admin xóa Customer id hoặc dentist id)
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_createPatientRecord')
BEGIN
	DROP PROCEDURE sp_createPatientRecord
END
GO
CREATE PROC sp_createPatientRecord
	@customerId INT, 
	@dentistId INT,
	@date_time DATETIME,
	@diagnostic NVARCHAR(100),
	@symptom NVARCHAR(50),
	@advice NVARCHAR(100)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (
				SELECT 1
				FROM CUSTOMER C WHERE C.id = @customerId	
			)
			BEGIN
				RAISERROR (N'LỖI: KHÔNG TỒN TẠI ID KHÁCH HÀNG', 16, 1)
				ROLLBACK TRAN
			END
			IF NOT EXISTS (
				SELECT 1
				FROM DENTIST D WHERE D.id = @dentistId	
			)
			BEGIN
				RAISERROR (N'LỖI: KHÔNG TỒN TẠI ID BÁC SĨ', 16, 1)
				ROLLBACK TRAN
			END
			INSERT INTO PATIENT_RECORD(symptom, advice, diagnostic, date_time, dentistId, customerId) VALUES (@symptom, @advice, @diagnostic, @date_time, @dentistId, @customerId)
			SELECT * FROM PATIENT_RECORD 
 			WHERE date_time = @date_time and dentistId = @dentistId and customerId = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- update patient record - lost update
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_updatePatientRecord')
BEGIN
	DROP PROCEDURE sp_updatePatientRecord
END
GO
CREATE PROC sp_updatePatientRecord
	@recordId INT,
	@date_time DATETIME,
	@diagnostic NVARCHAR(100),
	@sympton NVARCHAR(50),
	@advice NVARCHAR(100)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (
				SELECT 1
				FROM PATIENT_RECORD p WHERE p.id = @recordId	
			)
			BEGIN
				RAISERROR (N'Lỗi: mã hồ sơ bệnh án không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			UPDATE PATIENT_RECORD 
			SET symptom = @sympton, advice = @advice, diagnostic = @diagnostic, date_time = @date_time
			WHERE id = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- delete patient record
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_deletePatientRecord')
BEGIN
	DROP PROCEDURE sp_deletePatientRecord
END
GO
CREATE PROC sp_deletePatientRecord
	@recordId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (
				SELECT 1
				FROM PATIENT_RECORD p WHERE p.id = @recordId	
			)
			BEGIN
				PRINT N'Lỗi: mã hồ sơ bệnh án không tồn tại'
				ROLLBACK TRAN
			END
			DELETE FROM PATIENT_RECORD WHERE id = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view one patient record dirty read (khi xóa, cập nhật nhưng lỗi commit), phantom read, 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOnePatientRecord')
BEGIN
	DROP PROCEDURE sp_viewOnePatientRecord
END
GO
CREATE PROC sp_viewOnePatientRecord
	@recordId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (
				SELECT 1
				FROM PATIENT_RECORD p WHERE p.id = @recordId	
			)
			BEGIN
				PRINT N'Lỗi: mã hồ sơ bệnh án không tồn tại'
				ROLLBACK TRAN
			END
			SELECT * FROM PATIENT_RECORD WHERE id = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view all patient record, dirty read (khi thêm vào 1 patient record mới hoặc xóa đi)
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllPatientRecord')
BEGIN
	DROP PROCEDURE sp_viewAllPatientRecord
END
GO
CREATE PROC sp_viewAllPatientRecord
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT P_R.id,P_R.advice, P_R.date_time,P_R.diagnostic,P_R.symptom,D.name AS dentistName, C.name AS customerName
			FROM PATIENT_RECORD P_R
			JOIN DENTIST D ON P_R.dentistId = D.id
			JOIN CUSTOMER C ON P_R.customerId = C.id
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view patient record by customer id, dirty read
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewCustomerPatientRecord')
BEGIN
	DROP PROCEDURE sp_viewCustomerPatientRecord
END
GO
CREATE PROC sp_viewCustomerPatientRecord
	@customerId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS ( SELECT 1 FROM CUSTOMER WHERE id = @customerId)
			BEGIN
				RAISERROR(N'Lỗi: mã khách hàng không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			-- IF NOT EXISTS ( SELECT 1 FROM PATIENT_RECORD WHERE id = @customerId)
			-- BEGIN
			-- 	RAISERROR(N'Lỗi: không có hồ sơ bệnh án nào', 16, 1)
			-- 	ROLLBACK TRAN
			-- END
			SELECT * FROM PATIENT_RECORD WHERE customerId = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- create medicine
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_createMedicine')
BEGIN
	DROP PROCEDURE sp_createMedicine
END
GO
CREATE PROC sp_createMedicine
	@name NVARCHAR(30),
	@unit NVARCHAR(10),
	@description NVARCHAR(100),
	@expirationDate DATETIME,
	@indication NVARCHAR(50),
	@quantity INT,
	@price FLOAT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF EXISTS (SELECT 1 FROM MEDICINE WHERE name = @name)
		BEGIN
			RAISERROR(N'Lỗi: Tên thuốc đã tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		INSERT INTO MEDICINE VALUES(@name, @unit, @description, @expirationDate, @indication, @quantity, @price)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- update medicine
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_updateMedicine')
BEGIN
	DROP PROCEDURE sp_updateMedicine
END
GO
CREATE PROC sp_updateMedicine
	@medicineId INT,
	@name NVARCHAR(30),
	@unit NVARCHAR(10),
	@description NVARCHAR(100),
	@expirationDate DATETIME,
	@indication NVARCHAR(50),
	@quantity INT,
	@price FLOAT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM MEDICINE WHERE id = @medicineId)
		BEGIN
			RAISERROR(N'Lỗi: Mã Thuốc không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS (SELECT 1 FROM MEDICINE WHERE name = @name AND id != @medicineId)
		BEGIN
			RAISERROR(N'Lỗi: Tên thuốc đã tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		UPDATE MEDICINE 
		SET unit = @unit, name = @name, description = @description, expirationDate = @expirationDate, indication = @indication, quantity = @quantity, price = @price
		WHERE id  = @medicineId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- delete medicine
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_deleteMedicine')
BEGIN
	DROP PROCEDURE sp_deleteMedicine
END
GO
CREATE PROC sp_deleteMedicine
	@medicineId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM MEDICINE WHERE id = @medicineId)
		BEGIN
			RAISERROR(N'Lỗi: Mã Thuốc không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		UPDATE PRESCRIBE_MEDICINE SET medicineId = NULL WHERE medicineId = @medicineId 
		DELETE FROM MEDICINE WHERE id = @medicineId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view one medicine dirty read, phantom read (thêm xóa sửa medicine), 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneMedicine')
BEGIN
	DROP PROCEDURE sp_viewOneMedicine
END
GO
CREATE PROC sp_viewOneMedicine
	@medicineId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM MEDICINE WHERE id = @medicineId)
		BEGIN
			RAISERROR(N'Lỗi: Mã Thuốc không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM MEDICINE WHERE id = @medicineId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view all medicine dirty read 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllMedicine')
BEGIN
	DROP PROCEDURE sp_viewAllMedicine
END
GO
CREATE PROC sp_viewAllMedicine
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM MEDICINE
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- add Prescribe Medicine, dirty read, lost update, 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_addPrescribeMedicine')
BEGIN
	DROP PROCEDURE sp_addPrescribeMedicine
END
GO
CREATE PROC sp_addPrescribeMedicine
    @RECORD_ID INT,
    @MEDICINE_ID INT,
    @QUANTITY INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			DECLARE @PRICE FLOAT;
			SELECT @PRICE = price FROM MEDICINE M WHERE M.ID = @MEDICINE_ID;
	
			DECLARE @MEDICINE_NAME NVARCHAR(30);
			SELECT @MEDICINE_NAME = name FROM MEDICINE M WHERE M.id = @MEDICINE_ID
	
			DECLARE @MEDICINE_STOCK INT;
			SELECT @MEDICINE_STOCK = quantity FROM MEDICINE M WHERE M.ID = @MEDICINE_ID;
			-- CHECK PATIENT RECORD ID
			IF NOT EXISTS (
				SELECT 1
				FROM PATIENT_RECORD PR
				WHERE PR.ID = @RECORD_ID
			)
			BEGIN
				RAISERROR(N'LỖI: KHÔNG TỒN TẠI RECORD ID', 16, 1);
				ROLLBACK TRAN;
			END

			-- CHECK MEDICINE ID
			IF NOT EXISTS (
				SELECT 1
				FROM MEDICINE M
				WHERE M.ID = @MEDICINE_ID
			)
			BEGIN
				RAISERROR(N'LỖI: KHÔNG TỒN TẠI MEDICINE ID', 16, 1);
				ROLLBACK TRAN;		
			END

			INSERT INTO PRESCRIBE_MEDICINE (recordId, medicineId, medicineName, price, quantity) VALUES (@RECORD_ID, @MEDICINE_ID, @MEDICINE_NAME, @PRICE, @QUANTITY);
		
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW	
	END CATCH
END

--delete Prescribe Medicine 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_deletePrescribeMedicine')
BEGIN
	DROP PROCEDURE sp_deletePrescribeMedicine
END
GO
CREATE PROC sp_deletePrescribeMedicine
	@medicineId INT,
	@recordId INT,
	@medicineName NVARCHAR(30)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF EXISTS (SELECT 1 FROM PRESCRIBE_MEDICINE WHERE medicineId = @medicineId AND recordId = @recordId)
		BEGIN
		 	DELETE FROM PRESCRIBE_MEDICINE WHERE medicineId = @medicineId AND recordId = @recordId
		END
		ELSE IF EXISTS (SELECT 1 FROM PRESCRIBE_MEDICINE WHERE medicineName = @medicineName AND recordId = @recordId)
		BEGIN
			DELETE FROM PRESCRIBE_MEDICINE WHERE medicineName = @medicineName AND recordId = @recordId
		END
		ELSE
		BEGIN
			RAISERROR(N'Đơn thuốc không tồn tại' ,16, 1)
			ROLLBACK TRAN
		END
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW	
	END CATCH
END

-- update prescribe medicine
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_updatePrescribeMedicine')
BEGIN
	DROP PROCEDURE sp_updatePrescribeMedicine
END
GO
CREATE PROC sp_updatePrescribeMedicine
    @RECORD_ID INT,
    @MEDICINE_ID INT,
    @QUANTITY INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		--CHECK PRESCRIBE MEDICINE
			IF NOT EXISTS (
				SELECT 1
				FROM PRESCRIBE_MEDICINE pm 
				WHERE pm.medicineId = @MEDICINE_ID AND pm.recordId = @RECORD_ID
			)
			BEGIN
				PRINT N'LỖI: KHÔNG TỒN TẠI PRESCRIBE MEDICINE';
				ROLLBACK TRAN;		
			END
			DECLARE @OLD_QUANTITY INT = (SELECT quantity FROM PRESCRIBE_MEDICINE pm WHERE pm.medicineId = @MEDICINE_ID AND pm.recordId = @RECORD_ID);
			UPDATE MEDICINE SET quantity = quantity + @OLD_QUANTITY WHERE id = @MEDICINE_ID
			UPDATE PRESCRIBE_MEDICINE SET quantity = @QUANTITY WHERE medicineId = @MEDICINE_ID
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW	
	END CATCH
END




-- view one record's prescribe Medicine 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewPrescribeMedicine')
BEGIN
	DROP PROCEDURE sp_viewPrescribeMedicine
END
GO
CREATE PROC sp_viewPrescribeMedicine
	@recordId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM PATIENT_RECORD WHERE id = @recordId)
		BEGIN
			RAISERROR(N'Lỗi: Mã hồ sơ bệnh án không tồn tại' ,16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS (SELECT 1 FROM PRESCRIBE_MEDICINE WHERE recordId = @recordId)
		BEGIN
			RAISERROR(N'Lỗi: Không có đơn thuốc nào' ,16, 1)
			ROLLBACK TRAN
		END
		SELECT P_M.medicineName , P_M.price, P_M.quantity FROM PRESCRIBE_MEDICINE P_M WHERE recordId = recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW	
	END CATCH
END


-- add service
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_addService')
BEGIN
	DROP PROCEDURE sp_addService
END
GO
CREATE PROC sp_addService
	@name NVARCHAR(50),
	@price FLOAT,
	@description NVARCHAR(100)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF EXISTS (SELECT 1 FROM SERVICE WHERE name = @name)
			BEGIN
				RAISERROR(N'Lỗi: tên dịch vụ đã tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			INSERT INTO SERVICE VALUES(@name, @price, @description)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- update service
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_updateService')
BEGIN
	DROP PROCEDURE sp_updateService
END
GO
CREATE PROC sp_updateService
	@serviceId INT,
	@name NVARCHAR(50),
	@price FLOAT,
	@description NVARCHAR(100)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM SERVICE WHERE id = @serviceId)
			BEGIN
				RAISERROR(N'Lỗi: mã dịch vụ không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			IF EXISTS (SELECT 1 FROM SERVICE WHERE id != @serviceId AND name = @name)
			BEGIN
				RAISERROR(N'Lỗi: tên dịch vụ đã tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			UPDATE SERVICE 
			SET name = @name, price = @price, description = @description
			WHERE id = @serviceId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view one service dirty read
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneService')
BEGIN
	DROP PROCEDURE sp_viewOneService
END
GO
CREATE PROC sp_viewOneService
	@serviceId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM SERVICE WHERE id = @serviceId)
			BEGIN
				RAISERROR(N'Lỗi: mã dịch vụ không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			SELECT * FROM SERVICE WHERE id = @serviceId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view all service dirty read
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllService')
BEGIN
	DROP PROCEDURE sp_viewAllService
END
GO
CREATE PROC sp_viewAllService
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM SERVICE
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- add service use
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_addServiceUse')
BEGIN
	DROP PROCEDURE sp_addServiceUse
END
GO
CREATE PROC sp_addServiceUse
	@serviceId INT,
	@recordId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM SERVICE WHERE id = @serviceId)
			BEGIN
				RAISERROR(N'Lỗi: mã dịch vụ không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			IF NOT EXISTS (SELECT 1 FROM PATIENT_RECORD WHERE id = @recordId)
			BEGIN
				RAISERROR(N'Lỗi: mã hồ sơ bệnh án không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			IF EXISTS (SELECT 1 FROM SERVICE_USE WHERE recordId = @recordId AND serviceId = @serviceId)
			BEGIN
				RAISERROR(N'Lỗi: dịch vụ sử dụng đã tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			INSERT INTO SERVICE_USE (recordId, serviceId) VALUES(@recordId, @serviceId)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- delete service use
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_deleteServiceUse')
BEGIN
	DROP PROCEDURE sp_deleteServiceUse
END
GO
CREATE PROC sp_deleteServiceUse
	@serviceId INT,
	@recordId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM SERVICE WHERE id = @serviceId)
			BEGIN
				RAISERROR(N'Lỗi: mã dịch vụ không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			IF NOT EXISTS (SELECT 1 FROM PATIENT_RECORD WHERE id = @recordId)
			BEGIN
				RAISERROR(N'Lỗi: mã hồ sơ bệnh án không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			IF NOT EXISTS (SELECT 1 FROM SERVICE_USE WHERE recordId = @recordId AND serviceId = @serviceId)
			BEGIN
				RAISERROR(N'Lỗi: dịch vụ sử dụng không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			DELETE FROM SERVICE_USE WHERE serviceId = @serviceId AND recordId = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view service use
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewServiceUse')
BEGIN
	DROP PROCEDURE sp_viewServiceUse
END
GO
CREATE PROC sp_viewServiceUse
	@recordId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM PATIENT_RECORD WHERE id = @recordId)
			BEGIN
				RAISERROR(N'Lỗi: mã hồ sơ bệnh án không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			IF NOT EXISTS (SELECT 1 FROM SERVICE_USE WHERE recordId = @recordId)
			BEGIN
				RAISERROR(N'Lỗi: không có dịch vụ nào được sử dụng', 16, 1)
				ROLLBACK TRAN
			END
			SELECT S_U.price AS price, S.name as serviceName
			FROM SERVICE_USE S_U
			JOIN SERVICE S ON S_U.serviceId = S.id 
			WHERE recordId = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- add invoice
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_addInvoice')
BEGIN
	DROP PROCEDURE sp_addInvoice
END
GO
CREATE PROC sp_addInvoice
	@recordId INT, 
	@date_time DATETIME,
	@status NVARCHAR(30),
	@total FLOAT,
	@staffId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			--CHECK RECORD ID
			IF NOT EXISTS (
				SELECT 1
				FROM PATIENT_RECORD PR WHERE PR.id = @recordId	
			)
			BEGIN
				RAISERROR(N'LỖI: KHÔNG TỒN TẠI HỒ SƠ BỆNH NHÂN', 16, 1)
				ROLLBACK TRAN
			END
			IF EXISTS (
				SELECT 1
				FROM INVOICE I WHERE I.recordId = @recordId	
			)
			BEGIN
				RAISERROR(N'LỖI: HỒ SƠ BỆNH NHÂN ĐÃ CÓ HÓA ĐƠN', 16, 1)
				ROLLBACK TRAN
			END
			INSERT INTO INVOICE(recordId, date_time, status, total, staffId) VALUES (@recordId, @date_time, @status, @total, @staffId)
			SELECT * FROM INVOICE WHERE recordId = @recordId
			COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- update invoice status
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_updateInvoiceStatus')
BEGIN
	DROP PROCEDURE sp_updateInvoiceStatus
END
GO
CREATE PROC sp_updateInvoiceStatus
	@invoiceId INT,
	@status NVARCHAR(30)
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM INVOICE WHERE id = @invoiceId)
			BEGIN
				RAISERROR(N'Lỗi: mã hóa đơn không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			UPDATE INVOICE SET status = @status WHERE id = @invoiceId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view invoice by id * dirty read, phantom
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewInvoiceById')
BEGIN
	DROP PROCEDURE sp_viewInvoiceById
END
GO
CREATE PROC sp_viewInvoiceById
	@invoiceId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM INVOICE WHERE id = @invoiceId)
			BEGIN
				RAISERROR(N'Lỗi: mã hóa đơn không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			SELECT * FROM INVOICE WHERE id = @invoiceId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view invoice by record id
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewInvoiceByRecordId')
BEGIN
	DROP PROCEDURE sp_viewInvoiceByRecordId
END
GO
CREATE PROC sp_viewInvoiceByRecordId
	@recordId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM PATIENT_RECORD WHERE id = @recordId)
			BEGIN
				RAISERROR(N'Lỗi: mã hồ sơ bệnh nhân không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			SELECT I.id, I.status, I.total, I.date_time FROM INVOICE I WHERE recordId = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view all invoice 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllInvoice')
BEGIN
	DROP PROCEDURE sp_viewAllInvoice
END
GO
CREATE PROC sp_viewAllInvoice
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM INVOICE
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view all invoice 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewStaffInvoice')
BEGIN
	DROP PROCEDURE sp_viewStaffInvoice
END
GO
CREATE PROC sp_viewStaffInvoice
	@staffId INT
AS 
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM STAFF WHERE id = @staffId)
		BEGIN
			RAISERROR(N'Lỗi: mã nhân viên không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM INVOICE WHERE staffId = @staffId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- add dentist schedule 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_addDentistSchedule')
BEGIN
	DROP PROCEDURE sp_addDentistSchedule
END
GO
CREATE PROC sp_addDentistSchedule
	@startTime DATETIME,
	@dentistId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Mã nha sĩ không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS(SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId AND startTime = @startTime)
		BEGIN
			RAISERROR(N'Lịch rảnh đã tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		DECLARE @endTime DATETIME
		SET @endTime = DATEADD(HOUR, 1, @startTime)
		INSERT INTO SCHEDULE VALUES(@dentistId, @startTime, @endTime, 0)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- delete schedule - lost update
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_deleteDentistSchedule')
BEGIN
	DROP PROCEDURE sp_deleteDentistSchedule
END
GO
CREATE PROC sp_deleteDentistSchedule
	@dentistId INT,
	@startTime DATETIME
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Lỗi: Mã nha sĩ không tồn tại', 16, 1)
		END
		IF NOT EXISTS(SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId AND startTime = @startTime)
		BEGIN
			RAISERROR(N'Lỗi: Lịch rảnh không tồn tại', 16, 1)
		END
		IF EXISTS(SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId AND startTime = @startTime AND isBooked = 1)
		BEGIN
			RAISERROR(N'Lỗi: Không thể xóa lịch đã được đặt', 16, 1)
		END
		DELETE FROM SCHEDULE WHERE dentistId = @dentistId AND startTime = @startTime AND isBooked = 0
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

-- view dentist schedule
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewDentistSchedule')
BEGIN
	DROP PROCEDURE sp_viewDentistSchedule
END
GO
CREATE PROC sp_viewDentistSchedule
	@dentistId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Lỗi: Mã nha sĩ không tồn tại', 16, 1)
		END
		SELECT * FROM SCHEDULE WHERE dentistId = @dentistId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAvailableDentistSchedule')
BEGIN
	DROP PROCEDURE sp_viewAvailableDentistSchedule
END
GO
CREATE PROC sp_viewAvailableDentistSchedule
	@dentistId INT
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Lỗi: Mã nha sĩ không tồn tại', 16, 1)
		END
		SELECT * FROM SCHEDULE WHERE dentistId = @dentistId AND isBooked = 0 AND datediff(second, startTime, GETDATE()) < 0
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

	
--view all schedule
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllSchedule')
BEGIN
	DROP PROCEDURE sp_viewAllSchedule
END
GO
CREATE PROC sp_viewAllSchedule
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		SELECT * FROM SCHEDULE
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END


-- view all schdedule available 
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllScheduleAvailable')
BEGIN
	DROP PROCEDURE sp_viewAllScheduleAvailable
END
GO
CREATE PROC sp_viewAllScheduleAvailable
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		SELECT * FROM SCHEDULE WHERE isBooked = 0 AND datediff(second, startTime, GETDATE()) < 0
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewScheduleAvailableOnDay')
BEGIN
	DROP PROCEDURE sp_viewScheduleAvailableOnDay
END
GO
CREATE PROC sp_viewScheduleAvailableOnDay
	@date DATETIME
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		SELECT SC.*, DT.name, DT.gender FROM SCHEDULE SC JOIN DENTIST DT ON SC.dentistId = DT.id WHERE SC.isBooked = 0 AND datediff(DAY, SC.startTime, @date) = 0
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_getDentistHaveSchedule')
BEGIN
	DROP PROCEDURE sp_getDentistHaveSchedule
END
GO
CREATE PROC sp_getDentistHaveSchedule
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
	BEGIN TRY
		BEGIN TRAN
		SELECT DISTINCT DT.id, DT.name, DT.gender FROM SCHEDULE SC JOIN DENTIST DT ON SC.dentistId = DT.id WHERE SC.isBooked = 0 AND datediff(second, SC.startTime, GETDATE()) < 0
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

SELECT * FROM SCHEDULE

EXEC sp_getDentistHaveSchedule

EXEC sp_viewScheduleAvailableOnDay '2023-12-28'

EXEC sp_signUp '01234567892', '123123123123', 'Customer2', 'Nam', '2008-11-11', N'Hà Nội'
-- EXEC sp_customerLoginWithoutHash '01234567891', '123123123123'
-- EXEC sp_viewOneCustomer 1
-- EXEC sp_viewAllCustomer
-- EXEC sp_updateCustomerProfile 1, 'Customer1', '01234567891', N'Nữ', 'TP HCM', '2008-11-11'
-- EXEC sp_makeAppointment '0327116254', 'Customer4b', 'Nam', '2008-11-11', N'Hà Nội', 2, NULL, '2024-05-15 09:00:00', '2024-05-15 010:00:00'
-- EXEC sp_addDentistSchedule '2023-11-15 07:00:00.000','2023-11-15 08:00:00.000',7
-- EXEC sp_addPrescribeMedicine 1, 2, 100

GO
USE QLPhongKham
GO
CREATE OR ALTER PROC sp_createDatabaseUser
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
  BEGIN TRY
    CREATE LOGIN guest WITH PASSWORD = 'guest'
    CREATE LOGIN customer WITH PASSWORD = 'customer'
    CREATE LOGIN staff WITH PASSWORD = 'staff'
    CREATE LOGIN dentist WITH PASSWORD = 'dentist'
    CREATE LOGIN admin WITH PASSWORD = 'admin'

    CREATE USER guestUser FOR LOGIN guest
    CREATE USER customerUser FOR LOGIN customer
    CREATE USER staffUser FOR LOGIN staff
    CREATE USER dentistUser FOR LOGIN dentist
    CREATE USER adminUser FOR LOGIN admin

    CREATE ROLE guestRole
    CREATE ROLE customerRole
    CREATE ROLE staffRole
    CREATE ROLE dentistRole
    CREATE ROLE adminRole

    ALTER ROLE guestRole ADD MEMBER guestUser
    ALTER ROLE customerRole ADD MEMBER customerUser
    ALTER ROLE dentistRole ADD MEMBER dentistUser
    ALTER ROLE staffRole ADD MEMBER staffUser
    ALTER ROLE adminRole ADD MEMBER adminUser

    GRANT EXEC ON dbo.sp_signUp TO guestRole
    GRANT EXEC ON dbo.sp_login TO guestRole
    GRANT EXEC ON dbo.sp_login TO staffRole
    GRANT EXEC ON dbo.sp_login TO dentistRole
    GRANT EXEC ON dbo.sp_login TO adminRole

    GRANT EXEC ON dbo.sp_viewOneCustomer TO customerRole
    GRANT EXEC ON dbo.sp_viewOneCustomer TO dentistRole
    GRANT EXEC ON dbo.sp_viewOneCustomer TO adminRole
    
    GRANT EXEC ON dbo.sp_viewAllCustomer TO adminRole

    GRANT EXEC ON dbo.sp_updateCustomerProfile TO customerRole
    GRANT EXEC ON dbo.sp_updateCustomerProfile TO adminRole

    GRANT EXEC ON dbo.sp_blockUser TO adminRole

    GRANT EXEC ON dbo.sp_changeCustomerPassword TO customerRole
    GRANT EXEC ON dbo.sp_changeCustomerPassword TO adminRole

    GRANT EXEC ON dbo.sp_createDentist TO adminRole

    GRANT EXEC ON dbo.sp_viewOneDentist TO guestRole
    GRANT EXEC ON dbo.sp_viewOneDentist TO customerRole
    GRANT EXEC ON dbo.sp_viewOneDentist TO staffRole
    GRANT EXEC ON dbo.sp_viewOneDentist TO dentistRole
    GRANT EXEC ON dbo.sp_viewOneDentist TO adminRole

    GRANT EXEC ON dbo.sp_viewAllDentist TO guestRole
    GRANT EXEC ON dbo.sp_viewAllDentist TO customerRole
    GRANT EXEC ON dbo.sp_viewAllDentist TO staffRole
    GRANT EXEC ON dbo.sp_viewAllDentist TO dentistRole
    GRANT EXEC ON dbo.sp_viewAllDentist TO adminRole

    GRANT EXEC ON dbo.sp_updateDentistProfile TO dentistRole
    GRANT EXEC ON dbo.sp_updateDentistProfile TO adminRole

    GRANT EXEC ON dbo.sp_changeDentistPassword TO dentistRole
    GRANT EXEC ON dbo.sp_changeDentistPassword TO adminRole

    GRANT EXEC ON dbo.sp_viewAllAppointment TO customerRole
    GRANT EXEC ON dbo.sp_viewAllAppointment TO adminRole

    GRANT EXEC ON dbo.sp_createStaff TO adminRole

    GRANT EXEC ON dbo.sp_viewOneStaff TO staffRole
    GRANT EXEC ON dbo.sp_viewOneStaff TO adminRole

    GRANT EXEC ON dbo.sp_viewAllStaff TO adminRole

    GRANT EXEC ON dbo.sp_makeAppointment TO guestRole
    GRANT EXEC ON dbo.sp_makeAppointment TO customerRole
    GRANT EXEC ON dbo.sp_makeAppointment TO staffRole

    GRANT EXEC ON dbo.sp_cancelAppointment TO guestRole
    GRANT EXEC ON dbo.sp_cancelAppointment TO customerRole
    GRANT EXEC ON dbo.sp_cancelAppointment TO staffRole

    GRANT EXEC ON dbo.sp_deleteAppointment TO adminRole

    GRANT EXEC ON dbo.sp_updateAppointmentStatus TO staffRole
    GRANT EXEC ON dbo.sp_updateAppointmentStatus TO dentistRole

    GRANT EXEC ON dbo.sp_viewOneAppointment TO guestRole
    GRANT EXEC ON dbo.sp_viewOneAppointment TO customerRole
    GRANT EXEC ON dbo.sp_viewOneAppointment TO staffRole
    GRANT EXEC ON dbo.sp_viewOneAppointment TO dentistRole
    GRANT EXEC ON dbo.sp_viewOneAppointment TO adminRole

    GRANT EXEC ON dbo.sp_viewAllAppointment TO adminRole

    GRANT EXEC ON dbo.sp_viewCustomerAppointment TO customerRole
    GRANT EXEC ON dbo.sp_viewCustomerAppointment TO adminRole

    GRANT EXEC ON dbo.sp_viewDentistAppointment TO dentistRole 
    GRANT EXEC ON dbo.sp_viewDentistAppointment TO adminRole 

    GRANT EXEC ON dbo.sp_createPatientRecord TO dentistRole 

    GRANT EXEC ON dbo.sp_updatePatientRecord TO dentistRole 
    GRANT EXEC ON dbo.sp_updatePatientRecord TO adminRole 

    GRANT EXEC ON dbo.sp_deletePatientRecord TO dentistRole 
    GRANT EXEC ON dbo.sp_deletePatientRecord TO adminRole 

    GRANT EXEC ON dbo.sp_viewOnePatientRecord TO customerRole 
    GRANT EXEC ON dbo.sp_viewOnePatientRecord TO staffRole 
    GRANT EXEC ON dbo.sp_viewOnePatientRecord TO dentistRole 
    GRANT EXEC ON dbo.sp_viewOnePatientRecord TO adminRole 

    GRANT EXEC ON dbo.sp_viewAllPatientRecord TO adminRole 

    GRANT EXEC ON dbo.sp_viewCustomerPatientRecord TO customerRole
    GRANT EXEC ON dbo.sp_viewCustomerPatientRecord TO dentistRole
    GRANT EXEC ON dbo.sp_viewCustomerPatientRecord TO adminRole

    GRANT EXEC ON dbo.sp_createMedicine TO adminRole 

    GRANT EXEC ON dbo.sp_updateMedicine TO adminRole 

    GRANT EXEC ON dbo.sp_deleteMedicine TO adminRole 

    GRANT EXEC ON dbo.sp_viewOneMedicine TO dentistRole
    GRANT EXEC ON dbo.sp_viewOneMedicine TO adminRole

    GRANT EXEC ON dbo.sp_viewAllMedicine TO dentistRole
    GRANT EXEC ON dbo.sp_viewAllMedicine TO adminRole

    GRANT EXEC ON dbo.sp_addPrescribeMedicine TO dentistRole

    GRANT EXEC ON dbo.sp_updatePrescribeMedicine TO dentistRole

    GRANT EXEC ON dbo.sp_deletePrescribeMedicine TO dentistRole

    GRANT EXEC ON dbo.sp_viewPrescribeMedicine TO customerRole
    GRANT EXEC ON dbo.sp_viewPrescribeMedicine TO staffRole
    GRANT EXEC ON dbo.sp_viewPrescribeMedicine TO dentistRole
    GRANT EXEC ON dbo.sp_viewPrescribeMedicine TO adminRole

    GRANT EXEC ON dbo.sp_addService TO adminRole
    GRANT EXEC ON dbo.sp_updateService TO adminRole

    GRANT EXEC ON dbo.sp_viewOneService TO guestRole
    GRANT EXEC ON dbo.sp_viewOneService TO customerRole
    GRANT EXEC ON dbo.sp_viewOneService TO dentistRole
    GRANT EXEC ON dbo.sp_viewOneService TO adminRole

    GRANT EXEC ON dbo.sp_viewAllService TO guestRole
    GRANT EXEC ON dbo.sp_viewAllService TO customerRole
    GRANT EXEC ON dbo.sp_viewAllService TO dentistRole
    GRANT EXEC ON dbo.sp_viewAllService TO adminRole

    GRANT EXEC ON dbo.sp_addServiceUse TO dentistRole

    GRANT EXEC ON dbo.sp_deleteServiceUse TO dentistRole

    GRANT EXEC ON dbo.sp_viewServiceUse TO customerRole
    GRANT EXEC ON dbo.sp_viewServiceUse TO staffRole
    GRANT EXEC ON dbo.sp_viewServiceUse TO dentistRole
    GRANT EXEC ON dbo.sp_viewServiceUse TO adminRole

    GRANT EXEC ON dbo.sp_addInvoice TO staffRole
    GRANT EXEC ON dbo.sp_addInvoice TO adminRole

    GRANT EXEC ON dbo.sp_updateInvoiceStatus TO staffRole
    GRANT EXEC ON dbo.sp_updateInvoiceStatus TO adminRole

    GRANT EXEC ON dbo.sp_viewInvoiceById TO customerRole
    GRANT EXEC ON dbo.sp_viewInvoiceById TO staffRole
    GRANT EXEC ON dbo.sp_viewInvoiceById TO adminRole
    
    GRANT EXEC ON dbo.sp_viewInvoiceByRecordId TO customerRole
    GRANT EXEC ON dbo.sp_viewInvoiceByRecordId TO staffRole
    GRANT EXEC ON dbo.sp_viewInvoiceByRecordId TO adminRole

    GRANT EXEC ON dbo.sp_viewStaffInvoice TO staffRole
    GRANT EXEC ON dbo.sp_viewStaffInvoice TO adminRole

    GRANT EXEC ON dbo.sp_addDentistSchedule TO dentistRole
    GRANT EXEC ON dbo.sp_addDentistSchedule TO adminRole
    
    GRANT EXEC ON dbo.sp_deleteDentistSchedule TO dentistRole
    GRANT EXEC ON dbo.sp_deleteDentistSchedule TO adminRole
    
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO guestRole
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO customerRole
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO staffRole
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO dentistRole
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO adminRole
    
    GRANT EXEC ON dbo.sp_viewAllSchedule TO dentistRole
    GRANT EXEC ON dbo.sp_viewAllSchedule TO adminRole
    
    GRANT EXEC ON dbo.sp_viewAllScheduleAvailable TO guestRole
    GRANT EXEC ON dbo.sp_viewAllScheduleAvailable TO customerRole
    GRANT EXEC ON dbo.sp_viewAllScheduleAvailable TO staffRole

	GRANT EXEC ON dbo.sp_viewScheduleAvailableOnDay TO guestRole
	GRANT EXEC ON dbo.sp_viewScheduleAvailableOnDay TO customerRole
	GRANT EXEC ON dbo.sp_viewScheduleAvailableOnDay TO staffRole

	GRANT EXEC ON dbo.sp_getDentistHaveSchedule TO guestRole
	GRANT EXEC ON dbo.sp_getDentistHaveSchedule TO customerRole
	GRANT EXEC ON dbo.sp_getDentistHaveSchedule TO staffRole

	GRANT SELECT ON CUSTOMER TO guestRole
	GRANT SELECT ON CUSTOMER TO customerRole
    GRANT SELECT ON STAFF TO staffRole
    GRANT SELECT ON DENTIST TO dentistRole
    GRANT SELECT ON ADMIN TO adminRole  
	GRANT EXEC ON dbo.sp_viewAllDentist TO guestRole
	GRANT EXEC ON dbo.sp_viewAllSchedule TO guestRole
	GRANT EXEC ON dbo.sp_viewAllMedicine TO guestRole
	GRANT EXEC ON dbo.sp_updateMedicine TO guestRole
	GRANT EXEC ON dbo.sp_createMedicine TO guestRole
	GRANT EXEC ON dbo.sp_deleteMedicine TO guestRole

	GRANT EXEC ON dbo.sp_viewAllCustomer TO guestRole
	GRANT EXEC ON dbo.sp_viewAllDentist TO guestRole
	GRANT EXEC ON dbo.sp_viewAllStaff TO guestRole

	GRANT EXEC ON dbo.sp_viewInvoiceByRecordId TO guestRole
	GRANT EXEC ON dbo.sp_updateInvoiceStatus TO guestRole
	GRANT EXEC ON dbo.sp_makeAppointment to guestRole
	GRANT EXEC ON dbo.sp_updateService to guestRole

	GRANT EXEC ON dbo.sp_createPatientRecord TO guestRole
	GRANT EXEC ON dbo.sp_createDentist TO guestRole
	GRANT EXEC ON dbo.sp_createStaff TO guestRole
	GRANT EXEC ON dbo.sp_blockUser1 to guestRole
	
	GRANT EXEC ON dbo.sp_viewDentistAppointment to guestRole
	GRANT EXEC ON dbo.sp_viewAllService to guestRole

  END TRY
  BEGIN CATCH
    ;THROW
  END CATCH
END

EXEC sp_createDatabaseUser

GO
USE QLPhongKham
GO
-- Insert data into the ADMIN table
INSERT INTO ADMIN (name, password, phoneNumber)
VALUES ('AdminUser', 'AdminPassword123', '123456789');

-- Insert data into the CUSTOMER table
INSERT INTO CUSTOMER (name, password, phoneNumber, role, gender, address, birthday, isBlocked)
VALUES ('Customer1', 'CustomerPassword123', '987654321', 'Customer', N'Nam', '123 Main St', '1990-05-15', 0);

-- Insert data into the DENTIST table
INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist1', 'DentistPassword123', '567890123', N'Nữ', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist2', 'DentistPassword123', '567890001', N'Nữ', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist3', 'DentistPassword123', '567890002', N'Nữ', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist4', 'DentistPassword123', '567890003', N'Nữ', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist5', 'DentistPassword123', '567890004', N'Nam', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist6', 'DentistPassword123', '567890005', N'Nam', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist7', 'DentistPassword123', '567890006', N'Nam', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist8', 'DentistPassword123', '567890007', N'Nam', '1985-08-20', 'Experienced dentist', 0);

-- Insert data into the STAFF table
INSERT INTO STAFF (name, password, phoneNumber, gender, isBlocked)
VALUES ('Staff1', 'StaffPassword123', '789012345', N'Nam', 0);

-- Insert data into the MEDICINE table
INSERT INTO MEDICINE (unit, name, description, expirationDate, indication, quantity, price)
VALUES (N'Viên', 'Medicine1', 'Painkiller', '2024-12-31 10:30:00', 'Pain relief', 100, 10.99);

-- Insert data into the MEDICINE table
INSERT INTO MEDICINE (unit, name, description, expirationDate, indication, quantity, price)
VALUES (N'Viên', 'Medicine2', 'Painkiller', '2024-12-11 10:30:00', 'Pain relief', 100, 10.99);

-- Insert data into the MEDICINE table
INSERT INTO MEDICINE (unit, name, description, expirationDate, indication, quantity, price)
VALUES (N'Viên', 'Medicine3', 'Painkiller', '2023-12-11 10:30:00', 'Pain relief', 100, 10.99);

-- Insert data into the APPOINTMENT table to book an appointment
INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status)
VALUES (1, 22, '2023-12-28 10:00:00', '2023-12-28 11:00:00', N'Đang tạo hồ sơ bệnh án');

INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status)
VALUES (1, 1, '2023-11-10 09:00:00', '2023-11-10 10:00:00', N'Đang tạo hồ sơ bệnh án');
-- Insert data into the SERVICE table to define available services
INSERT INTO SERVICE (name, price, description)
VALUES (N'Service1', 50.00, N'Basic dental checkup');

-- Insert information about another service
INSERT INTO SERVICE (name, price, description)
VALUES (N'Service2', 75.00, N'Dental cleaning and scaling');

-- Insert data into the PATIENT_RECORD table to create a patient record
INSERT INTO PATIENT_RECORD (customerId, dentistId, symptom, advice, diagnostic, date_time)
VALUES (1, 1, N'Toothache', N'Rest and use painkiller', N'Cavity detected', '2023-11-10 10:30:00');

-- Insert another prescription for a different patient record
INSERT INTO PRESCRIBE_MEDICINE (recordId, medicineId, medicineName, price, quantity)
VALUES (1, 1, 'Hello', 10.99, 20);

INSERT INTO PRESCRIBE_MEDICINE (recordId, medicineId, medicineName, price, quantity)
VALUES (2, 1, 'Hello', 10.99, 20);

-- Insert another prescription for a different patient record
INSERT INTO PRESCRIBE_MEDICINE (recordId, medicineId, medicineName, price, quantity)
VALUES (1, 2, 'Hello2', 10.99, 20);

-- Insert data into the INVOICE table to create an invoice
INSERT INTO INVOICE (total, date_time, status, recordId, staffId)
VALUES (100.00, '2023-11-10 12:00:00', N'Chưa thanh toán', 1, 1);

INSERT INTO INVOICE (total, date_time, status, recordId, staffId)
VALUES (269.80, '2023-12-12 16:00:00', N'Chưa thanh toán', 2, 1);

-- Insert data into the SCHEDULE table to define the schedule for a dentist
INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (1, '2023-12-28 08:00:00', '2023-12-28 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (2, '2023-12-28 08:00:00', '2023-12-28 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (3, '2023-12-28 08:00:00', '2023-12-28 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (4, '2023-12-28 08:00:00', '2023-12-28 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (5, '2023-12-28 08:00:00', '2023-12-28 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (1, '2023-12-28 09:00:00', '2023-12-28 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (2, '2023-12-28 09:00:00', '2023-12-28 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (3, '2023-12-28 09:00:00', '2023-12-28 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (4, '2023-12-28 09:00:00', '2023-12-28 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (5, '2023-12-28 09:00:00', '2023-12-28 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (1, '2023-12-28 07:00:00', '2023-12-28 08:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (2, '2023-12-28 07:00:00', '2023-12-28 08:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (3, '2023-12-28 07:00:00', '2023-12-28 08:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (4, '2023-12-28 07:00:00', '2023-12-28 08:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (5, '2023-12-28 07:00:00', '2023-12-28 08:00:00', 0);

----
INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (1, '2023-12-29 08:00:00', '2023-12-29 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (2, '2023-12-29 08:00:00', '2023-12-29 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (3, '2023-12-29 08:00:00', '2023-12-29 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (4, '2023-12-29 08:00:00', '2023-12-29 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (5, '2023-12-29 08:00:00', '2023-12-29 09:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (1, '2023-12-29 09:00:00', '2023-12-29 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (2, '2023-12-29 09:00:00', '2023-12-29 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (3, '2023-12-29 09:00:00', '2023-12-29 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (4, '2023-12-29 09:00:00', '2023-12-29 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (5, '2023-12-29 09:00:00', '2023-12-29 10:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (1, '2023-12-29 07:00:00', '2023-12-29 08:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (2, '2023-12-29 07:00:00', '2023-12-29 08:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (3, '2023-12-29 07:00:00', '2023-12-29 08:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (4, '2023-12-29 07:00:00', '2023-12-29 08:00:00', 0);

INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (5, '2023-12-29 07:00:00', '2023-12-29 08:00:00', 0);
