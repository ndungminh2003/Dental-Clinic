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
            SET password = @password, name = @name, gender = @gender, birthday = @birthday, address = @address, role = 'Customer'
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

-- customer login without hashing
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_customerLoginWithoutHash')
BEGIN
    DROP PROCEDURE sp_signUp
END
GO

--UNREPEATABLE READ
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
		IF NOT EXISTS (SELECT * FROM CUSTOMER WHERE phoneNumber = @phone and role = 'Customer' and password = @password and isBlocked = 0)
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

GO
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

-- view one customer
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneCustomer')
BEGIN
    DROP PROCEDURE sp_viewOneCustomer
END
GO

--UNREPEATABLE READ
CREATE PROC sp_viewOneCustomer --STAFF CUSTOMER ADMIN
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

-- view all customer (ADMIN STAFF)
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllCustomer')
BEGIN
    DROP PROCEDURE sp_viewAllCustomer
END
GO
CREATE PROC sp_viewAllCustomer
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM CUSTOMER
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

--UNREPATABLE READ
-- update customer profile (CUSTOMER ADMIN)
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
		UPDATE CUSTOMER SET name = @name, phoneNumber = @phoneNumber, gender = @gender, birthday = @birthday, address = @address WHERE id = @customerId
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

--UNREPATEABLE READ -->deleteCustomer
-- change customer password  (CUSTOMER, ADMIN)
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

GO
sp_createDentist 'Dentist6','123123123123', '0327116216', N'Nam', '2008-11-11', 'Experienced dentist'

-- dentist login
GO
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


-- view one dentist dirty read, unreapeatable read
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


-- view all dentist dirty read
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllDentist')
BEGIN
	DROP PROCEDURE sp_viewAllDentist
END
GO
CREATE PROC sp_viewAllDentist
AS
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
			SELECT * FROM DENTIST
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- update dentist profile unrepatable read, 
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
		UPDATE DENTIST SET name = @name, phoneNumber = @phoneNumber, gender = @gender, birthday = @birthday, introduction = @introduction WHERE id = @dentistId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END


--change dentist password unrepateable read
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
			UPDATE DENTIST SET password = @newPassword WHERE id = @dentistId
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
GO
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

-- view One staff dirty read, Unreapeateable read
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

-- view all staff dirty read
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllStaff')
BEGIN
	DROP PROCEDURE sp_viewAllStaff
END
GO
CREATE PROC sp_viewAllStaff
AS
BEGIN
	BEGIN TRY
	 	BEGIN TRAN
			SELECT * FROM STAFF
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

--block staff
GO
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
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_blockStaff')
BEGIN
	DROP PROCEDURE sp_blockStaff
END
GO
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
-- 2 user cung make dirty read, unrepeatable read
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
		INSERT INTO APPOINTMENT VALUES(@dentistId, @startTime, @customerId, @endTime, N'Đang chờ', @staffId, NULL)
		UPDATE SCHEDULE SET isBooked = 1 WHERE dentistId = @dentistId and startTime = @startTime and endTime = @endTime
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- cancel appointment, unrepeatable read
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

-- delete appointment unrepeatable read, 
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

-- view all appointment
GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllAppointment')
BEGIN
	DROP PROCEDURE sp_viewAllAppointment
END
GO
CREATE PROC sp_viewAllAppointment
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM APPOINTMENT
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
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_createPatientRecord')
BEGIN
	DROP PROCEDURE sp_createPatientRecord
END
GO
CREATE PROC sp_createPatientRecord
	@CUSTOMER_ID INT, 
	@DENTIST_ID INT,
	@DATE_TIME DATETIME,
	@DIAGNOSTIC NVARCHAR(100),
	@SYMPTOM NVARCHAR(50),
	@ADVICE NVARCHAR(100)
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (
				SELECT 1
				FROM CUSTOMER C WHERE C.id = @CUSTOMER_ID	
			)
			BEGIN
				PRINT N'LỖI: KHÔNG TỒN TẠI ID KHÁCH HÀNG'
				ROLLBACK TRAN
			END
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

-- update patient record
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
			UPDATE PATIENT_RECORD 
			SET symptom = @sympton, advice = @advice, diagnostic = @diagnostic, date_time = @date_time
			WHERE id = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN
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
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN
	END CATCH
END

