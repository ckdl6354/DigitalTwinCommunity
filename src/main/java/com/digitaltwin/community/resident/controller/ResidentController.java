package com.digitaltwin.community.resident.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitaltwin.community.resident.entity.Resident;
import com.digitaltwin.community.resident.service.ResidentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/residents")
@RequiredArgsConstructor
public class ResidentController {
	
	private final ResidentService residentService;
	
	//입주자 등록
	@PostMapping
	public Resident save(@RequestBody Resident resident) {
		return residentService.save(resident);
	}
	
	//전체조회
	@GetMapping
	public List<Resident> findAll() {
		return residentService.findAll();
	}
	
	//상세조회
	@GetMapping("/{id}")
	public Resident findById(@PathVariable Long id) {
		return residentService.findById(id);
	}
	//삭제
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		residentService.delete(id);
	}
}
