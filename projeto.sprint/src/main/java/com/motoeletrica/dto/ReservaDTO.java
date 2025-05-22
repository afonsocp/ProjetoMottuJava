package com.motoeletrica.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReservaDTO {
    private Long idReserva;
    private LocalDate dataReserva;
    private LocalDate dataDevolucao;
    private UsuarioDTO usuario;
    private MotoDTO moto;
}