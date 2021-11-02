package com.example.reqman.services.request;

import com.example.reqman.database.entity.*;
import com.example.reqman.database.repository.RequestRepository;
import com.example.reqman.database.repository.ResourceRepository;
import com.example.reqman.database.repository.UserRepository;
import com.example.reqman.mapper.*;
import com.example.reqman.services.email.EmailService;
import com.example.reqman.services.request.createRequest.CreateRequest;
import com.example.reqman.services.request.deleteRequest.DeleteRequest;
import com.example.reqman.services.request.filterRequest.FilterRequest;
import com.example.reqman.services.request.getRequest.RequestByUser;
import com.example.reqman.services.request.updateRequest.UpdateRequest;
import com.example.reqman.services.userService.GetAuthentication;
import com.example.reqman.services.userService.UserService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RequestUseCase implements CreateRequest, RequestByUser, DeleteRequest, UpdateRequest, FilterRequest {

    private final RequestRepository requestEntityRepository;
    private final ResourceRepository resourceRepository;
    private final EntityManager entityManager;
    private final GetAuthentication getAuthentication;
    private final EmailService emailService;
    private final UserRepository userRepository;

    @Override
    public ErrorMessages createRequest(final RequestDTO requestDTO) {
        try {
            if (requestDTO.getResourceDTOS() == null)
                requestDTO.setResourceDTOS(new ArrayList<>());
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
            //sendEmail(requestEntityRepository.save(requestEntity));
            return new ErrorMessages("Request Created");
        } catch (Exception e) {
            return new ErrorMessages(e.getMessage());
        }

    }

    @Override
    public List<RequestDTO> getRequestByUser() {
        User user = getAuthentication.getUser();
        if (user.getRole() == Roles.ROLE_ADMIN)
            return RequestDTO.toDtoList(requestEntityRepository.findAll());
        else
            return RequestDTO.toDtoList(
                    requestEntityRepository.findAllByCreatedBy(user.getUsername()));
    }

    @Override
    public ErrorMessages deleteRequest(RequestDTO requestDTO) {
        ErrorMessages errorMessage = new ErrorMessages();
        Optional<RequestEntity> entity = requestEntityRepository.findById(requestDTO.getId());
        if (entity.isPresent()) {
            if (entity.get().getLastModifiedBy() != null
                    && entity.get().getStatus() == Status.IN_PROGRESS
                    && !entity.get().getLastModifiedBy().equals(getAuthentication.getUser().getUsername())) {
                errorMessage.setMessage("This request can not modified by you. Please contact " + entity.get().getLastModifiedBy());
            } else {
                resourceRepository.deleteAll(resourceRepository.findAllByRequestEntity(RequestDTO.toEntity(requestDTO)));
                requestEntityRepository.delete(RequestDTO.toEntity(requestDTO));
                errorMessage.setMessage("Deleted");
            }
        }
        return errorMessage;
    }


    @Override
    public ErrorMessages updateRequest(RequestDTO requestDTO) throws NotFoundException {
        RequestEntity entity = requestEntityRepository.findById(requestDTO.getId()).
                orElseThrow(() -> new NotFoundException("Not Found"));
        if (entity.getLastModifiedBy() != null && entity.getStatus() == Status.IN_PROGRESS
                && !entity.getLastModifiedBy().equals(getAuthentication.getUser().getUsername()))
            return new ErrorMessages("This request can not modified  by you. Please contact " + entity.getLastModifiedBy());
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
            return new ErrorMessages("Updated");
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
        if (requestFilterParam.getSeniority() != null)
            predicates.add(criteriaBuilder.equal(requestResourceJoin.get("seniority"),
                    Seniority.valueOf(requestFilterParam.getSeniority())));
        if (requestFilterParam.getSkill() != null)
            predicates.add(criteriaBuilder.equal(resourceSkillJoin.get("skill"),
                    requestFilterParam.getSkill()));
        if (requestFilterParam.getUsername() == null
                && !UserService.isAdmin(SecurityContextHolder.getContext().getAuthentication()))
            predicates.add(criteriaBuilder.equal(request.get("createdBy"),
                    SecurityContextHolder.getContext().getAuthentication().getName()));
        if (requestFilterParam.getUsername() != null)
            predicates.add(criteriaBuilder.like(request.get("createdBy"),
                    "%"+requestFilterParam.getUsername()+"%"));
        if (requestFilterParam.getNotes() != null)
            predicates.add(criteriaBuilder.like(request.get("notes"),"%"+requestFilterParam.getNotes()+"%"));
        if (requestFilterParam.getDescription() !=null)
            predicates.add(criteriaBuilder.like(request.get("description"), "%"+requestFilterParam.getDescription()+"%"));
        criteriaQuery.where(predicates.toArray(Predicate[]::new));
        TypedQuery<RequestEntity> query = entityManager.createQuery(criteriaQuery);
        Set<RequestEntity> result = new HashSet<>(query.getResultList());
        return RequestDTO.toDtoList(new ArrayList<>(result));
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
