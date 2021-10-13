package com.example.reqman.database.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @Column
    private String description;

    @Column(nullable = false, updatable = false)
    private String createdBy;

    @Column(updatable = false)
    private Date createdDate;

    @Column
    private String lastModifiedBy;

    @Column
    private Date lastModifiedDate;

    @Column
    private String notes;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private AreaOfInterest areaOfInterest;

    @OneToMany(mappedBy = "requestEntity", cascade = CascadeType.PERSIST, orphanRemoval = true)
    @ToString.Exclude
    private List<ResourceEntity> resourceEntities;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        RequestEntity that = (RequestEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
