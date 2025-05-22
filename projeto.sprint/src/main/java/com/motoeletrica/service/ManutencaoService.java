package com.motoeletrica.service;

import com.motoeletrica.model.Manutencao;
import com.motoeletrica.model.Moto;
import com.motoeletrica.repository.ManutencaoRepository;
import com.motoeletrica.dto.ManutencaoDTO;
import com.motoeletrica.dto.MotoDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
public class ManutencaoService {

    @Autowired
    private ManutencaoRepository manutencaoRepository;

    @Cacheable("manutencoes")
    public Page<ManutencaoDTO> listarTodas(Pageable pageable) {
        return manutencaoRepository.findAll(pageable)
                .map(this::converterParaDTO);
    }

    public ManutencaoDTO buscarPorId(Long id) {
        return manutencaoRepository.findById(id)
                .map(this::converterParaDTO)
                .orElseThrow(() -> new EntityNotFoundException("Manutenção não encontrada"));
    }

    @Transactional
    public ManutencaoDTO salvar(ManutencaoDTO dto) {
        Manutencao manutencao = converterParaEntidade(dto);
        manutencao = manutencaoRepository.save(manutencao);
        return converterParaDTO(manutencao);
    }

    @Transactional
    public ManutencaoDTO atualizar(Long id, ManutencaoDTO dto) {
        if (!manutencaoRepository.existsById(id)) {
            throw new EntityNotFoundException("Manutenção não encontrada");
        }
        Manutencao manutencao = converterParaEntidade(dto);
        manutencao.setIdManutencao(id);
        manutencao = manutencaoRepository.save(manutencao);
        return converterParaDTO(manutencao);
    }

    @Transactional
    public void deletar(Long id) {
        if (!manutencaoRepository.existsById(id)) {
            throw new EntityNotFoundException("Manutenção não encontrada");
        }
        manutencaoRepository.deleteById(id);
    }

    private ManutencaoDTO converterParaDTO(Manutencao manutencao) {
        ManutencaoDTO dto = new ManutencaoDTO();
        dto.setIdManutencao(manutencao.getIdManutencao());
        dto.setData(manutencao.getData());
        dto.setDescricao(manutencao.getDescricao());
        dto.setCusto(manutencao.getCusto());
        if (manutencao.getMoto() != null) {
            MotoDTO motoDTO = new MotoDTO();
            motoDTO.setIdMoto(manutencao.getMoto().getIdMoto());
            motoDTO.setPlaca(manutencao.getMoto().getPlaca());
            motoDTO.setModelo(manutencao.getMoto().getModelo());
            dto.setMoto(motoDTO);
        }
        return dto;
    }

    private Manutencao converterParaEntidade(ManutencaoDTO dto) {
        Manutencao manutencao = new Manutencao();
        manutencao.setIdManutencao(dto.getIdManutencao());
        manutencao.setData(dto.getData());
        manutencao.setDescricao(dto.getDescricao());
        manutencao.setCusto(dto.getCusto());
        if (dto.getMoto() != null) {
            Moto moto = new Moto();
            moto.setIdMoto(dto.getMoto().getIdMoto());
            manutencao.setMoto(moto);
        }
        return manutencao;
    }
}