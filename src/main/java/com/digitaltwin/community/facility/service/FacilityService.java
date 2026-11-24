package com.digitaltwin.community.facility.service;

import java.util.List;

import com.digitaltwin.community.facility.entity.FacilityEntity;

public interface FacilityService {
	FacilityEntity save(FacilityEntity facility);
	List<FacilityEntity> findAll();
	FacilityEntity findById(Long id);
	List<FacilityEntity> searchByName(String name);
	List<FacilityEntity> findByFacilityType(String facilityType);
	List<FacilityEntity> findByFloor(Integer floor);
	List<FacilityEntity> findByStatus(String status);
	FacilityEntity update(Long id, FacilityEntity updatedFacility);
	FacilityEntity updateStatus(Long id, String status);
	void delete(Long id);
}