-- view one patient record
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOnePatientRecord')
BEGIN
	DROP PROCEDURE sp_viewOnePatientRecord
END
GO
CREATE PROC sp_viewOnePatientRecord
	@recordId INT
AS
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
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN
	END CATCH
END

-- view all patient record
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllPatientRecord')
BEGIN
	DROP PROCEDURE sp_viewAllPatientRecord
END
GO
CREATE PROC sp_viewAllPatientRecord
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM PATIENT_RECORD
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN
	END CATCH
END

-- view patient record by customer id
GO
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewCustomerPatientRecord')
BEGIN
	DROP PROCEDURE sp_viewCustomerPatientRecord
END
GO
CREATE PROC sp_viewCustomerPatientRecord
	@customerId INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS ( SELECT 1 FROM CUSTOMER WHERE id = @customerId)
			BEGIN
				PRINT N'Lỗi: mã khách hàng không tồn tại'
				ROLLBACK TRAN
			END
			IF NOT EXISTS ( SELECT 1 FROM PATIENT_RECORD WHERE id = @customerId)
			BEGIN
				PRINT N'Lỗi: không có hồ sơ bệnh án nào'
				ROLLBACK TRAN
			END
			SELECT * FROM PATIENT_RECORD WHERE customerId = @customerId
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
			RAISERROR(N'Lỗi: Mã Thuốc không tồn tại', 16, 1)
			ROLLBACK TRAN
		END
		IF EXISTS (SELECT 1 FROM MEDICINE WHERE name = @name)
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- delete medicine
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_deleteMedicine')
BEGIN
	DROP PROCEDURE sp_deleteMedicine
END
GO
CREATE PROC sp_deleteMedicine
	@medicineId INT
AS
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view one medicine
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneMedicine')
BEGIN
	DROP PROCEDURE sp_viewOneMedicine
END
GO
CREATE PROC sp_viewOneMedicine
	@medicineId INT
AS
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view all medicine
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllMedicine')
BEGIN
	DROP PROCEDURE sp_viewAllMedicine
END
GO
CREATE PROC sp_viewAllMedicine
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM MEDICINE
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- add Prescribe Medicine
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
				PRINT N'LỖI: KHÔNG TỒN TẠI RECORD ID';
				ROLLBACK TRAN;
			END

			-- CHECK MEDICINE ID
			IF NOT EXISTS (
				SELECT 1
				FROM MEDICINE M
				WHERE M.ID = @MEDICINE_ID
			)
			BEGIN
				PRINT N'LỖI: KHÔNG TỒN TẠI MEDICINE ID';
				ROLLBACK TRAN;		
			END
			-- INSERT INTO PRESCRIBE_MEDICINE
			INSERT INTO PRESCRIBE_MEDICINE (recordId, medicineId, medicineName, price, quantity) VALUES (@RECORD_ID, @MEDICINE_ID, @MEDICINE_NAME, @PRICE, @QUANTITY);
			-- UPDATE QUANTITY OF MEDICINE IN STOCK
			UPDATE MEDICINE SET quantity = CASE WHEN @MEDICINE_STOCK >= @QUANTITY THEN @MEDICINE_STOCK - @QUANTITY ELSE 0 END WHERE ID = @MEDICINE_ID;
			
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN;		
	END CATCH
END

--delete Prescribe Medicine
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
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN;		
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
		--GET OLD QUANTITY
			DECLARE @OLD_QUANTITY INT;
			SELECT @OLD_QUANTITY = quantity FROM PRESCRIBE_MEDICINE pm WHERE pm.medicineId = @MEDICINE_ID AND pm.recordId = @RECORD_ID
		IF(@OLD_QUANTITY > @QUANTITY)
		BEGIN 
			UPDATE PRESCRIBE_MEDICINE SET quantity = @QUANTITY WHERE medicineId = @MEDICINE_ID AND recordId = @RECORD_ID
			UPDATE MEDICINE SET quantity = quantity + (@OLD_QUANTITY - @QUANTITY) WHERE id = @MEDICINE_ID
		END
		IF(@OLD_QUANTITY < @QUANTITY)
		BEGIN
			UPDATE PRESCRIBE_MEDICINE SET quantity = @QUANTITY WHERE medicineId = @MEDICINE_ID AND recordId = @RECORD_ID
			UPDATE MEDICINE SET quantity = quantity - (@QUANTITY - @OLD_QUANTITY) WHERE id = @MEDICINE_ID
		END
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN;		
	END CATCH
