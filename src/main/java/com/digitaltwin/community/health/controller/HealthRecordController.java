package com.digitaltwin.community.health.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.digitaltwin.community.health.entity.HealthRecordEntity;
import com.digitaltwin.community.health.repository.HealthRecordRepository;
import com.digitaltwin.community.health.service.HealthRecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/health-records")
@RequiredArgsConstructor
public class HealthRecordController {
	private final HealthRecordService healthRecordService;

	// 건강 기록 등록
	@PostMapping("/residents/{residentId}")
	public HealthRecordEntity save(@PathVariable Long residentId, @RequestBody HealthRecordEntity record) {
		return healthRecordService.save(residentId, record);
	}

	// 전체 건강 기록 조회
	@GetMapping
	public List<HealthRecordEntity> findAll() {
		return healthRecordService.findAll();
	}

	// 건강 기록 단건 조회
	@GetMapping("/{id}")
	public HealthRecordEntity findById(@PathVariable Long id) {
		return healthRecordService.findById(id);
	}

	// 입주자별 건강 기록 조회
	@GetMapping("/residents/{residentId}")
	public List<HealthRecordEntity> findByResident(@PathVariable Long residentId) {
		return healthRecordService.findByResident(residentId);
	}

	// 기간별 건강 기록 조회
	@GetMapping("/residents/{residentId}/period")
	public List<HealthRecordEntity> findByPeriod(@PathVariable Long residentId,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
		return healthRecordService.findByPeriod(residentId, startDate, endDate);
	}

	// 측정 종류별 건강 기록 조회
	@GetMapping("/residents/{residentId}/measurement-type")
	public List<HealthRecordEntity> findByMeasurementType(@PathVariable Long residentId,
			@RequestParam String measurementType) {
		return healthRecordService.findByMeasurementType(residentId, measurementType);
	}

	// 건강 기록 수정
	@PutMapping("/{id}")
	public HealthRecordEntity update(@PathVariable Long id, @RequestBody HealthRecordEntity updatedRecord) {
		return healthRecordService.update(id, updatedRecord);
	}

	// 건강 기록 삭제
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		healthRecordService.delete(id);
	}

}
