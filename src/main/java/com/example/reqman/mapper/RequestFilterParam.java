package com.example.reqman.mapper;

import lombok.Data;

import java.sql.Date;

@Data
public class RequestFilterParam {

    private Date startDate;

    private Date endDate;

    private String description;

    private String notes;

    private String status;

    private String areaOfInterest;

    private String seniority;

    private String skill;

    private String username;
}
