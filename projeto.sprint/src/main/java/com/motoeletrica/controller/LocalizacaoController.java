package com.motoeletrica.controller;

import com.motoeletrica.dto.LocalizacaoDTO;
import com.motoeletrica.service.LocalizacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/localizacoes")
public class LocalizacaoController {

    @Autowired
    private LocalizacaoService localizacaoService;

    @GetMapping
    public ResponseEntity<Page<LocalizacaoDTO>> listarTodos(Pageable pageable) {
        return ResponseEntity.ok(localizacaoService.listarTodos(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocalizacaoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(localizacaoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<LocalizacaoDTO> criar(@Valid @RequestBody LocalizacaoDTO dto) {
        return ResponseEntity.ok(localizacaoService.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocalizacaoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody LocalizacaoDTO dto) {
        return ResponseEntity.ok(localizacaoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        localizacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}