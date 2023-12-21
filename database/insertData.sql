GO
USE QLPhongKham
GO
-- Insert data into the ADMIN table
INSERT INTO ADMIN (name, password, phoneNumber)
VALUES ('AdminUser', 'AdminPassword123', '123456789');

-- Insert data into the CUSTOMER table
INSERT INTO CUSTOMER (name, password, phoneNumber, role, gender, address, birthday, isBlocked)
VALUES 
(N'Nguyễn Dũng Minh', '1231231', '218295423369', 'Customer', N'Nam', N'Tạ Quang Bửu Quận 8', '1990-05-15', 0),
(N'Trần Thị Hoa', 'pass456', '0987654321', 'Customer', N'Nữ', N'Số 5, Đường XYZ, TP. Hà Nội', '1985-12-10', 0),
(N'Phạm Văn Tuấn', 'abc@123', '0365897412', 'Customer', N'Nam', N'Số 10, Đường KLM, TP. Đà Nẵng', '1995-08-20', 1),
(N'Lê Thị Mai', 'password', '0932145789', 'Customer', N'Nữ', N'Số 8, Đường HIJ, TP. Cần Thơ', '1988-04-25', 0),
(N'Hoàng Văn Hải', 'secure456', '0654321897', 'Customer', N'Nam', N'Số 12, Đường MNO, TP. Hải Phòng', '1992-10-05', 0),
(N'Mai Thị Lan', 'qwerty', '0789456123', 'Customer', N'Nữ', N'Số 3, Đường RST, TP. Vũng Tàu', '1997-03-30', 1),
(N'Đặng Văn Nam', 'pass123', '0541236987', 'Customer', N'Nam', N'Số 18, Đường UVW, TP. Nha Trang', '1993-07-12', 0),
(N'Nguyễn Thị Thanh', 'abc123', '0321654987', 'Customer', N'Nữ', N'Số 7, Đường EFG, TP. Đồng Nai', '1980-09-18', 1),
(N'Trần Văn Đức', 'password123', '0968745123', 'Customer', N'Nam', N'Số 21, Đường IJK, TP. Bình Dương', '1982-11-22', 0),
(N'Lê Thị Kim Ngân', 'passpass', '0897412586', 'Customer', N'Nữ', N'Số 25, Đường LMN, TP. Long An', '1998-01-08', 0),
(N'Phạm Văn Hùng', '123456', '0978523641', 'Customer', N'Nam', N'Số 30, Đường OPQ, TP. An Giang', '1991-06-14', 1),
(N'Trần Văn Minh', 'abcdef', '0632147859', 'Customer', N'Nam', N'Số 35, Đường RST, TP. Kiên Giang', '1987-02-28', 0),
(N'Nguyễn Thị Ngọc', 'passpass123', '0764852139', 'Customer', N'Nữ', N'Số 40, Đường UVW, TP. Bạc Liêu', '1983-08-03', 0),
(N'Lê Văn Phong', '654321', '0987456321', 'Customer', N'Nam', N'Số 45, Đường XYZ, TP. Cà Mau', '1994-04-17', 1),
(N'Hoàng Thị Quỳnh', 'abcabc', '0312456987', 'Customer', N'Nữ', N'Số 50, Đường EFG, TP. Đồng Tháp', '1986-12-05', 0);

-- Insert data into the DENTIST table
INSERT INTO DENTIST (name, password, phoneNumber, gender, birthday, introduction, isBlocked)
VALUES 
(N'Nguyễn Thị Ánh', '123123', '567890123', N'Nữ', '1985-08-20', N'Bác sĩ có kinh nghiệm', 0),
(N'Trần Văn Quang', '123123', '098765432', N'Nam', '1978-06-15', N'Nha sĩ chuyên nghiệp', 0),
(N'Phạm Thị Hương', '123123', '012345678', N'Nữ', '1990-12-05', N'Bác sĩ tận tâm', 1),
(N'Lê Văn Tuấn', '123123', '987654321', N'Nam', '1983-04-25', N'Nha sỹ uy tín', 0),
(N'Hồ Thị Mai', '123123', '654321098', N'Nữ', '1987-10-30', N'Bác sĩ có kinh nghiệm', 0);


