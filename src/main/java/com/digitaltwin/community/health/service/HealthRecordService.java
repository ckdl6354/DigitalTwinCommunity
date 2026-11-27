package com.digitaltwin.community.health.service;

import java.time.LocalDateTime;
import java.util.List;

import com.digitaltwin.community.health.entity.HealthRecordEntity;

public interface HealthRecordService {
	HealthRecordEntity save(Long residentId, HealthRecordEntity record);
	List<HealthRecordEntity> findAll();
	HealthRecordEntity findById(Long id);
	List<HealthRecordEntity> findByResident(Long residentId);
	List<HealthRecordEntity> findByPeriod(Long residentId, LocalDateTime startDate, LocalDateTime endDate);
	List<HealthRecordEntity> findByMeasurementType(Long residentId, String measurementType);
	HealthRecordEntity update(Long id,HealthRecordEntity updatedRecordEntity);
	void delete(Long id);
}
