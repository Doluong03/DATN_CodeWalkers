package com.example.asm_be.repositories;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.BillDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface BillDetailsRepository extends JpaRepository<BillDetails, Integer> {
    List<BillDetails> findByBillId(int idBill);

    int deleteAllByBillId(int idBill);

    // doanh thu theo nam
    @Query("""
                SELECT SUM(hd.totalPay)
                FROM HoaDon hd
                WHERE YEAR(hd.createdAt) = :year
            """)
    List<Double> getTotalPayByYear(@Param("year") int year);

    // doanh thu theo thang
    @Query("""
                SELECT SUM(hd.totalPay)
                FROM HoaDon hd
                WHERE MONTH(hd.createdAt) = (:date1) AND YEAR(hd.createdAt) = (:date2)
            """)
    List<Double> getTotalPayByMonth(@Param("date1") int date1, @Param("date2") int date2);

    // doanh thu theo khoang ngay
    @Query("""
                SELECT SUM(hd.totalPay)
                FROM HoaDon hd
                WHERE hd.createdAt = :day
            """)
    List<Double> getTotalPayByDay(@Param("day") Date day);

    // so hoa don da thanh cong
    @Query("""
                 select count(hd.id)
                 from HoaDon hd
                 where hd.status = 4
            """)
    List<Integer> getSuccessfulInvoices();

    // so hóa đơn thất bại
    @Query("""
                 select count(hd.id)
                 from HoaDon hd
                 where hd.status = 5
            """)
    List<Integer> getTotalFailedInvoices();

    // so hoa don cho
    @Query("""
                 select count(hd.id)
                 from HoaDon hd
                 where hd.status between 1 and 3
            """)
    List<Integer> getPendingInvoices();
    // doanh số sản phẩm

    // doanh số theo nam
    @Query("""
                SELECT
                pl.name,
                COUNT(DISTINCT csanpham.product.id)
                FROM
                HoaDonChiTiet hdc
                JOIN
                ChiTietSanPham csanpham ON hdc.productDetail.id = csanpham.id
                JOIN
                SanPham sp ON csanpham.product.id = sp.id
                JOIN
                PhanLoai pl ON sp.category.id = pl.id
                WHERE
                YEAR(hdc.createdAt) BETWEEN :year1 AND :year2
                GROUP BY
                pl.name
            """)
    List<Object[]> getTotalAmountByYear(@Param("year1") int year1, @Param("year2") int year2);


    // doanh số theo thang
    @Query("""
                SELECT
                    pl.name,
                    COUNT(DISTINCT csanpham.product.id)
                FROM
                    HoaDonChiTiet hdc
                    JOIN ChiTietSanPham csanpham ON hdc.productDetail.id = csanpham.id
                    JOIN SanPham sp ON csanpham.product.id = sp.id
                    JOIN PhanLoai pl ON sp.category.id = pl.id
                WHERE
                    (MONTH(hdc.createdAt) = :startMonth AND YEAR(hdc.createdAt) = :startYear)
                    OR
                    (MONTH(hdc.createdAt) = :endMonth AND YEAR(hdc.createdAt) = :endYear)
                    OR
                    (YEAR(hdc.createdAt) = :startYear AND MONTH(hdc.createdAt) > :startMonth)
                    OR
                    (YEAR(hdc.createdAt) = :endYear AND MONTH(hdc.createdAt) < :endMonth)
                GROUP BY
                    pl.name
            """)
    List<Object[]> getTotalAmountByMonthRange(
            @Param("startMonth") int startMonth,
            @Param("startYear") int startYear,
            @Param("endMonth") int endMonth,
            @Param("endYear") int endYear
    );


    // doanh số theo ngay
    @Query("""
                SELECT
                 pl.name,
                COUNT(DISTINCT csanpham.product.id)
                FROM
                HoaDonChiTiet hdc
                JOIN
                ChiTietSanPham csanpham ON hdc.productDetail.id = csanpham.id
                JOIN
                SanPham sp ON csanpham.product.id = sp.id
                JOIN
                PhanLoai pl ON sp.category.id = pl.id
                WHERE
                hdc.createdAt BETWEEN :day1 AND :day2 
                GROUP BY
                pl.name
            """)
    List<Object[]> getTotalAmountByDay(@Param("day1") Date day1, @Param("day2") Date day2);

    // tồn
    @Query("""
            SELECT sp.name,SUM(ctsp.quantity)
            FROM SanPham sp 
            JOIN ChiTietSanPham ctsp
            ON sp.id = ctsp.product.id
            WHERE NOT EXISTS (
                SELECT 1
                FROM HoaDonChiTiet hdc
                WHERE hdc.productDetail.id = sp.id
            )
            GROUP BY sp.name
            """)
    List<Object[]> getStock();


    @Query("""
                SELECT SUM(hd.totalPay)
                FROM HoaDon hd
                WHERE YEAR(hd.createdAt) = YEAR(CURRENT_DATE)
                  AND MONTH(hd.createdAt) = MONTH(CURRENT_DATE)
            """)
    List<Double> getTotalPayByCurrentMonth();


    @Query("""
                SELECT SUM(hd.totalPay)
                FROM HoaDon hd
                WHERE DATE(hd.createdAt) = CURRENT_DATE
            """)
    List<Double> getTotalPayByCurrentDay();

    @Query("""
                SELECT SUM(hd.totalPay)
                FROM HoaDon hd
                WHERE YEAR(hd.createdAt) = YEAR(CURRENT_DATE)
            """)
    List<Double> getTotalPayByCurrentYear();

    @Query("""
       SELECT SUM(hd.totalPay) FROM HoaDon hd
""")

    List<Double> getAllTotalPay();

}
