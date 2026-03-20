/**
 * @description
 * 주어진 텍스트를 최대 길이로 잘라내고 말줄임표(…)를 추가합니다.
 *
 * @param text - 잘라낼 텍스트
 * @param max - 최대 길이 (기본값: 120)
 * @returns 처리된 텍스트. 원본이 max 이상이면 잘라내고 말줄임표 추가
 *
 * @example
 * ellipsis("안녕하세요", 5) // "안녕하…"
 * ellipsis("Hello", 10) // "Hello"
 */
export const ellipsis = (text?: string | null, max = 120) => {
	if (!text) return "";
	if (text.length <= max) return text;
	return `${text.slice(0, max).trimEnd()}…`;
};
