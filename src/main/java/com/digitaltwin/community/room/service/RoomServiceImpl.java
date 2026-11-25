
package com.digitaltwin.community.room.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.digitaltwin.community.room.entity.Room;
import com.digitaltwin.community.room.repository.RoomRepository;

import com.digitaltwin.community.resident.entity.Resident;
import com.digitaltwin.community.resident.repository.ResidentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final ResidentRepository residentRepository;

    @Override
    public Room save(Room room) {

        validateRoom(room);

        if (room.getId() != null) {
            throw new IllegalArgumentException(
                    "신규 등록에는 ID를 입력하지 마세요.");
        }

        if (roomRepository.existsByRoomNumber(room.getRoomNumber())) {
            throw new IllegalStateException(
                    "이미 등록된 객실 번호입니다.");
        }

        return roomRepository.save(room);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Room findById(Long id) {

        return roomRepository.findById(id)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                            "객실을 찾을 수 없습니다."));
    }

    @Override
    @Transactional(readOnly = true)
    public Room findByRoomNumber(String roomNumber) {

        Room room = roomRepository.findByRoomNumber(roomNumber);

        if (room == null) {
            throw new IllegalArgumentException(
                    "객실을 찾을 수 없습니다.");
        }

        return room;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Room> findByFloor(Integer floor) {
        return roomRepository.findByFloor(floor);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Room> findByStatus(String status) {
        return roomRepository.findByStatus(status);
    }

    @Override
    public Room update(Long id, Room updatedRoom) {

        validateRoom(updatedRoom);

        Room room = roomRepository.findByIdForUpdate(id)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                            "객실을 찾을 수 없습니다."));

        long occupied = residentRepository.countOccupantsByRoom(
                room.getId(), room.getRoomNumber());

        if (!room.getRoomNumber().equals(updatedRoom.getRoomNumber())
                && occupied > 0) {
            throw new IllegalStateException(
                    "입주자가 있는 객실의 객실 번호는 변경할 수 없습니다.");
        }

        Room duplicate = roomRepository.findByRoomNumber(
                updatedRoom.getRoomNumber());

        if (duplicate != null
                && !Objects.equals(duplicate.getId(), id)) {
            throw new IllegalStateException(
                    "이미 사용 중인 객실 번호입니다.");
        }

        if (updatedRoom.getCapacity() < occupied) {
            throw new IllegalStateException(
                    "현재 입주 인원보다 적은 정원으로 변경할 수 없습니다.");
        }

        room.setRoomNumber(updatedRoom.getRoomNumber());
        room.setFloor(updatedRoom.getFloor());
        room.setRoomType(updatedRoom.getRoomType());
        room.setStatus(updatedRoom.getStatus());
        room.setArea(updatedRoom.getArea());
        room.setCapacity(updatedRoom.getCapacity());
        room.setPositionX(updatedRoom.getPositionX());
        room.setPositionY(updatedRoom.getPositionY());
        room.setPositionZ(updatedRoom.getPositionZ());

        return roomRepository.save(room);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Resident> findResidents(Long roomId) {

        Room room = findById(roomId);

        return residentRepository.findOccupantsByRoom(
                room.getId(), room.getRoomNumber());
    }

    @Override
    @Transactional(readOnly = true)
    public long getOccupancy(Long roomId) {

        Room room = findById(roomId);

        return residentRepository.countOccupantsByRoom(
                room.getId(), room.getRoomNumber());
    }

    @Override
    public void delete(Long id) {

        Room room = roomRepository.findByIdForUpdate(id)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                            "객실을 찾을 수 없습니다."));

        long occupied = residentRepository.countOccupantsByRoom(
                room.getId(), room.getRoomNumber());

        if (occupied > 0) {
            throw new IllegalStateException(
                    "입주자가 배정된 객실은 삭제할 수 없습니다.");
        }

        roomRepository.delete(room);
    }

    private void validateRoom(Room room) {

        if (room == null) {
            throw new IllegalArgumentException(
                    "객실 정보가 필요합니다.");
        }

        if (!StringUtils.hasText(room.getRoomNumber())) {
            throw new IllegalArgumentException(
                    "객실 번호는 필수입니다.");
        }

        if (room.getCapacity() == null || room.getCapacity() <= 0) {
            throw new IllegalArgumentException(
                    "객실 정원은 1명 이상이어야 합니다.");
        }
    }
}
