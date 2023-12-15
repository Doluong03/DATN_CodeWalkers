select * from hangkhachhang
select * from KhachHang

insert into HangKhachHang(ten_hang,mo_ta,trang_thai)
values (N'V� H?ng',N'Ch?a c� h?ng',1)

-- Th�m h?ng B?c
INSERT INTO HangKhachHang (ten_hang, mo_ta, trang_thai)
VALUES (N'B?c', N'H?ng B?c', 1);

-- Th�m h?ng V�ng
INSERT INTO HangKhachHang (ten_hang, mo_ta, trang_thai)
VALUES (N'V�ng', N'H?ng V�ng', 1);

-- Th�m h?ng Kim C??ng
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

    -- L?y ?i?m t�ch l?y c?a kh�ch h�ng
    SELECT @DiemTichLuy = diem_tich_luy
    FROM KhachHang
    WHERE id_khach_hang = @idKhachHang;

    -- N?u ?i?m t�ch l?y kh�ng t?n t?i, x? l� v� tho�t
    IF @DiemTichLuy IS NULL
    BEGIN
        -- X? l� khi ?i?m t�ch l?y kh�ng t?n t?i
        THROW 50000, '?i?m t�ch l?y kh�ng t?n t?i.', 1;
        RETURN;
    END;

    -- L?y h?ng kh�ch h�ng m?i d?a tr�n ?i?m t�ch l?y
    SELECT TOP 1 @HangMoi = id_hang
    FROM HangKhachHang
    WHERE diem_toi_thieu <= @DiemTichLuy
    ORDER BY id_hang DESC;

    -- C?p nh?t h?ng c?a kh�ch h�ng
    UPDATE KhachHang
    SET hang_id = @HangMoi
    WHERE id_khach_hang = @idKhachHang;
END;



