package com.example.reqman.services.request;

import com.example.reqman.database.entity.*;
import com.example.reqman.database.repository.RequestRepository;
import com.example.reqman.database.repository.ResourceRepository;
import com.example.reqman.database.repository.UserRepository;
import com.example.reqman.mapper.*;
import com.example.reqman.services.email.EmailService;
import com.example.reqman.services.request.createRequest.RequestCreate;
import com.example.reqman.services.request.deleteRequest.DeleteRequest;
import com.example.reqman.services.request.filterRequest.FilterRequest;
import com.example.reqman.services.request.getRequest.RequestByUser;
import com.example.reqman.services.request.updateRequest.UpdateRequest;
import com.example.reqman.services.userService.GetAuthentication;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestUseCase implements RequestCreate, RequestByUser, DeleteRequest, UpdateRequest, FilterRequest {

    private final RequestRepository requestEntityRepository;
    private final ResourceRepository resourceRepository;
    private final EntityManager entityManager;
    private final GetAuthentication getAuthentication;
    private final EmailService emailService;
    private final UserRepository userRepository;

    @Override
    public RequestDTO createRequest(final RequestDTO requestDTO) {
        if (requestDTO.getStatus() == null)
            requestDTO.setStatus(Status.CREATED);
        RequestEntity requestEntity = RequestDTO.toEntity(requestDTO);
        List<ResourceEntity> resourceEntities = new ArrayList<>();
        requestDTO.getResourceDTOS().forEach(resourceDTO -> {
            resourceEntities.add(ResourceEntity.builder()
                    .note(resourceDTO.getNote())
                    .seniority(resourceDTO.getSeniority())
                    .requestEntity(requestEntity)
                    .skillEntities(SkillDTO.toEntityList(resourceDTO.getSkillDTOS()))
                    .build());
        });
        requestEntity.setCreatedBy(getAuthentication.getUser().getUsername());
        requestEntity.setCreatedDate(Date.valueOf(LocalDate.now()));
        requestEntity.setResourceEntities(resourceEntities);
        requestEntityRepository.save(requestEntity);
        sendEmail(requestEntity);
        return RequestDTO.toDto(requestEntity);
    }

    @Override
    public List<RequestDTO> getRequestByUser() {
        return RequestDTO.toDtoList(
                requestEntityRepository.findAllByCreatedBy(getAuthentication.getUser().getUsername()));
    }

    @Override
    public void deleteRequest(RequestDTO requestDTO) {
        resourceRepository.deleteAll(resourceRepository.findAllByRequestEntity(RequestDTO.toEntity(requestDTO)));
        requestEntityRepository.delete(RequestDTO.toEntity(requestDTO));
    }


    @Override
    public String updateRequest(RequestDTO requestDTO) throws NotFoundException {
        RequestEntity entity = requestEntityRepository.findById(requestDTO.getId()).
                orElseThrow(() -> new NotFoundException("Not Found"));
        if (entity.getStatus() == Status.IN_PROGRESS
                && !entity.getLastModifiedBy().equals(getAuthentication.getUser().getUsername()))
            return "This request can not modified  by you. Please contact " + entity.getLastModifiedBy();
        else {
            RequestEntity finalEntity = RequestDTO.toEntity(requestDTO);
            List<ResourceEntity> resourceEntities = new ArrayList<>();
            requestDTO.getResourceDTOS().forEach(resourceDTO -> {
                ResourceEntity resourceEntity = ResourceDTO.toEntity(resourceDTO);
                resourceEntity.setSkillEntities(SkillDTO.toEntityList(resourceDTO.getSkillDTOS()));
                resourceEntity.setRequestEntity(finalEntity);
                resourceEntities.add(resourceEntity);
            });
            finalEntity.setResourceEntities(resourceRepository.saveAll(resourceEntities));
            finalEntity.setLastModifiedBy(getAuthentication.getUser().getUsername());
            finalEntity.setLastModifiedDate(Date.valueOf(LocalDate.now()));
            requestEntityRepository.save(finalEntity);
            return "Updated";
        }
    }

    @Override
    public List<RequestDTO> filterRequest(RequestFilterParam requestFilterParam) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<RequestEntity> criteriaQuery = criteriaBuilder.createQuery(RequestEntity.class);
        Root<RequestEntity> request = criteriaQuery.from(RequestEntity.class);
        Join<RequestEntity, ResourceEntity> requestResourceJoin = request.join("resourceEntities");
        Join<ResourceEntity, SkillEntity> resourceSkillJoin = requestResourceJoin.join("skillEntities");
        List<Predicate> predicates = new ArrayList<>();
        if (requestFilterParam.getAreaOfInterest() != null)
            predicates.add(criteriaBuilder.equal(request.get("areaOfInterest"),
                    AreaOfInterest.valueOf(requestFilterParam.getAreaOfInterest())));
        if (requestFilterParam.getStartDate() != null)
            predicates.add(criteriaBuilder.equal(request.get("startDate"),
                    requestFilterParam.getStartDate()));
        if (requestFilterParam.getEndDate() != null)
            predicates.add(criteriaBuilder.equal(request.get("endDate"),
                    requestFilterParam.getEndDate()));
        if (requestFilterParam.getStatus() != null)
            predicates.add(criteriaBuilder.equal(request.get("status"),
                    Status.valueOf(requestFilterParam.getStatus())));
        if (requestFilterParam.getResourceFilterParam() != null) {
            if (requestFilterParam.getResourceFilterParam().getSeniority() != null)
                predicates.add(criteriaBuilder.equal(requestResourceJoin.get("seniority"),
                        requestFilterParam.getResourceFilterParam().getSeniority()));
            if (requestFilterParam.getResourceFilterParam().getSkillFilterParam() != null)
                predicates.add(criteriaBuilder.equal(resourceSkillJoin.get("skill"),
                        requestFilterParam.getResourceFilterParam().getSkillFilterParam().getSkill()));
        }
        if (requestFilterParam.getUsername() != null)
            predicates.add(criteriaBuilder.equal(request.get("createdBy"), requestFilterParam.getUsername()));
        criteriaQuery.where(predicates.toArray(Predicate[]::new));
        TypedQuery<RequestEntity> query = entityManager.createQuery(criteriaQuery);
        return RequestDTO.toDtoList(query.getResultList());
    }

    public List<String> adminEmails() {
        List<String> administratorsEmails = new ArrayList<>();
        userRepository.findAllByRole(Roles.ROLE_ADMIN).forEach(user -> {
            administratorsEmails.add(user.getEmail());
        });
        return administratorsEmails;
    }

    private void sendEmail(RequestEntity entity) {
        emailService.sendCreationEmail(EmailParam.builder()
                .to(adminEmails())
                .message(entity.getDescription())
                .topic(entity.getNotes())
                .build()
        );
    }
}
