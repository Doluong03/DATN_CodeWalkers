select * from ChiTietSanPham
select * from KhuyenMai
select * from ChiTietKhuyenMai
select * from MauSac
select * from Phieu_khachhang
select * from phieugiamgia
select * from sanpham
CREATE TABLE ChiTietKhuyenMai (
    id int primary key identity(1,1),
    chi_tiet_san_pham_id INT,
    khuyen_mai_id INT,
    giam_gia float,
	trang_thai int,
    FOREIGN KEY (chi_tiet_san_pham_id) REFERENCES ChiTietSanPham(id_chi_tiet_san_pham),
    FOREIGN KEY (khuyen_mai_id) REFERENCES KhuyenMai(id_khuyen_mai)
);

select * from ChiTietKhuyenMai
select * from KhuyenMai
alter table ChiTietKhuyenMai   add trang_thai int
update KhuyenMai set giam_toi_da = 1000.0

delete from khuyenmai where id_khuyen_mai >10
alter table khuyenmai add ngay_bat_dau datetime
alter table khuyenmai add ngay_ket_thuc datetime
alter table khuyenmai add ngay_tao datetime
alter table khuyenmai add dieu_kien_giam float
alter table chitietkhuyenmai add trang_thai bit

delete from ChiTietKhuyenMai where id>19 
delete from KhuyenMai where id_khuyen_mai >10


update khuyenmai set dieu_kien_giam = 0


select * from KhuyenMai
select * from ChiTietKhuyenMai
select * from ChiTietSanPham
delete from ChiTietKhuyenMai
select * from ChatLieu where id_chat_lieu =5

delete from khuyenmai where id_khuyen_mai !=52


SELECT sp.ten_san_pham,ctsp.don_gia,km.ten_khuyen_mai,ctkm.giam_gia,km.ngay_tao
FROM ChiTietKhuyenMai ctkm
JOIN KhuyenMai km ON ctkm.khuyen_mai_id = km.id_khuyen_mai
JOIN ChiTietSanPham ctsp ON ctkm.chi_tiet_san_pham_id = ctsp.id_chi_tiet_san_pham
join SanPham sp on sp.id_san_pham = ctsp.san_pham_id
order by km.ngay_tao desc;
