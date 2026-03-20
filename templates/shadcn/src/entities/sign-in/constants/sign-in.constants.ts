/**
 * @description
 * 인증 관련 토큰 키 상수입니다.
 *
 * - `REQUEST_TOKEN`: HTTP 요청 헤더 키 (`Authorization`)
 * - `ACCESS_TOKEN`: 액세스 토큰 저장 키
 * - `REFRESH_TOKEN`: 리프레시 토큰 저장 키
 */

/** @description HTTP 요청 헤더에 사용되는 인증 키 */
export const REQUEST_TOKEN = "Authorization" as const;

/** @description 쿠키/스토리지에 저장되는 액세스 토큰 키 */
export const ACCESS_TOKEN = "accessToken" as const;

/** @description 쿠키/스토리지에 저장되는 리프레시 토큰 키 */
export const REFRESH_TOKEN = "refreshToken" as const;
