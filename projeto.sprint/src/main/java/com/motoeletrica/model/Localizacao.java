package com.motoeletrica.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(name = "Localizacao")
public class Localizacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Localizacao")
    private Long idLocalizacao;
    
    @NotBlank(message = "O endereço é obrigatório")
    @Size(max = 50, message = "O endereço deve ter no máximo 50 caracteres")
    private String endereco;
    
    @NotBlank(message = "O CEP é obrigatório")
    @Size(max = 9, message = "O CEP deve ter no máximo 9 caracteres")
    private String cep;
    
    @NotBlank(message = "A cidade é obrigatória")
    @Size(max = 50, message = "A cidade deve ter no máximo 50 caracteres")
    private String cidade;
    
    @NotBlank(message = "O estado é obrigatório")
    @Size(max = 50, message = "O estado deve ter no máximo 50 caracteres")
    private String estado;
}