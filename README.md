# 𝕏 클론 코딩

Twitter의 주요 기능을 모방한 소셜 미디어 플랫폼입니다.<br>
React를 프론트엔드 프레임워크로 사용하고, Firebase를 백엔드 및 인증 서비스로 활용하여 실시간 트윗 기능, 사용자 인증, 프로필 관리 등을 구현했습니다.

## 프로젝트 개요

사용자가 실시간으로 트윗을 작성하고 관리할 수 있는 기능을 제공합니다.<br>
Firebase를 통해 인증 및 데이터 저장을 처리하며, React를 사용하여 동적이고 반응형 사용자 인터페이스를 구현했습니다.

## 로컬에서 파일 열기

로컬 환경에서 `index.html` 파일을 열려면 다음 경로를 사용하세요:
- **경로**: `http://localhost:5173/login`

이 URL을 브라우저의 주소 표시줄에 붙여넣어 열 수 있습니다. 그러나 로컬 환경에서만 접근 가능하므로, 다른 사용자가 접근할 수 없습니다.


## 프로젝트 기간

- **개인 프로젝트 기간**: 2024.07.29 ~ 2024.08.04 (1주)
- **강의 출처**: "React와 Firebase로 트위터 클론 만들기"는 [노마드 코더의 무료 강의](https://nomadcoders.co/nwitter)를 참고하여 개발하였습니다.

## 주요 기능

- **사용자 인증**
  - 회원가입, 로그인, 로그아웃
  - 이메일 인증
  - 소셜 로그인 (GitHub, Google)
- **트윗 기능**
  - 트윗 작성, 수정, 삭제
  - 이미지 업로드 (트윗 및 프로필 사진)
  - 실시간 트윗 타임라인
- **사용자 프로필 관리**
  - 비밀번호 찾기 및 재설정

## 기술 스택

- **프론트엔드**:
  <div style="display: flex; gap: 10px; justify-content: center;">
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite">
  </div>

- **백엔드**:
  <div style="display: flex; gap: 10px; justify-content: center;">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white" alt="Firebase">
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  </div>

## 리뷰 포인트

- **컴포넌트 구조화**: 컴포넌트의 재사용성 및 유지보수 용이성
- **Firebase 통합**: Firebase와의 연동 및 실시간 데이터 처리
- **UI/UX 디자인**: 사용자 경험을 고려한 직관적인 인터페이스
- **반응형 디자인**: 다양한 디바이스에서의 최적화된 사용자 경험

## 부족한 점
- **테스트 코드 부재**: 자동화된 테스트가 없는 점
- **상태 관리 라이브러리 미사용**: Redux 또는 Recoil과 같은 상태 관리 라이브러리가 미도입
- **접근성 고려 부족**: 웹 접근성 관련 요소가 부족
- **국제화(i18n) 미구현**: 다국어 지원 기능이 없음
- **성능 최적화 부족**: 메모이제이션, 코드 스플리팅 등의 성능 최적화 미흡
- **API 키 관리 부족**: API 키를 안전하게 관리하는 방법에 대한 고려 부족
  
## 히스토리
최신 React 및 Firebase SDK를 사용하여 최근에 개발된 것으로 추정됩니다.<br>
Twitter의 핵심 기능을 구현하며, Firebase를 통해 백엔드 인프라를 간소화했습니다.<br>
현대적인 웹 개발 도구들을 사용하여 실시간 소셜 미디어 플랫폼의 기본적인 기능을 효과적으로 구현한 좋은 예시 프로젝트입니다
