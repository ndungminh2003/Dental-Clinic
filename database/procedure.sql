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
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_blockCustomer')
BEGIN
	DROP PROCEDURE sp_blockUser
END
GO

CREATE OR ALTER PROC  sp_blockUser
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
		SELECT * FROM APPOINTMENT WHERE customerId = @customerId
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
		INSERT INTO MEDICINE VALUES(@unit, @name, @description, @expirationDate, @indication, @quantity, @price)
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
			SELECT I.status, I.total, I.date_time FROM INVOICE I WHERE recordId = @recordId
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
		SELECT * FROM SCHEDULE WHERE isBooked = 0 AND datediff(second, startTime, GETDATE()) > 0
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		IF @@trancount > 0 ROLLBACK TRAN
        ;THROW
	END CATCH
END

EXEC sp_signUp '01234567892', '123123123123', 'Customer2', 'Nam', '2008-11-11', N'Hà Nội'
-- EXEC sp_customerLoginWithoutHash '01234567891', '123123123123'
-- EXEC sp_viewOneCustomer 1
-- EXEC sp_viewAllCustomer
-- EXEC sp_updateCustomerProfile 1, 'Customer1', '01234567891', N'Nữ', 'TP HCM', '2008-11-11'
-- EXEC sp_makeAppointment '0327116254', 'Customer4b', 'Nam', '2008-11-11', N'Hà Nội', 2, NULL, '2024-05-15 09:00:00', '2024-05-15 010:00:00'
-- EXEC sp_addDentistSchedule '2023-11-15 07:00:00.000','2023-11-15 08:00:00.000',7
-- EXEC sp_addPrescribeMedicine 1, 2, 100

