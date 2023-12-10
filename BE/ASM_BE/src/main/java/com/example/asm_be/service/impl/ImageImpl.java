package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Image;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.ImageRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.ImageService;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.logging.Logger;

@Component
public class ImageImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public List<Image> getAll() {
        return imageRepository.findAllByProductIsNull() ;
    }

    @Override
    public Image getOne(Integer idFacture) {
        return imageRepository.findById(idFacture).get();
    }

    @Override
    public boolean save(Image image) {
        try {

            imageRepository.save(image);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(Image image) {
        try {
            imageRepository.save(image);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idImage) {
        try {
            imageRepository.deleteById(idImage);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }
    @Override
    @Transactional
    public void processImageDirectory(MultipartFile[] imageFiles) {
        try {
            for (MultipartFile imageFile : imageFiles) {
                processImageFile(imageFile);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Image> findByIdPr(int idpr) {
        return imageRepository.findAllByProductId(idpr);
    }

    public void processImageFile(MultipartFile imageFile) {
        try {
            String imageName = imageFile.getOriginalFilename();
            int indexOfDot = imageName.lastIndexOf(".");
            String nameWithoutExtension = imageName.substring(0, indexOfDot);

            // Insert image info and data into the database
            Image image = new Image();
            image.setName(nameWithoutExtension);
            image.setLink(imageName);
            imageRepository.save(image);
            // Lưu file vào thư mục upload
//            saveImageFile(imageFile, "D:/DATN_CWS/TestCode/DATN_CodeWalkers/FE/assets/img/product/sp1/");

            // Save to the second directory
//            saveImageFile(imageFile, "D:/DATN_CWS/TestCode/DATN_CodeWalkers/FE_Admin/template/images/sp1/");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private void saveImageFile(MultipartFile imageFile, String uploadDir) {
        try {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(imageFile.getOriginalFilename()));
            String extension = FilenameUtils.getExtension(fileName);
            String baseName = FilenameUtils.getBaseName(fileName);

            // Use timestamp to ensure a unique file name
            String timestamp = String.valueOf(System.currentTimeMillis());
            String newFileName = baseName + "." + extension;

            // Save the file to the specified directory
            String filePath = uploadDir + newFileName;

            // Check if the file already exists
            File targetFile = new File(filePath);
            int count = 1;
            while (targetFile.exists()) {
                // If the file already exists, append (1), (2), etc. to the file name
                newFileName = baseName + "_" + timestamp + "(" + count + ")." + extension;
                filePath = uploadDir + newFileName;
                targetFile = new File(filePath);
                count++;
            }

            // Save the file to the specified directory
            imageFile.transferTo(targetFile);
            System.out.println("File saved successfully: " + filePath);
        } catch (  IOException e) {
            System.out.println("Failed to save the file");
            e.printStackTrace();
        }
    }

}
