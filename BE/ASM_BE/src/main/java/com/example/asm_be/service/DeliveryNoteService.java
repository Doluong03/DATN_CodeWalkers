package com.example.asm_be.service;

import com.example.asm_be.entities.DeliveryNote;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface DeliveryNoteService {

    public List<DeliveryNote> getAll();

    public DeliveryNote getOne(int id);

    public DeliveryNote save(DeliveryNote deliveryNote);

    public DeliveryNote update(DeliveryNote deliveryNote);

    public void delete(DeliveryNote deliveryNote);

}
