
package com.digitaltwin.community.room.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.digitaltwin.community.room.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

    // 기존 메서드 유지
    Room findByRoomNumber(String roomNumber);

    // 객실 번호 중복 확인
    boolean existsByRoomNumber(String roomNumber);

    // 층별 객실 조회
    List<Room> findByFloor(Integer floor);

    // 객실 상태별 조회
    List<Room> findByStatus(String status);

    // 정원 확인 등 동시성 제어를 위한 잠금 조회
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT r FROM Room r WHERE r.id = :id")
    Optional<Room> findByIdForUpdate(@Param("id") Long id);
}
