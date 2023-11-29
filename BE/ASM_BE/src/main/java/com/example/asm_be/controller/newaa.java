    package com.example.asm_be.controller;
    import org.apache.commons.io.FilenameUtils;
    import org.springframework.http.ResponseEntity;
    import org.springframework.util.StringUtils;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.File;
    import java.io.IOException;

    @RestController
    @RequestMapping("/api")
    public class newaa {

        @RequestMapping(value = "/upload", consumes = {"multipart/form-data"}, produces = {"application/json"})
        public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
            try {
                if (file.isEmpty()) {
                    return ResponseEntity.badRequest().body("File không được để trống");
                }

                String uploadDir = "D:/DATN_CWS/TestCode/DATN_CodeWalkers/FE/assets/img/user/";
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                String extension = FilenameUtils.getExtension(fileName);
                String baseName = FilenameUtils.getBaseName(fileName);

                // Sử dụng timestamp để đảm bảo tên file là duy nhất
                String timestamp = String.valueOf(System.currentTimeMillis());
                fileName = baseName + "_" + timestamp + "." + extension;

                String filePath = uploadDir + fileName;

                // Lưu file vào thư mục upload
                file.transferTo(new File(filePath));

                return ResponseEntity.ok().body("Upload thành công! Đường dẫn file: " + filePath);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Lỗi upload: " + e.getMessage());
            }
        }


    }
