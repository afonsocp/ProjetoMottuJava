package com.motoeletrica.repository;

import com.motoeletrica.model.Localizacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LocalizacaoRepository extends JpaRepository<Localizacao, Long> {
    Page<Localizacao> findByCidadeContainingIgnoreCase(String cidade, Pageable pageable);
    Page<Localizacao> findByEstadoContainingIgnoreCase(String estado, Pageable pageable);
    Page<Localizacao> findByCepContainingIgnoreCase(String cep, Pageable pageable);
}