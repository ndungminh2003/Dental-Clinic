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
VALUES (1, 1, '2023-11-10 09:00:00', '2023-11-10 10:00:00', N'Đang tạo hồ sơ bệnh án');

-- Insert data into the PATIENT_RECORD table to create a patient record
INSERT INTO PATIENT_RECORD (customerId, dentistId, symptom, advice, diagnostic, date_time)
VALUES (1, 1, N'Toothache', N'Rest and use painkiller', N'Cavity detected', '2023-11-10 10:30:00');

-- Insert data into the PATIENT_RECORD table to create a patient record
INSERT INTO PATIENT_RECORD (customerId, dentistId, symptom, advice, diagnostic, date_time)
VALUES (1, 1, N'Toothache', N'Rest and use painkiller', N'Cavity detected', '2023-12-12 11:30:00');

-- Insert another prescription for a different patient record
INSERT INTO PRESCRIBE_MEDICINE (recordId, medicineId, medicineName, price, quantity)
VALUES (1, 1, 'Hello', 8.50, 20);

-- Insert another prescription for a different patient record
INSERT INTO PRESCRIBE_MEDICINE (recordId, medicineId, medicineName, price, quantity)
VALUES (1, 2, 'Hello2', 8.50, 20);

-- Insert data into the SERVICE table to define available services
INSERT INTO SERVICE (name, price, description)
VALUES (N'Service1', 50.00, N'Basic dental checkup');

-- Insert information about another service
INSERT INTO SERVICE (name, price, description)
VALUES (N'Service2', 75.00, N'Dental cleaning and scaling');

-- Insert data into the SERVICE_USE table to associate services with a patient record
INSERT INTO SERVICE_USE (recordId, serviceId, price)
VALUES (1, 1, 50.00);

-- Insert data into the INVOICE table to create an invoice
INSERT INTO INVOICE (total, date_time, status, recordId, staffId)
VALUES (100.00, '2023-11-10 12:00:00', N'Chưa thanh toán', 1, 1);

-- Insert data into the SCHEDULE table to define the schedule for a dentist
INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES (1, '2023-11-10 08:00:00', '2023-11-10 09:00:00', 0);


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

	  GRANT SELECT ON CUSTOMER TO guestRole
	  GRANT SELECT ON CUSTOMER TO customerRole
    GRANT SELECT ON STAFF TO staffRole
    GRANT SELECT ON DENTIST TO dentistRole
    GRANT SELECT ON ADMIN TO adminRole  
	GRANT EXEC ON dbo.sp_viewAllMedicine TO guestRole
	GRANT EXEC ON dbo.sp_updateMedicine TO guestRole
	GRANT EXEC ON dbo.sp_createMedicine TO guestRole
  END TRY
  BEGIN CATCH
    ;THROW
  END CATCH
END

EXEC sp_createDatabaseUser
 
SELECT * FROM CUSTOMER

SELECT * FROM DENTIST

SELECT * FROM STAFF

SELECT * FROM SCHEDULE

SELECT * FROM APPOINTMENT

INSERT INTO SCHEDULE VALUES(1, '2023-12-15 09:00:00.000', '2023-12-15 10:00:00.000', 0)
INSERT INTO MEDICINE VALUES ('Thuoc chong ngu', N'Viên', 'Ngu lau nam', '2024-12-31 10:30:00.000', 'Ngu bat chap', 200, 200)
INSERT INTO MEDICINE VALUES ('Thuoc chong fucking ngu', N'Viên', 'Ngu lau nam', '2024-12-31 10:30:00.000', 'Ngu bat chap', 200, 200)
INSERT INTO MEDICINE VALUES ('Thuoc chong fucking ngu abc111', N'Viên', 'Ngu lau nam', '2024-12-31 10:30:00.000', 'Ngu bat chap', 200, 200)
		
select * from medicine
