/**
 * @description 스키마 검증 실패 시 에러 메시지를 생성합니다.
 * @param target 사용된 스키마 속성의 형식명
 * @returns ${target} 형식이 올바르지 않습니다!
 * @example
 * message("이메일") // "형식은 이메일 이어야 합니다."
 */
export const message = (target: string) => {
	return `형식은 ${target} 이어야 합니다.`;
};
