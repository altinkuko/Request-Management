package com.example.reqman.services.skill;

import com.example.reqman.database.repository.SkillsRepository;
import com.example.reqman.mapper.SkillDTO;
import com.example.reqman.services.skill.getAllSkills.GetAllSkills;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class SkillService implements GetAllSkills {
    private final SkillsRepository skillsRepository;
    @Override
    public List<SkillDTO> getAllSkills() {
        return SkillDTO.toDtoList(skillsRepository.findAll());
    }
}
