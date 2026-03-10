# CLAUDE.md

This file provides guidance for Claude Code when working with this repository.

## Project Overview

이 프로젝트는 Next.js 16 기반의 프론트엔드 웹 애플리케이션입니다.
React 19, TypeScript, Feature-Sliced Design 아키텍처로 구성됩니다.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **UI:** React 19, shadcn/ui, Tailwind CSS v4
- **State Management:** TanStack React Query 5, Zustand 5
- **HTTP Client:** Axios with interceptors (에러 메시지 유틸: `src/shared/libs/api/axios/error`)
- **Validation:** Zod 4 schemas
- **Linting/Formatting:** Biome
- **Package Manager:** pnpm only

## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start development server
pnpm dev -- -p 3001       # Run on specific port
pnpm build                # Production build
pnpm start                # Run production server
pnpm lint                 # Lint with Biome
pnpm format               # Format code with Biome
```

## Terminology

| Term | Meaning |
| --- | --- |
| **JS/TS** | JavaScript / TypeScript |
| **Class** | JS/TS Class syntax |
| **Function** | JS/TS Function (including Arrow) |
| **Member** | Variables/constants (no global/local distinction) |

## Architecture (Feature-Sliced Design)

```
src/
├── app/          # Next.js pages and layouts
├── shared/       # Common UI / libs / tokens
│   ├── libs/
│   │   ├── api/
│   │   └── zod/      # Zod parsing utilities (parsedZod)
│   ├── ui/           # shadcn components (npx shadcn add <component>)
│   └── hooks/
├── entities/     # Domain layer (CRUD logic + data structures)
│   └── <domain>/
│       ├── api/        # API functions + API-specific schemas
│       ├── schema/     # Domain schemas / types
│       ├── constants/  # Domain constants
│       └── util/       # Pure domain logic
├── features/     # User action-based features (forms, mutations, search)
│   └── <feature>/
│       ├── ui/
│       ├── query/      # useQuery hooks only (read operations)
│       ├── mutation/   # useMutation hooks only (write operations)
│       └── model/      # Business logic hooks (use-*.ts)
├── widgets/      # Page section UI (domain UI)
│   └── <widget>/
│       ├── ui/
│       ├── model/
└── processes/    # Complex cross-feature flows (if needed)
```

### Query/Mutation Separation Rules

| Type | Location | Example |
| --- | --- | --- |
| `useQuery`, `useSuspenseQuery` | `query/` folder | `member.query.ts` |
| `useMutation` | `mutation/` folder | `auth.mutation.ts` |
| Business logic hooks | `model/` folder | `use-signin.ts` |

**File Split Criteria:**
- Split when a file exceeds **150 lines**
- Split when a file has **too many responsibilities**
- Keep related functionality together when under these thresholds

## Environment & Configuration

| Item | Rule |
| --- | --- |
| Server URL | In `.env` file |
| Next.js | `NEXT_PUBLIC_SERVER_URL` 또는 BFF `/api` |
| TypeScript | Strict mode, path alias `src/*` |
| Biome | Tabs (4 spaces width), 100 char line width |

## Authentication Flow

### Direct API (기본)

1. Tokens stored in cookies via `js-cookie`
2. Request interceptor adds Bearer token
3. Response interceptor handles 401 with token refresh queue
4. Automatic logout on permanent 401

### BFF Proxy (선택적)

BFF(Backend for Frontend) 패턴을 사용할 경우:

1. Axios `baseURL`을 `/api`로 설정 (브라우저 → Next.js API Routes)
2. Next.js API Routes가 실제 서버로 프록시
3. 토큰은 HttpOnly 쿠키로 서버에서 관리 (`js-cookie` 미사용)
4. 브라우저에서 토큰이 노출되지 않음

## Detailed Documentation

자세한 가이드라인은 `.claude/docs/` 폴더의 문서를 참조하세요:

| Document | Contents |
| --- | --- |
| [code-style.md](.claude/docs/code-style.md) | 코드 스타일, 네이밍 컨벤션, JSDoc 가이드 |
| [design-system.md](.claude/docs/design-system.md) | shadcn/ui 컴포넌트 가이드, Tailwind CSS, cn() 유틸 |
| [react-patterns.md](.claude/docs/react-patterns.md) | React Query, Server/Client 컴포넌트 패턴 |
| [git-workflow.md](.claude/docs/git-workflow.md) | Git 컨벤션, 브랜치 전략, PR 워크플로우 |

## Quick Reference

### Code Style Summary

- Components: Functional + hooks-based, `const` + `export default`
- Naming: UpperCamelCase (components), camelCase (Tailwind utility classes via cn())
- Comments: Only where necessary, Korean (English when needed)
- Control flow: 3+ conditions → `switch`, Early return pattern

### Styling Summary

- Tailwind CSS v4 with `cn()` utility (`src/shared/libs/ui/cn.ts`)
- shadcn components in `src/shared/ui/` (add with `npx shadcn add <component>`)
- Component variants: `class-variance-authority` (cva)

### Git Summary (⚠️ 필수 준수)

- **커밋 메시지는 반드시 영문 소문자**: `label: english message` (한글 금지)
- **Co-Authored-By**: `Co-Authored-By: Claude <noreply@anthropic.com>`
- **브랜치**: `label/domain` (예: `feat/member-table`)
- **PR/Issue 워크플로우** (순서 필수):
  1. Issue 생성 (title = 브랜치명)
  2. Branch 생성
  3. 구현 + 커밋 (영문)
  4. PR 생성 (title = 브랜치명, base = `develop`)
  5. PR에 `Closes #이슈번호` 추가
- **PR/Issue 본문 템플릿** (자의적 변경 금지):
  ```
  ## 제목
  브랜치명 (PR) 또는 작업 설명 (Issue)

  ## 작업한 내용
  - [x] 작업1 (PR) 또는 - [ ] 작업1 (Issue)

  ## 전달할 추가 이슈
  - 없음
  ```
- **PR 제목 = 브랜치명** (설명문 아님, 예: `fix/detail-page-pagination`)
- **Release PR**: `develop → main` 배포 시 title = `release/v버전`, base = `main`
