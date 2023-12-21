-- init -> trigger -> procedure -> privilege -> data
GO
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
  gender NVARCHAR(6) CHECK(gender in (N'Male', N'Female')),
  address NVARCHAR(120),
  birthday DATE,
  isBlocked BIT NOT NULL DEFAULT(0)
);

CREATE TABLE DENTIST (

  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(50) NOT NULL CHECK(LEN(name) > 0),
  password VARCHAR(50) NOT NULL CHECK (LEN(password) > 0),
  phoneNumber VARCHAR(15) NOT NULL CHECK(ISNUMERIC(phoneNumber) = 1) UNIQUE,
  gender NVARCHAR(6) CHECK(gender IN (N'Male', N'Female')),
  birthday DATE,
  introduction NVARCHAR(500),
  isBlocked BIT NOT NULL DEFAULT(0)
);

CREATE TABLE STAFF (
    
  id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(50) NOT NULL CHECK(LEN(name) > 0),
  password VARCHAR(50) NOT NULL CHECK (LEN(password) > 0),
  phoneNumber VARCHAR(15) NOT NULL CHECK(ISNUMERIC(phoneNumber) = 1) UNIQUE,
  gender NVARCHAR(6) CHECK(gender in (N'Male', N'Female')),
  isBlocked BIT NOT NULL DEFAULT(0),
  --startDate DATE
);


CREATE TABLE APPOINTMENT (
 
  dentistId INT NOT NULL,
  customerId INT NOT NULL,
  startTime DATETIME CHECK (CONVERT(char(10), startTime, 108) IN ('07:00:00', '08:00:00', '09:00:00', '10:00:00', '13:00:00','14:00:00', '15:00:00', '16:00:00')),
  endTime DATETIME CHECK (CONVERT(char(10), endTime, 108) IN ('08:00:00', '09:00:00', '10:00:00', '11:00:00', '14:00:00','15:00:00', '16:00:00', '17:00:00')),
  status NVARCHAR(30) CHECK(status IN (N'In progress', N'Waiting', N'Completed', N'Cancelled', N'Creating patient records')),
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
  status NVARCHAR(30) CHECK(status IN (N'Paid', N'Unpaid')),
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
  unit NVARCHAR(10) CHECK(unit IN (N'Pill', N'Pack', N'Box', N'Bottle', N'Tube', N'Package')),
  description NVARCHAR(100),
  expirationDate DATE,
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
  price FLOAT CHECK(price > 0),
  quantity INT CHECK(quantity >= 0),
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





