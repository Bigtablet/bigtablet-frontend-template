import { z } from "zod";

/**
 * @description 파싱된 API 에러 응답 스키마입니다.
 * - message: 에러 메시지 문자열
 * - status: HTTP 상태 코드
 */
export const ErrorResponseParsedSchema = z.object({
	message: z.string(),
	status: z.number(),
});

/**
 * @description 파싱된 API 에러 응답 타입
 */
export type ErrorResponseParsed = z.infer<typeof ErrorResponseParsedSchema>;
