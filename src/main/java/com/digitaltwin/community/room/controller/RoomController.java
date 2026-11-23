package com.digitaltwin.community.room.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitaltwin.community.room.entity.Room;
import com.digitaltwin.community.room.service.RoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

	private final RoomService roomService;
	
	@PostMapping
	public Room save(@RequestBody Room room) {
		return roomService.save(room);
	}
	
	@GetMapping
	public List<Room> findAll(){
		return roomService.findAll();
	}
	@GetMapping("/{id}")
	public Room findById(@PathVariable Long id) {
		return roomService.findById(id);
	}
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		roomService.delete(id);
	}
}
