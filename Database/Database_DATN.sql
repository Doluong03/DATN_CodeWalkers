

CREATE TABLE SanPham (
 id uniqueidentifier PRIMARY KEY,
  danh_gia_id uniqueidentifier,
  ma_san_pham varchar(20),
  ten_san_pham varchar(150),
  mo_ta varchar(150),
  created_at date,
  updated_at date,
  deleted_at date,
  trang_thai_id uniqueidentifier
);

CREATE TABLE KichThuoc (
  id uniqueidentifier PRIMARY KEY,
  ma_kich_thuoc varchar(20),
  ten_kich_thuoc varchar(100),
  mo_ta varchar(100),
  trang_thai_id uniqueidentifier,
  created_at date,
  updated_at date,
  deleted_at date
);

CREATE TABLE MauSac (
  id uniqueidentifier PRIMARY KEY,
  ma_mau_sac varchar(20),
  ten_mau_sac varchar(100),
  mo_ta varchar(100),
  trang_thai_id uniqueidentifier,
  created_at date,
  updated_at date,
  deleted_at date
);

CREATE TABLE ThuongHieu (
  id uniqueidentifier PRIMARY KEY,
  ma_thuong_hieu varchar(20),
  ten_thuong_hieu varchar(100),
  mo_ta varchar(100),
  trang_thai_id uniqueidentifier,
  created_at date,
  updated_at date,
  deleted_at date
);

CREATE TABLE DanhGia (
  id uniqueidentifier PRIMARY KEY,
  san_pham_id uniqueidentifier,
  nguoi_dung_id uniqueidentifier,
  ma_danh_gia varchar(20),
  diem_danh_gia float,
  noi_dung varchar(255),
  created_at date
);

CREATE TABLE PhanLoai (
  id uniqueidentifier PRIMARY KEY,
  ma_phan_loai varchar(20),
  ten_phan_loai varchar(100),
  mo_ta varchar(100),
  trang_thai_id uniqueidentifier,
  created_at date,
  updated_at date,
  deleted_at date
);

CREATE TABLE ChatLieu (
  id uniqueidentifier PRIMARY KEY,
  ma_chat_lieu varchar(20),
  ten_chat_lieu varchar(100),
  mo_ta varchar(50),
  trang_thai_id uniqueidentifier,
  created_at date,
  updated_at date,
  deleted_at date
);

CREATE TABLE HinhAnh (
  id uniqueidentifier PRIMARY KEY,
  ma_hinh_anh varchar(20),
  anh_chinh varchar(255),
  anh_phu varchar(255),
  created_at date,
  updated_at date,
  deleted_at date
);

CREATE TABLE TrangThai (
  id uniqueidentifier PRIMARY KEY,
  ten_trang_thai varchar(100)
);

CREATE TABLE SanPhamChiTiet (
  id uniqueidentifier PRIMARY KEY,
  san_pham_id uniqueidentifier,
  kich_thuoc_id uniqueidentifier,
  mau_sac_id uniqueidentifier,
  thuong_hieu_id uniqueidentifier,
  phan_loai_id uniqueidentifier,
  chat_lieu_id uniqueidentifier,
  gia_ban money,
  hinh_anh_id uniqueidentifier,
  trang_thai_id uniqueidentifier,
  so_luong_ton integer
);

CREATE TABLE DiaChi (
  id uniqueidentifier PRIMARY KEY,
  dia_chi_chi_tiet varchar(255),
  phuong_xa_id uniqueidentifier,
  quan_huyen_id uniqueidentifier,
  thanh_pho_id uniqueidentifier
);

CREATE TABLE ThanhPho (
  id uniqueidentifier PRIMARY KEY,
  ma_thanh_pho varchar(20),
  ten_thanh_pho varchar(100)
);

CREATE TABLE QuanHuyen (
  id uniqueidentifier PRIMARY KEY,
  ma_quan_huyen varchar(20),
  ten_quan_huyen varchar(100),
  thanh_pho_id uniqueidentifier
);

CREATE TABLE PhuongXa (
  id uniqueidentifier PRIMARY KEY,
  ma_phuong_xa varchar(20),
  ten_phuong_xa varchar(100),
  thanh_pho_id uniqueidentifier,
  quan_huyen_id uniqueidentifier
);

