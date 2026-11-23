package com.digitaltwin.community.resident.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "resident")
public class Resident {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	//입주자 이름
	@Column(nullable = false)
	private String name;
	//나이
	private Integer age;
	//객실 번호
	private String roomNumber;
	//입주 상태
	private String status;
	//입주 날짜
	private LocalDate admissionDate;
}
