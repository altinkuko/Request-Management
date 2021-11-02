package com.example.reqman.services.request.deleteRequest;

import com.example.reqman.mapper.ErrorMessages;
import com.example.reqman.mapper.RequestDTO;

public interface DeleteRequest {
    ErrorMessages deleteRequest(final RequestDTO requestDTO);
}
