package com.example.reqman.rest.request;

import com.example.reqman.mapper.RequestDTO;
import com.example.reqman.mapper.RequestFilterParam;
import com.example.reqman.services.request.RequestUseCase;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RequestController {
    private final RequestUseCase requestUseCase;

    @PostMapping(value = "/request")
    public RequestDTO saveRequest(@RequestBody final RequestDTO requestDTO){
       return requestUseCase.createRequest(requestDTO);
    }

    @GetMapping("/requests")
    public List<RequestDTO> getRequestByUser(){
        return requestUseCase.getRequestByUser();
    }

    @DeleteMapping("/admin/request")
    public void deleteRequest(@RequestBody RequestDTO requestDTO){
        requestUseCase.deleteRequest(requestDTO);
    }

    @PostMapping("/update-request")
    public String updateRequest(@RequestBody final RequestDTO requestDTO) throws NotFoundException {
        return requestUseCase.updateRequest(requestDTO);
    }

    @GetMapping("/request/filter")
    public List<RequestDTO> filterRequest(@RequestBody RequestFilterParam requestFilterParam){
        return requestUseCase.filterRequest(requestFilterParam);
    }
}
