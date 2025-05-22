package com.motoeletrica.service;

import com.motoeletrica.model.Moto;
import com.motoeletrica.model.Reserva;
import com.motoeletrica.model.Usuario;
import com.motoeletrica.repository.ReservaRepository;
import com.motoeletrica.dto.MotoDTO;
import com.motoeletrica.dto.ReservaDTO;
import com.motoeletrica.dto.UsuarioDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Cacheable("reservas")
    public Page<ReservaDTO> listarTodas(Pageable pageable) {
        return reservaRepository.findAll(pageable)
                .map(this::converterParaDTO);
    }

    public ReservaDTO buscarPorId(Long id) {
        return reservaRepository.findById(id)
                .map(this::converterParaDTO)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada"));
    }

    @Transactional
    public ReservaDTO salvar(ReservaDTO dto) {
        Reserva reserva = converterParaEntidade(dto);
        reserva = reservaRepository.save(reserva);
        return converterParaDTO(reserva);
    }

    @Transactional
    public ReservaDTO atualizar(Long id, ReservaDTO dto) {
        if (!reservaRepository.existsById(id)) {
            throw new EntityNotFoundException("Reserva não encontrada");
        }
        Reserva reserva = converterParaEntidade(dto);
        reserva.setIdReserva(id);
        reserva = reservaRepository.save(reserva);
        return converterParaDTO(reserva);
    }

    @Transactional
    public void deletar(Long id) {
        if (!reservaRepository.existsById(id)) {
            throw new EntityNotFoundException("Reserva não encontrada");
        }
        reservaRepository.deleteById(id);
    }

    private ReservaDTO converterParaDTO(Reserva reserva) {
        ReservaDTO dto = new ReservaDTO();
        dto.setIdReserva(reserva.getIdReserva());
        dto.setDataReserva(reserva.getDataReserva());
        dto.setDataDevolucao(reserva.getDataDevolucao());
        
        if (reserva.getUsuario() != null) {
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setIdUsuario(reserva.getUsuario().getIdUsuario());
            usuarioDTO.setNome(reserva.getUsuario().getNome());
            dto.setUsuario(usuarioDTO);
        }
        
        if (reserva.getMoto() != null) {
            MotoDTO motoDTO = new MotoDTO();
            motoDTO.setIdMoto(reserva.getMoto().getIdMoto());
            motoDTO.setPlaca(reserva.getMoto().getPlaca());
            dto.setMoto(motoDTO);
        }
        
        return dto;
    }

    private Reserva converterParaEntidade(ReservaDTO dto) {
        Reserva reserva = new Reserva();
        reserva.setIdReserva(dto.getIdReserva());
        reserva.setDataReserva(dto.getDataReserva());
        reserva.setDataDevolucao(dto.getDataDevolucao());
        
        if (dto.getUsuario() != null) {
            Usuario usuario = new Usuario();
            usuario.setIdUsuario(dto.getUsuario().getIdUsuario());
            reserva.setUsuario(usuario);
        }
        
        if (dto.getMoto() != null) {
            Moto moto = new Moto();
            moto.setIdMoto(dto.getMoto().getIdMoto());
            reserva.setMoto(moto);
        }
        
        return reserva;
    }
}