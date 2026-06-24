import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

import { refreshApi } from "src/entities/sign-in/api/sign-in.api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/entities/sign-in/constants/sign-in.constants";
import Token from "src/shared/libs/api/cookie";
import { BigtabletAxios } from "./index";

/**
 * @description
 * 요청이 취소(cancel)되었을 때 발생하는 에러입니다.
 * `Promise.resolve(null)` 대신 reject 하여 호출부가 `.data` 접근 시 NPE 가 나는 것을 방지합니다.
 */
export class RequestCancelledError extends Error {
	constructor() {
		super("Request cancelled");
		this.name = "RequestCancelledError";
	}
}

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
 * Axios response 에러 인터셉터입니다.
 *
 * - 요청 취소 시: `RequestCancelledError` 로 reject (호출부 `.data` 접근 NPE 방지)
 * - 401 에러: refresh token 으로 access token 을 재발급하고 원요청을 재시도한다.
 *   refresh 중에는 이후 요청을 큐에 쌓아 순차 재시도하고, refresh 실패 시 토큰을 정리한 뒤
 *   `/signin` 으로 이동한다. request config 에 `skipUnauthorizedRedirect: true` 면 리다이렉트를 건너뛴다.
 * - 그 외 에러는 그대로 전파 (API util 에서 normalize)
 *
 * 재시도(네트워크 오류·5xx)는 transport(axios) 가 아니라 React Query 레이어
 * (`createDefaultQueryClient` 의 `queries.retry`)가 담당한다 — query(GET)만 재시도하므로
 * 비멱등 mutation 의 중복 처리(중복 결제 등)를 원천 차단한다.
 */
export const responseErrorInterceptor = async (error: AxiosError) => {
	const originalRequest =
		(error.config as AxiosRequestConfig & { _retry?: boolean }) ?? undefined;

	/** 요청 취소 */
	if (axios.isCancel(error)) {
		return Promise.reject(new RequestCancelledError());
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

			if (!originalRequest.skipUnauthorizedRedirect && typeof window !== "undefined") {
				window.location.href = "/signin";
			}

			return Promise.reject(refreshError);
		}
	}

	/** 그 외 에러는 그대로 전파 (API util에서 normalize) */
	return Promise.reject(error);
};
