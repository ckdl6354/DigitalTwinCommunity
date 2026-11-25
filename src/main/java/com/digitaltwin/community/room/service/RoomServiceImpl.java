package com.digitaltwin.community.room.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.digitaltwin.community.resident.entity.Resident;
import com.digitaltwin.community.room.entity.Room;

@Service
public class RoomServiceImpl implements RoomService {

	@Override
	public Room save(Room room) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Room> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Room findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Room findByRoomNumber(String roomNumber) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Room> findByFloor(Integer floor) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Room> findByStatus(String status) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Room update(Long id, Room updatedRoom) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Resident> findResidents(Long roomId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long getOccupancy(Long roomId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub

	}

}
