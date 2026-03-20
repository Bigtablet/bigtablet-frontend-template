const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

/**
 * @description
 * 주어진 날짜를 상대 시간 형식으로 변환합니다.
 * 예: "2시간 전", "방금 전", "1일 후" 등으로 표시합니다.
 *
 * @param dateStr - ISO 8601 형식의 날짜 문자열
 * @param locale - Intl 로케일 문자열 (예: "ko", "ko-KR", "en")
 * @returns 상대 시간 형식의 문자열. 입력이 없으면 빈 문자열 반환
 *
 * @example
 * formatRelative("2026-03-20T12:00:00Z", "ko")
 * // "지금" 또는 "1시간 전" 등을 반환
 */
export const formatRelative = (dateStr?: string, locale?: string) => {
	if (!dateStr || !locale) return "";
	const parsedDate = new Date(dateStr);
	const now = new Date();
	const diffMs = parsedDate.getTime() - now.getTime();
	const absSec = Math.round(Math.abs(diffMs) / MILLISECONDS_PER_SECOND);
	const rtf = new Intl.RelativeTimeFormat(locale.startsWith("ko") ? "ko" : "en", {
		numeric: "auto",
	});

	if (absSec < SECONDS_PER_MINUTE) return rtf.format(Math.round(diffMs / MILLISECONDS_PER_SECOND), "second");
	const absMin = Math.round(absSec / SECONDS_PER_MINUTE);
	if (absMin < MINUTES_PER_HOUR) return rtf.format(Math.round(diffMs / (SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)), "minute");
	const absHr = Math.round(absMin / MINUTES_PER_HOUR);
	if (absHr < HOURS_PER_DAY) return rtf.format(Math.round(diffMs / (MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)), "hour");
	return rtf.format(Math.round(diffMs / (HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)), "day");
};
