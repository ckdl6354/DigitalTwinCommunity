package com.digitaltwin.community.health.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.digitaltwin.community.health.entity.HealthRecordEntity;
import com.digitaltwin.community.health.repository.HealthRecordRepository;
import com.digitaltwin.community.resident.entity.Resident;
import com.digitaltwin.community.resident.repository.ResidentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class HealthRecordServiceImpl implements HealthRecordService {

	private final HealthRecordRepository healthRecordRepository;
	private final ResidentRepository residentRepository;

	@Override
	public HealthRecordEntity save(Long residentId, HealthRecordEntity record) {
		validateRecord(record);
		if (record.getId() != null) {
			throw new IllegalArgumentException("신규 등록에는 ID를 입력하지 마세요.");
		}
		Resident resident = residentRepository.findById(residentId)
				.orElseThrow(() -> new IllegalArgumentException("입주자를 찾을 수 없습니다."));
		record.setResident(resident);

		if (record.getRecordedAt() == null) {
			record.setRecordedAt(LocalDateTime.now());
		}

		return healthRecordRepository.save(record);
	}

	@Override
	@Transactional(readOnly = true)
	public List<HealthRecordEntity> findAll() {
		return healthRecordRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public HealthRecordEntity findById(Long id) {
		return healthRecordRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("건강 기록을 찾을 수 없습니다."));
	}

	@Override
	@Transactional(readOnly = true)
	public List<HealthRecordEntity> findByResident(Long residentId) {
		checkResidentExists(residentId);
		return healthRecordRepository.findByResident_IdOrderByRecordedAtDesc(residentId);
	}

	@Override
	@Transactional(readOnly = true)
	public List<HealthRecordEntity> findByPeriod(Long residentId, LocalDateTime startDate, LocalDateTime endDate) {
		checkResidentExists(residentId);

		if (startDate == null || endDate == null) {
			throw new IllegalArgumentException("조회 시작일과 종료일은 필수입니다.");
		}

		if (startDate.isAfter(endDate)) {
			throw new IllegalArgumentException("시작일은 종료일보다 늦을 수 없습니다.");
		}
		return healthRecordRepository.findByResident_IdAndRecordedAtBetweenOrderByRecordedAtDesc(residentId, startDate,
				endDate);
	}

	@Override
	@Transactional(readOnly = true)
	public List<HealthRecordEntity> findByMeasurementType(Long residentId, String measurementType) {
		checkResidentExists(residentId);

		if (!StringUtils.hasText(measurementType)) {
			throw new IllegalArgumentException("측정 종류를 입력해야 합니다.");
		}

		return healthRecordRepository.findByResident_IdAndMeasurementTypeOrderByRecordedAtDesc(residentId,
				measurementType);
	}

	@Override
	public void delete(Long id) {
		HealthRecordEntity record = findById(id);
		healthRecordRepository.delete(record);
	}

	private void checkResidentExists(Long residentId) {
		if (!residentRepository.existsById(residentId)) {
			throw new IllegalArgumentException("입주자를 찾을 수 없습니다.");
		}
	}

	private void validateRecord(HealthRecordEntity record) {
		if (record == null || !StringUtils.hasText(record.getMeasurementType())
				|| !StringUtils.hasText(record.getMeasurementUnit()) || record.getMeasurementValue() == null
				|| !StringUtils.hasText(record.getMeasurementType())) {
			throw new IllegalArgumentException("측정 종류, 측정값, 측정 단위는 필수입니다.");
		}
	}

	@Override
	public HealthRecordEntity update(Long id, HealthRecordEntity updatedRecordEntity) {
		validateRecord(updatedRecordEntity);
		HealthRecordEntity healthRecord = findById(id);

		healthRecord.setMeasurementValue(updatedRecordEntity.getMeasurementValue());
		healthRecord.setMeasurementUnit(updatedRecordEntity.getMeasurementUnit());
		healthRecord.setMeasurementType(updatedRecordEntity.getMeasurementType());
		if (updatedRecordEntity.getRecordedAt() != null) {
		healthRecord.setRecordedAt(updatedRecordEntity.getRecordedAt());
		}
		healthRecord.setMemo(updatedRecordEntity.getMemo());
		return healthRecordRepository.save(healthRecord);
	}
}