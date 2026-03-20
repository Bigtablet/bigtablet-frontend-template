import { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "src/entities/sign-in/constants/sign-in.constants";
import Token from "src/shared/libs/api/cookie";

/**
 * @description Axios 헤더 객체를 AxiosHeaders 인스턴스로 변환합니다.
 * @param h - 변환할 헤더 객체
 * @returns AxiosHeaders 인스턴스
 */
const asAxiosHeaders = (h?: InternalAxiosRequestConfig["headers"]) =>
	h instanceof AxiosHeaders ? h : AxiosHeaders.from(h || {});

/**
 * @description Axios 요청 인터셉터입니다.
 * - 쿠키에서 액세스 토큰을 읽어 Authorization 헤더에 Bearer 형식으로 주입
 * - 기존 Authorization 헤더는 제거 후 재설정
 * @param config - Axios 요청 설정
 * @returns 수정된 요청 설정
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
	const access = typeof window !== "undefined" ? Token.getToken(ACCESS_TOKEN) : undefined;

	config.headers = asAxiosHeaders(config.headers);
	config.headers.delete?.("Authorization");

	if (access) {
		config.headers.set("Authorization", `Bearer ${access}`);
	}

	return config;
};
