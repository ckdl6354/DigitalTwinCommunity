
package com.digitaltwin.community.facility.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitaltwin.community.facility.entity.FacilityEntity;

public interface FacilityRepository
        extends JpaRepository<FacilityEntity, Long> {

    // 시설명 검색
    List<FacilityEntity> findByFacilityNameContainingIgnoreCase(
            String facilityName);

    // 시설 종류별 조회
    List<FacilityEntity> findByFacilityType(String facilityType);

    // 층별 시설 조회
    List<FacilityEntity> findByFloor(Integer floor);

    // 운영 상태별 조회
    List<FacilityEntity> findByStatus(String status);
}
