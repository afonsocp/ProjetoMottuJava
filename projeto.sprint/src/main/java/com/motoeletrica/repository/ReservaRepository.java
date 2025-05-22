package com.motoeletrica.repository;

import com.motoeletrica.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    Page<Reserva> findByDataReserva(LocalDate dataReserva, Pageable pageable);
    Page<Reserva> findByUsuarioIdUsuario(Long idUsuario, Pageable pageable);
    Page<Reserva> findByMotoIdMoto(Long idMoto, Pageable pageable);
}