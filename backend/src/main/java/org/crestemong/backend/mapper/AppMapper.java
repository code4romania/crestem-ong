package org.crestemong.backend.mapper;

import org.mapstruct.IterableMapping;
import org.mapstruct.Named;

import java.util.List;

public interface AppMapper<ENTITY, DTO> {

    @Named(value = "defaultMapToDTO")
    DTO mapToDTO(ENTITY entity);

    @IterableMapping(qualifiedByName = "defaultMapToDTO")
    List<DTO> mapToDTOList(List<ENTITY> entities);

    @Named(value = "defaultMapToEntity")
    ENTITY mapToEntity(DTO dto);

    @IterableMapping(qualifiedByName = "defaultMapToEntity")
    List<ENTITY> mapToEntityList(Iterable<DTO> dtos);
}
