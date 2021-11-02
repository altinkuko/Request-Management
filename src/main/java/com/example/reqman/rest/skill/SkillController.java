package com.example.reqman.rest.skill;

import com.example.reqman.mapper.ErrorMessages;
import com.example.reqman.mapper.SkillDTO;
import com.example.reqman.services.skill.createSkill.CreateSkill;
import com.example.reqman.services.skill.getAllSkills.GetAllSkills;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SkillController {
    private final GetAllSkills getAllSkills;
    private final CreateSkill createSkill;

    @GetMapping("/skills")
    public ResponseEntity<List<SkillDTO>> getAllSkills() {
        return ResponseEntity.ok(getAllSkills.getAllSkills());
    }

    @PostMapping("/skill")
    public ResponseEntity<ErrorMessages> createSkill(@RequestBody SkillDTO skillDTO){
       return ResponseEntity.ok(createSkill.createSkill(skillDTO));
    }
}
