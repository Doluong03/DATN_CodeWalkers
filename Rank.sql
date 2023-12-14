select * from hangkhachhang
select * from KhachHang

insert into HangKhachHang(ten_hang,mo_ta,trang_thai)
values (N'Vô H?ng',N'Ch?a có h?ng',1)

-- Thêm h?ng B?c
INSERT INTO HangKhachHang (ten_hang, mo_ta, trang_thai)
VALUES (N'B?c', N'H?ng B?c', 1);

-- Thêm h?ng Vàng
INSERT INTO HangKhachHang (ten_hang, mo_ta, trang_thai)
VALUES (N'Vàng', N'H?ng Vàng', 1);

-- Thêm h?ng Kim C??ng
INSERT INTO HangKhachHang (ten_hang, mo_ta, trang_thai)
VALUES (N'Kim C??ng', N'H?ng Kim C??ng', 1);

alter table khachhang add foreign key (hang_id) references HangKhachHang(id_hang)
alter table hangkhachhang add diem_toi_thieu int 
alter table khachhang add diem_tich_luy int default 0

update KhachHang set diem_tich_luy = 0
update KhachHang set hang_id = 1
go 



CREATE PROCEDURE CapNhatRankTheoIdKhachHang
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



