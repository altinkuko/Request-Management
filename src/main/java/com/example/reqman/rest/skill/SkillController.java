package com.example.reqman.rest.skill;

import com.example.reqman.mapper.SkillDTO;
import com.example.reqman.services.skill.getAllSkills.GetAllSkills;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SkillController {
    private final GetAllSkills getAllSkills;
    @GetMapping("/skills")
    public ResponseEntity<List<SkillDTO>> getAllSkills(){
        return ResponseEntity.ok(getAllSkills.getAllSkills());
    }
}
