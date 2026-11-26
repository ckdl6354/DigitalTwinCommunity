package com.digitaltwin.community.facility.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitaltwin.community.facility.entity.FacilityEntity;
import com.digitaltwin.community.facility.service.FacilityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/facility")
@RequiredArgsConstructor
public class FacilityController {
	
	private final FacilityService facilityService;
	
	@PostMapping
	public FacilityEntity save(@RequestBody FacilityEntity facilityEntity) {
		return facilityService.save(facilityEntity);
	}
	@GetMapping
	public List<FacilityEntity> findAll() {
		return facilityService.findAll(); 
	}
	@GetMapping("/{id}")
	public FacilityEntity findById(@PathVariable Long id) {
		return facilityService.findById(id);
	}
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		facilityService.delete(id);
	}
}
