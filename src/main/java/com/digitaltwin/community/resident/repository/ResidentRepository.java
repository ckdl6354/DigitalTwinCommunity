
package com.digitaltwin.community.resident.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.digitaltwin.community.resident.entity.Resident;

public interface ResidentRepository extends JpaRepository<Resident, Long> {

    // 이름으로 검색
    List<Resident> findByNameContainingIgnoreCase(String name);

    // 상태별 조회
    List<Resident> findByStatus(String status);

    // 이름으로 페이징 검색
    Page<Resident> findByNameContainingIgnoreCase(
            String name, Pageable pageable);

    // 상태별 페이징 조회
    Page<Resident> findByStatus(String status, Pageable pageable);

    // 특정 객실에 배정된 입주자 조회
    List<Resident> findByRoom_Id(Long roomId);

    // 객실의 현재 입주 인원 계산
    long countByRoom_Id(Long roomId);
}
