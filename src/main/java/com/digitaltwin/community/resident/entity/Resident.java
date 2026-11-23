package com.digitaltwin.community.resident.entity;

import java.time.LocalDate;
import javax.persistence.*;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

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
