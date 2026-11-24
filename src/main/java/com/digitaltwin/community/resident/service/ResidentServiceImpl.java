package com.digitaltwin.community.resident.service;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;

import com.digitaltwin.community.resident.entity.Resident;

public class ResidentServiceImpl implements ResidentService {

	@Override
	public Resident save(Resident resident) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Resident> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Resident> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Resident findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Resident> searchByName(String name, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Resident> findByStatus(String status, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Resident update(Long id, Resident updatedResident) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Resident assignRoom(Long residentId, Long roomId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Resident unassignRoom(Long residentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub

	}

}
