package com.example.reqman.services.skill.createSkill;

import com.example.reqman.mapper.ErrorMessages;
import com.example.reqman.mapper.SkillDTO;
import org.springframework.stereotype.Component;

@Component
public interface CreateSkill {
    ErrorMessages createSkill(SkillDTO skillDTO);
}
