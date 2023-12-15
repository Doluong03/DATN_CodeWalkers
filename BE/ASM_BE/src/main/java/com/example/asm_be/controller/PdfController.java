package com.example.asm_be.controller;

import com.example.asm_be.entities.BillDetails;
import com.example.asm_be.request.InvoiceRequest;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generatePdf(@RequestBody InvoiceRequest tab) {
        try {
            // Tạo một đối tượng Document
            Document document = new Document();

            // Sử dụng ByteArrayOutputStream để giữ nội dung của PDF
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            // Tạo một đối tượng PdfWriter để ghi vào ByteArrayOutputStream
            PdfWriter.getInstance(document, baos);

            // Mở Document để bắt đầu viết
            document.open();

            // Thêm nội dung PDF tương tự như bạn đã làm trong JavaScript
            addPdfContent(document, tab);

            // Đóng Document
            document.close();

            // Lấy mảng byte của ByteArrayOutputStream
            byte[] pdfBytes = baos.toByteArray();

            // Tạo HttpHeaders để trả về tệp PDF
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "invoice_" + tab.getCode() + ".pdf");
            String OUTPUT_FOLDER = "D:\\DATN_CWS\\TestCode\\DATN_CodeWalkers\\Invoice\\";
            String filePath = OUTPUT_FOLDER + "invoice_" + tab.getCode() + ".pdf";

            // Use PdfWriter with FileOutputStream to write to the specified file
            PdfWriter.getInstance(document, new FileOutputStream(new File(filePath)));
            // Trả về ResponseEntity chứa mảng byte và HttpHeaders
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (DocumentException | FileNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void addPdfContent(Document document, InvoiceRequest tab) throws DocumentException {
        // Thêm nội dung PDF tương tự như bạn đã làm trong JavaScript
        // Đảm bảo rằng bạn sử dụng các phương thức của document để thêm văn bản, bảng, vv.

        // Ví dụ:
        document.add(new Paragraph("CodeWalkers"));
        document.add(new Paragraph("Số điện thoại: 0865683753"));
        document.add(new Paragraph("Email: CodeWalkers2003@gmail.com"));
        document.add(new Paragraph("Địa chỉ: Phú Đô, Nam Từ Liêm, Hà Nội"));
        document.add(new Paragraph("HÓA ĐƠN BÁN HÀNG"));
        document.add(new Paragraph(tab.getCode()));
        document.add(new Paragraph("Ngày mua: " + (tab.getPurchaseDate() != null ? tab.getPurchaseDate() : "None")));
        document.add(new Paragraph("Khách hàng: " + (tab.getUserName() != null ? tab.getUserName() : "Khách lẻ")));
        addAddressString(document, tab);
        // Thêm bảng vào tài liệu PDF
        PdfPTable table = new PdfPTable(new float[]{30, 100, 65, 65, 80});
        table.setHeaderRows(1);

        // Thêm header cho bảng
        table.addCell("STT");
        table.addCell("Sản Phẩm");
        table.addCell("Số Lượng");
        table.addCell("Đơn giá");
        table.addCell("Thành tiền");

        // Thêm dòng cho mỗi sản phẩm
//        int stt =1;
//        for (BillDetails product : tab.getBillDetails()) {
//            table.addCell(String.valueOf(stt));
//            table.addCell(product.getProductDetail().getProduct().getName());
//            table.addCell(String.valueOf(product.getQuantity()));
//            table.addCell(String.valueOf(product.getPrice()));
//            table.addCell(String.valueOf(product.getQuantity() * product.getPrice()));
//            stt++;
//        }
        document.add(new Paragraph("Phí vận chuyển: " + (tab.getFeeShip() != null ? tab.getFeeShip() : "None")));
        document.add(new Paragraph("Tổng tiền cần thanh toán: " + (tab.getTotalPay() != null ? tab.getTotalPay() : "Khách lẻ")));
        document.add(new Paragraph("Phương thức thanh toán: " + (tab.getMethodPay() != null ? tab.getMethodPay() : "Khách lẻ")));
        document.add(new Paragraph("---- Cảm ơn quý khách ----"));

        // Thêm bảng vào tài liệu PDF
        document.add(table);
    }

    private void addAddressString(Document document, InvoiceRequest formData) throws DocumentException {
        // Code để lấy dữ liệu từ formData và đặt giá trị cho province, district, ward, address
        String fullAddress = formData.getAddress();
        // Kiểm tra xem có dữ liệu nào không
        if (!fullAddress.equals("")) {
            document.add(new Paragraph("Địa chỉ: " + fullAddress));
        }
    }
}
