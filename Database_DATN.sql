--create database DATN_V2

CREATE TABLE TrangThai (
  id_trang_thai int PRIMARY KEY Identity(1,1),
  ten_trang_thai NVARCHAR(100)
);

CREATE TABLE SanPham (
  id_san_pham int PRIMARY KEY Identity(1,1) NOT NULL,
  ma_san_pham NVARCHAR(20) DEFAULT NULL,
  ten_san_pham NVARCHAR(150) DEFAULT NULL,
  anh_chinh NVARCHAR(255) NOT NULL, 
  mo_ta NVARCHAR(150) DEFAULT NULL,
  phan_loai_id int DEFAULT NULL,
  thuong_hieu_id int DEFAULT NULL,
  danh_gia_id int DEFAULT NULL,
  ngay_tao DATE DEFAULT NULL,
  ngay_sua DATE DEFAULT NULL,
  trang_thai_id int DEFAULT NULL
);
CREATE TABLE SanXuat (
  id_san_xuat int PRIMARY KEY Identity(1,1) NOT NULL,
  ten_san_xuat NVARCHAR(100)DEFAULT NULL,
  mo_ta NVARCHAR(255)DEFAULT NULL,
  trang_thai_id int DEFAULT NULL
);

CREATE TABLE KichCo (
  id_kich_co int PRIMARY KEY Identity(1,1) NOT NULL,
  ten_kich_co NVARCHAR(100)DEFAULT NULL,
  mo_ta NVARCHAR(255)DEFAULT NULL,
  trang_thai_id int DEFAULT NULL
);

CREATE TABLE MauSac (
  id_mau_sac int PRIMARY KEY Identity(1,1) NOT NULL,
  ten_mau_sac NVARCHAR(100)DEFAULT NULL,
  trang_thai_id int DEFAULT NULL,
);

CREATE TABLE ThuongHieu (
  id_thuong_hieu int PRIMARY KEY Identity(1,1) NOT NULL,
  ten_thuong_hieu NVARCHAR(100)DEFAULT NULL,
  mo_ta NVARCHAR(255)DEFAULT NULL,
  trang_thai_id int,
);

CREATE TABLE DanhGia (
  id_danh_gia int PRIMARY KEY Identity(1,1) NOT NULL,
  danh_gia int DEFAULT NULL,
  noi_dung NVARCHAR(255) DEFAULT NULL,
  ngay_tao DATE DEFAULT NULL,
  ngay_sua DATE DEFAULT NULL,
  chi_tiet_san_pham_id int DEFAULT NULL,
  khach_hang_id int DEFAULT NULL,
  trang_thai_id int DEFAULT NULL
);

CREATE TABLE PhanLoai (
  id_phan_loai int PRIMARY KEY Identity(1,1) NOT NULL,
  ten_phan_loai NVARCHAR(100)DEFAULT NULL,
  trang_thai_id int DEFAULT NULL
);

CREATE TABLE ChatLieu (
  id_chat_lieu int PRIMARY KEY Identity(1,1) NOT NULL,
  ten_chat_lieu NVARCHAR(100)DEFAULT NULL ,
  mo_ta NVARCHAR(50) DEFAULT NULL,
  trang_thai_id int DEFAULT NULL,
);

CREATE TABLE HinhAnh (
  id_hinh_anh int PRIMARY KEY Identity(1,1) NOT NULL,
  ten_hinh_anh NVARCHAR(255)DEFAULT NULL,
  link_hinh_anh NVARCHAR(255)DEFAULT NULL,
  san_pham_id int DEFAULT NULL
);


CREATE TABLE KhuyenMai (
  id_khuyen_mai int PRIMARY KEY Identity(1,1) NOT NULL,
  ma_khuyen_mai NVARCHAR(20)DEFAULT NULL,
  ten_khuyen_mai NVARCHAR(255)DEFAULT NULL,
  mo_ta_khuyen_mai NVARCHAR(255)DEFAULT NULL,
  gia_tri float DEFAULT NULL,
  ngay_bat_dau DATE DEFAULT NULL,
  ngay_ket_thuc DATE DEFAULT NULL,
  trang_thai_id int DEFAULT NULL,
);


CREATE TABLE ChiTietSanPham (
  id_chi_tiet_san_pham int PRIMARY KEY Identity(1,1) NOT NULL,
  ma_chi_tiet_san_pham NVARCHAR(20) DEFAULT NULL,
  don_gia float DEFAULT NULL,
  so_luong_ton int DEFAULT NULL,
  san_pham_id int DEFAULT NULL,
  kich_co_id int DEFAULT NULL,
  mau_sac_id int DEFAULT NULL,
  san_xuat_id int DEFAULT NULL,
  chat_lieu_id int DEFAULT NULL,
  trang_thai_id int DEFAULT NULL,
  ngay_tao DATE DEFAULT NULL,
  ngay_sua DATE DEFAULT NULL,
  khuyen_mai_id int DEFAULT NULL
);

