package com.example.reqman.services.skill.getAllSkills;

import com.example.reqman.mapper.SkillDTO;

import java.util.List;

@FunctionalInterface
public interface GetAllSkills {
    List<SkillDTO> getAllSkills();
}
