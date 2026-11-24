package com.digitaltwin.community.careRequest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitaltwin.community.careRequest.entity.CareRequestEntity;

public interface CareRequestRepository extends JpaRepository<CareRequestEntity, Long> {
	
}
