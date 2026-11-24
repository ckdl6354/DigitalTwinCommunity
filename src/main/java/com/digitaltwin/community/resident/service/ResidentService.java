package com.digitaltwin.community.resident.service;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;

import com.digitaltwin.community.resident.entity.Resident;

public interface ResidentService {
	Resident save(Resident resident);
	List<Resident> findAll();
	Page<Resident> findAll(Pageable pageable);
	Resident findById(Long id);
	Page<Resident> searchByName(String name,Pageable pageable);
	Page<Resident> findByStatus(String status,Pageable pageable);
	Resident update(Long id,Resident updatedResident);
	Resident assignRoom(Long residentId,Long roomId);
	Resident unassignRoom(Long residentId);
	void delete(Long id);
	
}
