package com.digitaltwin.community.room.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.digitaltwin.community.resident.entity.Resident;
import com.digitaltwin.community.room.entity.Room;
import com.digitaltwin.community.room.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

public interface RoomService {
	Room save(Room room);
	List<Room> findAll();
	Room findById(Long id);
	Room findByRoomNumber(String roomNumber);
	List<Room> findByFloor(Integer floor);
	List<Room> findByStatus(String status);
	Room update(Long id, Room updatedRoom);
	List<Resident> findResidents(Long roomId);
	long getOccupancy(Long roomId);
	void delete(Long id);
}