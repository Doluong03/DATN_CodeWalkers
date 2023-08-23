package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.DeliveryNote;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.DeliveryNoteRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.DeliveryNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class DeliveryNoteImpl implements DeliveryNoteService {
    @Autowired
    private DeliveryNoteRepository deliveryNoteRepository;
    @Override
    public List<DeliveryNote> getAll() {
        return deliveryNoteRepository.findAll();
    }

    @Override
    public DeliveryNote getOne(UUID id) {
        return deliveryNoteRepository.findById(id).get();
    }

    @Override
    public DeliveryNote save(DeliveryNote deliveryNote) {
        return deliveryNoteRepository.save(deliveryNote);
    }

    @Override
    public DeliveryNote update(DeliveryNote deliveryNote) {
        return deliveryNoteRepository.save(deliveryNote);
    }

    @Override
    public void delete(DeliveryNote deliveryNote) {
        deliveryNoteRepository.delete(deliveryNote);
    }
}
