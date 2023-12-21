GO
USE QLPhongKham
GO
-- Insert data into the ADMIN table
INSERT INTO ADMIN (name, password, phoneNumber)
VALUES ('AdminUser', 'AdminPassword123', '123456789');

-- Insert data into the CUSTOMER table
INSERT INTO CUSTOMER (name, password, phoneNumber, role, gender, address, birthday, isBlocked)
VALUES ('Customer1', 'CustomerPassword123', '987654321', 'Customer', N'Male', '123 Main St', '1990-05-15', 0);

INSERT INTO CUSTOMER (name, password, phoneNumber, role, gender, address, birthday, isBlocked)
VALUES ('Customer2', 'CustomerPassword123', '987654322', 'Customer', N'Male', '123 Main St', '1990-05-15', 0);

-- Insert data into the DENTIST table
INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist1', 'DentistPassword123', '567890123', N'Female', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist2', 'DentistPassword123', '567890001', N'Female', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist3', 'DentistPassword123', '567890002', N'Female', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist4', 'DentistPassword123', '567890003', N'Female', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist5', 'DentistPassword123', '567890004', N'Male', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist6', 'DentistPassword123', '567890005', N'Male', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist7', 'DentistPassword123', '567890006', N'Male', '1985-08-20', 'Experienced dentist', 0);

INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES ('Dentist8', 'DentistPassword123', '567890007', N'Male', '1985-08-20', 'Experienced dentist', 0);

-- Insert data into the STAFF table
INSERT INTO STAFF (name, password, phoneNumber, gender, isBlocked)
VALUES ('Staff1', 'StaffPassword123', '789012345', N'Male', 0);

-- Insert data into the MEDICINE table
INSERT INTO MEDICINE (unit, name, description, expirationDate, indication, quantity, price)
VALUES (N'Pill', 'Medicine1', 'Painkiller', '2024-12-31 10:30:00', 'Pain relief', 100, 10.99);

-- Insert data into the MEDICINE table
INSERT INTO MEDICINE (unit, name, description, expirationDate, indication, quantity, price)
VALUES (N'Pill', 'Medicine2', 'Painkiller', '2024-12-11 10:30:00', 'Pain relief', 100, 10.99);

-- Insert data into the MEDICINE table
INSERT INTO MEDICINE (unit, name, description, expirationDate, indication, quantity, price)
VALUES (N'Pill', 'Medicine3', 'Painkiller', '2023-12-11 10:30:00', 'Pain relief', 100, 10.99);

-- Insert data into the APPOINTMENT table to book an appointment
INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status)
VALUES (1, 1, '2023-11-10 09:00:00', '2023-11-10 10:00:00', N'Creating patient records');

INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status)
VALUES (1, 2, '2023-12-28 10:00:00', '2023-12-28 11:00:00', N'Creating patient records');
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
VALUES (489.60, '2023-11-10 12:00:00', N'Unpaid', 1, 1);

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
