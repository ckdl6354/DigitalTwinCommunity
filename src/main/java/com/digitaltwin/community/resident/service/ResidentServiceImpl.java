
package com.digitaltwin.community.resident.service;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.digitaltwin.community.careRequest.repository.CareRequestRepository;
import com.digitaltwin.community.health.repository.HealthRecordRepository;
import com.digitaltwin.community.resident.entity.Resident;
import com.digitaltwin.community.resident.repository.ResidentRepository;
import com.digitaltwin.community.room.entity.Room;
import com.digitaltwin.community.room.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ResidentServiceImpl implements ResidentService {

    private final ResidentRepository residentRepository;
    private final RoomRepository roomRepository;
    private final HealthRecordRepository healthRecordRepository;
    private final CareRequestRepository careRequestRepository;

    @Override
    public Resident save(Resident resident) {

        validateResident(resident);

        if (resident.getId() != null) {
            throw new IllegalArgumentException(
                    "신규 등록에는 ID를 입력하지 마세요.");
        }

        if (resident.getRoom() != null) {

            Long roomId = resident.getRoom().getId();

            if (roomId == null) {
                throw new IllegalArgumentException(
                        "객실 ID가 필요합니다.");
            }

            assignRoomEntity(resident, roomId);

        } else if (StringUtils.hasText(resident.getRoomNumber())) {

            Room room = roomRepository.findByRoomNumber(
                    resident.getRoomNumber());

            if (room == null) {
                throw new IllegalArgumentException(
                        "존재하지 않는 객실입니다.");
            }

            assignRoomEntity(resident, room.getId());
        }

        return residentRepository.save(resident);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Resident> findAll() {
        return residentRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Resident> findAll(Pageable pageable) {
        return residentRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Resident findById(Long id) {

        return residentRepository.findById(id)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                            "입주자를 찾을 수 없습니다."));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Resident> searchByName(
            String name, Pageable pageable) {

        return residentRepository
                .findByNameContainingIgnoreCase(name, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Resident> findByStatus(
            String status, Pageable pageable) {

        return residentRepository.findByStatus(status, pageable);
    }

    @Override
    public Resident update(Long id, Resident updatedResident) {

        validateResident(updatedResident);

        Resident resident = findById(id);

        resident.setName(updatedResident.getName());
        resident.setAge(updatedResident.getAge());
        resident.setGender(updatedResident.getGender());
        resident.setBirthDate(updatedResident.getBirthDate());
        resident.setCareLevel(updatedResident.getCareLevel());
        resident.setStatus(updatedResident.getStatus());
        resident.setAdmissionDate(updatedResident.getAdmissionDate());

        if (updatedResident.getRoom() != null) {

            Long roomId = updatedResident.getRoom().getId();

            if (roomId == null) {
                throw new IllegalArgumentException(
                        "객실 ID가 필요합니다.");
            }

            assignRoomEntity(resident, roomId);

        } else if (StringUtils.hasText(updatedResident.getRoomNumber())) {

            Room room = roomRepository.findByRoomNumber(
                    updatedResident.getRoomNumber());

            if (room == null) {
                throw new IllegalArgumentException(
                        "존재하지 않는 객실입니다.");
            }

            assignRoomEntity(resident, room.getId());

        } else {
            resident.setRoom(null);
            resident.setRoomNumber(null);
        }

        return residentRepository.save(resident);
    }

    @Override
    public Resident assignRoom(Long residentId, Long roomId) {

        Resident resident = findById(residentId);

        assignRoomEntity(resident, roomId);

        return residentRepository.save(resident);
    }

    @Override
    public Resident unassignRoom(Long residentId) {

        Resident resident = findById(residentId);

        resident.setRoom(null);
        resident.setRoomNumber(null);

        return residentRepository.save(resident);
    }

    // 객실 배정 공통 로직
    private void assignRoomEntity(Resident resident, Long roomId) {

        Room room = roomRepository.findByIdForUpdate(roomId)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                            "객실을 찾을 수 없습니다."));

        if (room.getCapacity() == null || room.getCapacity() <= 0) {
            throw new IllegalStateException(
                    "객실 정원을 확인할 수 없습니다.");
        }

        boolean alreadyAssigned = false;

        if (resident.getId() != null) {

            if (resident.getRoom() != null
                    && Objects.equals(
                            resident.getRoom().getId(), roomId)) {
                alreadyAssigned = true;

            } else if (resident.getRoom() == null
                    && Objects.equals(
                            resident.getRoomNumber(),
                            room.getRoomNumber())) {
                alreadyAssigned = true;
            }
        }

        if (!alreadyAssigned) {

            long occupied = residentRepository.countOccupantsByRoom(
                    room.getId(), room.getRoomNumber());

            if (occupied >= room.getCapacity()) {
                throw new IllegalStateException(
                        "객실 정원을 초과했습니다.");
            }
        }

        resident.setRoom(room);
        resident.setRoomNumber(room.getRoomNumber());
    }

    @Override
    public void delete(Long id) {

        Resident resident = findById(id);

        boolean hasHealthRecords =
                healthRecordRepository.existsByResident_Id(id);

        boolean hasCareRequests =
                careRequestRepository.existsByResident_Id(id);

        if (hasHealthRecords || hasCareRequests) {
            throw new IllegalStateException(
                    "건강 기록 또는 돌봄 요청 이력이 있어 삭제할 수 없습니다.");
        }

        residentRepository.delete(resident);
    }

    private void validateResident(Resident resident) {

        if (resident == null
                || !StringUtils.hasText(resident.getName())) {
            throw new IllegalArgumentException(
                    "입주자 이름은 필수입니다.");
        }
    }
}
