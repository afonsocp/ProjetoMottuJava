package com.motoeletrica.repository;

import com.motoeletrica.model.Moto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MotoRepository extends JpaRepository<Moto, Long> {
    Page<Moto> findByPlacaContainingIgnoreCase(String placa, Pageable pageable);
    Page<Moto> findByModeloContainingIgnoreCase(String modelo, Pageable pageable);
    Page<Moto> findByStatus(String status, Pageable pageable);
}