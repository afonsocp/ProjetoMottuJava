package com.motoeletrica.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(name = "Moto")
public class Moto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Moto")
    private Long idMoto;
    
    @NotBlank(message = "A placa é obrigatória")
    @Size(max = 10, message = "A placa deve ter no máximo 10 caracteres")
    @Column(unique = true)
    private String placa;
    
    @NotBlank(message = "O modelo é obrigatório")
    @Size(max = 50, message = "O modelo deve ter no máximo 50 caracteres")
    private String modelo;
    
    @NotNull(message = "O ano é obrigatório")
    private Integer ano;
    
    @NotBlank(message = "O status é obrigatório")
    @Size(max = 20, message = "O status deve ter no máximo 20 caracteres")
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "ID_Localizacao")
    private Localizacao localizacao;
}