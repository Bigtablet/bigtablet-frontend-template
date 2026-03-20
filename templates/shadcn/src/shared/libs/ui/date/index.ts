const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

/**
 * @description 날짜를 상대적 시간 표현으로 변환합니다.
 * - Intl.RelativeTimeFormat을 사용하여 로케일별 상대 시간 포맷
 * - 초/분/시/일 단위로 자동 변환
 * @param dateStr - 변환할 날짜 문자열 (ISO 8601 형식)
 * @param locale - 로케일 코드 (예: 'ko', 'en')
 * @returns 상대 시간 표현 문자열 (예: "2분 전")
 * @example
 * formatRelative("2024-01-01T12:00:00", "ko") // "1일 전"
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
