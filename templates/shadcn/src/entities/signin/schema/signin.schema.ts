import { baseResponseSchema } from "src/shared/schema/response";
import { z } from "zod";

/**
 * @description
 * 로그인 요청 스키마입니다.
 *
 * - `email`: 필수 문자열
 * - `password`: 필수 문자열
 */
export const signinSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export type SigninSchema = z.infer<typeof signinSchema>;

/**
 * @description
 * 리프레쉬 토큰 요청 스키마입니다.
 *
 * `refreshToken` : 필수 문자열 (jwt 파싱 상태)
 * */
export const refreshRequestSchema = z.object({
	refreshToken: z.string(),
});

export type RefreshRequestSchema = z.infer<typeof refreshRequestSchema>;

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
export const refreshResponseSchema = baseResponseSchema(
	z.object({
		accessToken: z.string(),
	}),
);

export type RefreshResponseSchema = z.infer<typeof refreshResponseSchema>;

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
export const authResponseSchema = baseResponseSchema(
	z.object({
		accessToken: z.string(),
		refreshToken: z.string().optional(),
	}),
);

export type AuthResponseSchema = z.infer<typeof authResponseSchema>;
