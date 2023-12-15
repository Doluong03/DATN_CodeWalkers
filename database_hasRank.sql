USE [DATN_V2]
GO
/****** Object:  Table [dbo].[CaLam]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CaLam](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nhan_vien_id] [int] NULL,
	[gio_lam] [date] NULL,
	[gio_tan_ca] [date] NULL,
	[ngay_lam] [date] NULL,
	[doanh_thu] [money] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChatLieu]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatLieu](
	[id_chat_lieu] [int] IDENTITY(1,1) NOT NULL,
	[ten_chat_lieu] [nvarchar](100) NULL,
	[mo_ta] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_chat_lieu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietKhuyenMai]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietKhuyenMai](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[chi_tiet_san_pham_id] [int] NULL,
	[khuyen_mai_id] [int] NULL,
	[giam_gia] [float] NULL,
	[trang_thai] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietSanPham]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietSanPham](
	[id_chi_tiet_san_pham] [int] IDENTITY(1,1) NOT NULL,
	[ma_chi_tiet_san_pham] [nvarchar](20) NULL,
	[don_gia] [float] NULL,
	[so_luong_ton] [int] NULL,
	[san_pham_id] [int] NULL,
	[kich_co_id] [int] NULL,
	[mau_sac_id] [int] NULL,
	[chat_lieu_id] [int] NULL,
	[ngay_tao] [date] NULL,
	[ngay_sua] [date] NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_chi_tiet_san_pham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhGia]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhGia](
	[id_danh_gia] [int] IDENTITY(1,1) NOT NULL,
	[danh_gia] [int] NULL,
	[noi_dung] [nvarchar](255) NULL,
	[ngay_tao] [date] NULL,
	[ngay_sua] [date] NULL,
	[chi_tiet_san_pham_id] [int] NULL,
	[khach_hang_id] [int] NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_danh_gia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhSachYeuThich]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhSachYeuThich](
	[id_danh_sach] [int] IDENTITY(1,1) NOT NULL,
	[ngay_tao] [date] NULL,
	[ngay_sua] [date] NULL,
	[khach_hang_id] [int] NULL,
	[ghi_chu] [nvarchar](max) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_danh_sach] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DiaChi]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiaChi](
	[id_dia_chi] [int] IDENTITY(1,1) NOT NULL,
	[dia_chi_chi_tiet] [nvarchar](255) NULL,
	[phuong_xa_id] [int] NULL,
	[quan_huyen_id] [int] NULL,
	[thanh_pho_id] [int] NULL,
	[trang_thai] [int] NULL,
	[khach_hang_id] [int] NULL,
	[ten_khach_hang] [nvarchar](50) NULL,
	[sdt_khach_hang] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_dia_chi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GioHang]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GioHang](
	[id_gio_hang] [int] IDENTITY(1,1) NOT NULL,
	[ngay_tao] [date] NULL,
	[ngay_sua] [date] NULL,
	[khach_hang_id] [int] NULL,
	[ghi_chu] [nvarchar](max) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_gio_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GioHangChiTiet]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GioHangChiTiet](
	[gio_hang_id] [int] NOT NULL,
	[chi_tiet_san_pham_id] [int] NOT NULL,
	[so_luong] [int] NULL,
	[ghi_chu] [nvarchar](max) NULL,
	[trang_thai] [int] NULL,
	[id_gio_hang_chi_tiet] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_gio_hang_chi_tiet] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HangKhachHang]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HangKhachHang](
	[id_hang] [int] IDENTITY(1,1) NOT NULL,
	[ten_hang] [nvarchar](255) NULL,
	[mo_ta] [nvarchar](255) NULL,
	[trang_thai] [int] NULL,
	[diem_toi_thieu] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HinhAnh]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HinhAnh](
	[id_hinh_anh] [int] IDENTITY(1,1) NOT NULL,
	[ten_hinh_anh] [nvarchar](255) NULL,
	[link_hinh_anh] [nvarchar](255) NULL,
	[san_pham_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_hinh_anh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HoaDon]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaDon](
	[id_hoa_don] [int] IDENTITY(1,1) NOT NULL,
	[ma_hoa_don] [nvarchar](20) NULL,
	[ngay_lap] [date] NULL,
	[dia_chi_chi_tiet] [nvarchar](255) NULL,
	[phuong_xa_id] [int] NULL,
	[quan_huyen_id] [int] NULL,
	[thanh_pho_id] [int] NULL,
	[ngay_giao] [date] NULL,
	[phi_giao_hang] [float] NULL,
	[ghi_chu] [nvarchar](255) NULL,
	[tong_tien] [float] NULL,
	[phuong_thuc] [int] NULL,
	[khach_hang_id] [int] NULL,
	[nguoi_lap_id] [int] NULL,
	[trang_thai] [bit] NULL,
	[nguoi_nhan] [nvarchar](50) NULL,
	[sdt_nguoi_nhan] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_hoa_don] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HoaDonChiTiet]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaDonChiTiet](
	[id_hoa_don_chi_tiet] [int] IDENTITY(1,1) NOT NULL,
	[so_luong] [int] NULL,
	[don_gia] [float] NULL,
	[mo_ta] [nvarchar](255) NULL,
	[trang_thai] [int] NULL,
	[hoa_don_id] [int] NULL,
	[chi_tiet_san_pham_id] [int] NULL,
	[ngay_lap] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_hoa_don_chi_tiet] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhachHang]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhachHang](
	[id_khach_hang] [int] IDENTITY(1,1) NOT NULL,
	[ten_khach_hang] [nvarchar](255) NULL,
	[email] [nvarchar](100) NULL,
	[so_dien_thoai] [nvarchar](10) NULL,
	[ngay_sinh] [date] NULL,
	[gioi_tinh] [bit] NULL,
	[ngay_tao] [date] NULL,
	[ngay_sua] [date] NULL,
	[hang_id] [int] NULL,
	[dia_chi] [nvarchar](max) NULL,
	[trang_thai] [int] NULL,
	[hinh_anh] [nvarchar](max) NULL,
	[vai_tro] [nvarchar](30) NULL,
	[password] [nvarchar](max) NULL,
	[user_name] [char](12) NULL,
	[diem_tich_luy] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_khach_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhuyenMai]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhuyenMai](
	[id_khuyen_mai] [int] IDENTITY(1,1) NOT NULL,
	[ten_khuyen_mai] [nvarchar](255) NULL,
	[mo_ta_khuyen_mai] [nvarchar](255) NULL,
	[gia_tri] [float] NULL,
	[trang_thai] [int] NULL,
	[loai_giam_gia] [nchar](30) NULL,
	[ngay_bat_dau] [datetime] NULL,
	[ngay_ket_thuc] [datetime] NULL,
	[ngay_tao] [datetime] NULL,
	[dieu_kien_giam] [float] NULL,
 CONSTRAINT [PK__KhuyenMa__E5173E988105A1C7] PRIMARY KEY CLUSTERED 
(
	[id_khuyen_mai] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KichCo]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KichCo](
	[id_kich_co] [int] IDENTITY(1,1) NOT NULL,
	[ten_kich_co] [nvarchar](100) NULL,
	[mo_ta] [nvarchar](255) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_kich_co] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MauSac]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MauSac](
	[id_mau_sac] [int] IDENTITY(1,1) NOT NULL,
	[ten_mau_sac] [nvarchar](100) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_mau_sac] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NhanVien]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NhanVien](
	[id_nhan_vien] [int] IDENTITY(1,1) NOT NULL,
	[ho_nhan_vien] [nvarchar](255) NULL,
	[ten_nhan_vien] [nvarchar](255) NULL,
	[ngay_sinh] [date] NULL,
	[gioi_tinh] [bit] NULL,
	[dia_chi] [nvarchar](255) NULL,
	[email] [nvarchar](50) NULL,
	[so_dien_thoai] [nvarchar](50) NULL,
	[can_cuoc] [nvarchar](50) NULL,
	[hinh_anh] [nvarchar](max) NULL,
	[user_name] [nvarchar](20) NULL,
	[trang_thai] [bit] NULL,
	[mat_khau] [nvarchar](max) NULL,
	[password] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_nhan_vien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhanLoai]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhanLoai](
	[id_phan_loai] [int] IDENTITY(1,1) NOT NULL,
	[ten_phan_loai] [nvarchar](100) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_phan_loai] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Phieu_KhachHang]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Phieu_KhachHang](
	[khach_hang_id] [int] NOT NULL,
	[phieu_id] [int] NOT NULL,
	[so_luong_su_dung] [int] NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
	[trang_thai] [bit] NULL,
	[loai_khach_hang] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhieuGiamGia]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhieuGiamGia](
	[id_phieu] [int] IDENTITY(1,1) NOT NULL,
	[ma_phieu] [nvarchar](30) NULL,
	[ten_phieu] [nvarchar](50) NULL,
	[mo_ta] [nvarchar](max) NULL,
	[gia_tri] [money] NULL,
	[ngay_ket_thuc] [date] NULL,
	[trang_thai] [bit] NULL,
	[hinh_anh] [nvarchar](max) NULL,
	[dieu_kien] [float] NULL,
	[giam_toi_da] [float] NULL,
	[hinh_thuc_ap_dung] [nvarchar](50) NULL,
	[loai_giam_gia] [nvarchar](80) NULL,
	[diem_doi] [int] NULL,
	[cho_phep_doi] [bit] NULL,
	[so_luong] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_phieu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhuongXa]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhuongXa](
	[id_phuong_xa] [int] IDENTITY(1,1) NOT NULL,
	[ma_phuong_xa] [nvarchar](20) NULL,
	[ten_phuong_xa] [nvarchar](100) NULL,
	[thanh_pho_id] [int] NULL,
	[quan_huyen_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_phuong_xa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuanHuyen]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuanHuyen](
	[id_quan_huyen] [int] IDENTITY(1,1) NOT NULL,
	[ma_quan_huyen] [nvarchar](20) NULL,
	[ten_quan_huyen] [nvarchar](100) NULL,
	[thanh_pho_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_quan_huyen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPham]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPham](
	[id_san_pham] [int] IDENTITY(1,1) NOT NULL,
	[ma_san_pham] [nvarchar](20) NULL,
	[ten_san_pham] [nvarchar](150) NULL,
	[anh_chinh] [nvarchar](255) NOT NULL,
	[mo_ta] [nvarchar](150) NULL,
	[phan_loai_id] [int] NULL,
	[thuong_hieu_id] [int] NULL,
	[danh_gia_id] [int] NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_san_pham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanXuat]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanXuat](
	[id_san_xuat] [int] IDENTITY(1,1) NOT NULL,
	[ten_san_xuat] [nvarchar](100) NULL,
	[mo_ta] [nvarchar](255) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_san_xuat] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ThanhPho]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThanhPho](
	[id_thanh_pho] [int] IDENTITY(1,1) NOT NULL,
	[ma_thanh_pho] [nvarchar](20) NULL,
	[ten_thanh_pho] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_thanh_pho] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ThuongHieu]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThuongHieu](
	[id_thuong_hieu] [int] IDENTITY(1,1) NOT NULL,
	[ten_thuong_hieu] [nvarchar](100) NULL,
	[mo_ta] [nvarchar](255) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_thuong_hieu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TrangThai]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TrangThai](
	[id_trang_thai] [int] IDENTITY(1,1) NOT NULL,
	[ten_trang_thai] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_trang_thai] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VaiTro]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaiTro](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ten_vai_tro] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VaiTroNhanVien]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaiTroNhanVien](
	[nhan_vien_id] [int] NULL,
	[vai_tro_id] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[YeuThichChiTiet]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[YeuThichChiTiet](
	[danh_sach_id] [int] NOT NULL,
	[chi_tiet_san_pham_id] [int] NOT NULL,
	[ghi_chu] [nvarchar](max) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[danh_sach_id] ASC,
	[chi_tiet_san_pham_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ChatLieu] ADD  DEFAULT (NULL) FOR [ten_chat_lieu]
GO
ALTER TABLE [dbo].[ChatLieu] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[ChatLieu] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [ma_chi_tiet_san_pham]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [don_gia]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [so_luong_ton]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [san_pham_id]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [kich_co_id]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [mau_sac_id]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [chat_lieu_id]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [ngay_tao]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [ngay_sua]
GO
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT (NULL) FOR [danh_gia]
GO
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT (NULL) FOR [noi_dung]
GO
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT (NULL) FOR [ngay_tao]
GO
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT (NULL) FOR [ngay_sua]
GO
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT (NULL) FOR [chi_tiet_san_pham_id]
GO
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT (NULL) FOR [khach_hang_id]
GO
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[HangKhachHang] ADD  DEFAULT (NULL) FOR [ten_hang]
GO
ALTER TABLE [dbo].[HangKhachHang] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[HangKhachHang] ADD  DEFAULT ((0)) FOR [diem_toi_thieu]
GO
ALTER TABLE [dbo].[HinhAnh] ADD  DEFAULT (NULL) FOR [ten_hinh_anh]
GO
ALTER TABLE [dbo].[HinhAnh] ADD  DEFAULT (NULL) FOR [link_hinh_anh]
GO
ALTER TABLE [dbo].[HinhAnh] ADD  DEFAULT (NULL) FOR [san_pham_id]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [ma_hoa_don]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [ngay_lap]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [dia_chi_chi_tiet]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [phuong_xa_id]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [quan_huyen_id]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [thanh_pho_id]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [ngay_giao]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [phi_giao_hang]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [ghi_chu]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [tong_tien]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [phuong_thuc]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [khach_hang_id]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [nguoi_lap_id]
GO
ALTER TABLE [dbo].[HoaDon] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [so_luong]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [don_gia]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [hoa_don_id]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [chi_tiet_san_pham_id]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [ten_khach_hang]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [email]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [so_dien_thoai]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [ngay_sinh]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [gioi_tinh]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [ngay_tao]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [ngay_sua]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [hang_id]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [dia_chi]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT ((2)) FOR [trang_thai]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT ('ROLE_USER') FOR [vai_tro]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [password]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [user_name]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT ((0)) FOR [diem_tich_luy]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  CONSTRAINT [DF__KhuyenMai__ten_k__693CA210]  DEFAULT (NULL) FOR [ten_khuyen_mai]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  CONSTRAINT [DF__KhuyenMai__mo_ta__6A30C649]  DEFAULT (NULL) FOR [mo_ta_khuyen_mai]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  CONSTRAINT [DF__KhuyenMai__gia_t__6B24EA82]  DEFAULT (NULL) FOR [gia_tri]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  CONSTRAINT [DF__KhuyenMai__trang__6E01572D]  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[KichCo] ADD  DEFAULT (NULL) FOR [ten_kich_co]
GO
ALTER TABLE [dbo].[KichCo] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[KichCo] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[MauSac] ADD  DEFAULT (NULL) FOR [ten_mau_sac]
GO
ALTER TABLE [dbo].[MauSac] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[NhanVien] ADD  DEFAULT ((1)) FOR [trang_thai]
GO
ALTER TABLE [dbo].[PhanLoai] ADD  DEFAULT (NULL) FOR [ten_phan_loai]
GO
ALTER TABLE [dbo].[PhanLoai] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[PhieuGiamGia] ADD  DEFAULT ((0)) FOR [diem_doi]
GO
ALTER TABLE [dbo].[PhuongXa] ADD  DEFAULT (NULL) FOR [ma_phuong_xa]
GO
ALTER TABLE [dbo].[PhuongXa] ADD  DEFAULT (NULL) FOR [ten_phuong_xa]
GO
ALTER TABLE [dbo].[PhuongXa] ADD  DEFAULT (NULL) FOR [thanh_pho_id]
GO
ALTER TABLE [dbo].[PhuongXa] ADD  DEFAULT (NULL) FOR [quan_huyen_id]
GO
ALTER TABLE [dbo].[QuanHuyen] ADD  DEFAULT (NULL) FOR [ma_quan_huyen]
GO
ALTER TABLE [dbo].[QuanHuyen] ADD  DEFAULT (NULL) FOR [ten_quan_huyen]
GO
ALTER TABLE [dbo].[QuanHuyen] ADD  DEFAULT (NULL) FOR [thanh_pho_id]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT (NULL) FOR [ma_san_pham]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT (NULL) FOR [ten_san_pham]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT (NULL) FOR [phan_loai_id]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT (NULL) FOR [thuong_hieu_id]
GO
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT (NULL) FOR [danh_gia_id]
GO
ALTER TABLE [dbo].[SanXuat] ADD  DEFAULT (NULL) FOR [ten_san_xuat]
GO
ALTER TABLE [dbo].[SanXuat] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[SanXuat] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[ThanhPho] ADD  DEFAULT (NULL) FOR [ma_thanh_pho]
GO
ALTER TABLE [dbo].[ThanhPho] ADD  DEFAULT (NULL) FOR [ten_thanh_pho]
GO
ALTER TABLE [dbo].[ThuongHieu] ADD  DEFAULT (NULL) FOR [ten_thuong_hieu]
GO
ALTER TABLE [dbo].[ThuongHieu] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[ChiTietKhuyenMai]  WITH CHECK ADD FOREIGN KEY([chi_tiet_san_pham_id])
REFERENCES [dbo].[ChiTietSanPham] ([id_chi_tiet_san_pham])
GO
ALTER TABLE [dbo].[ChiTietKhuyenMai]  WITH CHECK ADD  CONSTRAINT [FK__ChiTietKh__khuye__3B95D2F1] FOREIGN KEY([khuyen_mai_id])
REFERENCES [dbo].[KhuyenMai] ([id_khuyen_mai])
GO
ALTER TABLE [dbo].[ChiTietKhuyenMai] CHECK CONSTRAINT [FK__ChiTietKh__khuye__3B95D2F1]
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD FOREIGN KEY([chat_lieu_id])
REFERENCES [dbo].[ChatLieu] ([id_chat_lieu])
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD FOREIGN KEY([kich_co_id])
REFERENCES [dbo].[KichCo] ([id_kich_co])
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD FOREIGN KEY([mau_sac_id])
REFERENCES [dbo].[MauSac] ([id_mau_sac])
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD FOREIGN KEY([san_pham_id])
REFERENCES [dbo].[SanPham] ([id_san_pham])
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD FOREIGN KEY([trang_thai])
REFERENCES [dbo].[TrangThai] ([id_trang_thai])
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD FOREIGN KEY([chi_tiet_san_pham_id])
REFERENCES [dbo].[ChiTietSanPham] ([id_chi_tiet_san_pham])
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD FOREIGN KEY([khach_hang_id])
REFERENCES [dbo].[KhachHang] ([id_khach_hang])
GO
ALTER TABLE [dbo].[DanhSachYeuThich]  WITH CHECK ADD FOREIGN KEY([khach_hang_id])
REFERENCES [dbo].[KhachHang] ([id_khach_hang])
GO
ALTER TABLE [dbo].[DiaChi]  WITH CHECK ADD FOREIGN KEY([khach_hang_id])
REFERENCES [dbo].[KhachHang] ([id_khach_hang])
GO
ALTER TABLE [dbo].[GioHang]  WITH CHECK ADD FOREIGN KEY([khach_hang_id])
REFERENCES [dbo].[KhachHang] ([id_khach_hang])
GO
ALTER TABLE [dbo].[GioHangChiTiet]  WITH CHECK ADD FOREIGN KEY([chi_tiet_san_pham_id])
REFERENCES [dbo].[ChiTietSanPham] ([id_chi_tiet_san_pham])
GO
ALTER TABLE [dbo].[GioHangChiTiet]  WITH CHECK ADD FOREIGN KEY([gio_hang_id])
REFERENCES [dbo].[GioHang] ([id_gio_hang])
GO
ALTER TABLE [dbo].[HinhAnh]  WITH CHECK ADD FOREIGN KEY([san_pham_id])
REFERENCES [dbo].[SanPham] ([id_san_pham])
GO
ALTER TABLE [dbo].[HoaDon]  WITH CHECK ADD FOREIGN KEY([khach_hang_id])
REFERENCES [dbo].[KhachHang] ([id_khach_hang])
GO
ALTER TABLE [dbo].[HoaDon]  WITH CHECK ADD FOREIGN KEY([nguoi_lap_id])
REFERENCES [dbo].[NhanVien] ([id_nhan_vien])
GO
ALTER TABLE [dbo].[HoaDonChiTiet]  WITH CHECK ADD FOREIGN KEY([chi_tiet_san_pham_id])
REFERENCES [dbo].[ChiTietSanPham] ([id_chi_tiet_san_pham])
GO
ALTER TABLE [dbo].[HoaDonChiTiet]  WITH CHECK ADD FOREIGN KEY([hoa_don_id])
REFERENCES [dbo].[HoaDon] ([id_hoa_don])
GO
ALTER TABLE [dbo].[KhachHang]  WITH CHECK ADD FOREIGN KEY([hang_id])
REFERENCES [dbo].[HangKhachHang] ([id_hang])
GO
ALTER TABLE [dbo].[Phieu_KhachHang]  WITH CHECK ADD FOREIGN KEY([khach_hang_id])
REFERENCES [dbo].[KhachHang] ([id_khach_hang])
GO
ALTER TABLE [dbo].[Phieu_KhachHang]  WITH CHECK ADD FOREIGN KEY([phieu_id])
REFERENCES [dbo].[PhieuGiamGia] ([id_phieu])
GO
ALTER TABLE [dbo].[PhuongXa]  WITH CHECK ADD FOREIGN KEY([quan_huyen_id])
REFERENCES [dbo].[QuanHuyen] ([id_quan_huyen])
GO
ALTER TABLE [dbo].[PhuongXa]  WITH CHECK ADD FOREIGN KEY([quan_huyen_id])
REFERENCES [dbo].[QuanHuyen] ([id_quan_huyen])
GO
ALTER TABLE [dbo].[PhuongXa]  WITH CHECK ADD FOREIGN KEY([thanh_pho_id])
REFERENCES [dbo].[ThanhPho] ([id_thanh_pho])
GO
ALTER TABLE [dbo].[PhuongXa]  WITH CHECK ADD FOREIGN KEY([thanh_pho_id])
REFERENCES [dbo].[ThanhPho] ([id_thanh_pho])
GO
ALTER TABLE [dbo].[QuanHuyen]  WITH CHECK ADD FOREIGN KEY([thanh_pho_id])
REFERENCES [dbo].[ThanhPho] ([id_thanh_pho])
GO
ALTER TABLE [dbo].[QuanHuyen]  WITH CHECK ADD FOREIGN KEY([thanh_pho_id])
REFERENCES [dbo].[ThanhPho] ([id_thanh_pho])
GO
ALTER TABLE [dbo].[SanPham]  WITH CHECK ADD FOREIGN KEY([phan_loai_id])
REFERENCES [dbo].[PhanLoai] ([id_phan_loai])
GO
ALTER TABLE [dbo].[SanPham]  WITH CHECK ADD FOREIGN KEY([thuong_hieu_id])
REFERENCES [dbo].[ThuongHieu] ([id_thuong_hieu])
GO
ALTER TABLE [dbo].[VaiTroNhanVien]  WITH CHECK ADD FOREIGN KEY([nhan_vien_id])
REFERENCES [dbo].[NhanVien] ([id_nhan_vien])
GO
ALTER TABLE [dbo].[VaiTroNhanVien]  WITH CHECK ADD FOREIGN KEY([vai_tro_id])
REFERENCES [dbo].[VaiTro] ([id])
GO
ALTER TABLE [dbo].[YeuThichChiTiet]  WITH CHECK ADD FOREIGN KEY([chi_tiet_san_pham_id])
REFERENCES [dbo].[ChiTietSanPham] ([id_chi_tiet_san_pham])
GO
ALTER TABLE [dbo].[YeuThichChiTiet]  WITH CHECK ADD FOREIGN KEY([danh_sach_id])
REFERENCES [dbo].[DanhSachYeuThich] ([id_danh_sach])
GO
/****** Object:  StoredProcedure [dbo].[CapNhatRankTheoIdKhachHang]    Script Date: 12/15/2023 5:26:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CapNhatRankTheoIdKhachHang]
    @idKhachHang INT
AS
BEGIN
    DECLARE @DiemTichLuy INT;
    DECLARE @HangMoi INT;

    -- Lấy điểm tích lũy của khách hàng
    SELECT @DiemTichLuy = diem_tich_luy
    FROM KhachHang
    WHERE id_khach_hang = @idKhachHang;

    -- Nếu điểm tích lũy không tồn tại, xử lý và thoát
    IF @DiemTichLuy IS NULL
    BEGIN
        -- Xử lý khi điểm tích lũy không tồn tại
        THROW 50000, 'Điểm tích lũy không tồn tại.', 1;
        RETURN;
    END;

    -- Lấy hạng khách hàng mới dựa trên điểm tích lũy
    SELECT TOP 1 @HangMoi = id_hang
    FROM HangKhachHang
    WHERE diem_toi_thieu <= @DiemTichLuy
    ORDER BY id_hang DESC;

    -- Cập nhật hạng của khách hàng
    UPDATE KhachHang
    SET hang_id = @HangMoi
    WHERE id_khach_hang = @idKhachHang;
END;
GO