CREATE TABLE KhachHang (
  id uniqueidentifier PRIMARY KEY,
  ma_dang_nhap varchar(20),
  ho_khach_hang varchar(255),
  ten_dem_khach_hang varchar(255),
  ten_khach_hang varchar(255),
  email varchar(100),
  so_dien_thoai varchar(10),
  mat_khau varchar(30),
  ngay_sinh date,
  gioi_tinh bit,
  hang_id uniqueidentifier,
  dia_chi_id uniqueidentifier,
  trang_thai_id uniqueidentifier,
  vai_tro_id uniqueidentifier
);

CREATE TABLE HoaDon (
  id uniqueidentifier PRIMARY KEY,
  ma_hoa_don varchar(20),
  phuong_thuc_thanh_toan int,
  khach_hang_id uniqueidentifier,
  trang_thai_id uniqueidentifier,
  mo_ta varchar(255),
  created_at date
);

CREATE TABLE HoaDonChiTiet (
  ma_hoa_don uniqueidentifier,
  ma_san_pham uniqueidentifier,
  so_luong integer,
  don_gia money,
  mo_ta varchar(255),
  trang_thai_id uniqueidentifier,
  PRIMARY KEY (ma_hoa_don, ma_san_pham)
);

CREATE TABLE PhieuGiaoHang (
  id uniqueidentifier PRIMARY KEY,
  ma_giao_hang varchar(20),
  nguoi_nhan varchar(255),
  sdt_nguoi_nhan varchar(10),
  nguoi_giao varchar(255),
  sdt_nguoi_giao varchar(10),
  hoa_don_id uniqueidentifier,
  ngay_giao date,
  ngay_nhan date,
  phi_giao_hang money,
  dia_chi_id uniqueidentifier,
  mo_ta varchar(255),
  trang_thai_id uniqueidentifier
);

CREATE TABLE HangKhachHang (
  id uniqueidentifier PRIMARY KEY,
  ma_hang varchar(20),
  ten_hang varchar(255),
  mo_ta varchar(255),
  trang_thai_id uniqueidentifier
);

CREATE TABLE NhanVien (
  id uniqueidentifier PRIMARY KEY,
  ma_nhan_vien varchar(50),
  ho_nhan_vien varchar(255),
  ten_dem_nhan_vien varchar(255),
  ten_nhan_vien varchar(255),
  ngay_sinh date,
  gioi_tinh bit,
  dia_chi varchar(255),
  email varchar(50),
  so_dien_thoai varchar(50),
  trang_thai_id uniqueidentifier,
  can_cuoc varchar(50),
  mat_khau varchar(50)
);

CREATE TABLE VaiTro (
  id uniqueidentifier PRIMARY KEY,
  ten_vai_tro varchar(20),
  trang_thai_id uniqueidentifier
);

CREATE TABLE CaLam (
  id uniqueidentifier PRIMARY KEY,
  nhan_vien_id uniqueidentifier,
  gio_lam date,
  gio_tan_ca date,
  ngay_lam date,
  doanh_thu money
);

CREATE TABLE KhuyenMai (
  id uniqueidentifier PRIMARY KEY,
  ma_khuyen_mai varchar(20),
  ten_khuyen_mai varchar(255),
  gia_tri float,
  hinh_thuc_giam_gia INT,
  ngay_bat_dau DATE,
  ngay_ket_thuc DATE,
  hieu_luc INT,
  trang_thai_id uniqueidentifier,
  san_pham_id uniqueidentifier
);

CREATE TABLE Voucher (
  id uniqueidentifier PRIMARY KEY,
  ma_voucher varchar(20),
  ten_voucher varchar(255),
  gia_tri float,
  hinh_thuc_giam_gia INT,
  dieu_kien_giam_gia FLOAT,
  ngay_bat_dau DATE,
  ngay_ket_thuc DATE,
  hieu_luc INT,
  trang_thai_id uniqueidentifier,
  so_luong INT,
  san_pham_id uniqueidentifier
);

ALTER TABLE SanPhamChiTiet ADD FOREIGN KEY (san_pham_id) REFERENCES SanPham (id);

