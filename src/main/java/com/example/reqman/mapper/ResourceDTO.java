package com.example.reqman.mapper;

import com.example.reqman.database.entity.ResourceEntity;
import com.example.reqman.database.entity.Seniority;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResourceDTO {

    private Long resourceId;

    private List<SkillDTO> skillDTOS;

    private String note;

    @Enumerated(EnumType.STRING)
    private Seniority seniority;

    @JsonIgnore
    private RequestDTO requestDTO;

    public static ResourceEntity toEntity(ResourceDTO resourceDTO){
        return ResourceEntity.builder()
                .resourceId(resourceDTO.resourceId)
                .seniority(resourceDTO.seniority)
                .note(resourceDTO.note)
                .build();
    }

    public static ResourceDTO toDto(ResourceEntity resourceEntity){
        return ResourceDTO.builder()
                .resourceId(resourceEntity.getResourceId())
                .seniority(resourceEntity.getSeniority())
                .note(resourceEntity.getNote())
                .skillDTOS(SkillDTO.toDtoList(resourceEntity.getSkillEntities()))
                .build();
    }

    public static List<ResourceEntity> toEntityList(List<ResourceDTO> resourceDTOS){
        return resourceDTOS.stream().map(ResourceDTO::toEntity).collect(Collectors.toList());
    }
    public static List<ResourceDTO> toDtoList(List<ResourceEntity> entities){
        return entities.stream().map(ResourceDTO::toDto).collect(Collectors.toList());
    }
}
