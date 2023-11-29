USE [master]
GO
/****** Object:  Database [DATN_V2]    Script Date: 11/29/2023 12:33:41 AM ******/
CREATE DATABASE [DATN_V2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DATN_V2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DATN_V2.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DATN_V2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DATN_V2_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DATN_V2] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DATN_V2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DATN_V2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DATN_V2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DATN_V2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DATN_V2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DATN_V2] SET ARITHABORT OFF 
GO
ALTER DATABASE [DATN_V2] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [DATN_V2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DATN_V2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DATN_V2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DATN_V2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DATN_V2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DATN_V2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DATN_V2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DATN_V2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DATN_V2] SET  ENABLE_BROKER 
GO
ALTER DATABASE [DATN_V2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DATN_V2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DATN_V2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DATN_V2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DATN_V2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DATN_V2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DATN_V2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DATN_V2] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DATN_V2] SET  MULTI_USER 
GO
ALTER DATABASE [DATN_V2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DATN_V2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DATN_V2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DATN_V2] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DATN_V2] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DATN_V2] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [DATN_V2] SET QUERY_STORE = OFF
GO
USE [DATN_V2]
GO
/****** Object:  Table [dbo].[CaLam]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[ChatLieu]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[ChiTietSanPham]    Script Date: 11/29/2023 12:33:41 AM ******/
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
	[san_xuat_id] [int] NULL,
	[chat_lieu_id] [int] NULL,
	[trang_thai] [int] NULL,
	[khuyen_mai_id] [int] NULL,
	[ngay_tao] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_chi_tiet_san_pham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhGia]    Script Date: 11/29/2023 12:33:41 AM ******/
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
	[trang_thai_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_danh_gia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhSachYeuThich]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[DiaChi]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiaChi](
	[id_dia_chi] [int] IDENTITY(1,1) NOT NULL,
	[dia_chi_chi_tiet] [nvarchar](255) NULL,
	[phuong_xa_id] [nvarchar](20) NULL,
	[quan_huyen_id] [int] NULL,
	[thanh_pho_id] [int] NULL,
	[trang_thai_id] [int] NULL,
	[khach_hang_id] [int] NULL,
	[ten_khach_hang] [nvarchar](100) NULL,
	[sdt_khach_hang] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_dia_chi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GioHang]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[GioHangChiTiet]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GioHangChiTiet](
	[id_gio_hang_chi_tiet] [int] IDENTITY(1,1) NOT NULL,
	[gio_hang_id] [int] NULL,
	[chi_tiet_san_pham_id] [int] NULL,
	[so_luong] [int] NULL,
	[ghi_chu] [nvarchar](max) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_gio_hang_chi_tiet] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HangKhachHang]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HangKhachHang](
	[id_hang] [int] IDENTITY(1,1) NOT NULL,
	[ten_hang] [nvarchar](255) NULL,
	[mo_ta] [nvarchar](255) NULL,
	[trang_thai_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HinhAnh]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[HoaDon]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaDon](
	[id_hoa_don] [int] IDENTITY(1,1) NOT NULL,
	[ma_hoa_don] [nvarchar](20) NULL,
	[ngay_lap] [date] NULL,
	[dia_chi_chi_tiet] [nvarchar](255) NULL,
	[phuong_xa_id] [nvarchar](20) NULL,
	[quan_huyen_id] [int] NULL,
	[thanh_pho_id] [int] NULL,
	[ngay_giao] [date] NULL,
	[phi_giao_hang] [float] NULL,
	[ghi_chu] [nvarchar](255) NULL,
	[tong_tien] [float] NULL,
	[phuong_thuc] [int] NULL,
	[khach_hang_id] [int] NULL,
	[nguoi_lap_id] [int] NULL,
	[trang_thai] [int] NULL,
	[nguoi_nhan] [nvarchar](50) NULL,
	[sdt_nguoi_nhan] [nchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_hoa_don] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HoaDonChiTiet]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaDonChiTiet](
	[id_hoa_don_chi_tiet] [int] IDENTITY(1,1) NOT NULL,
	[so_luong] [int] NULL,
	[don_gia] [float] NULL,
	[mo_ta] [nvarchar](255) NULL,
	[trang_thai_id] [int] NULL,
	[hoa_don_id] [int] NULL,
	[chi_tiet_san_pham_id] [int] NULL,
	[ngay_lap] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_hoa_don_chi_tiet] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhachHang]    Script Date: 11/29/2023 12:33:41 AM ******/
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
	[trang_thai] [int] NULL,
	[id_tai_khoan] [int] NULL,
	[hinh_anh] [nvarchar](max) NULL,
	[vai_tro] [nvarchar](20) NULL,
	[user_name] [nvarchar](20) NULL,
	[password] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_khach_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhuyenMai]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhuyenMai](
	[id_khuyen_mai] [int] IDENTITY(1,1) NOT NULL,
	[ma_khuyen_mai] [nvarchar](20) NULL,
	[ten_khuyen_mai] [nvarchar](255) NULL,
	[mo_ta_khuyen_mai] [nvarchar](255) NULL,
	[gia_tri] [float] NULL,
	[ngay_bat_dau] [date] NULL,
	[ngay_ket_thuc] [date] NULL,
	[trang_thai_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_khuyen_mai] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KichCo]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[MauSac]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[NhanVien]    Script Date: 11/29/2023 12:33:41 AM ******/
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
	[trang_thai_id] [int] NULL,
	[id_tai_khoan] [int] NULL,
	[hinh_anh] [nvarchar](max) NULL,
	[user_name] [nvarchar](20) NULL,
	[trang_thai] [bit] NULL,
	[password] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_nhan_vien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhanLoai]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[PhieuGiamGia]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhieuGiamGia](
	[id_phieu] [int] IDENTITY(1,1) NOT NULL,
	[ma_phieu] [varchar](50) NULL,
	[ten_phieu] [varchar](255) NULL,
	[mo_ta] [varchar](255) NULL,
	[gia_tri] [decimal](10, 2) NULL,
	[ngay_bat_dau] [date] NULL,
	[ngay_ket_thuc] [date] NULL,
	[trang_thai] [varchar](50) NULL,
	[hinh_anh] [varchar](255) NULL,
	[dieu_kien] [float] NULL,
	[giam_toi_da] [decimal](5, 2) NULL,
	[khach_hang_id] [int] NULL,
	[so_luong] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_phieu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPham]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[SanXuat]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_name] [nvarchar](12) NULL,
	[password] [nvarchar](12) NULL,
	[vai_tro_id] [int] NULL,
	[trang_thai_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ThuongHieu]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[TrangThai]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[VaiTro]    Script Date: 11/29/2023 12:33:41 AM ******/
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
/****** Object:  Table [dbo].[VaiTroNhanVien]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaiTroNhanVien](
	[nhan_vien_id] [int] NULL,
	[vai_tro_id] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[YeuThichChiTiet]    Script Date: 11/29/2023 12:33:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[YeuThichChiTiet](
	[id_yeu_thich] [int] IDENTITY(1,1) NOT NULL,
	[danh_sach_id] [int] NULL,
	[chi_tiet_san_pham_id] [int] NULL,
	[ghi_chu] [nvarchar](max) NULL,
	[trang_thai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_yeu_thich] ASC
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
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [san_xuat_id]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [chat_lieu_id]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [khuyen_mai_id]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  DEFAULT (NULL) FOR [ngay_tao]
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
ALTER TABLE [dbo].[DanhGia] ADD  DEFAULT (NULL) FOR [trang_thai_id]
GO
ALTER TABLE [dbo].[DiaChi] ADD  DEFAULT (NULL) FOR [dia_chi_chi_tiet]
GO
ALTER TABLE [dbo].[DiaChi] ADD  DEFAULT (NULL) FOR [quan_huyen_id]
GO
ALTER TABLE [dbo].[DiaChi] ADD  DEFAULT (NULL) FOR [thanh_pho_id]
GO
ALTER TABLE [dbo].[DiaChi] ADD  DEFAULT (NULL) FOR [trang_thai_id]
GO
ALTER TABLE [dbo].[DiaChi] ADD  DEFAULT (NULL) FOR [khach_hang_id]
GO
ALTER TABLE [dbo].[HangKhachHang] ADD  DEFAULT (NULL) FOR [ten_hang]
GO
ALTER TABLE [dbo].[HangKhachHang] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[HangKhachHang] ADD  DEFAULT (NULL) FOR [trang_thai_id]
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
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [so_luong]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [don_gia]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  DEFAULT (NULL) FOR [trang_thai_id]
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
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [id_tai_khoan]
GO
ALTER TABLE [dbo].[KhachHang] ADD  DEFAULT (NULL) FOR [hinh_anh]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  DEFAULT (NULL) FOR [ma_khuyen_mai]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  DEFAULT (NULL) FOR [ten_khuyen_mai]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  DEFAULT (NULL) FOR [mo_ta_khuyen_mai]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  DEFAULT (NULL) FOR [gia_tri]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  DEFAULT (NULL) FOR [ngay_bat_dau]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  DEFAULT (NULL) FOR [ngay_ket_thuc]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  DEFAULT (NULL) FOR [trang_thai_id]
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
ALTER TABLE [dbo].[NhanVien] ADD  DEFAULT (NULL) FOR [id_tai_khoan]
GO
ALTER TABLE [dbo].[NhanVien] ADD  DEFAULT (NULL) FOR [hinh_anh]
GO
ALTER TABLE [dbo].[NhanVien] ADD  DEFAULT ((1)) FOR [trang_thai]
GO
ALTER TABLE [dbo].[PhanLoai] ADD  DEFAULT (NULL) FOR [ten_phan_loai]
GO
ALTER TABLE [dbo].[PhanLoai] ADD  DEFAULT (NULL) FOR [trang_thai]
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
ALTER TABLE [dbo].[SanPham] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[SanXuat] ADD  DEFAULT (NULL) FOR [ten_san_xuat]
GO
ALTER TABLE [dbo].[SanXuat] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[SanXuat] ADD  DEFAULT (NULL) FOR [trang_thai]
GO
ALTER TABLE [dbo].[ThuongHieu] ADD  DEFAULT (NULL) FOR [ten_thuong_hieu]
GO
ALTER TABLE [dbo].[ThuongHieu] ADD  DEFAULT (NULL) FOR [mo_ta]
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD FOREIGN KEY([chat_lieu_id])
REFERENCES [dbo].[ChatLieu] ([id_chat_lieu])
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD FOREIGN KEY([khuyen_mai_id])
REFERENCES [dbo].[KhuyenMai] ([id_khuyen_mai])
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
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD FOREIGN KEY([san_xuat_id])
REFERENCES [dbo].[SanXuat] ([id_san_xuat])
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD FOREIGN KEY([chi_tiet_san_pham_id])
REFERENCES [dbo].[ChiTietSanPham] ([id_chi_tiet_san_pham])
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD FOREIGN KEY([khach_hang_id])
REFERENCES [dbo].[KhachHang] ([id_khach_hang])
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD FOREIGN KEY([trang_thai_id])
REFERENCES [dbo].[TrangThai] ([id_trang_thai])
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
ALTER TABLE [dbo].[HangKhachHang]  WITH CHECK ADD FOREIGN KEY([trang_thai_id])
REFERENCES [dbo].[TrangThai] ([id_trang_thai])
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
ALTER TABLE [dbo].[HoaDonChiTiet]  WITH CHECK ADD FOREIGN KEY([trang_thai_id])
REFERENCES [dbo].[TrangThai] ([id_trang_thai])
GO
ALTER TABLE [dbo].[KhachHang]  WITH CHECK ADD FOREIGN KEY([hang_id])
REFERENCES [dbo].[HangKhachHang] ([id_hang])
GO
ALTER TABLE [dbo].[KhachHang]  WITH CHECK ADD FOREIGN KEY([id_tai_khoan])
REFERENCES [dbo].[TaiKhoan] ([id])
GO
ALTER TABLE [dbo].[KhuyenMai]  WITH CHECK ADD FOREIGN KEY([trang_thai_id])
REFERENCES [dbo].[TrangThai] ([id_trang_thai])
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD FOREIGN KEY([id_tai_khoan])
REFERENCES [dbo].[TaiKhoan] ([id])
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD FOREIGN KEY([trang_thai_id])
REFERENCES [dbo].[TrangThai] ([id_trang_thai])
GO
ALTER TABLE [dbo].[PhieuGiamGia]  WITH CHECK ADD FOREIGN KEY([khach_hang_id])
REFERENCES [dbo].[KhachHang] ([id_khach_hang])
GO
ALTER TABLE [dbo].[SanPham]  WITH CHECK ADD FOREIGN KEY([phan_loai_id])
REFERENCES [dbo].[PhanLoai] ([id_phan_loai])
GO
ALTER TABLE [dbo].[SanPham]  WITH CHECK ADD FOREIGN KEY([thuong_hieu_id])
REFERENCES [dbo].[ThuongHieu] ([id_thuong_hieu])
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD FOREIGN KEY([trang_thai_id])
REFERENCES [dbo].[TrangThai] ([id_trang_thai])
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD FOREIGN KEY([vai_tro_id])
REFERENCES [dbo].[VaiTro] ([id])
GO
ALTER TABLE [dbo].[YeuThichChiTiet]  WITH CHECK ADD FOREIGN KEY([chi_tiet_san_pham_id])
REFERENCES [dbo].[ChiTietSanPham] ([id_chi_tiet_san_pham])
GO
ALTER TABLE [dbo].[YeuThichChiTiet]  WITH CHECK ADD FOREIGN KEY([danh_sach_id])
REFERENCES [dbo].[DanhSachYeuThich] ([id_danh_sach])
GO
USE [master]
GO
ALTER DATABASE [DATN_V2] SET  READ_WRITE 
GO
