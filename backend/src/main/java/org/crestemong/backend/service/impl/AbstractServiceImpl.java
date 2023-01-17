package org.crestemong.backend.service.impl;

import jakarta.transaction.Transactional;
import org.crestemong.api.model.AbstractDTO;
import org.crestemong.api.model.AppEntityStatus;
import org.crestemong.backend.controller.base.Preconditions;
import org.crestemong.backend.mapper.AppMapper;
import org.crestemong.backend.model.AbstractEntity;
import org.crestemong.backend.model.MessageKey;
import org.crestemong.backend.repository.AppRepository;
import org.crestemong.backend.service.AppService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public abstract class AbstractServiceImpl<ENTITY extends AbstractEntity, DTO extends AbstractDTO> implements AppService<DTO> {

    protected final AppRepository<ENTITY> repository;
    protected final AppMapper<ENTITY, DTO> mapper;

    public AbstractServiceImpl(AppRepository<ENTITY> repository, AppMapper<ENTITY, DTO> mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public Page<DTO> findAll(Pageable pageable) {
        Page<ENTITY> page = repository.findAll(pageable);
        return page.map(defaultMapToDTO());
    }

    @Override
    public Page<DTO> findAllByIdIn(Iterable<Long> iterable, Pageable pageable) {
        Page<ENTITY> page = repository.findAllByIdIn(iterable, pageable);
        return page.map(defaultMapToDTO());
    }

    @Override
    @Transactional
    public DTO findOne(Long id) {
        final ENTITY entity = Preconditions.exists(
                repository.findById(id).orElse(null),
                MessageKey.Entity.NOT_FOUND
        );
        return defaultMapToDTO().apply(entity);
    }

    @Override
    @Transactional
    public DTO save(DTO dto) {
        ENTITY entity = mapper.mapToEntity(dto);
        preSave(entity, dto);
        ENTITY savedEntity = repository.save(entity);
        postSave(savedEntity);
        return defaultMapToDTO().apply(savedEntity);
    }

    @Override
    @Transactional
    public DTO update(Long id, DTO dto) {
        ENTITY existingEntity = Preconditions.exists(
                repository.findById(id).orElse(null),
                MessageKey.Entity.NOT_FOUND
        );
        if (dto.getStatus() == null) {
            dto.setStatus(existingEntity.getStatus());
        }

        ENTITY updatedEntity = mapper.mapToEntity(dto);
        updatedEntity.setCreatedAt(existingEntity.getCreatedAt());
        updatedEntity.setCreatedBy(existingEntity.getCreatedBy());
        updatedEntity.setId(id);

        preSave(updatedEntity, dto);
        ENTITY savedEntity = repository.saveAndFlush(updatedEntity);
        postSave(savedEntity);

        return defaultMapToDTO().apply(savedEntity);
    }

    @Override
    @Transactional
    public List<DTO> saveAll(Iterable<DTO> iterable) {
        List<DTO> dtos = new ArrayList<>();
        for (DTO dto : iterable) {
            DTO savedDTO = this.save(dto);
            dtos.add(savedDTO);
        }
        return dtos;
    }

    @Override
    public long count() {
        return repository.count();
    }

    @Override
    @Transactional
    public void delete(DTO dto) {
        ENTITY entity = mapper.mapToEntity(dto);
        Preconditions.exists(
                repository.existsById(entity.getId()),
                MessageKey.Entity.NOT_FOUND
        );
        repository.delete(entity);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Preconditions.exists(
                repository.existsById(id),
                MessageKey.Entity.NOT_FOUND
        );
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public void markAs(Long id, AppEntityStatus status) {
        Preconditions.exists(
                repository.existsById(id),
                MessageKey.Entity.NOT_FOUND
        );
        repository.updateStatusById(id, status);
    }

    @Override
    public void deleteAll() {
        repository.deleteAll();
    }

    @Override
    @Transactional
    public void deleteInBatch(Iterable<DTO> iterable) {
        List<ENTITY> entities = mapper.mapToEntityList(iterable);
        entities.forEach(repository::delete);
    }

    @Override
    @Transactional
    public AppEntityStatus findStatusById(Long id) {
        Preconditions.exists(
                repository.existsById(id),
                MessageKey.Entity.NOT_FOUND
        );
        return repository.findStatusById(id);
    }

    protected Function<ENTITY, DTO> defaultMapToDTO() {
        return mapper::mapToDTO;
    }

    protected Function<List<ENTITY>, List<DTO>> defaultMapToDTOList() {
        return mapper::mapToDTOList;
    }

    protected void preSave(ENTITY entity, DTO dto) {
        // no updates by default
    }

    protected void postSave(ENTITY savedEntity) {
        // no updates by default
    }
}