ALTER TABLE SanPhamChiTiet ADD FOREIGN KEY (kich_thuoc_id) REFERENCES KichThuoc (id);

ALTER TABLE SanPhamChiTiet ADD FOREIGN KEY (mau_sac_id) REFERENCES MauSac (id);

ALTER TABLE SanPhamChiTiet ADD FOREIGN KEY (thuong_hieu_id) REFERENCES ThuongHieu (id);

ALTER TABLE SanPhamChiTiet ADD FOREIGN KEY (phan_loai_id) REFERENCES PhanLoai (id);

ALTER TABLE SanPhamChiTiet ADD FOREIGN KEY (chat_lieu_id) REFERENCES ChatLieu (id);

ALTER TABLE SanPhamChiTiet ADD FOREIGN KEY (hinh_anh_id) REFERENCES HinhAnh (id);

ALTER TABLE SanPhamChiTiet ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE SanPham ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE ChatLieu ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE MauSac ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE ThuongHieu ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE PhanLoai ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE KichThuoc ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE Voucher ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE KhuyenMai ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE HangKhachHang ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE PhieuGiaoHang ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE HoaDon ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE HoaDonChiTiet ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE DanhGia ADD FOREIGN KEY (san_pham_id) REFERENCES SanPham (id);

ALTER TABLE DanhGia ADD FOREIGN KEY (nguoi_dung_id) REFERENCES KhachHang (id);

ALTER TABLE KhachHang ADD FOREIGN KEY (dia_chi_id) REFERENCES DiaChi (id);

ALTER TABLE KhachHang ADD FOREIGN KEY (hang_id) REFERENCES HangKhachHang (id);

ALTER TABLE KhachHang ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE NhanVien ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id);

ALTER TABLE CaLam ADD FOREIGN KEY (nhan_vien_id) REFERENCES NhanVien (id);

ALTER TABLE HoaDon ADD FOREIGN KEY (khach_hang_id) REFERENCES KhachHang (id);

ALTER TABLE HoaDonChiTiet ADD FOREIGN KEY (ma_hoa_don) REFERENCES HoaDon (id);

ALTER TABLE HoaDonChiTiet ADD FOREIGN KEY (ma_san_pham) REFERENCES SanPham (id);

ALTER TABLE PhieuGiaoHang ADD FOREIGN KEY (hoa_don_id) REFERENCES HoaDon (id);

ALTER TABLE PhieuGiaoHang ADD FOREIGN KEY (dia_chi_id) REFERENCES DiaChi (id);

ALTER TABLE KhuyenMai ADD FOREIGN KEY (san_pham_id) REFERENCES SanPham (id);

ALTER TABLE Voucher ADD FOREIGN KEY (san_pham_id) REFERENCES SanPham (id);

ALTER TABLE DiaChi ADD FOREIGN KEY (phuong_xa_id) REFERENCES PhuongXa (id);

ALTER TABLE DiaChi ADD FOREIGN KEY (thanh_pho_id) REFERENCES ThanhPho (id);

ALTER TABLE DiaChi ADD FOREIGN KEY (quan_huyen_id) REFERENCES QuanHuyen (id);

ALTER TABLE QuanHuyen ADD FOREIGN KEY (thanh_pho_id) REFERENCES ThanhPho (id);

ALTER TABLE PhuongXa ADD FOREIGN KEY (thanh_pho_id) REFERENCES ThanhPho (id);

ALTER TABLE PhuongXa ADD FOREIGN KEY (quan_huyen_id) REFERENCES QuanHuyen (id);



--insert du lieu

INSERT INTO TrangThai (id, ten_trang_thai)
VALUES
('3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', 'Đang hoạt động'),
('3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', 'Ngừng hoạt động');

INSERT INTO SanPham (id, ma_san_pham, ten_san_pham, mo_ta, trang_thai_id)
VALUES 
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'SP006', N'Giày Thể Thao Nam Bitis Hunter', N'Áo len xám chất liệu cao cấp', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c9', 'SP007', N'Giày Đá Banh Nam Bitis Football', N'Quần short đen thể thao', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('6ba7b810-9dad-11d1-80b4-00c04fd430ca', 'SP008', N'Giày Thể Thao Cao Cấp Nữ Bitis Hunter X Layered Upper', N'Giày thể thao trắng mẫu mới', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('6ba7b810-9dad-11d1-80b4-00c04fd430cb', 'SP009', N'Dép xỏ ngón đế dày', N'Áo khoác denim dáng dài', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('6ba7b810-9dad-11d1-80b4-00c04fd430cc', 'SP010', N'Dép Sandal Lavina Carpio', N'Váy ngắn họa tiết mùa hè', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f');

