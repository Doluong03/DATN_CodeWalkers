USE [DATN_V2]
GO

/****** Object:  Table [dbo].[ChatLieu]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[ChiTietKhuyenMai]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[ChiTietSanPham]    Script Date: 12/15/2023 10:22:26 PM ******/
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
	[ngay_tao] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_chi_tiet_san_pham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhGia]    Script Date: 12/15/2023 10:22:26 PM ******/
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

/****** Object:  Table [dbo].[DiaChi]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[GioHang]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[GioHangChiTiet]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[HangKhachHang]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[HinhAnh]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[HoaDon]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[HoaDonChiTiet]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[KhachHang]    Script Date: 12/15/2023 10:22:26 PM ******/
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
	[diem_tich_luy] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_khach_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhuyenMai]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[KichCo]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[MauSac]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[NhanVien]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[PhanLoai]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[Phieu_KhachHang]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[PhieuGiamGia]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[SanPham]    Script Date: 12/15/2023 10:22:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPham](
	[id_san_pham] [int] IDENTITY(1,1) NOT NULL,
	[ma_san_pham] [nvarchar](20) NULL,
	[ten_san_pham] [nvarchar](150) NULL,
	[anh_chinh] [nvarchar](255) NULL,
	[mo_ta] [nvarchar](max) NULL,
	[phan_loai_id] [int] NULL,
	[thuong_hieu_id] [int] NULL,
	[danh_gia_id] [int] NULL,
	[trang_thai] [int] NULL,
 CONSTRAINT [PK__SanPham__5776A529B06862CB] PRIMARY KEY CLUSTERED 
(
	[id_san_pham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanXuat]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[ThuongHieu]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[TrangThai]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[VaiTro]    Script Date: 12/15/2023 10:22:26 PM ******/
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
/****** Object:  Table [dbo].[VaiTroNhanVien]    Script Date: 12/15/2023 10:22:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaiTroNhanVien](
	[nhan_vien_id] [int] NULL,
	[vai_tro_id] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[YeuThichChiTiet]    Script Date: 12/15/2023 10:22:26 PM ******/
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

/****** Object:  StoredProcedure [dbo].[CapNhatRankTheoIdKhachHang]    Script Date: 12/15/2023 10:22:26 PM ******/
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

    -- L?y ?i?m tích l?y c?a khách hàng
    SELECT @DiemTichLuy = diem_tich_luy
    FROM KhachHang
    WHERE id_khach_hang = @idKhachHang;

    -- N?u ?i?m tích l?y không t?n t?i, x? lý và thoát
    IF @DiemTichLuy IS NULL
    BEGIN
        -- X? lý khi ?i?m tích l?y không t?n t?i
        THROW 50000, '?i?m tích l?y không t?n t?i.', 1;
        RETURN;
    END;

    -- L?y h?ng khách hàng m?i d?a trên ?i?m tích l?y
    SELECT TOP 1 @HangMoi = id_hang
    FROM HangKhachHang
    WHERE diem_toi_thieu <= @DiemTichLuy
    ORDER BY id_hang DESC;

    -- C?p nh?t h?ng c?a khách hàng
    UPDATE KhachHang
    SET hang_id = @HangMoi
    WHERE id_khach_hang = @idKhachHang;
END;
GO
