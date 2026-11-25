package com.digitaltwin.community.careRequest.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.digitaltwin.community.careRequest.entity.CareRequestEntity;
import com.digitaltwin.community.careRequest.repository.CareRequestRepository;

import com.digitaltwin.community.resident.entity.Resident;
import com.digitaltwin.community.resident.repository.ResidentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CareRequestServiceImpl implements CareRequestService {

	private final CareRequestRepository careRequestRepository;
	private final ResidentRepository residentRepository;

	@Override
	public CareRequestEntity save(Long residentId, CareRequestEntity request) {

		validateRequest(request);

		if (request.getId() != null) {
			throw new IllegalArgumentException("신규 등록에는 ID를 입력하지 마세요.");
		}

		Resident resident = residentRepository.findById(residentId)
				.orElseThrow(() -> new IllegalArgumentException("입주자를 찾을 수 없습니다."));

		request.setResident(resident);
		request.setStatus("PENDING");
		request.setCreatedAt(LocalDateTime.now());
		request.setCompletedAt(null);

		return careRequestRepository.save(request);
	}

	@Override
	@Transactional(readOnly = true)
	public List<CareRequestEntity> findAll() {
		return careRequestRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public CareRequestEntity findById(Long id) {

		return careRequestRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("돌봄 요청을 찾을 수 없습니다."));
	}

	@Override
	@Transactional(readOnly = true)
	public List<CareRequestEntity> findByResident(Long residentId) {

		checkResidentExists(residentId);

		return careRequestRepository.findByResident_IdOrderByCreatedAtDesc(residentId);
	}

	@Override
	@Transactional(readOnly = true)
	public List<CareRequestEntity> findByStatus(String status) {

		validateStatus(status);

		return careRequestRepository.findByStatusOrderByCreatedAtDesc(status.trim().toUpperCase());
	}

	@Override
	@Transactional(readOnly = true)
	public List<CareRequestEntity> findByPriority(String priority) {

		if (!StringUtils.hasText(priority)) {
			throw new IllegalArgumentException("우선순위를 입력해야 합니다.");
		}

		return careRequestRepository.findByPriorityOrderByCreatedAtDesc(priority);
	}

	@Override
	public CareRequestEntity updateStatus(Long id, String newStatus) {

		CareRequestEntity request = findById(id);

		validateStatus(newStatus);

		String currentStatus = request.getStatus() == null ? "" : request.getStatus().trim().toUpperCase();

		String targetStatus = newStatus.trim().toUpperCase();

		if (targetStatus.equals(currentStatus)) {
			return request;
		}

		boolean allowed = false;

		if ("PENDING".equals(currentStatus)) {

			allowed = "IN_PROGRESS".equals(targetStatus) || "CANCELLED".equals(targetStatus);

		} else if ("IN_PROGRESS".equals(currentStatus)) {

			allowed = "COMPLETED".equals(targetStatus) || "CANCELLED".equals(targetStatus);
		}

		if (!allowed) {
			throw new IllegalStateException("허용되지 않는 돌봄 요청 상태 변경입니다.");
		}

		request.setStatus(targetStatus);

		if ("COMPLETED".equals(targetStatus)) {
			request.setCompletedAt(LocalDateTime.now());
		}

		return careRequestRepository.save(request);
	}

	private void checkResidentExists(Long residentId) {

		if (!residentRepository.existsById(residentId)) {
			throw new IllegalArgumentException("입주자를 찾을 수 없습니다.");
		}
	}

	private void validateStatus(String status) {

		if (!StringUtils.hasText(status)) {
			throw new IllegalArgumentException("상태값을 입력해야 합니다.");
		}

		String value = status.trim().toUpperCase();

		if (!value.equals("PENDING") && !value.equals("IN_PROGRESS") && !value.equals("COMPLETED")
				&& !value.equals("CANCELLED")) {

			throw new IllegalArgumentException("잘못된 요청 상태입니다.");
		}
	}

	private void validateRequest(CareRequestEntity request) {

		if (request == null || !StringUtils.hasText(request.getRequestType())
				|| !StringUtils.hasText(request.getDescription()) || !StringUtils.hasText(request.getPriority())) {

			throw new IllegalArgumentException("요청 종류, 요청 내용, 우선순위는 필수입니다.");
		}
	}
}
