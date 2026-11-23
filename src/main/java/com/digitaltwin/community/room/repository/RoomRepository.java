package com.digitaltwin.community.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitaltwin.community.room.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
	Room findByRoomNumber(String roomNumber);
}
