package com.motoeletrica.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ManutencaoDTO {
    private Long idManutencao;
    private LocalDate data;
    private String descricao;
    private BigDecimal custo;
    private MotoDTO moto;
}