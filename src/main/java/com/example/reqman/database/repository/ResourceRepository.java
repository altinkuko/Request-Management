package com.example.reqman.database.repository;

import com.example.reqman.database.entity.RequestEntity;
import com.example.reqman.database.entity.ResourceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRepository extends JpaRepository<ResourceEntity, Long> {
    List<ResourceEntity> findAllByRequestEntity(RequestEntity requestEntity);
}
