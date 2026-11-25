package com.digitaltwin.community.facility.service;



import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.digitaltwin.community.facility.entity.FacilityEntity;
import com.digitaltwin.community.facility.repository.FacilityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FacilityServiceImpl implements FacilityService {

    private final FacilityRepository facilityRepository;

    @Override
    public FacilityEntity save(FacilityEntity facility) {

        validateFacility(facility);

        if (facility.getId() != null) {
            throw new IllegalArgumentException(
                    "신규 등록에는 ID를 입력하지 마세요.");
        }

        return facilityRepository.save(facility);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FacilityEntity> findAll() {
        return facilityRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public FacilityEntity findById(Long id) {

        return facilityRepository.findById(id)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                            "시설을 찾을 수 없습니다."));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FacilityEntity> searchByName(String name) {
        return facilityRepository
                .findByFacilityNameContainingIgnoreCase(name);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FacilityEntity> findByFacilityType(String facilityType) {
        return facilityRepository.findByFacilityType(facilityType);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FacilityEntity> findByFloor(Integer floor) {
        return facilityRepository.findByFloor(floor);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FacilityEntity> findByStatus(String status) {
        return facilityRepository.findByStatus(status);
    }

    @Override
    public FacilityEntity update(
            Long id, FacilityEntity updatedFacility) {

        validateFacility(updatedFacility);

        FacilityEntity facility = findById(id);

        facility.setFacilityName(updatedFacility.getFacilityName());
        facility.setFacilityType(updatedFacility.getFacilityType());
        facility.setFloor(updatedFacility.getFloor());
        facility.setStatus(updatedFacility.getStatus());
        facility.setPositionX(updatedFacility.getPositionX());
        facility.setPositionY(updatedFacility.getPositionY());
        facility.setPositionZ(updatedFacility.getPositionZ());

        return facilityRepository.save(facility);
    }

    @Override
    public FacilityEntity updateStatus(Long id, String status) {

        if (!StringUtils.hasText(status)) {
            throw new IllegalArgumentException(
                    "시설 상태를 입력해야 합니다.");
        }

        FacilityEntity facility = findById(id);
        facility.setStatus(status.trim());

        return facilityRepository.save(facility);
    }

    @Override
    public void delete(Long id) {

        FacilityEntity facility = findById(id);
        facilityRepository.delete(facility);
    }

    private void validateFacility(FacilityEntity facility) {

        if (facility == null
                || !StringUtils.hasText(facility.getFacilityName())
                || !StringUtils.hasText(facility.getFacilityType())
                || !StringUtils.hasText(facility.getStatus())) {

            throw new IllegalArgumentException(
                    "시설명, 시설 종류, 운영 상태는 필수입니다.");
        }
    }
}
