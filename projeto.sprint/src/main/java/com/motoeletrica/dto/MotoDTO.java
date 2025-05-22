package com.motoeletrica.dto;

import lombok.Data;

@Data
public class MotoDTO {
    private Long idMoto;
    private String placa;
    private String modelo;
    private Integer ano;
    private String status;
    private LocalizacaoDTO localizacao;
}