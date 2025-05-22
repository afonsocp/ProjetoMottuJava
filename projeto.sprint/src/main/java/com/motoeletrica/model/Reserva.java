package com.motoeletrica.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Reserva")
public class Reserva {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Reserva")
    private Long idReserva;
    
    @NotNull(message = "A data de reserva é obrigatória")
    private LocalDate dataReserva;
    
    private LocalDate dataDevolucao;
    
    @ManyToOne
    @JoinColumn(name = "ID_Usuario")
    private Usuario usuario;
    
    @ManyToOne
    @JoinColumn(name = "ID_Moto")
    private Moto moto;
}