package org.crestemong.backend.service;

import org.crestemong.api.model.AppEntityStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AppService<DTO> {

    Page<DTO> findAll(Pageable pageable);

    Page<DTO> findAllByIdIn(Iterable<Long> iterable, Pageable pageable);

    DTO save(DTO dto);

    DTO update(Long id, DTO dto);

    List<DTO> saveAll(Iterable<DTO> iterable);

    DTO findOne(Long id);

    long count();

    void delete(DTO dto);

    void deleteInBatch(Iterable<DTO> iterable);

    void deleteAll();

    void deleteById(Long id);

    void markAs(Long id, AppEntityStatus status);

    AppEntityStatus findStatusById(Long id);
}