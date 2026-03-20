/**
 * @description 인증 관련 상수들입니다.
 */

/**
 * @description HTTP 요청 헤더의 Authorization 필드 이름입니다.
 */
export const REQUEST_TOKEN = "Authorization" as const;

/**
 * @description 액세스 토큰을 저장하는 쿠키의 키 이름입니다.
 */
export const ACCESS_TOKEN = "accessToken" as const;

/**
 * @description 리프레시 토큰을 저장하는 쿠키의 키 이름입니다.
 */
export const REFRESH_TOKEN = "refreshToken" as const;
