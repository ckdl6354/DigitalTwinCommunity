# 🏡 DigitalTwinCommunity

### Smart Silver Town Digital Twin Platform

> **3D 디지털 트윈 기반 스마트 실버타운 운영 플랫폼**
>
> 입주자 · 객실 · 시설 · 건강 기록 · 케어 서비스를 통합 관리하는 개인 프로젝트

![Java](https://img.shields.io/badge/Java-11-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7.17-6DB33F?style=flat-square&logo=springboot)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariadb)
![React](https://img.shields.io/badge/React-TypeScript-3178C6?style=flat-square&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs)
![Status](https://img.shields.io/badge/Status-In_Progress-2CBFAE?style=flat-square)

---

## 📌 01. Project Overview

**DigitalTwinCommunity**는 디지털 트윈 기술을 활용하여 실버타운의 입주자 생활 현황과 케어 서비스를 관리하는 스마트 실버타운 플랫폼입니다.

Java와 Spring Boot 기반의 백엔드 시스템을 중심으로 입주자, 객실, 시설, 건강 기록 및 케어 요청 데이터를 관리하고, React와 Three.js를 활용하여 실버타운의 운영 환경을 3D 공간에 표현하는 것을 목표로 합니다.

| 항목 | 내용 |
|:---|:---|
| 프로젝트명 | DigitalTwinCommunity |
| 프로젝트 유형 | 개인 프로젝트 |
| 개발 분야 | Backend / Full Stack |
| 개발 기간 | 진행 중 |
| 개발 상태 | In Progress |

## 🎯 02. Project Goals

- 입주자 정보 및 객실 배정 관리
- 객실 정원 초과 방지
- 실버타운 내부 시설 정보 관리
- 입주자 건강 기록 관리
- 케어 요청 및 처리 상태 관리
- REST API 기반 데이터 연동
- Three.js 기반 3D 디지털 트윈 구현

## 🛠️ 03. Tech Stack

| Category | Technology |
|:---|:---|
| Language | Java 11 |
| Backend | Spring Boot 2.7.17 |
| ORM | Spring Data JPA |
| Build | Gradle |
| Database | MariaDB |
| Frontend | React, TypeScript |
| Frontend Build | Vite |
| 3D Visualization | Three.js |
| IDE | Eclipse, VS Code |
| Version Control | Git, GitHub |

## 🏗️ 04. System Architecture

```text
                 USER
                   │
                   ▼
           React + TypeScript
                   │
                   ▼
                REST API
                   │
                   ▼
             Spring Boot
                   │
             ┌─────┴─────┐
             ▼           ▼
         Controller   Service
                         │
                         ▼
                     Repository
                         │
                         ▼
                      MariaDB

           React + Three.js
                   │
                   ▼
           3D Digital Twin
```

### Backend Architecture

| Layer | Responsibility |
|:---|:---|
| Entity | 데이터 모델 및 테이블 설계 |
| Repository | 데이터 조회 및 저장 |
| Service | 비즈니스 로직 처리 |
| ServiceImpl | 서비스 인터페이스 구현 |
| Controller | REST API 요청 및 응답 |
| DTO | 데이터 전달 및 응답 구조 관리 |

## ⚙️ 05. Main Features

| 기능 | 설명 |
|:---|:---|
| 👤 Resident | 입주자 정보 및 생활 상태 관리 |
| 🏠 Room | 객실 정보 및 입주자 배정 관리 |
| 🏢 Facility | 실버타운 시설 정보 관리 |
| ❤️ HealthRecord | 입주자 건강 기록 관리 |
| 🩺 CareRequest | 케어 요청 및 처리 상태 관리 |
| 🌐 Digital Twin | 3D 기반 공간 및 시설 시각화 |

### 핵심 비즈니스 로직

**Room & Resident**
- 객실 정원 초과 방지
- 입주자와 객실 간 연관관계 관리
- 트랜잭션을 통한 데이터 정합성 유지

**Health & Care**
- 입주자별 건강 기록 관리
- 케어 요청 유형 및 우선순위 관리
- 케어 요청 처리 상태 관리

## 🗄️ 06. Database Design

### 주요 Entity

| Entity | 주요 데이터 |
|:---|:---|
| Resident | 이름, 나이, 성별, 생년월일, 객실, 케어 등급 |
| Room | 객실 번호, 층수, 객실 유형, 정원, 상태 |
| Facility | 시설명, 시설 유형, 층수, 위치 |
| HealthRecord | 측정 유형, 측정값, 측정 단위, 기록 일시 |
| CareRequest | 요청 유형, 설명, 우선순위, 처리 상태 |

### Entity Relationship

```text
Room
  │
  └── Resident
         │
         ├── HealthRecord
         │
         └── CareRequest

Facility
  │
  └── 실버타운 시설 정보
```

## 📂 07. Project Structure

```text
DigitalTwinCommunity
│
├── backend
│   └── src/main/java
│       └── com.digitaltwin.community
│           │
│           ├── resident
│           │   ├── entity
│           │   ├── repository
│           │   ├── service
│           │   └── controller
│           │
│           ├── room
│           ├── facility
│           ├── health
│           └── careRequest
│
└── frontend
    └── React + TypeScript + Vite
```

## 🔌 08. API Design

| Method | Endpoint | Description |
|:---:|:---|:---|
| GET | `/api/residents` | 입주자 목록 조회 |
| GET | `/api/residents/{id}` | 입주자 상세 조회 |
| POST | `/api/residents` | 입주자 등록 |
| PUT | `/api/residents/{id}` | 입주자 정보 수정 |
| DELETE | `/api/residents/{id}` | 입주자 삭제 |
| GET | `/api/rooms` | 객실 목록 조회 |
| GET | `/api/facilities` | 시설 목록 조회 |
| GET | `/api/health-records` | 건강 기록 조회 |
| GET | `/api/care-requests` | 케어 요청 조회 |

※ API 목록은 설계 및 구현 목표를 포함하며 실제 구현 여부는 개발 진행에 따라 갱신합니다.

## 🖥️ 09. Screen Preview

실제 구현 화면을 준비한 후 아래 항목에 캡처 이미지를 추가할 예정입니다.

| 화면 | 주요 내용 |
|:---|:---|
| Dashboard | 실버타운 운영 현황 |
| Resident | 입주자 정보 관리 |
| Room | 객실 및 입주 현황 |
| Facility | 시설 정보 관리 |
| Digital Twin | 3D 실버타운 시각화 |

## 🔧 10. Troubleshooting

| 문제 | 개선 방향 |
|:---|:---|
| Hibernate 프록시 JSON 직렬화 오류 | DTO 기반 응답 구조 적용 |
| 객실 정원 초과 문제 | Service 계층 검증 및 트랜잭션 적용 |
| JPA 연관관계 관리 | Entity 관계 및 조회 구조 개선 |
| 프론트엔드 실행 환경 문제 | Node.js 및 Vite 개발 환경 구성 |

※ 실제 해결 및 테스트가 완료된 내용을 중심으로 지속적으로 기록합니다.

## 📈 11. Development Progress

### Backend

- [x] Spring Boot 개발 환경 구성
- [x] MariaDB 데이터베이스 연결
- [x] 주요 Entity 설계
- [x] Repository 구현
- [x] Service / ServiceImpl 구현
- [x] 객실 정원 검증 로직 구현
- [ ] REST API 전체 연동 및 테스트
- [ ] DTO 응답 구조 개선
- [ ] 전역 예외 처리 및 유효성 검증

### Frontend

- [x] React + TypeScript + Vite 환경 구성
- [ ] 공통 레이아웃 구성
- [ ] 입주자 관리 화면
- [ ] 객실 관리 화면
- [ ] 시설 관리 화면
- [ ] 건강 기록 및 케어 요청 화면

### Digital Twin

- [ ] Three.js 3D 공간 구현
- [ ] 시설 위치 시각화
- [ ] 입주자 정보 시각화
- [ ] 백엔드 데이터 연동

## 🚀 12. Future Improvements

- 사용자 인증 및 권한 관리
- 실시간 케어 요청 현황
- 입주자 건강 데이터 시각화
- 3D 공간과 실제 데이터 연동
- 운영 현황 대시보드
- 예외 처리 및 서비스 안정성 개선

## 📝 13. Retrospective

이번 프로젝트를 통해 Java와 Spring Boot 기반의 백엔드 개발 과정을 경험하고, 데이터베이스 설계부터 Repository, Service, Controller까지 계층별 역할을 이해하는 것을 목표로 하고 있습니다.

또한 React와 Three.js를 활용하여 백엔드 중심의 개발 경험을 프론트엔드와 3D 시각화 영역까지 확장하고 있습니다.

기능을 단계적으로 구현하고 테스트하면서 실제 서비스에 가까운 스마트 실버타운 운영 플랫폼으로 발전시켜 나갈 계획입니다.

---

<p align="center">

**DigitalTwinCommunity**

Smart Silver Town · Digital Twin · Care Service

*Personal Project | 2026*

</p>
