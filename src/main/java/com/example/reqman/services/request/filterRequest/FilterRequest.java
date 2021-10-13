package com.example.reqman.services.request.filterRequest;

import com.example.reqman.mapper.RequestDTO;
import com.example.reqman.mapper.RequestFilterParam;

import java.util.List;

public interface FilterRequest {
    List<RequestDTO> filterRequest(RequestFilterParam requestFilterParam);
}
