package com.example.reqman.database.repository;

import com.example.reqman.database.entity.SkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillsRepository extends JpaRepository<SkillEntity, String> {
}
