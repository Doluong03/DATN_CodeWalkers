//package com.example.asm_be.controller.admin;
//import java.io.*;
//import java.nio.file.Files;
//import java.sql.*;
//import java.util.Base64;
//public class test {
//    public static void main(String[] args) {
//
//        File imageDirectory = new File("D:\\DATN_CWS\\TestCode\\DATN_CodeWalkers\\FE_Admin\\template\\images\\sp1");
//
//        try (Connection connection = DriverManager.getConnection(jdbcUrl)) {
//            if (imageDirectory.isDirectory()) {
//                File[] imageFiles = imageDirectory.listFiles();
//                if (imageFiles != null) {
//                    for (File imageFile : imageFiles) {
//                        String imageName = imageFile.getName();
//
//                        int indexOfDot = imageName.lastIndexOf(".");
//                        String nameWithoutExtension = imageName.substring(0, indexOfDot);
//                        // Insert image info and data into the database
//                        String insertQuery = "INSERT INTO HinhAnh (ten_hinh_anh, link_hinh_anh) VALUES (?, ?)";
//                        try (PreparedStatement preparedStatement = connection.prepareStatement(insertQuery)) {
//                            preparedStatement.setString(1, nameWithoutExtension);
//                            preparedStatement.setString(2, imageName);
//                            preparedStatement.executeUpdate();
//                            System.out.println("ok ");
//                        }
//                    }
//                }
//            }
//        } catch (SQLException e ) {
//            e.printStackTrace();
//        }
//    }
//}
