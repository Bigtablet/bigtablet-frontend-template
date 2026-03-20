/**
 * @description
 * Zod 스키마의 커스텀 에러 메시지를 생성하는 함수입니다.
 * 입력값이 올바른 형식이 아닐 때 사용되는 검증 에러 메시지를 반환합니다.
 *
 * @param target - 검증 대상 필드의 형식명 (예: "이메일", "휴대폰번호")
 * @returns 형식 검증 실패 에러 메시지
 *
 * @example
 * message("이메일") // "형식은 이메일 이어야 합니다."
 */
export const message = (target: string) => {
	return `형식은 ${target} 이어야 합니다.`;
};