CREATE TABLE DiaChi (
  id_dia_chi int PRIMARY KEY Identity(1,1) NOT NULL,
  dia_chi_chi_tiet NVARCHAR(255)DEFAULT NULL,
  phuong_xa_id int DEFAULT NULL,
  quan_huyen_id int DEFAULT NULL,
  thanh_pho_id int DEFAULT NULL,
  trang_thai_id int DEFAULT NULL,
  khach_hang_id int DEFAULT NULL
);

CREATE TABLE KhachHang (
  id_khach_hang int PRIMARY KEY Identity(1,1) NOT NULL,
  ten_khach_hang NVARCHAR(255) DEFAULT NULL,
  email NVARCHAR(100) DEFAULT NULL,
  so_dien_thoai NVARCHAR(10) DEFAULT NULL,
  ngay_sinh DATE DEFAULT NULL,
  gioi_tinh bit DEFAULT NULL,
  ngay_tao DATE DEFAULT NULL,
  ngay_sua DATE DEFAULT NULL,
  hang_id int DEFAULT NULL,
  trang_thai_id int DEFAULT NULL,
  id_tai_khoan INT DEFAULT NULL,
  hinh_anh   NVARCHAR(max) DEFAULT NULL
  dia_chi   NVARCHAR(max) default null
);

CREATE TABLE HoaDon (
  id_hoa_don int PRIMARY KEY Identity(1,1) NOT NULL,
  ma_hoa_don NVARCHAR(20)DEFAULT NULL,
  ngay_lap  DATE DEFAULT NULL,
  dia_chi_chi_tiet NVARCHAR(255)DEFAULT NULL,
  phuong_xa_id int DEFAULT NULL,
  quan_huyen_id int DEFAULT NULL,
  thanh_pho_id int DEFAULT NULL,
  ngay_giao date DEFAULT NULL,
  phi_giao_hang float DEFAULT NULL,
  ghi_chu NVARCHAR(255) DEFAULT NULL,
  tong_tien float DEFAULT NULL,
  phuong_thuc int DEFAULT NULL,
  khach_hang_id int DEFAULT NULL,
  nguoi_lap_id int DEFAULT NULL,
  trang_thai_id int DEFAULT NULL
);

CREATE TABLE HoaDonChiTiet (
  id_hoa_don_chi_tiet int PRIMARY KEY Identity(1,1) NOT NULL,
  so_luong int DEFAULT NULL,
  don_gia float DEFAULT NULL,
  mo_ta NVARCHAR(255) DEFAULT NULL,
  trang_thai_id int DEFAULT NULL,
  hoa_don_id int DEFAULT NULL,
  chi_tiet_san_pham_id int DEFAULT NULL,
);

CREATE TABLE HangKhachHang (
  id_hang int PRIMARY KEY Identity(1,1) NOT NULL,
  ten_hang NVARCHAR(255) DEFAULT NULL,
  mo_ta NVARCHAR(255)DEFAULT NULL,
  trang_thai_id int DEFAULT NULL
);

CREATE TABLE NhanVien (
  id_nhan_vien int PRIMARY KEY Identity(1,1),
  ho_nhan_vien NVARCHAR(255),
  ten_nhan_vien NVARCHAR(255),
  ngay_sinh date,
  gioi_tinh bit,
  dia_chi NVARCHAR(255),
  email NVARCHAR(50),
  so_dien_thoai NVARCHAR(50),
  can_cuoc NVARCHAR(50),
  mat_khau NVARCHAR(50),
  trang_thai_id int,
  id_tai_khoan INT DEFAULT NULL,
  hinh_anh NVARCHAR(max) DEFAULT NULL
);

CREATE TABLE GioHang(
	id_gio_hang	int PRIMARY KEY Identity(1,1),
	ngay_tao		DATE,
	ngay_sua	DATE,
	khach_hang_id	int 
		REFERENCES KhachHang(id_khach_hang),
	ghi_chu		NVARCHAR(MAX),
	trang_thai	INT,
)

CREATE TABLE GioHangChiTiet(
	id_gio_hang_chi_tiet int PRIMARY KEY Identity(1,1),
	gio_hang_id	int
		REFERENCES GioHang(id_gio_hang),
	chi_tiet_san_pham_id	int
		REFERENCES ChiTietSanPham(id_chi_tiet_san_pham),
	so_luong		INT,
	ghi_chu		NVARCHAR(MAX),
	trang_thai	INT,
)

CREATE TABLE DanhSachYeuThich(	
	id_danh_sach	int PRIMARY KEY Identity(1,1),
	ngay_tao		DATE,
	ngay_sua	DATE,

	khach_hang_id	int 
		REFERENCES KhachHang(id_khach_hang),
	ghi_chu		NVARCHAR(MAX),
	trang_thai	INT,
)
GO

