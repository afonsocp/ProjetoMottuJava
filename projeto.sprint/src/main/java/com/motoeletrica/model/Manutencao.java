package com.motoeletrica.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Manutencao")
public class Manutencao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Manutencao")
    private Long idManutencao;
    
    @NotNull(message = "A data é obrigatória")
    private LocalDate data;
    
    @NotNull(message = "A descrição é obrigatória")
    @Size(max = 255, message = "A descrição deve ter no máximo 255 caracteres")
    private String descricao;
    
    @NotNull(message = "O custo é obrigatório")
    private BigDecimal custo;
    
    @ManyToOne
    @JoinColumn(name = "ID_Moto")
    private Moto moto;
}