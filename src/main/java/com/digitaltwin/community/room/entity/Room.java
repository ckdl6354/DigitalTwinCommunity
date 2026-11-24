package com.digitaltwin.community.room.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="room")
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false,unique = true)
	private String roomNumber;
	private Integer floor;
	private String roomType;
	private String status;
	private Double area;
	private Integer capacity;
	private Double positionX;
	private Double positionY;
	private Double positionZ;
	
}
