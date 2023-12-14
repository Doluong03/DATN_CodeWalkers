package com.example.asm_be.repositories;

import com.example.asm_be.dto.PromotionDetailRespone;
import com.example.asm_be.entities.PromotionDetails;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionDetailRepository extends JpaRepository<PromotionDetails,Integer> {

    @Query("""
    SELECT new com.example.asm_be.dto.PromotionDetailRespone(
        sp.id, sp.name, ctsp.price, ctkm.discount, ctsp.color.id, ctsp.size.id
    )
    FROM ChiTietKhuyenMai ctkm
    JOIN KhuyenMai km ON ctkm.promotion.id = km.id
    JOIN ChiTietSanPham ctsp ON ctkm.productDetail.id = ctsp.id
    JOIN SanPham sp ON sp.id = ctsp.product.id
    WHERE km.id = :id and sp.id = :idSp
""")
    List<PromotionDetailRespone> getPromotionDetail(@Param("id") int id,@Param("idSp") int idSp);


    @Modifying
    @Transactional
    @Query("update ChiTietKhuyenMai ctkm set ctkm.discount = :discount where ctkm.promotion.id = :idPro" +
            " and ctkm.productDetail.id = :idProduct")
    void UpdateProDetai(@Param("discount") Double discount,
                                  @Param("idPro") Integer idPro,@Param("idProduct") Integer idProduct);

    @Transactional
    @Modifying
    @Query("DELETE FROM ChiTietKhuyenMai ctkm WHERE ctkm.productDetail.id = :idProductDetail AND ctkm.promotion.id = :idPro")
    int deleteProDetail(@Param("idProductDetail") Integer idProductDetail, @Param("idPro") Integer idPro);

    @Transactional
    @Modifying
    @Query("DELETE FROM ChiTietKhuyenMai ctkm WHERE ctkm.promotion.id = :idPro")
    int deleteAll(@Param("idPro") Integer idPro);

}
