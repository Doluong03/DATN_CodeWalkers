package com.example.asm_be.dto;

import com.example.asm_be.entities.Rank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RankRespone {
     private List<Rank> rankList;
     private long totalPages;

}
