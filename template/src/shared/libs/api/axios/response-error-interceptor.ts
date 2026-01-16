import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { refreshApi } from "src/entities/signin/api/signin.api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/entities/signin/model/constants/signin.constants";
import Token from "src/shared/libs/api/cookie";
import { BigtabletAxios } from "./index";

let isRefreshing = false;
let refreshSubscribers: Array<(ok: boolean) => void> = [];

/**
 * @description
 * 토큰 재발급 완료 후 대기 중인 요청들에게 결과를 알린다.
 */
const onRefreshed = (ok: boolean) => {
	for (const callback of refreshSubscribers) {
		callback(ok);
	}
	refreshSubscribers = [];
};

/**
 * @description
 * 토큰 재발급이 진행 중일 때, 이후 요청을 구독 큐에 추가한다.
 */
const subscribeRefresh = (callback: (ok: boolean) => void) => {
	refreshSubscribers.push(callback);
};

/**
 * @description
 * Axios response interceptor.
 *
 * - 401 에러 발생 시 access token을 refresh 한다.
 * - refresh 중에는 요청을 큐에 쌓아 순차적으로 재시도한다.
 * - refresh 실패 시 모든 토큰을 제거하고 로그인 페이지로 이동한다.
 * - 그 외 에러는 그대로 상위로 전파한다.
 */
export const responseErrorInterceptor = async (error: AxiosError) => {
	const originalRequest =
		(error.config as AxiosRequestConfig & { _retry?: boolean }) ?? undefined;

	/** 요청 취소 */
	if (axios.isCancel(error)) {
		return Promise.resolve(null);
	}

	/** access token 만료 */
	if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
		originalRequest._retry = true;

		/** 이미 refresh 중인 경우 큐에 등록 */
		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				subscribeRefresh((ok) => {
					if (!ok) {
						reject(error);
						return;
					}
					resolve(BigtabletAxios(originalRequest));
				});
			});
		}

		isRefreshing = true;

		try {
			const refreshToken = Token.getToken(REFRESH_TOKEN);
			if (!refreshToken) throw error;

			const accessToken = await refreshApi({ refreshToken });
			Token.setToken(ACCESS_TOKEN, accessToken);

			isRefreshing = false;
			onRefreshed(true);

			return BigtabletAxios(originalRequest);
		} catch (refreshError) {
			isRefreshing = false;
			onRefreshed(false);

			Token.clearToken();

			if (typeof window !== "undefined") {
				window.location.href = "/signin";
			}

			return Promise.reject(refreshError);
		}
	}

	/** 그 외 에러는 그대로 전파 (API util에서 normalize) */
	return Promise.reject(error);
};