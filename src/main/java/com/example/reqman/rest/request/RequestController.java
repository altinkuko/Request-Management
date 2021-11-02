package com.example.reqman.rest.request;

import com.example.reqman.mapper.ErrorMessages;
import com.example.reqman.mapper.RequestDTO;
import com.example.reqman.mapper.RequestFilterParam;
import com.example.reqman.services.request.createRequest.CreateRequest;
import com.example.reqman.services.request.deleteRequest.DeleteRequest;
import com.example.reqman.services.request.filterRequest.FilterRequest;
import com.example.reqman.services.request.getRequest.RequestByUser;
import com.example.reqman.services.request.updateRequest.UpdateRequest;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RequestController {
    private final CreateRequest createRequest;
    private final DeleteRequest deleteRequest;
    private final RequestByUser requestByUser;
    private final UpdateRequest updateRequest;
    private final FilterRequest filterRequest;

    @PostMapping(value = "/request")
    public ResponseEntity<ErrorMessages> saveRequest(@RequestBody final RequestDTO requestDTO) {
        return ResponseEntity.ok(createRequest.createRequest(requestDTO));
    }

    @GetMapping("/requests")
    public List<RequestDTO> getRequestByUser() {
        return requestByUser.getRequestByUser();
    }

    @PostMapping("/delete-request")
    public ResponseEntity<ErrorMessages> deleteRequest(@RequestBody RequestDTO requestDTO) {
      return ResponseEntity.ok(deleteRequest.deleteRequest(requestDTO));
    }

    @PostMapping("/update-request")
    public ResponseEntity<ErrorMessages> updateRequest(@RequestBody final RequestDTO requestDTO) throws NotFoundException {
        return ResponseEntity.ok(updateRequest.updateRequest(requestDTO));
    }

    @PostMapping("/request/filter")
    public List<RequestDTO> filterRequest(@RequestBody RequestFilterParam requestFilterParam) {
        return filterRequest.filterRequest(requestFilterParam);
    }
}
