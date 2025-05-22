package com.motoeletrica.service;

import com.motoeletrica.model.Localizacao;
import com.motoeletrica.repository.LocalizacaoRepository;
import com.motoeletrica.dto.LocalizacaoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
public class LocalizacaoService {

    @Autowired
    private LocalizacaoRepository localizacaoRepository;

    @Cacheable("localizacoes")
    public Page<LocalizacaoDTO> listarTodos(Pageable pageable) {
        return localizacaoRepository.findAll(pageable)
                .map(this::converterParaDTO);
    }

    public LocalizacaoDTO buscarPorId(Long id) {
        return localizacaoRepository.findById(id)
                .map(this::converterParaDTO)
                .orElseThrow(() -> new EntityNotFoundException("Localização não encontrada"));
    }

    @Transactional
    public LocalizacaoDTO salvar(LocalizacaoDTO dto) {
        Localizacao localizacao = converterParaEntidade(dto);
        localizacao = localizacaoRepository.save(localizacao);
        return converterParaDTO(localizacao);
    }

    @Transactional
    public LocalizacaoDTO atualizar(Long id, LocalizacaoDTO dto) {
        if (!localizacaoRepository.existsById(id)) {
            throw new EntityNotFoundException("Localização não encontrada");
        }
        Localizacao localizacao = converterParaEntidade(dto);
        localizacao.setIdLocalizacao(id);
        localizacao = localizacaoRepository.save(localizacao);
        return converterParaDTO(localizacao);
    }

    @Transactional
    public void deletar(Long id) {
        if (!localizacaoRepository.existsById(id)) {
            throw new EntityNotFoundException("Localização não encontrada");
        }
        localizacaoRepository.deleteById(id);
    }

    private LocalizacaoDTO converterParaDTO(Localizacao localizacao) {
        LocalizacaoDTO dto = new LocalizacaoDTO();
        dto.setIdLocalizacao(localizacao.getIdLocalizacao());
        dto.setEndereco(localizacao.getEndereco());
        dto.setCep(localizacao.getCep());
        dto.setCidade(localizacao.getCidade());
        dto.setEstado(localizacao.getEstado());
        return dto;
    }

    private Localizacao converterParaEntidade(LocalizacaoDTO dto) {
        Localizacao localizacao = new Localizacao();
        localizacao.setIdLocalizacao(dto.getIdLocalizacao());
        localizacao.setEndereco(dto.getEndereco());
        localizacao.setCep(dto.getCep());
        localizacao.setCidade(dto.getCidade());
        localizacao.setEstado(dto.getEstado());
        return localizacao;
    }
}