package com.example.reqman.services.request.createRequest;

import com.example.reqman.mapper.ErrorMessages;
import com.example.reqman.mapper.RequestDTO;

public interface RequestCreate {
    ErrorMessages createRequest(RequestDTO requestDTO);
}
