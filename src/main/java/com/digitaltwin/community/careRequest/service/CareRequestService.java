package com.digitaltwin.community.careRequest.service;

import java.util.List;

import com.digitaltwin.community.careRequest.entity.CareRequestEntity;

public interface CareRequestService {
	CareRequestEntity save(Long residentId, CareRequestEntity request);
    List<CareRequestEntity> findAll();
    CareRequestEntity findById(Long id);
    List<CareRequestEntity> findByResident(Long residentId);
    List<CareRequestEntity> findByStatus(String status);
    List<CareRequestEntity> findByPriority(String priority);
    CareRequestEntity updateStatus(Long id, String newStatus);
}
