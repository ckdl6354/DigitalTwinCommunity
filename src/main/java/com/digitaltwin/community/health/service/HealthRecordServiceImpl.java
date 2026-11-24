package com.digitaltwin.community.health.service;

import java.time.LocalDateTime;
import java.util.List;

import com.digitaltwin.community.health.entity.HealthRecordEntity;

public class HealthRecordServiceImpl implements HealthRecordService {

	@Override
	public HealthRecordEntity save(Long residentId, HealthRecordEntity record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<HealthRecordEntity> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HealthRecordEntity findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<HealthRecordEntity> findByResident(Long residentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<HealthRecordEntity> findByPeriod(Long residentId, LocalDateTime startDate, LocalDateTime endDate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<HealthRecordEntity> findByMeasurementType(Long residentId, String measurementType) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub

	}

}
