<div align="center">

<img width="1800" height="300" alt="Image" src="https://github.com/user-attachments/assets/420a15cc-5be3-447f-9c64-068e946cb118" /> <br>

</div>

# BIGTABLET Frontend Template

[![npm version](https://img.shields.io/npm/v/@bigtablet/create-frontend.svg)](https://www.npmjs.com/package/@bigtablet/create-frontend)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Bigtablet/.github/blob/main/BIGTABLET_LICENSE.md)
[![Architecture](https://img.shields.io/badge/docs-architecture-blue)](https://github.com/Bigtablet/bigtablet-frontend-template/blob/main/docs/architecture.md)

---

## 사용 방법

BIGTABLET Frontend Template는 CLI 형태로 제공되며,
`pnpm create` 명령어를 통해 별도의 설치 없이 바로 사용할 수 있습니다.

### 프로젝트 생성

아래 명령어를 실행하면 대화형 프롬프트가 시작됩니다.
프로젝트 이름과 디자인 시스템을 선택하면 해당 설정으로 프로젝트가 생성됩니다.

```bash
pnpm create @bigtablet/frontend
```

또는 프로젝트 이름을 바로 지정할 수도 있습니다.

```bash
pnpm create @bigtablet/frontend my-app
```

#### 대화형 프롬프트 예시

```
◆  프로젝트 이름을 입력하세요
│  my-app
│
◆  디자인 시스템을 선택하세요
│  ● @bigtablet/design-system  (Bigtablet 공식 디자인 시스템, SCSS 기반)
│  ○ shadcn/ui                 (Tailwind CSS + Radix UI 기반)
└
```

### 디자인 시스템 선택

| 옵션 | 설명 |
| --- | --- |
| `@bigtablet/design-system` | Bigtablet 공식 디자인 시스템. SCSS 토큰, AlertProvider, ToastProvider 포함 |
| `shadcn/ui` | Tailwind CSS v4 + Radix UI 기반. `sonner` toast, `cn()` 유틸리티 포함 |

### 프로젝트 실행

프로젝트 생성이 완료되면, 생성된 디렉터리로 이동한 뒤
개발 서버를 실행합니다.

```bash
cd my-app
pnpm dev
```

개발 서버가 실행되면 브라우저에서 아래 주소로 접속할 수 있습니다.

```
http://localhost:3000
```

### 요구 사항

이 템플릿을 사용하기 위해 아래 환경이 필요합니다.

- Node.js 24 이상 필수
- 패키지 매니저: pnpm

pnpm이 설치되어 있지 않은 경우 아래 명령어로 설치할 수 있습니다.

```bash
npm install -g pnpm
```

---

## 기여 (CLI 개발)

CLI 소스 코드를 수정하려면 먼저 빌드가 필요합니다.

### 개발 환경 설정

```bash
pnpm install
pnpm build        # src/ → bin/ 컴파일 (tsup)
```

### 로컬에서 CLI 테스트

```bash
node bin/create-bigtablet-frontend.js my-test-app
```

### 파일 구조

```
bigtablet-frontend-template/
├── src/                        # CLI TypeScript 소스
│   ├── index.ts                # 진입점
│   ├── steps/
│   │   ├── prompt.ts           # @clack/prompts 대화형 입력
│   │   ├── scaffold.ts         # 템플릿 복사 + 프로젝트 설정
│   │   └── install.ts          # 의존성 설치
│   └── utils/
│       └── package-manager.ts  # 패키지 매니저 감지
├── bin/                        # 컴파일된 CLI (tsup 출력)
├── templates/
│   ├── design-system/          # @bigtablet/design-system 템플릿 (독립)
│   └── shadcn/                 # shadcn/ui 템플릿 (독립)
├── commitlint.config.mjs       # 커밋 메시지 린트 규칙
└── .husky/                     # Git 훅 (commitlint 연동)
```

각 템플릿은 독립적인 완전한 Next.js 프로젝트입니다.
scaffold.ts는 선택된 디자인 시스템에 해당하는 템플릿 디렉터리를 통째로 복사합니다.

### 커밋 컨벤션

commitlint + Husky를 통해 커밋 메시지 형식을 강제합니다.

```
type: subject
```

허용 타입: `feat`, `fix`, `merge`, `deploy`, `docs`, `delete`, `note`, `style`, `config`, `etc`, `tada`

---

## 관련 링크

- Bigtablet Design System
  https://www.npmjs.com/package/@bigtablet/design-system

- GitHub Repository
  https://github.com/Bigtablet/bigtablet-frontend-template

- Architecture Guide
  https://github.com/Bigtablet/bigtablet-frontend-template/blob/main/docs/architecture.md
