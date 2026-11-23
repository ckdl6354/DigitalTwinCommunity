package com.digitaltwin.community.room.service;


import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.digitaltwin.community.room.entity.Room;
import com.digitaltwin.community.room.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {
	
	private final RoomRepository roomRepository;

	public Room save(Room room) {
		return roomRepository.save(room);
	}
	@Transactional(readOnly = true)
	public List<Room> findAll(){
		return roomRepository.findAll();
	}
	
	@Transactional(readOnly = true)
	public Room findById(Long id) {
		return roomRepository.findById(id).orElseThrow(()->  new IllegalArgumentException("객실을 찾을 수 없습니다."));
	}
	
	public void delete(Long id) {
		roomRepository.delete(findById(id));
	}
	
}
