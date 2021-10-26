package com.example.reqman.services.request.updateRequest;

import com.example.reqman.mapper.ErrorMessages;
import com.example.reqman.mapper.RequestDTO;
import javassist.NotFoundException;

public interface UpdateRequest {
    ErrorMessages updateRequest(RequestDTO requestDTO) throws NotFoundException;
}
