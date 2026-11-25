package com.digitaltwin.community.resident.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.digitaltwin.community.room.entity.Room;

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
	
	private String gender;
	private LocalDate birthDate;
	private String careLevel;
	private LocalDateTime createdAt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	@JsonIgnore
	private Room room;
	
	@PrePersist
	protected void onCreate() {
		if(createdAt==null) {
			createdAt = LocalDateTime.now();
		}
	}
}
