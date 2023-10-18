package com.example.asm_be.cache;

import java.util.HashMap;

public class DiaChiCache {
    public static HashMap<Integer, String> hashMapProvince = new HashMap();
    public static HashMap<Integer, HashMap<Integer, String>> hashMapDistrict = new HashMap();
    public static HashMap<Integer, HashMap<String, String>> hashMapWard = new HashMap();

    public DiaChiCache() {
    }
}
