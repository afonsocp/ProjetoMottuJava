package com.motoeletrica.controller;

import com.motoeletrica.dto.MotoDTO;
import com.motoeletrica.service.MotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/motos")
public class MotoController {

    @Autowired
    private MotoService motoService;

    @GetMapping
    public ResponseEntity<Page<MotoDTO>> listarTodas(Pageable pageable) {
        return ResponseEntity.ok(motoService.listarTodas(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MotoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(motoService.buscarPorId(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<MotoDTO>> buscarPorStatus(
            @PathVariable String status,
            Pageable pageable) {
        return ResponseEntity.ok(motoService.buscarPorStatus(status, pageable));
    }

    @PostMapping
    public ResponseEntity<MotoDTO> criar(@Valid @RequestBody MotoDTO dto) {
        return ResponseEntity.ok(motoService.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MotoDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody MotoDTO dto) {
        return ResponseEntity.ok(motoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        motoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}