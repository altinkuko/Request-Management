package com.example.reqman.services.skill;

import com.example.reqman.database.entity.SkillEntity;
import com.example.reqman.database.repository.SkillsRepository;
import com.example.reqman.mapper.ErrorMessages;
import com.example.reqman.mapper.SkillDTO;
import com.example.reqman.services.skill.createSkill.CreateSkill;
import com.example.reqman.services.skill.getAllSkills.GetAllSkills;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService implements GetAllSkills, CreateSkill {
    private final SkillsRepository skillsRepository;

    @Override
    public List<SkillDTO> getAllSkills() {
        return SkillDTO.toDtoList(skillsRepository.findAll());
    }

    @Override
    public ErrorMessages createSkill(SkillDTO skillDTO) {
        if (skillsRepository.findById(skillDTO.getSkill().toUpperCase()).isPresent()) {
            return new ErrorMessages("This skill already exist in database");
        } else {
            skillsRepository.save(new SkillEntity(skillDTO.getSkill().toUpperCase()));
            return new ErrorMessages("Skill Created");
        }

    }
}