-- Insert data into the STAFF table
INSERT INTO STAFF (name, password, phoneNumber, gender, isBlocked)
VALUES 
(N'Nguyễn Văn Bình', '123123', '012345678', N'Nam', 0),
(N'Trần Thị Hoa', '123123', '098765432', N'Nữ', 0),
(N'Phạm Minh Cường', '123123', '0123456789', N'Nam', 1),
(N'Lê Thị Diệu Hương', '123123', '0987654321', N'Nữ', 0),
(N'Huỳnh Văn Dũng', '123123', '01234567891', N'Nam', 0);


-- Insert data into the MEDICINE table
INSERT INTO MEDICINE (unit, name, description, expirationDate, indication, quantity, price)
VALUES 
(N'Viên', 'Paracetamol', N'Dùng để hạ sốt và giảm đau nhẹ đến vừa', '2024-12-31', N'Sốt, đau nhẹ', 100, 5.99),
(N'Vỉ', 'Amoxicillin', N'Kháng sinh chống vi khuẩn', '2024-11-30', N'Nhiễm trùng vi khuẩn', 50, 12.49),
(N'Hộp', 'Ibuprofen', N'Thuốc giảm đau, chống viêm', '2024-10-31', N'Đau cơ, viêm khớp', 80, 7.29),
(N'Chai', 'Chlorhexidine', N'Dung dịch súc miệng chống vi khuẩn', '2024-09-30', N'Vệ sinh miệng', 120, 3.99),
(N'Ống', 'Fluoride toothpaste', N'Sản phẩm chăm sóc răng', '2024-08-31', N'Chăm sóc răng miệng', 70, 4.79),
(N'Gói', 'Floss', N'Sợi vớt thừa thức ăn và vi khuẩn dưới răng', '2024-07-31', N'Vệ sinh răng miệng', 90, 2.99),
(N'Viên', 'Cetirizine', N'Thuốc kháng histamine, giảm triệu chứng dị ứng', '2024-06-30', N'Dị ứng, hắt hơi, chảy nước mũi', 110, 9.29),
(N'Vỉ', 'Dental floss picks', N'Đồ dùng vệ sinh răng miệng', '2024-05-31', N'Vệ sinh răng miệng', 60, 6.99),
(N'Hộp', 'Mouthwash', N'Nước súc miệng kháng khuẩn', '2024-04-30', N'Vệ sinh miệng', 85, 8.49),
(N'Viên', 'Pain relief gel', N'Gel giảm đau', '2023-12-31', N'Đau cơ, đau nhức', 105, 14.49),
(N'Vỉ', 'Dental wax', N'Sáp trám răng', '2023-11-30', N'Trám răng', 55, 9.99),
(N'Hộp', 'Toothache drops', N'Dung dịch giảm đau răng', '2023-10-31', N'Đau răng', 75, 6.99),
(N'Chai', 'Teething gel', N'Gel giảm đau khi răng mọc', '2023-09-30', N'Đau khi răng mọc', 125, 8.29),
(N'Ống', 'Braces wax', N'Sáp bảo vệ răng sắt', '2023-08-31', N'Bảo vệ răng sắt', 65, 5.49),
(N'Gói', 'Dental cleaning tablets', N'Viên tẩy vết cặn trên răng', '2023-07-31', N'Vệ sinh răng', 85, 12.79),
(N'Viên', 'Dental pain relief spray', N'Xịt giảm đau răng', '2023-06-30', N'Đau răng', 115, 15.99),
(N'Vỉ', 'Teething powder', N'Bột giảm đau khi răng mọc', '2023-05-31', N'Đau khi răng mọc', 65, 11.49);

