package com.digitaltwin.community.resident.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import com.digitaltwin.community.resident.entity.Resident;
import com.digitaltwin.community.resident.repository.ResidentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ResidentService {
	private final ResidentRepository repository;
	
	
	public Resident save(Resident resident) {
		return repository.save(resident);
	}
	
	@Transactional(readOnly = true)
	public List<Resident> findAll(){
		return repository.findAll();
	}
	@Transactional(readOnly = true)
	public Resident findById(Long id) {
		return repository.findById(id)
				.orElseThrow(()-> new IllegalArgumentException("입주자를 찾을 수 없습니다."));
	}
	public void delete(Long id) {
		repository.delete(findById(id));
	}
}
