
package com.digitaltwin.community.health.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.digitaltwin.community.resident.entity.Resident;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "health_records")
@Getter
@Setter
@NoArgsConstructor
public class HealthRecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resident_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Resident resident;

    @Column(nullable = false)
    private String measurementType;

    private Double measurementValue;

    private String measurementUnit;

    @Column(nullable = false)
    private LocalDateTime recordedAt;

    private String memo;
}
