import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/entities/sign-in/constants/sign-in.constants";

/**
 * @description 쿠키 기반 인증 토큰 관리 유틸입니다.
 * - getToken: 키에 해당하는 토큰을 쿠키에서 조회
 * - setToken: 토큰을 쿠키에 저장
 * - clearToken: 액세스/리프레시 토큰을 모두 삭제
 */
const Token = {
	/**
	 * @description 쿠키에서 토큰을 조회합니다.
	 * @param key - 토큰 키
	 * @returns 토큰 값 또는 undefined
	 */
	getToken: (key: string): string | undefined => Cookies.get(key),

	/**
	 * @description 토큰을 쿠키에 저장합니다.
	 * @param key - 토큰 키
	 * @param token - 저장할 토큰 값
	 */
	setToken: (key: string, token: string): void => {
		Cookies.set(key, token, {});
	},

	/**
	 * @description 액세스/리프레시 토큰을 모두 삭제합니다.
	 */
	clearToken: (): void => {
		Cookies.remove(ACCESS_TOKEN);
		Cookies.remove(REFRESH_TOKEN);
	},
};

export default Token;
