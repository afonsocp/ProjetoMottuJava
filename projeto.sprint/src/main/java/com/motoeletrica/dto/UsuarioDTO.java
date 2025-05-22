package com.motoeletrica.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Long idUsuario;
    private String nome;
    private String email;
    private String senha;
}