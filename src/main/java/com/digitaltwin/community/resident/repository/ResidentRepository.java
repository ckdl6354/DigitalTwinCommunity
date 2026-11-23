package com.digitaltwin.community.resident.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitaltwin.community.resident.entity.Resident;

public interface ResidentRepository extends JpaRepository<Resident, Long> {

}
