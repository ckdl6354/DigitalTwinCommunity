
package com.digitaltwin.community.health.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitaltwin.community.health.entity.HealthRecordEntity;

public interface HealthRecordRepository
        extends JpaRepository<HealthRecordEntity, Long> {

    // 특정 입주자의 건강 기록 조회
    List<HealthRecordEntity>
        findByResident_IdOrderByRecordedAtDesc(Long residentId);

    // 특정 입주자의 기간별 건강 기록 조회
    List<HealthRecordEntity>
        findByResident_IdAndRecordedAtBetweenOrderByRecordedAtDesc(
            Long residentId,
            LocalDateTime startDate,
            LocalDateTime endDate
        );

    // 측정 종류별 건강 기록 조회
    List<HealthRecordEntity>
        findByResident_IdAndMeasurementTypeOrderByRecordedAtDesc(
            Long residentId,
            String measurementType
        );
}
