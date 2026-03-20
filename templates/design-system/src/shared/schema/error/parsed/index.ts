import { z } from "zod";

/**
 * @description
 * 서버 에러 응답을 검증하기 위한 Zod 스키마입니다.
 * 모든 에러 응답은 message(문자열)와 status(숫자) 필드를 포함합니다.
 */
export const ErrorResponseParsedSchema = z.object({
	message: z.string(),
	status: z.number(),
});

/**
 * @description
 * ErrorResponseParsedSchema의 TypeScript 타입입니다.
 * API 에러 응답의 정규화된 형태를 나타냅니다.
 */
export type ErrorResponseParsed = z.infer<typeof ErrorResponseParsedSchema>;
