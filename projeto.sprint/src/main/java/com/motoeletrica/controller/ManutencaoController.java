package com.motoeletrica.controller;

import com.motoeletrica.dto.ManutencaoDTO;
import com.motoeletrica.service.ManutencaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/manutencoes")
public class ManutencaoController {

    @Autowired
    private ManutencaoService manutencaoService;

    @GetMapping
    public ResponseEntity<Page<ManutencaoDTO>> listarTodas(Pageable pageable) {
        return ResponseEntity.ok(manutencaoService.listarTodas(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManutencaoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(manutencaoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ManutencaoDTO> criar(@Valid @RequestBody ManutencaoDTO dto) {
        return ResponseEntity.ok(manutencaoService.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ManutencaoDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody ManutencaoDTO dto) {
        return ResponseEntity.ok(manutencaoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        manutencaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}