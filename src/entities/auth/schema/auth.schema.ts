import {baseResponseSchema} from "src/shared/types/response";
import {z} from "zod";

/**
 * @description
 * 로그인 요청 스키마입니다.
 *
 * - `email`: 필수 문자열
 * - `password`: 필수 문자열
 */
export const signinZod = z.object({
    email: z.string(),
    password: z.string(),
});

export type SigninSchema = z.infer<typeof signinZod>;

/**
 * @description
 * 회원가입 요청 스키마입니다.
 *
 * - `email`: 필수 문자열, 유효한 이메일 형식
 * - `name`: 필수 문자열
 * - `password`: 다음 순서대로 유효성 검사
 *   1. 10자 이상 (`.min(10)`)
 *   2. 하나 이상의 대문자 포함 (`[A-Z]`)
 *   3. 하나 이상의 소문자 포함 (`[a-z]`)
 *   4. 하나 이상의 특수문자 포함 (`[^A-Za-z0-9]`)
 *
 * @example
 * ✅ `Abcdefg!23`
 * ❌ `abcdefg123` (대문자 없음)
 */
export const signupZod = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z
        .string()
        .min(10, "비밀번호는 10자 이상이어야 합니다.")
        .regex(/[A-Z]/, "하나 이상의 대문자를 포함해야 합니다.")
        .regex(/[a-z]/, "하나 이상의 소문자를 포함해야 합니다.")
        .regex(/[^A-Za-z0-9]/, "하나 이상의 특수문자를 포함해야 합니다."),
});

export type SignupSchema = z.infer<typeof signupZod>;

/**
 * @description
 * 리프레쉬 토큰 요청 스키마입니다.
 *
 * `refreshToken` : 필수 문자열 (jwt 파싱 상태)
 * */
export const refreshRequestZod = z.object({
    refreshToken: z.string(),
});

export type RefreshRequestSchema = z.infer<typeof refreshRequestZod>;

/**
 * @description
 * 리프레쉬 토큰 재발급 응답 스키마입니다.
 *
 * `baseResponseSchema`의 구조는 다음과 같습니다:
 * {
 *   status: number;
 *   message: string;
 *   data?: { ... } | null;
 * }
 * 이 스카마에선 `data` 필드에 액세스 토큰 정보를 정의합니다.
 * */
export const refreshResponseZod = baseResponseSchema(
    z.object({
        accessToken: z.string(),
    })
);

export type RefreshResponseSchema = z.infer<typeof refreshResponseZod>;

/**
 * @description
 * Auth 응답 스키마입니다.
 *
 * `baseResponseSchema`의 구조는 다음과 같습니다:
 * {
 *   status: number;
 *   message: string;
 *   data?: { ... } | null;
 * }
 * 이 스키마에서는 `data` 필드에 액세스/리프레시 토큰 정보를 정의합니다.
 */
export const authResponseZod = baseResponseSchema(
    z.object({
        accessToken: z.string(),
        refreshToken: z.string().optional(),
    })
);

export type AuthResponseSchema = z.infer<typeof authResponseZod>;