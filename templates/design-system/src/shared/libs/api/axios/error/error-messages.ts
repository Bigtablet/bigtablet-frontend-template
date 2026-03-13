/**
 * @description
 * 서버 영어 에러 메시지 -> 한국어 매핑 테이블
 * 서버에서 오는 영어 에러 메시지를 키로 사용합니다.
 */
const ERROR_MESSAGE_EN_TO_KO: Record<string, string> = {
	// 공통 에러
	"Authentication required.": "인증이 필요합니다.",
	"Access denied.": "접근 권한이 없습니다.",
	Forbidden: "권한이 없습니다.",
	"Forbidden.": "권한이 없습니다.",
	"Internal server error.": "서버 내부 오류가 발생했습니다.",

	// Auth (인증) API
	"Email is required.": "이메일을 입력해주세요.",
	"Please enter a valid email address.": "올바른 이메일 형식이 아닙니다.",
	"Password is required.": "비밀번호를 입력해주세요.",
	"Password is incorrect.": "비밀번호가 올바르지 않습니다.",
	"User not found.": "유저를 찾을 수 없습니다.",
	"User is deactivated.": "비활성화된 유저입니다.",

	// 토큰 에러
	"Refresh token is required.": "리프레시 토큰이 필요합니다.",
	"Invalid token type.": "잘못된 토큰 타입입니다.",
};

/**
 * HTTP 상태 코드별 기본 메시지
 */
const HTTP_STATUS_MESSAGES: Record<number, string> = {
	400: "잘못된 요청입니다.",
	401: "인증이 필요합니다.",
	403: "접근 권한이 없습니다.",
	404: "찾을 수 없습니다.",
	409: "충돌이 발생했습니다.",
	500: "서버 내부 오류가 발생했습니다.",
};

/**
 * @description
 * 네트워크/CORS 에러 메시지를 반환합니다.
 */
export const getNetworkErrorMessage = (): string => {
	return "서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.";
};

/**
 * @description
 * HTTP 상태 코드에 해당하는 기본 메시지를 반환합니다.
 */
export const getHttpStatusMessage = (status: number): string | undefined => {
	return HTTP_STATUS_MESSAGES[status];
};

/**
 * @description
 * 서버 에러 메시지를 한국어로 변환합니다.
 * 매핑이 없으면 원본 메시지를 그대로 반환합니다.
 */
export const translateErrorMessage = (message: string): string => {
	return ERROR_MESSAGE_EN_TO_KO[message] ?? message;
};

export default ERROR_MESSAGE_EN_TO_KO;