-- Insert data into the SERVICE table
INSERT INTO SERVICE (name, price, description)
VALUES 
  (N'Chẩn đoán nha khoa', 50.0, N'Kiểm tra tổng quát sức khỏe răng miệng'),
  (N'Tẩy trắng răng', 150.0, N'Quy trình tẩy trắng răng chuyên nghiệp'),
  (N'Bơm phẳng răng', 80.0, N'Bơm phẳng răng cho trẻ em và người lớn'),
  (N'Tháo lắp răng', 200.0, N'Quy trình tháo lắp răng sứ, răng giả'),
  (N'Điều trị nướu', 120.0, N'Điều trị các vấn đề liên quan đến bệnh nướu'),
  (N'Làm răng sứ', 300.0, N'Tạo răng sứ với chất liệu cao cấp'),
  (N'Điều trị cấp cứu', 250.0, N'Điều trị khẩn cấp cho các vấn đề về răng miệng'),
  (N'Chỉnh nha', 180.0, N'Điều chỉnh vị trí răng cho sự cân đối và hài hòa'),
  (N'Nhổ răng', 120.0, N'Quy trình loại bỏ răng khi cần thiết'),
  (N'Tư vấn nha khoa', 75.0, N'Hỗ trợ tư vấn và giải đáp về sức khỏe răng miệng'),
  (N'Trám răng', 90.0, N'Trám răng để bảo vệ và sửa chữa răng hư hỏng'),
  (N'Tạo nụ cười hoàn hảo', 500.0, N'Kế hoạch điều chỉnh răng và nha khoa hóa mỹ'),
  (N'Phục hình răng sứ', 350.0, N'Phục hình răng bằng răng sứ chất lượng cao'),
  (N'Tẩy trắng răng sứ', 200.0, N'Quy trình tẩy trắng cho răng sứ và răng thật'),
  (N'Nạp ghép Implant', 800.0, N'Quy trình nạp ghép Implant cho răng thay thế'),
  (N'Chăm sóc răng sứ', 100.0, N'Chăm sóc và vệ sinh cho răng sứ'),
  (N'Điều trị răng khớp', 280.0, N'Điều trị các vấn đề về răng khớp và cơ hàm'),
  (N'Điều trị viêm nướu', 150.0, N'Điều trị các tình trạng viêm nướu'),
  (N'Chẩn đoán răng hàm mặt', 200.0, N'Kiểm tra và chẩn đoán về răng hàm mặt');


INSERT INTO SCHEDULE (dentistId, startTime, endTime, isBooked)
VALUES
    (1, '2023-12-21 07:00:00', '2023-12-21 08:00:00', 0),
    (1, '2023-12-21 08:00:00', '2023-12-21 09:00:00', 0),
    (1, '2023-12-21 09:00:00', '2023-12-21 10:00:00', 0),
    (2, '2023-12-22 08:00:00', '2023-12-22 09:00:00', 0),
    (2, '2023-12-22 09:00:00', '2023-12-22 10:00:00', 0),
    (2, '2023-12-22 10:00:00', '2023-12-22 11:00:00', 0);


INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status, staffId, recordId)
VALUES 
	(1, 1, '2023-12-21 07:00:00', '2023-12-21 08:00:00', N'Đang tạo hồ sơ bệnh án', null, null);

INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status, staffId, recordId)
VALUES 
	(1, 2, '2023-12-21 08:00:00', '2023-12-21 09:00:00', N'Đang tạo hồ sơ bệnh án', null, null);

INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status, staffId, recordId)
VALUES 
	(1, 3, '2023-12-21 09:00:00', '2023-12-21 10:00:00', N'Đang tạo hồ sơ bệnh án', null, null);

INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status, staffId, recordId)
VALUES 
	(2, 4, '2023-12-22 08:00:00', '2023-12-22 09:00:00', N'Đang tạo hồ sơ bệnh án', null, null);

INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status, staffId, recordId)
VALUES 
	(2, 5, '2023-12-22 09:00:00', '2023-12-22 10:00:00', N'Đang tạo hồ sơ bệnh án', null, null);

INSERT INTO APPOINTMENT (dentistId, customerId, startTime, endTime, status, staffId, recordId)
VALUES 
	(2, 6, '2023-12-22 10:00:00', '2023-12-22 11:00:00', N'Đang tạo hồ sơ bệnh án', null, null);