INSERT INTO KichThuoc (id, ma_kich_thuoc, ten_kich_thuoc, mo_ta, trang_thai_id)
VALUES
('d7497688-4c1f-11ec-8fbb-7f7f7f7f7f70', 'XS', 'Size XS', N'Kích thước XS', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('d7497688-4c1f-11ec-8fbb-7f7f7f7f7f71', 'S', 'Size S', N'Kích thước S', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('d7497688-4c1f-11ec-8fbb-7f7f7f7f7f72', 'M', 'Size M', N'Kích thước M', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('d7497688-4c1f-11ec-8fbb-7f7f7f7f7f73', 'L', 'Size L', N'Kích thước L', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('d7497688-4c1f-11ec-8fbb-7f7f7f7f7f74', 'XL', 'Size XL', N'Kích thước XL', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f');

INSERT INTO MauSac (id, ma_mau_sac, ten_mau_sac, mo_ta, trang_thai_id)
VALUES
('9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f70', 'MS001', N'Đỏ', N'Màu đỏ', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f71', 'MS002', N'Xanh lá cây', N'Màu xanh lá cây', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f72', 'MS003', N'Xanh dương', N'Màu xanh dương', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f73', 'MS004', N'Vàng', N'Màu vàng', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f74', 'MS005', N'Hồng', N'Màu hồng', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f');

INSERT INTO ThuongHieu (id, ma_thuong_hieu, ten_thuong_hieu, mo_ta, trang_thai_id)
VALUES
('be458be4-4c1f-11ec-8fbb-7f7f7f7f7f70', 'TH001', 'Adidas', N'Thương hiệu Adidas', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('be458be4-4c1f-11ec-8fbb-7f7f7f7f7f71', 'TH002', 'Nike', N'Thương hiệu Nike', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('be458be4-4c1f-11ec-8fbb-7f7f7f7f7f72', 'TH003', 'Puma', N'Thương hiệu Puma', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('be458be4-4c1f-11ec-8fbb-7f7f7f7f7f73', 'TH004', 'Converse', N'Thương hiệu Converse', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('be458be4-4c1f-11ec-8fbb-7f7f7f7f7f74', 'TH005', 'Vans', N'Thương hiệu Vans', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f');

INSERT INTO PhanLoai (id, ma_phan_loai, ten_phan_loai, mo_ta, trang_thai_id)
VALUES
('9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f70', 'PL001', N'Áo thun', N'Phân loại sản phẩm là áo thun', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f71', 'PL002', N'Quần jeans', N'Phân loại sản phẩm là quần jeans', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f72', 'PL003', N'Giày cao gót', N'Phân loại sản phẩm là giày cao gót', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f73', 'PL004', N'Váy dài', N'Phân loại sản phẩm là váy dài', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f74', 'PL005', N'Quần short', N'Phân loại sản phẩm là quần short', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f');

INSERT INTO ChatLieu (id, ma_chat_lieu, ten_chat_lieu, mo_ta, trang_thai_id)
VALUES
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', 'CL001', N'Vải thun', N'Chất liệu của sản phẩm là vải thun', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', 'CL002', N'Vải jeans', N'Chất liệu của sản phẩm là vải jeans', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', 'CL003', N'Da tổng hợp', N'Chất liệu của sản phẩm là da tổng hợp', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', 'CL004', N'Len', N'Chất liệu của sản phẩm là len', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', 'CL005', N'Da thật', N'Chất liệu của sản phẩm là da thật', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f');

INSERT INTO HinhAnh (id, ma_hinh_anh, anh_chinh, anh_phu, created_at)
VALUES
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70', 'HA001', 'https://example.com/anh1.jpg', 'https://example.com/anh1_1.jpg', '2023-07-27 12:00:00'),
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f71', 'HA002', 'https://example.com/anh2.jpg', 'https://example.com/anh2_1.jpg', '2023-07-27 13:30:00'),
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f72', 'HA003', 'https://example.com/anh3.jpg', 'https://example.com/anh3_1.jpg', '2023-07-27 14:45:00'),
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f73', 'HA004', 'https://example.com/anh4.jpg', 'https://example.com/anh4_1.jpg', '2023-07-27 16:00:00'),
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f74', 'HA005', 'https://example.com/anh5.jpg', 'https://example.com/anh5_1.jpg', '2023-07-27 17:20:00');

INSERT INTO ThanhPho (id, ma_thanh_pho, ten_thanh_pho)
VALUES
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70', 'TPHCM', N'Thành phố Hồ Chí Minh'),
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f71', 'HN', N'Hà Nội'),
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f72', 'DN', N'Đà Nẵng'),
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f73', 'HP', N'Hải Phòng'),
('e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f74', 'CT', N'Cần Thơ');

INSERT INTO QuanHuyen (id, ma_quan_huyen, ten_quan_huyen, thanh_pho_id)
VALUES
('d8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70', 'Q1', N'Quận 1', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('d8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f71', 'Q3', N'Quận 3', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('d8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f72', 'Q10', N'Quận 10', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('d8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f73', 'QBT', N'Quận Bình Thạnh', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('d8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f74', 'QTP', N'Quận Tân Phú', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70');

INSERT INTO PhuongXa (id, ma_phuong_xa, ten_phuong_xa, thanh_pho_id, quan_huyen_id)
VALUES
('0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f70', 'PX1', N'Phường 1', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f71', 'PX2', N'Phường 2', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f72', 'PX5', N'Phường 5', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f73', 'PX7', N'Phường 7', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f74', 'PX10', N'Phường 10', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70');

INSERT INTO DiaChi (id, dia_chi_chi_tiet, phuong_xa_id, quan_huyen_id, thanh_pho_id)
VALUES
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', N'123 Đường ABC, Phường 1', '0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f70', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', N'456 Đường XYZ, Phường 2', '0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f71', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', N'789 Đường DEF, Phường 5', '0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f72', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', N'246 Đường LMN, Phường 7', '0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f73', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', N'789 Đường UVW, Phường 10', '0d89d23c-4c20-11ec-8fbb-7f7f7f7f7f74', 'd8e2f856-4c1f-11ec-8fbb-7f7f7f7f7f70', 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70');

INSERT INTO HangKhachHang (id, ma_hang, ten_hang)
VALUES
('9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f70', 'A001', N'Hạng Kim cương'),
('9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f71', 'A002', N'Hạng Bạch kim'),
('9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f72', 'A003', N'Hạng Vàng'),
('9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f73', 'A004', N'Hạng Bạc'),
('9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f74', 'A005', N'Hạng Đồng');

INSERT INTO NhanVien (id, ma_nhan_vien, ho_nhan_vien, ten_dem_nhan_vien, ten_nhan_vien, ngay_sinh, gioi_tinh, dia_chi, email, so_dien_thoai, trang_thai_id, can_cuoc, mat_khau)
VALUES
('b97d62de-4c20-11ec-8fbb-7f7f7f7f7f70', 'NV001', 'Nguyễn', 'Văn', 'A', '1990-01-10', 1, '123 Đường XYZ, Quận 1', 'nguyen.a@example.com', '0901234567', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', '123456789', 'password123'),
('b97d62de-4c20-11ec-8fbb-7f7f7f7f7f71', 'NV002', 'Trần', 'Thị', 'B', '1985-05-15', 0, '456 Đường ABC, Quận 3', 'tran.b@example.com', '0912345678', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', '987654321', 'password456'),
('b97d62de-4c20-11ec-8fbb-7f7f7f7f7f72', 'NV003', 'Lê', 'Văn', 'C', '1995-09-20', 1, '789 Đường LMN, Quận 5', 'le.c@example.com', '0987654321', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', '543216789', 'password789'),
('b97d62de-4c20-11ec-8fbb-7f7f7f7f7f73', 'NV004', 'Phạm', 'Thị', 'D', '1992-03-25', 0, '246 Đường UVW, Quận 7', 'pham.d@example.com', '0978563412', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', '987123654', 'passwordabc'),
('b97d62de-4c20-11ec-8fbb-7f7f7f7f7f74', 'NV005', 'Ngô', 'Văn', 'E', '1988-12-05', 1, '789 Đường IJK, Quận 10', 'ngo.e@example.com', '0967854321', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', '654321987', 'passworddef');

INSERT INTO CaLam (id, nhan_vien_id, gio_lam, gio_tan_ca, ngay_lam, doanh_thu)
VALUES
('fb33bffa-4c20-11ec-8fbb-7f7f7f7f7f70', 'b97d62de-4c20-11ec-8fbb-7f7f7f7f7f70', '08:00:00', '16:00:00', '2023-12-01', 50000000),
('fb33bffa-4c20-11ec-8fbb-7f7f7f7f7f71', 'b97d62de-4c20-11ec-8fbb-7f7f7f7f7f71', '08:30:00', '16:30:00', '2023-12-01', 45000000),
('fb33bffa-4c20-11ec-8fbb-7f7f7f7f7f72', 'b97d62de-4c20-11ec-8fbb-7f7f7f7f7f72', '09:00:00', '17:00:00', '2023-12-01', 40000000),
('fb33bffa-4c20-11ec-8fbb-7f7f7f7f7f73', 'b97d62de-4c20-11ec-8fbb-7f7f7f7f7f73', '09:30:00', '17:30:00', '2023-12-01', 35000000),
('fb33bffa-4c20-11ec-8fbb-7f7f7f7f7f74', 'b97d62de-4c20-11ec-8fbb-7f7f7f7f7f74', '10:00:00', '18:00:00', '2023-12-01', 30000000);

INSERT INTO KhuyenMai (id, ma_khuyen_mai, ten_khuyen_mai, gia_tri, hinh_thuc_giam_gia, ngay_bat_dau, ngay_ket_thuc, hieu_luc, trang_thai_id, san_pham_id)
VALUES
('8d7c0bb8-4c21-11ec-8fbb-7f7f7f7f7f70', 'KM001', N'Khuyến mãi 1', 0.2, 1, '2023-12-01', '2023-12-10', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', '6ba7b810-9dad-11d1-80b4-00c04fd430cb'),
('8d7c0bb8-4c21-11ec-8fbb-7f7f7f7f7f71', 'KM002', N'Khuyến mãi 2', 100000, 2, '2023-12-05', '2023-12-15', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', '6ba7b810-9dad-11d1-80b4-00c04fd430c8'),
('8d7c0bb8-4c21-11ec-8fbb-7f7f7f7f7f72', 'KM003', N'Khuyến mãi 3', 0.1, 1, '2023-12-10', '2023-12-20', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', '6ba7b810-9dad-11d1-80b4-00c04fd430c9'),
('8d7c0bb8-4c21-11ec-8fbb-7f7f7f7f7f73', 'KM004', N'Khuyến mãi 4', 50000, 2, '2023-12-15', '2023-12-25', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', '6ba7b810-9dad-11d1-80b4-00c04fd430ca'),
('8d7c0bb8-4c21-11ec-8fbb-7f7f7f7f7f74', 'KM005', N'Khuyến mãi 5', 0.15, 1, '2023-12-20', '2023-12-30', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', '6ba7b810-9dad-11d1-80b4-00c04fd430cc');

INSERT INTO Voucher (id, ma_voucher, ten_voucher, gia_tri, hinh_thuc_giam_gia, dieu_kien_giam_gia, ngay_bat_dau, ngay_ket_thuc, hieu_luc, trang_thai_id, so_luong, san_pham_id)
VALUES
('f70b92f0-4c21-11ec-8fbb-7f7f7f7f7f70', 'VC001', N'Voucher 1', 100000, 1, 500000, '2023-12-01', '2023-12-15', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', 50, '6ba7b810-9dad-11d1-80b4-00c04fd430cb'),
('f70b92f0-4c21-11ec-8fbb-7f7f7f7f7f71', 'VC002', N'Voucher 2', 0.2, 2, 200000, '2023-12-05', '2023-12-20', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', 100, '6ba7b810-9dad-11d1-80b4-00c04fd430c8'),
('f70b92f0-4c21-11ec-8fbb-7f7f7f7f7f72', 'VC003', N'Voucher 3', 0.1, 1, 100000, '2023-12-10', '2023-12-25', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', 200, '6ba7b810-9dad-11d1-80b4-00c04fd430c9'),
('f70b92f0-4c21-11ec-8fbb-7f7f7f7f7f73', 'VC004', N'Voucher 4', 0.15, 2, 150000, '2023-12-15', '2023-12-30', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', 300, '6ba7b810-9dad-11d1-80b4-00c04fd430ca'),
('f70b92f0-4c21-11ec-8fbb-7f7f7f7f7f74', 'VC005', N'Voucher 5', 0.3, 1, 300000, '2023-12-20', '2023-12-31', 1, '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', 500, '6ba7b810-9dad-11d1-80b4-00c04fd430cc');

INSERT INTO SanPhamChiTiet (id, san_pham_id, kich_thuoc_id, mau_sac_id, thuong_hieu_id, phan_loai_id, chat_lieu_id, gia_ban, hinh_anh_id, trang_thai_id, so_luong_ton)
VALUES
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', '6ba7b810-9dad-11d1-80b4-00c04fd430cb', 'd7497688-4c1f-11ec-8fbb-7f7f7f7f7f70', '9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f70', 'be458be4-4c1f-11ec-8fbb-7f7f7f7f7f70', '9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f70', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', 1000000, 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f70', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', 50),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'd7497688-4c1f-11ec-8fbb-7f7f7f7f7f71', '9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f71', 'be458be4-4c1f-11ec-8fbb-7f7f7f7f7f71', '9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f71', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', 1500000, 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f71', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', 30),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', '6ba7b810-9dad-11d1-80b4-00c04fd430c9', 'd7497688-4c1f-11ec-8fbb-7f7f7f7f7f72', '9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f72', 'be458be4-4c1f-11ec-8fbb-7f7f7f7f7f72', '9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f72', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', 800000, 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f72', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', 70),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', '6ba7b810-9dad-11d1-80b4-00c04fd430ca', 'd7497688-4c1f-11ec-8fbb-7f7f7f7f7f73', '9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f73', 'be458be4-4c1f-11ec-8fbb-7f7f7f7f7f73', '9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f73', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', 1200000, 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f73', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', 40),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', '6ba7b810-9dad-11d1-80b4-00c04fd430cc', 'd7497688-4c1f-11ec-8fbb-7f7f7f7f7f74', '9e94b6e0-4c1f-11ec-8fbb-7f7f7f7f7f74', 'be458be4-4c1f-11ec-8fbb-7f7f7f7f7f74', '9b0978b8-4c1f-11ec-8fbb-7f7f7f7f7f74', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', 900000, 'e0eaf9a2-4c1f-11ec-8fbb-7f7f7f7f7f74', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', 60);

INSERT INTO KhachHang (id, ma_dang_nhap, ho_khach_hang, ten_dem_khach_hang, ten_khach_hang, email, so_dien_thoai, mat_khau, ngay_sinh, gioi_tinh, hang_id, dia_chi_id, trang_thai_id)
VALUES
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', 'user1', N'Nguyễn', N'Văn', 'A', 'user1@example.com', '0987654321', 'hashed_password_1', '1990-01-01', 1, '9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f70', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', 'user2', N'Trần', N'Thị', 'B', 'user2@example.com', '0123456789', 'hashed_password_2', '1985-05-15', 0, '9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f71', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', 'user3', N'Lê', N'Thành', 'C', 'user3@example.com', '0912345678', 'hashed_password_3', '1995-11-30', 1, '9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f72', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', 'user4', N'Phạm', N'Ngọc', 'D', 'user4@example.com', '0987123456', 'hashed_password_4', '2000-09-20', 0, '9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f73', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', 'user5', N'Vũ', N'Mai', 'E', 'user5@example.com', '0909090909', 'hashed_password_5', '1988-12-25', 1, '9f3280a8-4c1f-11ec-8fbb-7f7f7f7f7f74', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f');

INSERT INTO HoaDon (id, ma_hoa_don, phuong_thuc_thanh_toan, khach_hang_id, trang_thai_id, mo_ta, created_at)
VALUES
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', 'HD001', 0, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', N'Đặt hàng thành công', '2023-07-27 10:00:00'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', 'HD002', 1, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', N'Đang giao hàng', '2023-07-27 12:30:00'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', 'HD003', 2, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', N'Hoàn thành', '2023-07-27 15:20:00'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', 'HD004', 1, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f', N'Đang xử lý', '2023-07-27 17:45:00'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', 'HD005', 2, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f71', N'Đã hủy', '2023-07-27 20:10:00');

INSERT INTO HoaDonChiTiet (ma_hoa_don, ma_san_pham, so_luong, don_gia, mo_ta, trang_thai_id)
VALUES
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 2, 500000, N'Áo sơ mi trắng', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', '6ba7b810-9dad-11d1-80b4-00c04fd430c9', 1, 750000, N'Quần jeans xanh', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', '6ba7b810-9dad-11d1-80b4-00c04fd430ca', 3, 300000, N'Áo thun đen', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', '6ba7b810-9dad-11d1-80b4-00c04fd430cb', 1, 1200000, N'Áo khoác nỉ', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', '6ba7b810-9dad-11d1-80b4-00c04fd430cc', 2, 800000, N'Áo polo xanh', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f');

INSERT INTO PhieuGiaoHang (id, ma_giao_hang, nguoi_nhan, sdt_nguoi_nhan, nguoi_giao, sdt_nguoi_giao, hoa_don_id, ngay_giao, ngay_nhan, phi_giao_hang, dia_chi_id, mo_ta, trang_thai_id)
VALUES
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', 'PGH001', N'Nguyễn Văn A', '0987654321', N'Phạm Thị B', '0912345678', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', '2023-07-28 10:00:00', '2023-07-28 10:30:00', 30000, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', N'Giao hàng nhanh', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', 'PGH002', N'Trần Thị C', '0123456789', N'Lê Văn D', '0909090909', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', '2023-07-29 14:00:00', '2023-07-29 14:30:00', 25000, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', N'Giao hàng tiết kiệm', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', 'PGH003', N'Vũ Mai E', '0900000000', N'Nguyễn Thành F', '0988888888', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', '2023-07-30 16:00:00', '2023-07-30 16:30:00', 35000, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', N'Giao hàng nhanh', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', 'PGH004', N'Phạm Văn G', '0977777777', N'Trần Thị H', '0900000000', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', '2023-07-31 11:00:00', '2023-07-31 11:30:00', 28000, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', N'Giao hàng tiết kiệm', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f'),
('ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', 'PGH005', N'Lê Thị I', '0966666666', N'Vũ Văn K', '0911111111', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', '2023-08-01 13:00:00', '2023-08-01 13:30:00', 32000, 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', N'Giao hàng tiết kiệm', '3f6d0390-4c1f-11ec-8fbb-7f7f7f7f7f7f');

INSERT INTO DanhGia (id, san_pham_id, nguoi_dung_id, ma_danh_gia, diem_danh_gia, noi_dung, created_at)
VALUES
('6ba7b810-9dad-11d1-80b4-00c04fd430c7', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f70', 'DG001', 4.5, N'Sản phẩm rất tốt', '2023-07-27 12:00:00'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '6ba7b810-9dad-11d1-80b4-00c04fd430c9', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f71', 'DG002', 5.0, N'Sản phẩm đáng mua', '2023-07-27 13:30:00'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c9', '6ba7b810-9dad-11d1-80b4-00c04fd430ca', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f72', 'DG003', 4.0, N'Sản phẩm chất lượng', '2023-07-27 14:45:00'),
('6ba7b810-9dad-11d1-80b4-00c04fd430ca', '6ba7b810-9dad-11d1-80b4-00c04fd430cb', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f73', 'DG004', 4.8, N'Sản phẩm đẹp và tiện dụng', '2023-07-27 16:00:00'),
('6ba7b810-9dad-11d1-80b4-00c04fd430cb', '6ba7b810-9dad-11d1-80b4-00c04fd430cc', 'ab6cf07c-4c1f-11ec-8fbb-7f7f7f7f7f74', 'DG005', 3.5, N'Sản phẩm hơi kém chất lượng', '2023-07-27 17:20:00');
