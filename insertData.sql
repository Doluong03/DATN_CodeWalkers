-- Bật chế độ IDENTITY_INSERT cho bảng
SET IDENTITY_INSERT ChiTietSanPham ON;

-- Reset lại giá trị identity
DBCC CHECKIDENT ('ChiTietSanPham', RESEED, 0);
DBCC CHECKIDENT ('HinhAnh', RESEED, 0);

-- Tắt chế độ IDENTITY_INSERT
SET IDENTITY_INSERT ChiTietSanPham OFF;
-- chay doan trên trước khi insert dữ liệu 

--insert du lieu demo

INSERT INTO TrangThai ( ten_trang_thai)
VALUES
(N'Đang hoạt động'),
( N'Ngừng hoạt động');

--Thêm bản ghi bảng "VaiTro"
 INSERT INTO VaiTro(ten_vai_tro)
 VALUES
<<<<<<< HEAD
 (N'Admin'),(N'User');

 --Thêm bản ghi bảng "TaiKhoan"
 INSERT INTO TaiKhoan(user_name,password,vai_tro_id,trang_thai_id)
=======
 (N'ROLE_ADMIN'),(N'ROLE_EMPLOYEE');

 delete VaiTro

 select * from VaiTro
 --Thêm bản ghi bảng "TaiKhoan"
 INSERT INTO TaiKhoan(user_name,password,vai_tro_id,trang_thai )
>>>>>>> origin/hiepbhph27531
 VALUES
  ('admin',N'1',1,1),
  ('user1',N'1',2,1),
  ('user2',N'1',1,1),
  ('user3',N'1',2,1),
  ('user4',N'1',1,1),
  ('user5',N'1',2,1),
  ('user6',N'1',1,1),
  ('user7',N'1',2,1),
  ('user8',N'1',1,1),
  ('user9',N'1',2,1);

