# Bigtablet Design System

컴포넌트·props·토큰의 정본은 **설치된 패키지에 들어 있는 가이드**다. 버전과 항상 맞는다.

```
node_modules/@bigtablet/design-system/docs/AGENT_GUIDE.md
```

컴포넌트 코드를 만들기 전에 이 파일을 먼저 읽는다. 정확한 props 는 TypeScript 타입이 계약이다.

## 이 템플릿에서 지키는 것 (v4 기준)

- `import "@bigtablet/design-system/style.css"` 를 쓰지 않는다. v4 부터 컴포넌트를 import 하면 그 컴포넌트 CSS 만 자동으로 실린다.
- 값 콜백은 `onValueChange` (TextField · Textarea · Dropdown · DatePicker · Accordion · OtpInput), `onCheckedChange` (Toggle), `onPageChange` (Pagination). `onChange` / `onChangeAction` 은 v4.1.0 에서 지워졌다.
- 모양은 `variant`, 의미 색(info · success · warning · error)은 `tone` (Badge · Alert · Toast · Chip).
- SCSS 토큰: `@use "@bigtablet/design-system/scss/token" as token;`
  - `$spacing_*` · `$radius_*` 는 `var()` 문자열이다. Sass 산술은 `calc()` 안에서 한다: `calc(2 * #{token.$spacing_48})`. 고정 숫자가 필요하면 `$spacing_base_*`.
- 색·간격·radius·그림자를 하드코딩하지 않는다. 다크 모드는 토큰이 알아서 뒤집는다.
- DS 내부 클래스(`.modal_panel` 등)를 앱에서 스타일링하지 않는다. 패치 버전에서 바뀐다.
