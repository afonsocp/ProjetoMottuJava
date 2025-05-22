package com.motoeletrica.service;

import com.motoeletrica.model.Localizacao;
import com.motoeletrica.model.Moto;
import com.motoeletrica.repository.MotoRepository;
import com.motoeletrica.dto.LocalizacaoDTO;
import com.motoeletrica.dto.MotoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
public class MotoService {

    @Autowired
    private MotoRepository motoRepository;

    @Cacheable("motos")
    public Page<MotoDTO> listarTodas(Pageable pageable) {
        return motoRepository.findAll(pageable)
                .map(this::converterParaDTO);
    }

    public MotoDTO buscarPorId(Long id) {
        return motoRepository.findById(id)
                .map(this::converterParaDTO)
                .orElseThrow(() -> new EntityNotFoundException("Moto não encontrada"));
    }

    @Transactional
    public MotoDTO salvar(MotoDTO dto) {
        Moto moto = converterParaEntidade(dto);
        moto = motoRepository.save(moto);
        return converterParaDTO(moto);
    }

    @Transactional
    public MotoDTO atualizar(Long id, MotoDTO dto) {
        if (!motoRepository.existsById(id)) {
            throw new EntityNotFoundException("Moto não encontrada");
        }
        Moto moto = converterParaEntidade(dto);
        moto.setIdMoto(id);
        moto = motoRepository.save(moto);
        return converterParaDTO(moto);
    }

    @Transactional
    public void deletar(Long id) {
        if (!motoRepository.existsById(id)) {
            throw new EntityNotFoundException("Moto não encontrada");
        }
        motoRepository.deleteById(id);
    }

    @Cacheable("motos-por-status")
    public Page<MotoDTO> buscarPorStatus(String status, Pageable pageable) {
        return motoRepository.findByStatus(status, pageable)
                .map(this::converterParaDTO);
    }

    private MotoDTO converterParaDTO(Moto moto) {
        MotoDTO dto = new MotoDTO();
        dto.setIdMoto(moto.getIdMoto());
        dto.setPlaca(moto.getPlaca());
        dto.setModelo(moto.getModelo());
        dto.setAno(moto.getAno());
        dto.setStatus(moto.getStatus());
        if (moto.getLocalizacao() != null) {
            LocalizacaoDTO localizacaoDTO = new LocalizacaoDTO();
            localizacaoDTO.setIdLocalizacao(moto.getLocalizacao().getIdLocalizacao());
            localizacaoDTO.setEndereco(moto.getLocalizacao().getEndereco());
            localizacaoDTO.setCep(moto.getLocalizacao().getCep());
            localizacaoDTO.setCidade(moto.getLocalizacao().getCidade());
            localizacaoDTO.setEstado(moto.getLocalizacao().getEstado());
            dto.setLocalizacao(localizacaoDTO);
        }
        return dto;
    }

    private Moto converterParaEntidade(MotoDTO dto) {
        Moto moto = new Moto();
        moto.setIdMoto(dto.getIdMoto());
        moto.setPlaca(dto.getPlaca());
        moto.setModelo(dto.getModelo());
        moto.setAno(dto.getAno());
        moto.setStatus(dto.getStatus());
        if (dto.getLocalizacao() != null) {
            Localizacao localizacao = new Localizacao();
            localizacao.setIdLocalizacao(dto.getLocalizacao().getIdLocalizacao());
            localizacao.setEndereco(moto.getLocalizacao().getEndereco());
            localizacao.setCep(moto.getLocalizacao().getCep());
            localizacao.setCidade(moto.getLocalizacao().getCidade());
            localizacao.setEstado(moto.getLocalizacao().getEstado());
            moto.setLocalizacao(localizacao);
        }
        return moto;
    }
}