-- Thêm bản ghi liên quan đến sản phẩm giày vào bảng "PhanLoai"
<<<<<<< HEAD
INSERT INTO PhanLoai (ten_phan_loai, trang_thai_id)
=======
INSERT INTO PhanLoai (ten_phan_loai, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (N'Giày thể thao', 1),
  (N'Giày chạy', 1),
  (N'Giày đi học', 1),
  (N'Giày lười', 1),
  (N'Giày đế bằng', 1),
  (N'Giày công sở', 1),
  (N'Giày đội mưa', 1),
  (N'Giày nam', 1),
  (N'Giày nữ', 1),
  (N'Giày trẻ em', 1);

<<<<<<< HEAD

-- Thêm bản ghi về các thương hiệu giày vào bảng "ThuongHieu"
INSERT INTO ThuongHieu (ten_thuong_hieu, mo_ta, trang_thai_id)
=======
  select * from PhanLoai
-- Thêm bản ghi về các thương hiệu giày vào bảng "ThuongHieu"
INSERT INTO ThuongHieu (ten_thuong_hieu, mo_ta, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (N'Adidas', N'Thương hiệu giày thể thao Adidas', 1),
  (N'Nike', N'Thương hiệu giày thể thao Nike', 1),
  (N'New Balance', N'Thương hiệu giày chạy New Balance', 1),
  (N'Puma', N'Thương hiệu giày Puma', 1),
  (N'Reebok', N'Thương hiệu giày thể thao Reebok', 1),
  (N'Vans', N'Thương hiệu giày Vans', 1),
  (N'Clarks', N'Thương hiệu giày Clarks', 1),
  (N'Asics', N'Thương hiệu giày thể thao Asics', 1),
  (N'Hunter', N'Thương hiệu giày đội mưa Hunter', 1),
  (N'Timberland', N'Thương hiệu giày công sở Timberland', 1);


  -- Thêm bản ghi liên quan đến khách hàng vào bảng "KhachHang"
<<<<<<< HEAD
INSERT INTO KhachHang ( ten_khach_hang, email, so_dien_thoai, ngay_sinh, gioi_tinh, ngay_tao, ngay_sua, trang_thai_id, id_tai_khoan)
VALUES
  ( N'Nguyễn Văn A', N'nguyenvana@example.com', N'0123456789',   N'1990-01-15', 1, N'2023-09-20', N'2023-09-21', 1,1),
  ( N'Trần Thị B', N'tranthib@example.com', N'0987654321',   N'1985-04-25', 0, N'2023-09-19', N'2023-09-20', 1,2),
  ( N'Lê Văn C', N'levanc@example.com', N'0369874512',   N'1995-08-10', 1, N'2023-09-18', N'2023-09-19',  1,3),
  ( N'Phạm Thị D', N'phamthid@example.com', N'0764532189',   N'1988-12-05', 0, N'2023-09-17', N'2023-09-18', 1,4),
  (  N'Hoàng Văn E', N'hoangvane@example.com', N'0932145678',   N'1992-03-30', 1, N'2023-09-16', N'2023-09-17',  1,5),
  (  N'Nguyễn Thị F', N'nguyenthif@example.com', N'0658749123',   N'1998-07-20', 0, N'2023-09-15', N'2023-09-16',  1,6),
  (  N'Vũ Văn G', N'vuvang@example.com', N'0523698741',   N'1991-02-03', 1, N'2023-09-14', N'2023-09-15',  1,7),
  (  N'Trần Văn H', N'tranvanh@example.com', N'0365987420',   N'1994-06-18', 1, N'2023-09-13', N'2023-09-14', 1,8),
  (  N'Lê Thị I', N'lethii@example.com', N'0785643210',   N'1989-10-12', 0, N'2023-09-12', N'2023-09-13',  1,9),
  ( N'Phạm Văn J', N'phamvanj@example.com', N'0912345678',  N'1997-05-28', 1, N'2023-09-11', N'2023-09-12', 1,10);


  -- Thêm bản ghi liên quan đến sản phẩm giày vào bảng "DanhGia"
INSERT INTO DanhGia (danh_gia, noi_dung, ngay_tao, ngay_sua, chi_tiet_san_pham_id, khach_hang_id, trang_thai_id)
=======
INSERT INTO KhachHang ( ten_khach_hang, email, so_dien_thoai, ngay_sinh, gioi_tinh, ngay_tao, ngay_sua, trang_thai )
VALUES
  ( N'Nguyễn Văn A', N'nguyenvana@example.com', N'0123456789',   N'1990-01-15', 1, N'2023-09-20', N'2023-09-21', 1),
  ( N'Trần Thị B', N'tranthib@example.com', N'0987654321',   N'1985-04-25', 0, N'2023-09-19', N'2023-09-20', 1),
  ( N'Lê Văn C', N'levanc@example.com', N'0369874512',   N'1995-08-10', 1, N'2023-09-18', N'2023-09-19',  1),
  ( N'Phạm Thị D', N'phamthid@example.com', N'0764532189',   N'1988-12-05', 0, N'2023-09-17', N'2023-09-18', 1),
  (  N'Hoàng Văn E', N'hoangvane@example.com', N'0932145678',   N'1992-03-30', 1, N'2023-09-16', N'2023-09-17',  1),
  (  N'Nguyễn Thị F', N'nguyenthif@example.com', N'0658749123',   N'1998-07-20', 0, N'2023-09-15', N'2023-09-16',  1),
  (  N'Vũ Văn G', N'vuvang@example.com', N'0523698741',   N'1991-02-03', 1, N'2023-09-14', N'2023-09-15',  1),
  (  N'Trần Văn H', N'tranvanh@example.com', N'0365987420',   N'1994-06-18', 1, N'2023-09-13', N'2023-09-14', 1),
  (  N'Lê Thị I', N'lethii@example.com', N'0785643210',   N'1989-10-12', 0, N'2023-09-12', N'2023-09-13',  1),
  ( N'Phạm Văn J', N'phamvanj@example.com', N'0912345678',  N'1997-05-28', 1, N'2023-09-11', N'2023-09-12', 1);

  select * from KhachHang
  -- Thêm bản ghi liên quan đến sản phẩm giày vào bảng "DanhGia"
INSERT INTO DanhGia (danh_gia, noi_dung, ngay_tao, ngay_sua, chi_tiet_san_pham_id, khach_hang_id, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (5, N'Sản phẩm rất tốt', N'2023-09-20', N'2023-09-21', 1, 1, 1),
  (4, N'Giày chạy rất êm', N'2023-09-19', N'2023-09-20', 2, 2, 1),
  (5, N'Sản phẩm đẹp và thoải mái', N'2023-09-18', N'2023-09-19', 3, 3, 1),
  (3, N'Giày hơi chật', N'2023-09-17', N'2023-09-18', 4, 4, 1),
  (4, N'Đáng giá tiền', N'2023-09-16', N'2023-09-17', 5, 5, 1),
  (5, N'Rất hài lòng với sản phẩm', N'2023-09-15', N'2023-09-16', 6, 6, 1),
  (4, N'Giày lười phù hợp cho mùa hè', N'2023-09-14', N'2023-09-15', 7, 7, 1),
  (3, N'Sản phẩm không đúng kích cỡ', N'2023-09-13', N'2023-09-14', 8, 8, 1),
  (5, N'Giày thể thao tốt cho tập luyện', N'2023-09-12', N'2023-09-13', 9, 9, 1),
  (4, N'Giày đội mưa chất lượng', N'2023-09-11', N'2023-09-12', 10, 10, 1);

<<<<<<< HEAD

-- Thêm bản ghi giày vào bảng "SanPham"
INSERT INTO SanPham (ma_san_pham, ten_san_pham, anh_chinh, mo_ta, phan_loai_id, thuong_hieu_id, trang_thai_id)
=======
  select * from thuonghieu
  select * from PhanLoai
  select * from SanPham
-- Thêm bản ghi giày vào bảng "SanPham"
INSERT INTO SanPham (ma_san_pham, ten_san_pham, anh_chinh, mo_ta, phan_loai_id, thuong_hieu_id, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (N'SP001', N'Giày thể thao Adidas', N'adidas.jpg', N'Đôi giày thể thao Adidas chất lượng cao', 1, 1, 1),
  (N'SP002', N'Giày thể thao Nike', N'nike.jpg', N'Đôi giày thể thao Nike phong cách', 1, 2,  1),
  (N'SP003', N'Giày chạy New Balance', N'newbalance.jpg', N'Giày chạy New Balance thoải mái', 2, 3, 1),
  (N'SP004', N'Giày đi học Puma', N'puma.jpg', N'Giày đi học Puma cho học sinh', 3, 4,  1),
  (N'SP005', N'Giày thể thao Reebok', N'reebok.jpg', N'Đôi giày thể thao Reebok thoải mái', 1, 5, 1),
  (N'SP006', N'Giày lười Vans', N'vans.jpg', N'Đôi giày lười Vans phong cách', 4, 6,  1),
  (N'SP007', N'Giày đế bằng Clarks', N'clarks.jpg', N'Giày đế bằng Clarks thời trang', 5, 7,  1),
  (N'SP008', N'Giày thể thao Asics', N'asics.jpg', N'Giày thể thao Asics cho thể thao', 1, 8,  1),
  (N'SP009', N'Giày đội mưa Hunter', N'hunter.jpg', N'Giày đội mưa Hunter chất lượng', 6, 9,  1),
<<<<<<< HEAD
  (N'SP010', N'Giày công sở Timberland', N'timberland.jpg', N'Giày công sở Timberland đẳng cấp', 7, 10, 1);

  -- Thêm bản ghi về chất liệu sản phẩm giày vào bảng "ChatLieu"
INSERT INTO ChatLieu (ten_chat_lieu, mo_ta, trang_thai_id)
=======
  (N'SP010', N'Giày công sở Timberland', N'timberland.jpg', N'Giày công sở Timberland đẳng cấp', 7, 13, 1);

  -- Thêm bản ghi về chất liệu sản phẩm giày vào bảng "ChatLieu"
INSERT INTO ChatLieu (ten_chat_lieu, mo_ta, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (N'Vải', N'Chất liệu vải dùng cho giày', 1),
  (N'Da tổng hợp', N'Chất liệu da tổng hợp cho giày', 1),
  (N'Da thật', N'Chất liệu da thật cho giày', 1),
  (N'Nhựa', N'Chất liệu nhựa dùng cho giày', 1),
  (N'Gỗ', N'Chất liệu gỗ dùng cho giày', 1),
  (N'Kim loại', N'Chất liệu kim loại dùng cho giày', 1),
  (N'Len', N'Chất liệu len dùng cho giày', 1),
  (N'Thun', N'Chất liệu thun dùng cho giày', 1),
  (N'Lụa', N'Chất liệu lụa dùng cho giày', 1),
  (N'Nhung', N'Chất liệu nhung dùng cho giày', 1);

  -- Thêm bản ghi về màu sắc sản phẩm giày vào bảng "MauSac"
<<<<<<< HEAD
INSERT INTO MauSac (ten_mau_sac, trang_thai_id)
=======
INSERT INTO MauSac (ten_mau_sac, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (N'Đen', 1),
  (N'Trắng', 1),
  (N'Xám', 1),
  (N'Đỏ', 1),
  (N'Xanh dương', 1),
  (N'Xanh lá', 1),
  (N'Hồng', 1),
  (N'Cam', 1),
  (N'Nâu', 1),
  (N'Vàng', 1);
<<<<<<< HEAD

  -- Thêm bản ghi về kích cỡ sản phẩm giày vào bảng "KichCo"
INSERT INTO KichCo (ten_kich_co, mo_ta, trang_thai_id)
=======
  select * from mausac
  -- Thêm bản ghi về kích cỡ sản phẩm giày vào bảng "KichCo"
INSERT INTO KichCo (ten_kich_co, mo_ta, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (N'Size 36', N'Kích cỡ 36', 1),
  (N'Size 37', N'Kích cỡ 37', 1),
  (N'Size 38', N'Kích cỡ 38', 1),
  (N'Size 39', N'Kích cỡ 39', 1),
  (N'Size 40', N'Kích cỡ 40', 1),
  (N'Size 41', N'Kích cỡ 41', 1),
  (N'Size 42', N'Kích cỡ 42', 1),
  (N'Size 43', N'Kích cỡ 43', 1),
  (N'Size 44', N'Kích cỡ 44', 1),
  (N'Size 45', N'Kích cỡ 45', 1);


  -- Thêm bản ghi về hình ảnh sản phẩm giày vào bảng "HinhAnh"
INSERT INTO HinhAnh (ten_hinh_anh, link_hinh_anh, san_pham_id)
VALUES
  (N'Hình ảnh 1', N'link1.jpg', 1),
  (N'Hình ảnh 2', N'link2.jpg', 1),
  (N'Hình ảnh 3', N'link3.jpg', 2),
  (N'Hình ảnh 4', N'link4.jpg', 2),
  (N'Hình ảnh 5', N'link5.jpg', 3),
  (N'Hình ảnh 6', N'link6.jpg', 3),
  (N'Hình ảnh 7', N'link7.jpg', 4),
  (N'Hình ảnh 8', N'link8.jpg', 4),
  (N'Hình ảnh 9', N'link9.jpg', 5),
  (N'Hình ảnh 10', N'link10.jpg', 5);

  -- Thêm bản ghi về khuyến mãi sản phẩm giày vào bảng "KhuyenMai"
<<<<<<< HEAD
INSERT INTO KhuyenMai (ma_khuyen_mai, ten_khuyen_mai, mo_ta_khuyen_mai, gia_tri, ngay_bat_dau, ngay_ket_thuc, trang_thai_id)
=======
INSERT INTO KhuyenMai (ma_khuyen_mai, ten_khuyen_mai, mo_ta_khuyen_mai, gia_tri, ngay_bat_dau, ngay_ket_thuc, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (N'KM001', N'Khuyến mãi 1', N'Giảm giá 10%', 10, N'2023-09-10', N'2023-09-20', 1),
  (N'KM002', N'Khuyến mãi 2', N'Giảm giá 20%', 20, N'2023-09-15', N'2023-09-25', 1),
  (N'KM003', N'Khuyến mãi 3', N'Giảm giá 15%', 15, N'2023-09-12', N'2023-09-22', 1),
  (N'KM004', N'Khuyến mãi 4', N'Giảm giá 30%', 30, N'2023-09-14', N'2023-09-24', 1),
  (N'KM005', N'Khuyến mãi 5', N'Giảm giá 25%', 25, N'2023-09-11', N'2023-09-21', 1),
  (N'KM006', N'Khuyến mãi 6', N'Giảm giá 10%', 10, N'2023-09-13', N'2023-09-23', 1),
  (N'KM007', N'Khuyến mãi 7', N'Giảm giá 15%', 15, N'2023-09-16', N'2023-09-26', 1),
  (N'KM008', N'Khuyến mãi 8', N'Giảm giá 20%', 20, N'2023-09-17', N'2023-09-27', 1),
  (N'KM009', N'Khuyến mãi 9', N'Giảm giá 10%', 10, N'2023-09-18', N'2023-09-28', 1),
  (N'KM010', N'Khuyến mãi 10', N'Giảm giá 15%', 15, N'2023-09-19', N'2023-09-29', 1);

  -- Thêm bản ghi về chi tiết sản phẩm giày vào bảng "ChiTietSanPham"
<<<<<<< HEAD
INSERT INTO ChiTietSanPham (ma_chi_tiet_san_pham, don_gia, so_luong_ton, san_pham_id, kich_co_id, mau_sac_id, chat_lieu_id, trang_thai_id, khuyen_mai_id)
=======
INSERT INTO ChiTietSanPham (ma_chi_tiet_san_pham, don_gia, so_luong_ton, san_pham_id, kich_co_id, mau_sac_id, chat_lieu_id, trang_thai , khuyen_mai_id)
>>>>>>> origin/hiepbhph27531
VALUES
  (N'SP001-001', 100, 50, 1, 1, 1, 1, 1, 1),
  (N'SP001-002', 120, 45, 1, 2, 2, 2, 1, 2),
  (N'SP002-001', 90, 60, 2, 3, 3, 3, 1, 3),
  (N'SP002-002', 110, 55, 2, 4, 4, 4, 1, 4),
  (N'SP003-001', 80, 70, 3, 5, 5, 5, 1, 5),
  (N'SP003-002', 95, 65, 3, 6, 6, 6, 1, 6),
  (N'SP004-001', 70, 80, 4, 7, 7, 7, 1, 7),
  (N'SP004-002', 85, 75, 4, 8, 8, 8, 1, 8),
  (N'SP005-001', 60, 90, 5, 9, 9, 9, 1, 9),
  (N'SP005-002', 75, 85, 5, 10, 10, 10, 1, 10);

  -- Thêm bản ghi về nhân viên vào bảng "NhanVien"
<<<<<<< HEAD
INSERT INTO NhanVien (ho_nhan_vien, ten_nhan_vien, ngay_sinh, gioi_tinh, dia_chi, email, so_dien_thoai, can_cuoc, mat_khau, trang_thai_id,id_tai_khoan)
VALUES
  (N'Nguyễn', N'Văn A', N'1990-01-15', 1, N'123 Đường ABC, Quận 1, TP.HCM', N'nva@example.com', N'0901234567', N'123456789', N'password1', 1,1),
  (N'Trần', N'Thị B', N'1992-05-20', 0, N'456 Đường XYZ, Quận 2, TP.HCM', N'ttb@example.com', N'0912345678', N'987654321', N'password2', 1,2),
  (N'Lê', N'Hữu C', N'1988-11-10', 1, N'789 Đường XYZ, Quận 3, TP.HCM', N'lhc@example.com', N'0923456789', N'111222333', N'password3', 1,3),
  (N'Phạm', N'Duy D', N'1995-03-25', 1, N'321 Đường ABC, Quận 4, TP.HCM', N'pdd@example.com', N'0934567890', N'444555666', N'password4', 1,4),
  (N'Vũ', N'Thị E', N'1993-07-08', 0, N'567 Đường XYZ, Quận 5, TP.HCM', N'vte@example.com', N'0945678901', N'777888999', N'password5', 1,5),
  (N'Hoàng', N'Minh F', N'1991-09-12', 1, N'654 Đường ABC, Quận 6, TP.HCM', N'hmf@example.com', N'0956789012', N'222333444', N'password6', 1,6),
  (N'Đinh', N'Thị G', N'1989-12-30', 0, N'987 Đường XYZ, Quận 7, TP.HCM', N'dtg@example.com', N'0967890123', N'888999000', N'password7', 1,7),
  (N'Bùi', N'Văn H', N'1994-02-18', 1, N'234 Đường ABC, Quận 8, TP.HCM', N'bvh@example.com', N'0978901234', N'555666777', N'password8', 1,8),
  (N'Ngô', N'Thị I', N'1996-06-05', 0, N'543 Đường XYZ, Quận 9, TP.HCM', N'nti@example.com', N'0989012345', N'333444555', N'password9', 1,9),
  (N'Mai', N'Văn K', N'1997-08-22', 1, N'876 Đường XYZ, Quận 10, TP.HCM', N'mvk@example.com', N'0990123456', N'999000111', N'password10', 1,10);



  -- Thêm bản ghi về hóa đơn vào bảng "HoaDon"
INSERT INTO HoaDon (ma_hoa_don, ngay_lap, ghi_chu, khach_hang_id, nguoi_lap_id, trang_thai_id)
=======
INSERT INTO NhanVien (ho_nhan_vien, ten_nhan_vien, ngay_sinh, gioi_tinh, dia_chi, email, so_dien_thoai, can_cuoc, password, trang_thai )
VALUES
  (N'Nguyễn', N'Văn A', N'1990-01-15', 1, N'123 Đường ABC, Quận 1, TP.HCM', N'nva@example.com', N'0901234567', N'123456789', N'password1', 1),
  (N'Trần', N'Thị B', N'1992-05-20', 0, N'456 Đường XYZ, Quận 2, TP.HCM', N'ttb@example.com', N'0912345678', N'987654321', N'password2', 1),
  (N'Lê', N'Hữu C', N'1988-11-10', 1, N'789 Đường XYZ, Quận 3, TP.HCM', N'lhc@example.com', N'0923456789', N'111222333', N'password3', 1),
  (N'Phạm', N'Duy D', N'1995-03-25', 1, N'321 Đường ABC, Quận 4, TP.HCM', N'pdd@example.com', N'0934567890', N'444555666', N'password4', 1),
  (N'Vũ', N'Thị E', N'1993-07-08', 0, N'567 Đường XYZ, Quận 5, TP.HCM', N'vte@example.com', N'0945678901', N'777888999', N'password5', 1),
  (N'Hoàng', N'Minh F', N'1991-09-12', 1, N'654 Đường ABC, Quận 6, TP.HCM', N'hmf@example.com', N'0956789012', N'222333444', N'password6', 1),
  (N'Đinh', N'Thị G', N'1989-12-30', 0, N'987 Đường XYZ, Quận 7, TP.HCM', N'dtg@example.com', N'0967890123', N'888999000', N'password7', 1),
  (N'Bùi', N'Văn H', N'1994-02-18', 1, N'234 Đường ABC, Quận 8, TP.HCM', N'bvh@example.com', N'0978901234', N'555666777', N'password8', 1),
  (N'Ngô', N'Thị I', N'1996-06-05', 0, N'543 Đường XYZ, Quận 9, TP.HCM', N'nti@example.com', N'0989012345', N'333444555', N'password9', 1),
  (N'Mai', N'Văn K', N'1997-08-22', 1, N'876 Đường XYZ, Quận 10, TP.HCM', N'mvk@example.com', N'0990123456', N'999000111', N'password10', 1);

  update NhanVien set user_name='testAdmin2' , password = '$2a$10$w6TXhERSHjD59NJHLadIF.7MR45MoF3.ZvjhIB0ziLY43IAlHAYRq' where id_nhan_vien=3
  insert VaiTroNhanVien (nhan_vien_id,vai_tro_id) values (3,3)

  select * from nhanvien
  select * from VaiTroNhanVien
   select * from VaiTro
  -- Thêm bản ghi về hóa đơn vào bảng "HoaDon"
INSERT INTO HoaDon (ma_hoa_don, ngay_lap, ghi_chu, khach_hang_id, nguoi_lap_id, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (N'HD001', N'2023-09-01', N'Ghi chú hóa đơn 1', 1, 1, 1),
  (N'HD002', N'2023-09-02', N'Ghi chú hóa đơn 2', 2, 2, 1),
  (N'HD003', N'2023-09-03', N'Ghi chú hóa đơn 3', 3, 3, 1),
  (N'HD004', N'2023-09-04', N'Ghi chú hóa đơn 4', 4, 4, 1),
  (N'HD005', N'2023-09-05', N'Ghi chú hóa đơn 5', 5, 5, 1),
  (N'HD006', N'2023-09-06', N'Ghi chú hóa đơn 6', 6, 6, 1),
  (N'HD007', N'2023-09-07', N'Ghi chú hóa đơn 7', 7, 7, 1),
  (N'HD008', N'2023-09-08', N'Ghi chú hóa đơn 8', 8, 8, 1),
  (N'HD009', N'2023-09-09', N'Ghi chú hóa đơn 9', 9, 9, 1),
  (N'HD010', N'2023-09-10', N'Ghi chú hóa đơn 10', 10, 10, 1);

  -- Thêm bản ghi về chi tiết hóa đơn vào bảng "HoaDonChiTiet"
<<<<<<< HEAD
INSERT INTO HoaDonChiTiet (so_luong, don_gia, mo_ta, trang_thai_id, hoa_don_id, chi_tiet_san_pham_id)
=======
INSERT INTO HoaDonChiTiet (so_luong, don_gia, mo_ta, trang_thai , hoa_don_id, chi_tiet_san_pham_id)
>>>>>>> origin/hiepbhph27531
VALUES
  (5, 100, N'Mô tả chi tiết 1', 1, 1, 1),
  (3, 120, N'Mô tả chi tiết 2', 1, 2, 2),
  (6, 90, N'Mô tả chi tiết 3', 1, 3, 3),
  (4, 110, N'Mô tả chi tiết 4', 1, 4, 4),
  (2, 80, N'Mô tả chi tiết 5', 1, 5, 5),
  (7, 95, N'Mô tả chi tiết 6', 1, 6, 6),
  (8, 70, N'Mô tả chi tiết 7', 1, 7, 7),
  (9, 85, N'Mô tả chi tiết 8', 1, 8, 8),
  (10, 60, N'Mô tả chi tiết 9', 1, 9, 9),
  (1, 75, N'Mô tả chi tiết 10', 1, 10, 10);

  -- Thêm bản ghi về địa chỉ vào bảng "DiaChi"
<<<<<<< HEAD
INSERT INTO DiaChi (dia_chi_chi_tiet, phuong_xa_id, quan_huyen_id, thanh_pho_id, trang_thai_id)
=======
INSERT INTO DiaChi (dia_chi_chi_tiet, phuong_xa_id, quan_huyen_id, thanh_pho_id, trang_thai )
>>>>>>> origin/hiepbhph27531
VALUES
  (N'123 Đường ABC, Phường 1, Quận 1, TP.HCM', 1, 1, 1, 1),
  (N'456 Đường XYZ, Phường 2, Quận 2, TP.HCM', 2, 2, 1, 2),
  (N'789 Đường XYZ, Phường 3, Quận 3, TP.HCM', 3, 3, 1, 3),
  (N'321 Đường ABC, Phường 4, Quận 4, TP.HCM', 4, 4, 1, 4),
  (N'567 Đường XYZ, Phường 5, Quận 5, TP.HCM', 5, 5, 1, 5),
  (N'654 Đường ABC, Phường 6, Quận 6, TP.HCM', 6, 6, 1, 6),
  (N'987 Đường XYZ, Phường 7, Quận 7, TP.HCM', 7, 7, 1, 7),
  (N'234 Đường ABC, Phường 8, Quận 8, TP.HCM', 8, 8, 1, 8),
  (N'543 Đường XYZ, Phường 9, Quận 9, TP.HCM', 9, 9, 1, 9),
  (N'876 Đường XYZ, Phường 10, Quận 10, TP.HCM', 10, 10, 1, 10);




