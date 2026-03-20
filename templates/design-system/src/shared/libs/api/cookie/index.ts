import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/entities/sign-in/constants/sign-in.constants";

/**
 * @description
 * 쿠키 기반 토큰 관리 모듈입니다.
 * access token과 refresh token의 저장, 조회, 삭제 기능을 제공합니다.
 */
const Token = {
	/**
	 * @description
	 * 주어진 키로 저장된 토큰을 조회합니다.
	 *
	 * @param key - 토큰 키 (예: ACCESS_TOKEN, REFRESH_TOKEN)
	 * @returns 저장된 토큰 문자열, 없으면 undefined
	 */
	getToken: (key: string): string | undefined => Cookies.get(key),

	/**
	 * @description
	 * 주어진 키로 토큰을 쿠키에 저장합니다.
	 *
	 * @param key - 토큰 키 (예: ACCESS_TOKEN, REFRESH_TOKEN)
	 * @param token - 저장할 토큰 문자열
	 */
	setToken: (key: string, token: string): void => {
		Cookies.set(key, token, {});
	},

	/**
	 * @description
	 * 모든 인증 토큰(access token, refresh token)을 삭제합니다.
	 * 로그아웃 시에 호출됩니다.
	 */
	clearToken: (): void => {
		Cookies.remove(ACCESS_TOKEN);
		Cookies.remove(REFRESH_TOKEN);
	},
};

export default Token;
