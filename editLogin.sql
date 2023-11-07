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