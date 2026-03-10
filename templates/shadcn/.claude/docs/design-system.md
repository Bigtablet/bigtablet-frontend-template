# shadcn/ui - AI Assistant Guide

shadcn/ui + Tailwind CSS v4 기반 컴포넌트 개발 레퍼런스입니다.

---

## 기본 설정

- **컴포넌트 위치**: `src/shared/ui/`
- **cn() 유틸**: `src/shared/libs/ui/cn.ts`
- **설정 파일**: `components.json`

### cn() 유틸 사용

```tsx
import { cn } from "src/shared/libs/ui/cn";

// 조건부 클래스 조합
<div className={cn("base-class", isActive && "active-class", className)} />
```

---

## 컴포넌트 추가

```bash
# shadcn 컴포넌트 추가
npx shadcn add button
npx shadcn add input
npx shadcn add dialog
npx shadcn add select
npx shadcn add form
```

추가된 컴포넌트는 `src/shared/ui/` 에 생성됩니다.

---

## 컴포넌트 사용 패턴

```tsx
import { Button } from "src/shared/ui/button";
import { Input } from "src/shared/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "src/shared/ui/dialog";

const MyForm = () => (
    <form>
        <Input placeholder="이메일" type="email" />
        <Button type="submit">로그인</Button>
    </form>
);
```

---

## CVA (class-variance-authority)

커스텀 컴포넌트 variant 정의 시 사용합니다.

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "src/shared/libs/ui/cn";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground",
                outline: "border border-input bg-background hover:bg-accent",
                ghost: "hover:bg-accent hover:text-accent-foreground",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        className?: string;
    };

const Button = ({ className, variant, size, ...props }: ButtonProps) => (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
);
```

---

## Tailwind CSS v4

### 기본 사용

```tsx
// 레이아웃
<div className="flex flex-col gap-4 p-6" />
<div className="grid grid-cols-2 gap-4" />

// 반응형
<div className="w-full md:w-1/2 lg:w-1/3" />

// 상태
<button className="hover:bg-slate-100 focus:ring-2 disabled:opacity-50" />
```

### CSS 변수 (globals.css)

shadcn은 CSS 변수로 테마를 관리합니다.

```css
@layer base {
    :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;
        --destructive: 0 84.2% 60.2%;
    }
    .dark {
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
    }
}
```

---

## Toast (sonner)

```tsx
import { toast } from "sonner";

// 사용 예시
toast.success("저장되었습니다.");
toast.error("오류가 발생했습니다.");
toast.info("알림 메시지입니다.");
toast.warning("경고 메시지입니다.");

// Promise toast
toast.promise(asyncFn(), {
    loading: "처리 중...",
    success: "완료되었습니다.",
    error: "실패했습니다.",
});
```

---

## 반응형 디자인

Tailwind CSS 브레이크포인트를 사용합니다.

| Prefix | Min Width | 설명 |
|--------|-----------|------|
| (없음) | 0px | 모바일 우선 |
| `sm:` | 640px | 소형 태블릿 |
| `md:` | 768px | 태블릿 |
| `lg:` | 1024px | 데스크톱 |
| `xl:` | 1280px | 대형 데스크톱 |

```tsx
// 모바일 우선 반응형
<div className="flex flex-col md:flex-row gap-4" />
<h1 className="text-2xl md:text-4xl font-bold" />
```

---

## 다크모드

```tsx
// Tailwind dark: prefix 사용
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
```
