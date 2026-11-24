
package com.digitaltwin.community.careRequest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitaltwin.community.careRequest.entity.CareRequestEntity;

public interface CareRequestRepository
        extends JpaRepository<CareRequestEntity, Long> {

    // 특정 입주자의 돌봄 요청 조회
    List<CareRequestEntity>
        findByResident_IdOrderByCreatedAtDesc(Long residentId);

    // 처리 상태별 조회
    List<CareRequestEntity>
        findByStatusOrderByCreatedAtDesc(String status);

    // 우선순위별 조회
    List<CareRequestEntity>
        findByPriorityOrderByCreatedAtDesc(String priority);

    // 특정 입주자의 특정 상태 요청 조회
    List<CareRequestEntity>
        findByResident_IdAndStatusOrderByCreatedAtDesc(
            Long residentId,
            String status
        );
    boolean existsByResident_Id(Long residentId);
}
