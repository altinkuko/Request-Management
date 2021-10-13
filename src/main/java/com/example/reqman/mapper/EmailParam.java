package com.example.reqman.mapper;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class EmailParam {
    private List<String> to;
    private String message;
    private String topic;
}
