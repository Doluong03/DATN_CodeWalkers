package com.example.asm_be.repositories;

import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {
    @Query("SELECT c\n" +
            "FROM ChiTietSanPham c\n" +
            "WHERE c.id IN (\n" +
            "    SELECT MIN(c2.id)\n" +
            "    FROM ChiTietSanPham c2\n" +
            "    GROUP BY c2.product.id\n" +
            ")\n")
    List<ProductDetail> getAllDistinct();
    List<ProductDetail> findByProductId(int id);
    @Query("select p from ChiTietSanPham p where p.product.id=?1 and p.size.id =?2 and  p.color.id = ?3")
    ProductDetail findBySize(int prId,int sizeId, int colorId);
    List<ProductDetail> findByProductIdAndColorId(int idPr,int idColor);
    List<ProductDetail> findByProductName(String productName);

    @Modifying
    @Query("UPDATE ChiTietSanPham t SET t.status.Id = 2 WHERE t.id = :id")
    void capNhatGiaTri(@PathVariable("id") Integer id);

    @Query("SELECT p FROM ChiTietSanPham p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<ProductDetail> findByPriceBetween(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);

    List<ProductDetail> findByColorIdIn(List<Long> colorIds);

    List<ProductDetail> findBySizeIdIn(List<Long> sizeIds);

    List<ProductDetail> findByMaterialIdIn(List<Long> materialIds);

    Optional<ProductDetail> findBySizeIdAndColorIdAndProductId(int size, int color, int pr);

}
