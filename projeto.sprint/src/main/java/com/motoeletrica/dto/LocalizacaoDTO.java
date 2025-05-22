package com.motoeletrica.dto;

import lombok.Data;

@Data
public class LocalizacaoDTO {
    private Long idLocalizacao;
    private String endereco;
    private String cep;
    private String cidade;
    private String estado;
}