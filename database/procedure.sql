-- customer sign up
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
BEGIN
    BEGIN TRY
        BEGIN TRAN

        IF EXISTS (SELECT * FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Customer')
        BEGIN
            RAISERROR (N'Lỗi: Số điện thoại đã được đăng ký', 16, 1)
            ROLLBACK TRAN
        END
        ELSE IF EXISTS (SELECT * FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Guest')
        BEGIN
            UPDATE CUSTOMER 
            SET password = @password, name = @name, gender = @gender, birthday = @birthday, address = @address
            WHERE phoneNumber = @phone
            COMMIT TRAN
        END
        ELSE
        BEGIN
            INSERT INTO CUSTOMER 
            VALUES(@name, @password, @phone, 'Customer', @gender, @address, @birthday, 0)
            COMMIT TRAN
        END
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE()
        ROLLBACK TRAN
    END CATCH
END


-- test
DROP PROC sp_signUp

EXEC sp_signUp '0327116251', '123123123123', 'Custom1234', 'Nam', '2008-11-11', N'Hà Nội'

DELETE FROM CUSTOMER WHERE phoneNumber = '0327116251'

SELECT * FROM CUSTOMER

INSERT INTO CUSTOMER (name, password, phoneNumber, role, gender, address, birthday, isBlocked)
VALUES ('Customer2', NULL, '0327116251', 'Guest', N'Nam', '123 Main St', '1990-05-15', 0);

-- customer login without hashing
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_customerLoginWithoutHash')
BEGIN
    DROP PROCEDURE sp_signUp
END
GO

CREATE PROC sp_customerLoginWithoutHash
    @phone VARCHAR(15),
    @password VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT * FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Customer' and password = @password )
		BEGIN
			RAISERROR (N'Số điện thoại hoặc mật khẩu không đúng', 16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS (SELECT * FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Customer' and password = @password and isBlocked = 1)
		BEGIN
			RAISERROR (N'Tài khoản đã bị khóa', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Customer' and password = @password and isBlocked = 0
		 PRINT N'Đăng nhập thành công'
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

CREATE PROC sp_customerLoginWithHash
    @phone VARCHAR(15)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT * FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Customer')
		BEGIN
			RAISERROR (N'Người dùng không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Customer'
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

EXEC sp_customerLogin '0327116251', '123123123123'

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneCustomer')
BEGIN
    DROP PROCEDURE sp_viewOneCustomer
END
GO

CREATE PROC sp_viewOneCustomer
	@customerId INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM CUSTOMER WHERE id = @customerId)
		BEGIN
			RAISERROR(N'Mã khách hàng không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM CUSTOMER WHERE id = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- update customer profile
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
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF EXISTS (SELECT 1 FROM CUSTOMER WHERE id != @customerId AND phoneNumber = @phoneNumber)
		BEGIN
			RAISERROR(N'Số điện thoại đã được đăng ký',16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE id = @customerId)
		BEGIN
			RAISERROR(N'Mã khách hàng không tồn tại',16, 1)
			ROLLBACK TRAN
		END
		UPDATE CUSTOMER SET name = @name, phoneNumber = @phoneNumber, gender = @gender, birthday = @birthday, address = @address
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

--block customer 
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_blockCustomer')
BEGIN
	DROP PROCEDURE sp_blockCustomer
END
GO
CREATE PROC sp_blockCustomer
	@customerId INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE id = @customerId)
		BEGIN
			RAISERROR(N'Số điện thoại không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		DECLARE @isBlocked BIT
		SELECT @isBlocked = CASE WHEN isBlocked = 1 THEN 0 ELSE 1 END FROM CUSTOMER WHERE id = @customerId
		UPDATE CUSTOMER SET isBlocked = @isBlocked WHERE id = @customerId
		IF @isBlocked = 1
		BEGIN
		PRINT N'Khóa tài khoản thành công'
		END
		ELSE
		BEGIN
			PRINT N'Mở khóa tài khoản thành công'
		END
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- change customer password  
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_changeCustomerPassword')
BEGIN
	DROP PROCEDURE sp_changeCustomerPassword
END
GO
CREATE PROC sp_changeCustomerPassword
	@customerId INT,
	@newPassword VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE id = @customerId)
			BEGIN
				RAISERROR(N'Mã khách hàng không tồn tại', 16, 1)
				ROLLBACK TRAN				
			END
			UPDATE CUSTOMER SET password = @newPassword WHERE id = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- create dentist
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
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF EXISTS (SELECT 1 FROM DENTIST WHERE phoneNumber = @phoneNumber)
		BEGIN
			RAISERROR(N'Số điện thoại đã được đăng ký',16, 1)
			ROLLBACK TRAN
		END
		INSERT INTO DENTIST VALUES(@name, @password, @phoneNumber, @gender, @birthday, @introduction, 0)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

sp_createDentist 'Dentist6','123123123123', '0327116216', N'Nam', '2008-11-11', 'Experienced dentist'

-- dentist login
CREATE PROC sp_dentistLogin
    @phone VARCHAR(15),
    @password VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE phoneNumber = @phone and password = @password )
		BEGIN
			RAISERROR (N'Số điện thoại hoặc mật khẩu không đúng', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM DENTIST WHERE phoneNumber = @phone and password = @password
		 PRINT N'Đăng nhập thành công'
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view one dentist
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneDentist')
BEGIN
	DROP PROCEDURE sp_viewOneDentist
END
GO
CREATE PROC sp_viewOneDentist
	@dentistId INT
AS
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Mã nha sĩ không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM DENTIST WHERE id = @dentistId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- update dentist profile
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
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF EXISTS (SELECT 1 FROM DENTIST WHERE id != @dentistId AND phoneNumber = @phoneNumber)
		BEGIN
			RAISERROR(N'Số điện thoại đã được đăng ký',16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Mã nha sĩ không tồn tại',16, 1)
			ROLLBACK TRAN
		END
		UPDATE DENTIST SET name = @name, phoneNumber = @phoneNumber, gender = @gender, birthday = @birthday, introduction = @introduction
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

--change dentist password
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_changeDentistPassword')
BEGIN
	DROP PROCEDURE sp_changeDentistPassword
END
GO
CREATE PROC sp_changeDentistPassword
	@dentistId INT,
	@newPassword VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE id = @dentistId)
			BEGIN
				RAISERROR(N'Mã nha sĩ không tồn tại',16, 1)
				ROLLBACK TRAN
			END
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END


--block dentist
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_blockDentist')
BEGIN
	DROP PROCEDURE sp_blockDentist
END
GO
CREATE PROC sp_blockDentist
	@dentistId VARCHAR(15)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Mã nha sĩ không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		DECLARE @isBlocked BIT
		SELECT @isBlocked = CASE WHEN isBlocked = 1 THEN 0 ELSE 1 END FROM DENTIST WHERE id = @dentistId
		UPDATE DENTIST SET isBlocked = @isBlocked WHERE id = @dentistId
		IF @isBlocked = 1
		BEGIN
		PRINT N'Khóa tài khoản thành công'
		END
		ELSE
		BEGIN
			PRINT N'Mở khóa tài khoản thành công'
		END
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- staff login
CREATE PROC sp_staffLogin
    @phone VARCHAR(15),
    @password VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM STAFF WHERE phoneNumber = @phone and password = @password )
		BEGIN
			RAISERROR (N'Số điện thoại hoặc mật khẩu không đúng', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM STAFF WHERE phoneNumber = @phone and password = @password
		 PRINT N'Đăng nhập thành công'
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- create staff
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
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF EXISTS (SELECT 1 FROM STAFF WHERE phoneNumber = @phoneNumber)
		BEGIN
			RAISERROR(N'Số điện thoại đã được đăng ký',16, 1)
			ROLLBACK TRAN
		END
		INSERT INTO STAFF VALUES(@name, @password, @phoneNumber, @gender, 0)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view One staff
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneStaff')
BEGIN
	DROP PROCEDURE sp_viewOneStaff
END
GO
CREATE PROC sp_viewOneStaff
	@staffId INT
AS
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
		IF EXISTS (SELECT 1 FROM STAFF WHERE id = @staffId)
		BEGIN
			RAISERROR(N'Mã nhân viên không tồn tại',16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM STAFF WHERE id = @staffId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

--block staff
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_blockStaff')
BEGIN
	DROP PROCEDURE sp_blockStaff
END
GO
CREATE PROC sp_blockStaff
	@staffId VARCHAR(15)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM STAFF WHERE id = @staffId)
		BEGIN
			RAISERROR(N'Mã nhân viên không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		DECLARE @isBlocked BIT
		SELECT @isBlocked = CASE WHEN isBlocked = 1 THEN 0 ELSE 1 END FROM STAFF WHERE id = @staffId
		UPDATE STAFF SET isBlocked = @isBlocked WHERE id = @staffId
		IF @isBlocked = 1
		BEGIN
		PRINT N'Khóa tài khoản thành công'
		END
		ELSE
		BEGIN
			PRINT N'Mở khóa tài khoản thành công'
		END
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- admin login

CREATE PROC sp_adminLogin
    @phone VARCHAR(15),
    @password VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM ADMIN WHERE phoneNumber = @phone and password = @password )
		BEGIN
			RAISERROR (N'Số điện thoại hoặc mật khẩu không đúng', 16, 1)
			ROLLBACK TRAN
		END
		SELECT * FROM ADMIN WHERE phoneNumber = @phone and password = @password
		 PRINT N'Đăng nhập thành công'
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END


-- make appointment
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
	@startTime DATETIME,
	@endTime DATETIME
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF datediff(second, @startTime, GETDATE()) > 0
		BEGIN
			RAISERROR (N'Lỗi: Cuộc hẹn được đặt phải có thời gian bắt đầu sau thời gian hiện tại', 16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS (SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId and startTime = @startTime and endTime = @endTime and isBooked = 0)
		BEGIN
			RAISERROR (N'Lỗi: Lịch trình không tồn tại hoặc đã được đặt', 16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE phoneNumber = @phone)
		BEGIN
			INSERT INTO CUSTOMER VALUES(@name, NULL, @phone, 'Guest', @gender, @address, @birthday, 0)
		END
		IF EXISTS (SELECT 1 FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Guest')
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
		INSERT INTO APPOINTMENT VALUES(@dentistId, @startTime, @customerId, @endTime, N'Đang chờ', @staffId, NULL)
		UPDATE SCHEDULE SET isBooked = 1 WHERE dentistId = @dentistId and startTime = @startTime and endTime = @endTime
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- test
INSERT INTO DENTIST VALUES('Dentist1', '123123123123', '0327116251', N'Nam', '2008-11-11', NULL, 0)
INSERT INTO SCHEDULE VALUES(2, '2024-05-15 09:00:00', '2024-05-15 10:00:00', 0)
INSERT INTO CUSTOMER (name, password, phoneNumber, role, gender, address, birthday, isBlocked)
VALUES ('Customer4', NULL, '0327116254', 'Guest', N'Nam', '123 Main St', '1990-05-15', 0);


SELECT * FROM SCHEDULE
SELECT * FROM APPOINTMENT
SELECT * FROM CUSTOMER
DELETE FROM APPOINTMENT WHERE customerId = 71
UPDATE SCHEDULE SET isBooked = 0 WHERE dentistId = 2 and startTime = '2024-05-15 09:00:00'

EXEC sp_makeAppointment '0327116254', 'Customer4b', 'Nam', '2008-11-11', N'Hà Nội', 2, NULL, '2024-05-15 09:00:00', '2024-05-15 010:00:00'


-- cancel appointment
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- delete appointment
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
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
	@customerId INT,
	@status NVARCHAR(30)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM APPOINTMENT WHERE dentistId = @dentistId and startTime = @startTime and customerId = @customerId)
		BEGIN
			RAISERROR (N'Lỗi: Cuộc hẹn không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		UPDATE APPOINTMENT SET status = @status WHERE dentistId = @dentistId and startTime = @startTime and customerId = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END
-- view one appointment
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END
-- view customer's appointment
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewCustomerAppointment')
BEGIN
	DROP PROCEDURE sp_viewCustomerAppointment
END
GO
CREATE PROC sp_viewCustomerAppointment
	@customerId INT
AS
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
		SELECT * FROM APPOINTMENT WHERE customerId = @customerId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- create patient record
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_updateAppointmentStatus')
BEGIN
	DROP PROCEDURE sp_createPatientRecord
END
GO
CREATE PROC themHoSoBenhNhan
	@PHONE_NUMBER NVARCHAR(15), 
	@DENTIST_ID INT,
	@DATE_TIME DATETIME,
	@DIAGNOSTIC NVARCHAR(100),
	@SYMPTOM NVARCHAR(50),
	@ADVICE NVARCHAR(100)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			DECLARE @CUSTOMER_ID INT;
			SELECT @CUSTOMER_ID = ID FROM CUSTOMER C WHERE C.phoneNumber = @PHONE_NUMBER;
			--CHECK CUSTOMER
			IF NOT EXISTS (
				SELECT 1
				FROM CUSTOMER C WHERE C.id = @CUSTOMER_ID	
			)
			BEGIN
				PRINT N'LỖI: KHÔNG TỒN TẠI ID KHÁCH HÀNG'
				ROLLBACK TRAN
			END
			--CHECK DENTIST
			IF NOT EXISTS (
				SELECT 1
				FROM DENTIST D WHERE D.id = @DENTIST_ID	
			)
			BEGIN
				PRINT N'LỖI: KHÔNG TỒN TẠI ID BÁC SĨ'
				ROLLBACK TRAN
			END
			INSERT INTO PATIENT_RECORD(symptom, advice, diagnostic, date_time, dentistId, customerId) VALUES (@SYMPTOM, @ADVICE, @DIAGNOSTIC, @DATE_TIME, @DENTIST_ID, @CUSTOMER_ID)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN
	END CATCH
END

-- add medicine
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
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF EXISTS (SELECT 1 FROM MEDICINE WHERE name = @name)
		BEGIN
			RAISERROR(N'Lỗi: Tên thuốc đã tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		INSERT INTO MEDICINE VALUES(@unit, @name, @description, @expirationDate, @indication, @quantity, @price)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- update medicine
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
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS (SELECT 1 FROM MEDICINE WHERE id = @medicineId)
		BEGIN
			RAISERROR(N'Lỗi: Mã Thuốc '+ @medicineId + N'không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		UPDATE MEDICINE 
		SET unit = @unit, name = @name, description = @description, expirationDate = @expirationDate, indication = @indication, quantity = @quantity, price = @price
		WHERE id  = @medicineId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

SELECT * FROM SCHEDULE
SELECT * FROM APPOINTMENT
SELECT * FROM CUSTOMER
SELECT * FROM DENTIST



-- add dentist schedule 
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_addDentistSchedule')
BEGIN
	DROP PROCEDURE sp_addDentistSchedule
END
GO
CREATE PROC sp_addDentistSchedule
	@startTime DATETIME,
	@endTime DATETIME,
	@dentistId INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Mã nha sĩ không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		INSERT INTO SCHEDULE VALUES(@dentistId, @startTime, @endTime, 0)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

EXEC sp_addDentistSchedule '2023-11-15 07:00:00.000','2023-11-15 08:00:00.000',7


SELECT * FROM SCHEDULE
SELECT * FROM APPOINTMENT
SELECT * FROM CUSTOMER
SELECT * FROM DENTIST
SELECT * FROM SCHEDULE


-- update schedule
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_updateDentistSchedule')
BEGIN
	DROP PROCEDURE sp_updateDentistSchedule
END
GO
CREATE PROC sp_updateDentistSchedule
	@dentistId INT,
	@startTime1 DATETIME,
	@startTime2 DATETIME
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Mã nha sĩ không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS(SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId AND startTime = @startTime1)
		BEGIN
			RAISERROR(N'Lịch rảnh không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS(SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId AND startTime = @startTime1 AND isBooked = 1)
		BEGIN
			RAISERROR(N'Không thể chỉnh sửa lịch đã được đặt', 16, 1)
			ROLLBACK TRAN
		END
		DECLARE @endTime DATETIME
		SET @endTime = DATEADD(HOUR, 1, @startTime2)
		UPDATE SCHEDULE  SET  startTime = @startTime2, endTime = @endTime WHERE dentistId = @dentistId AND startTime = @startTime1
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- delete schedule
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_deleteDentistSchedule')
BEGIN
	DROP PROCEDURE sp_deleteDentistSchedule
END
GO
CREATE PROC sp_deleteDentistSchedule
	@dentistId INT,
	@startTime DATETIME
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Mã nha sĩ không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF NOT EXISTS(SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId AND startTime = @startTime)
		BEGIN
			RAISERROR(N'Lịch rảnh không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS(SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId AND startTime = @startTime AND isBooked = 1)
		BEGIN
			RAISERROR(N'Không thể xóa lịch đã được đặt', 16, 1)
			ROLLBACK TRAN
		END
		DELETE FROM SCHEDULE WHERE dentistId = @dentistId AND startTime = @startTime AND isBooked = 0
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view dentist schedule
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewDentistSchedule')
BEGIN
	DROP PROCEDURE sp_viewDentistSchedule
END
GO
CREATE PROC sp_viewDentistSchedule
	@dentistId INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		IF NOT EXISTS(SELECT 1 FROM DENTIST WHERE id = @dentistId)
		BEGIN
			RAISERROR(N'Mã nha sĩ không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		SELECT 1 FROM SCHEDULE WHERE dentistId = @dentistId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

--view all schedule
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllSchedule')
BEGIN
	DROP PROCEDURE sp_viewAllSchedule
END
GO
CREATE PROC sp_viewAllSchedule
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		SELECT 1 FROM SCHEDULE
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END


-- view all schdedule available
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllScheduleAvailable')
BEGIN
	DROP PROCEDURE sp_viewAllScheduleAvailable
END
GO
CREATE PROC sp_viewAllScheduleAvailable
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		SELECT 1 FROM SCHEDULE WHERE isBooked = 0
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'themHoaDon')
BEGIN
	DROP PROCEDURE themHoaDon
END
GO
CREATE PROC themHoaDon
	@RECORD_ID INT, 
	@DATE_TIME DATETIME,
	@STATUS NVARCHAR(30),
	@TOTAL FLOAT
AS
BEGIN TRAN
	BEGIN TRY
		IF NOT EXISTS (
			SELECT 1
			FROM PATIENT_RECORD PR WHERE PR.id = @RECORD_ID	
		)
		BEGIN
			PRINT N'LỖI: KHÔNG TỒN TẠI HỒ SƠ BỆNH NHÂN'
			ROLLBACK TRAN
		END

		INSERT INTO INVOICE(recordId, date_time, status, total) VALUES (@RECORD_ID, @DATE_TIME, @STATUS, @TOTAL)
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN
	END CATCH
COMMIT TRAN

EXEC themHoaDon 1, '2021-05-15 09:00:00', N'Đã thanh toán', 1000000