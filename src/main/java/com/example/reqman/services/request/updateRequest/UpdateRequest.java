package com.example.reqman.services.request.updateRequest;

import com.example.reqman.mapper.RequestDTO;
import javassist.NotFoundException;

public interface UpdateRequest {
    String updateRequest(RequestDTO requestDTO) throws NotFoundException;
}