CREATE TABLE YeuThichChiTiet(
id_yeu_thich int PRIMARY KEY Identity(1,1),
	danh_sach_id	int
		REFERENCES DanhSachYeuThich(id_danh_sach),
	chi_tiet_san_pham_id	int
		REFERENCES ChiTietSanPham(id_chi_tiet_san_pham),

	ghi_chu		NVARCHAR(MAX),
	trang_thai	INT,
)

CREATE TABLE VaiTro (
  id int PRIMARY KEY Identity(1,1),
  ten_vai_tro NVARCHAR(20),
);



create table TaiKhoan (
 id int PRIMARY KEY Identity(1,1),
 user_name nvarchar(12),
 password nvarchar(12),
 vai_tro_id int,
 trang_thai_id int
)


CREATE TABLE CaLam (
  id int PRIMARY KEY Identity(1,1),
  nhan_vien_id int,
  gio_lam date,
  gio_tan_ca date,
  ngay_lam date,
  doanh_thu money
);

alter table KhachHang add vai_tro nvarchar(20)
  alter table KhachHang add user_name nvarchar(20) 
  alter table KhachHang add password nvarchar(max)
  create table VaiTroNhanVien(
     nhan_vien_id int ,
	 vai_tro_id int ,
)
alter table NhanVien add user_name nvarchar(20) 
alter table NhanVien add password nvarchar(max) 
alter table NhanVien add trang_thai bit default 1

-----Chi tiet san pham-----
ALTER TABLE ChiTietSanPham ADD FOREIGN KEY (san_pham_id) REFERENCES SanPham (id_san_pham);

ALTER TABLE ChiTietSanPham ADD FOREIGN KEY (san_xuat_id) REFERENCES SanXuat (id_san_xuat);

ALTER TABLE ChiTietSanPham ADD FOREIGN KEY (kich_co_id) REFERENCES KichCo (id_kich_co);

ALTER TABLE ChiTietSanPham ADD FOREIGN KEY (mau_sac_id) REFERENCES MauSac (id_mau_sac);

ALTER TABLE ChiTietSanPham ADD FOREIGN KEY (chat_lieu_id) REFERENCES ChatLieu (id_chat_lieu);

ALTER TABLE ChiTietSanPham ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE ChiTietSanPham ADD FOREIGN KEY (khuyen_mai_id) REFERENCES KhuyenMai (id_khuyen_mai);

-----san pham-----
ALTER TABLE SanPham ADD FOREIGN KEY (thuong_hieu_id) REFERENCES ThuongHieu (id_thuong_hieu);

ALTER TABLE SanPham ADD FOREIGN KEY (phan_loai_id) REFERENCES PhanLoai (id_phan_loai);

ALTER TABLE SanPham ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE HinhAnh ADD FOREIGN KEY (san_pham_id) REFERENCES SanPham (id_san_pham);

-----Trang thai-----
ALTER TABLE ChatLieu ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE MauSac ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE ThuongHieu ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE PhanLoai ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE KichCo ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE KhuyenMai ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE HangKhachHang ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

-- Nhan Vien
ALTER TABLE NhanVien ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE NhanVien ADD FOREIGN KEY (id_tai_khoan) REFERENCES TaiKhoan (id);




-----Danh gia-----
ALTER TABLE DanhGia ADD FOREIGN KEY (chi_tiet_san_pham_id) REFERENCES ChiTietSanPham (id_chi_tiet_san_pham);

ALTER TABLE DanhGia ADD FOREIGN KEY (khach_hang_id) REFERENCES KhachHang (id_khach_hang);

ALTER TABLE DanhGia ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

-----Khach hang-----
ALTER TABLE KhachHang ADD FOREIGN KEY (hang_id) REFERENCES HangKhachHang (id_hang);

ALTER TABLE KhachHang ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE khachhang ADD FOREIGN KEY (id_tai_khoan) REFERENCES TaiKhoan (id);




-----Hoa don-----
ALTER TABLE HoaDon ADD FOREIGN KEY (khach_hang_id) REFERENCES KhachHang (id_khach_hang);

ALTER TABLE HoaDon ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

ALTER TABLE HoaDon ADD FOREIGN KEY (nguoi_lap_id) REFERENCES NhanVien (id_nhan_vien);

-----Hoa don chi tiet-----
ALTER TABLE HoaDonChiTiet ADD FOREIGN KEY (hoa_don_id) REFERENCES HoaDon (id_hoa_don);

ALTER TABLE HoaDonChiTiet ADD FOREIGN KEY (chi_tiet_san_pham_id) REFERENCES ChiTietSanPham (id_chi_tiet_san_pham);

ALTER TABLE HoaDonChiTiet ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

-----Dia chi-----
ALTER TABLE DiaChi ADD FOREIGN KEY (khach_hang_id) REFERENCES KhachHang (id_khach_hang);

-- Tai Khoan
ALTER TABLE TaiKhoan ADD FOREIGN KEY (vai_tro_id) REFERENCES VaiTro (id);

ALTER TABLE TaiKhoan ADD FOREIGN KEY (trang_thai_id) REFERENCES TrangThai (id_trang_thai);

