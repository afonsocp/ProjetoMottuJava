package com.motoeletrica.repository;

import com.motoeletrica.model.Manutencao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {
    Page<Manutencao> findByData(LocalDate data, Pageable pageable);
    Page<Manutencao> findByMotoIdMoto(Long idMoto, Pageable pageable);
}