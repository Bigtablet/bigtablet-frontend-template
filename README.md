<div align="center">

<img width="1800" height="300" alt="Image" src="https://github.com/user-attachments/assets/420a15cc-5be3-447f-9c64-068e946cb118" /> <br>

</div>

# BIGTABLET Frontend Template

[![npm version](https://img.shields.io/npm/v/@bigtablet/design-system.svg)](https://www.npmjs.com/package/@bigtablet/create-frontend)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Bigtablet/.github/blob/main/BIGTABLET_LICENSE.md)
[![Architecture](https://img.shields.io/badge/docs-architecture-blue)](https://github.com/Bigtablet/bigtablet-frontend-template/blob/main/docs/architecture.md)
## 개발 가이드

프로젝트의 전체 구조와 설계 의도에 대한 자세한 내용은  
[`docs/architecture.md`](./docs/architecture.md) 문서를 참고하세요.


---

## 서버 통신 규칙

이 템플릿은 타입 안정성과 예측 가능한 데이터 흐름을 위해 서버 통신 규칙을 명확히 정의합니다.

- Axios를 직접 사용하지 않습니다.
- 모든 서버 응답은 Zod 스키마를 통해 검증합니다.
- HTTP 메서드별 공통 API 함수만 사용합니다.
- 에러는 공통 파서로 변환하여 처리합니다.
- 네트워크 에러와 서버 에러를 명확히 구분합니다.

---

## 코드 작성 가이드

코드 작성 시 다음 가이드를 따르는 것을 권장합니다.

- 파일과 디렉터리는 역할과 책임이 명확하도록 구성합니다.
- 하나의 파일은 하나의 역할만 수행하도록 유지합니다.
- 타입 정의는 명시적으로 작성하여 암묵적인 타입 추론에 의존하지 않습니다.
- 재사용 가능한 로직은 공통 영역으로 분리합니다.
- 불필요한 추상화는 지양합니다.

---

## 권장 개발 흐름

일반적인 개발 흐름은 다음과 같습니다.

1. 도메인 요구 사항 정의
2. 서버 API 스펙 확인 및 Zod 스키마 작성
3. 도메인 단위 로직 구현
4. 기능 단위 조합 및 화면 연결
5. UI 및 인터랙션 구현
6. 에러 처리 및 예외 케이스 점검

---

## 브라우저 지원

- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

---

## 유지 관리 및 업데이트

이 템플릿은 Bigtablet 내부 표준에 맞추어 지속적으로 개선됩니다.

- 새로운 기술 스택 도입 시 템플릿에 반영됩니다.
- 내부 서비스 요구 사항에 따라 구조 및 설정이 업데이트될 수 있습니다.
- 기존 프로젝트와의 호환성을 최대한 유지하는 방향으로 관리됩니다.