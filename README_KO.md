# BIGTABLET Frontend Template (Next.js) — 사용 가이드

이 프로젝트는 **Next.js 16 + React 19 + TypeScript** 기반의 프론트엔드 템플릿입니다. 패키지 매니저는 **pnpm**을 사용합니다. IDE는 **WebStorm**, OS는 **macOS** 환경을 기준으로 작성했습니다.

[📘 한국어로 읽기](./README.md)

> 주요 의존성: next 16.0.1, react 19.2.0, @tanstack/react-query, axios, zod, react-toastify  
> 개발 도구: TypeScript, Biome (lint/format)

---

## 빠른 시작

### 1) 요구 사항
- 권장 Node.js: **v20 LTS 이상** (Next.js 16 호환을 위해 최신 LTS 추천)
- 패키지 매니저: **pnpm**

```bash
# pnpm 설치 (미설치 시)
npm i -g pnpm

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

개발 서버가 실행되면 브라우저에서 http://localhost:3000 을 열면 됩니다.

### 2) 주요 스크립트
- `pnpm dev` — 개발 서버 실행
- `pnpm build` — 프로덕션 빌드
- `pnpm start` — 빌드된 앱 실행
- `pnpm lint` — Biome 기반 정적 점검
- `pnpm format` — Biome 포맷팅 자동 적용

---

## 디렉터리 구조 (요약)

루트 주요 파일:
- `next.config.ts`, `tsconfig.json`, `biome.json`, `pnpm-lock.yaml`
- `src/` — 앱 소스
- `public/` — 정적 자산

---

## Biome

Biome 설정은 `biome.json`에 있습니다.

- 검사: `pnpm lint`
- 포맷: `pnpm format`  
  WebStorm에서는 아래 중 하나로 연동을 권장합니다.
1) **Run Configuration**으로 `pnpm lint` / `pnpm format`을 등록해 수시 실행
2) **File Watchers**를 사용해 저장 시 `biome format --write` 자동 실행

추가로 TypeScript(Strict 모드 권장)를 통해 타입 안정성을 확보하세요.

---

## WebStorm (macOS) 권장 세팅

1. **Node 버전 선택**: *Preferences → Node.js* 에서 Node 20 LTS 지정
2. **pnpm 사용 설정**: *Preferences → Languages & Frameworks → Node.js* 에서 패키지 매니저를 pnpm으로 설정
3. **Path Aliases(선택)**: `tsconfig.json`의 `paths` 사용 시 WebStorm에서 자동 인식되도록 *Preferences → TypeScript*에서 프로젝트 tsconfig 인덱싱 확인
4. **SCSS 지원**: *Preferences → Languages & Frameworks → Stylesheets*에서 SCSS 인식 확인
5. **실행/디버깅**: `pnpm dev`를 npm run 구성으로 등록해 디버깅

---

## 빌드 & 실행

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 실행
pnpm start
```