END

-- view one record's prescribe Medicine 
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewPrescribeMedicine')
BEGIN
	DROP PROCEDURE sp_viewPrescribeMedicine
END
GO
CREATE PROC sp_viewPrescribeMedicine
	@recordId INT
AS
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
		SELECT * FROM PRESCRIBE_MEDICINE WHERE recordId = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN;		
	END CATCH
END



-- add service
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- update service
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view one service
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewOneService')
BEGIN
	DROP PROCEDURE sp_viewOneService
END
GO
CREATE PROC sp_viewOneService
	@serviceId INT
AS
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view all service
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllService')
BEGIN
	DROP PROCEDURE sp_viewAllService
END
GO
CREATE PROC sp_viewAllService
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM SERVICE
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- add service use
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_addServiceUse')
BEGIN
	DROP PROCEDURE sp_addServiceUse
END
GO
CREATE PROC sp_addServiceUse
	@serviceId INT,
	@recordId INT
AS
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
			DECLARE @price FLOAT = (SELECT price FROM SERVICE WHERE id = @serviceId)
			INSERT INTO SERVICE_USE VALUES(@recordId, @serviceId, @price)
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- delete service use
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_deleteServiceUse')
BEGIN
	DROP PROCEDURE sp_deleteServiceUse
END
GO
CREATE PROC sp_deleteServiceUse
	@serviceId INT,
	@recordId INT
AS
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view service use
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewServiceUse')
BEGIN
	DROP PROCEDURE sp_viewServiceUse
END
GO
CREATE PROC sp_viewServiceUse
	@recordId INT
AS
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
			SELECT * FROM SERVICE_USE WHERE recordId = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
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
	@RECORD_ID INT, 
	@DATE_TIME DATETIME,
	@STATUS NVARCHAR(30),
	@TOTAL FLOAT,
	@STAFFID INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			--CHECK RECORD ID
			IF NOT EXISTS (
				SELECT 1
				FROM PATIENT_RECORD PR WHERE PR.id = @RECORD_ID	
			)
			BEGIN
				PRINT N'LỖI: KHÔNG TỒN TẠI HỒ SƠ BỆNH NHÂN'
				ROLLBACK TRAN
			END
			INSERT INTO INVOICE(recordId, date_time, status, total, staffId) VALUES (@RECORD_ID, @DATE_TIME, @STATUS, @TOTAL, @STAFFID)
			COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
		ROLLBACK TRAN
	END CATCH
END

-- update invoice status
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_updateInvoiceStatus')
BEGIN
	DROP PROCEDURE sp_updateInvoiceStatus
END
GO
CREATE PROC sp_updateInvoiceStatus
	@invoiceId INT,
	@status NVARCHAR(30)
AS
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view invoice by id
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewInvoiceById')
BEGIN
	DROP PROCEDURE sp_viewInvoiceById
END
GO
CREATE PROC sp_viewInvoiceById
	@invoiceId INT
AS
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
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view invoice by record id
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewInvoiceByRecordId')
BEGIN
	DROP PROCEDURE sp_viewInvoiceByRecordId
END
GO
CREATE PROC sp_viewInvoiceByRecordId
	@recordId INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			IF NOT EXISTS (SELECT 1 FROM PATIENT_RECORD WHERE id = @recordId)
			BEGIN
				RAISERROR(N'Lỗi: mã hồ sơ bệnh nhân không tồn tại', 16, 1)
				ROLLBACK TRAN
			END
			SELECT * FROM INVOICE WHERE recordId = @recordId
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

-- view all invoice 
IF EXISTS (SELECT 1 FROM sys.objects WHERE type = 'P' AND name = 'sp_viewAllInvoice')
BEGIN
	DROP PROCEDURE sp_viewAllInvoice
END
GO
CREATE PROC sp_viewAllInvoice
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			SELECT * FROM INVOICE
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END

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
		SELECT * FROM SCHEDULE WHERE dentistId = @dentistId
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
		SELECT * FROM SCHEDULE
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
		SELECT * FROM SCHEDULE WHERE isBooked = 0
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
		ROLLBACK TRAN
	END CATCH
END
