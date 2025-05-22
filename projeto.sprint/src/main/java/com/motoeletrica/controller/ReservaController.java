package com.motoeletrica.controller;

import com.motoeletrica.dto.ReservaDTO;
import com.motoeletrica.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<Page<ReservaDTO>> listarTodas(Pageable pageable) {
        return ResponseEntity.ok(reservaService.listarTodas(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(reservaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ReservaDTO> criar(@Valid @RequestBody ReservaDTO dto) {
        return ResponseEntity.ok(reservaService.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservaDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody ReservaDTO dto) {
        return ResponseEntity.ok(reservaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        reservaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}