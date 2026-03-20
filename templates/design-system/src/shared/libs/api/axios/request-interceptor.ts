import { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "src/entities/sign-in/constants/sign-in.constants";
import Token from "src/shared/libs/api/cookie";

/**
 * @description
 * 헤더 객체를 AxiosHeaders 인스턴스로 변환합니다.
 * 이미 AxiosHeaders인 경우 그대로 반환하고, 아닐 경우 AxiosHeaders.from()으로 변환합니다.
 *
 * @param h - 변환할 헤더 객체
 * @returns AxiosHeaders 인스턴스
 */
const asAxiosHeaders = (h?: InternalAxiosRequestConfig["headers"]) =>
	h instanceof AxiosHeaders ? h : AxiosHeaders.from(h || {});

/**
 * @description
 * Axios 요청 인터셉터입니다.
 * 저장된 access token을 Authorization 헤더에 자동으로 추가합니다.
 *
 * @param config - Axios 요청 설정
 * @returns 인터셉트된 요청 설정
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
