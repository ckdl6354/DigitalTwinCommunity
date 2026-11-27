package com.digitaltwin.community.careRequest.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitaltwin.community.careRequest.entity.CareRequestEntity;
import com.digitaltwin.community.careRequest.service.CareRequestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/careRequest")
@RequiredArgsConstructor
public class CareRequestController {
	
	private final CareRequestService careRequestService;

	@PostMapping("/{residentId}")
	public CareRequestEntity save(@PathVariable("residentId") Long residentId,@RequestBody CareRequestEntity careRequestEntity) {
		return careRequestService.save(residentId,careRequestEntity);
	}
	@GetMapping
	public List<CareRequestEntity> findAll(){
		return careRequestService.findAll();
	}
	@GetMapping("/{id}")
	public CareRequestEntity findById(@PathVariable("id") Long id) {
		return careRequestService.findById(id);
	}
	
	@PutMapping("/{id}")
	public CareRequestEntity update(@PathVariable Long id,@RequestBody CareRequestEntity careRequestEntity) {
		return careRequestService.updateStatus(id, careRequestEntity.getStatus());
	}
	//입주자별 돌봄 요청 조회
	@GetMapping("/resident/{residentId}")
	public List<CareRequestEntity> findByResident(@PathVariable Long residentId){
		return careRequestService.findByResident(residentId);
	}
	//상태별 돌봄 요청 조회
	@GetMapping("/status/{status}")
	public List<CareRequestEntity> findByStatus(@PathVariable String status){
		return careRequestService.findByStatus(status);
	}
	@GetMapping("/priority/{priority}")
	public List<CareRequestEntity> findByPriority(@PathVariable String priority){
		return careRequestService.findByPriority(priority);
	}
	
}
