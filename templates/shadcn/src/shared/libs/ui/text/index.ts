/**
 * @description 텍스트를 최대 길이로 잘라 말줄임표(…)를 붙입니다.
 * - null/undefined 입력 시 빈 문자열 반환
 * - 최대 길이 이하면 원본 그대로 반환
 * @param text - 처리할 텍스트
 * @param max - 최대 길이 (기본값: 120)
 * @returns 처리된 텍스트
 * @example
 * ellipsis("This is a very long text", 10) // "This is a …"
 */
export const ellipsis = (text?: string | null, max = 120) => {
	if (!text) return "";
	if (text.length <= max) return text;
	return `${text.slice(0, max).trimEnd()}…`;
};
