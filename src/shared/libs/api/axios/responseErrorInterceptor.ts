import { AxiosError, AxiosRequestConfig } from "axios";
import { BigtabletAxios } from "./index";
import errorHandler from "./errorHandler";
import { refreshApi } from "src/entities/signin/api/signin.api";
import Token from "src/shared/libs/api/cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/entities/signin/constants/signin.constants";

let isRefreshing = false;
let refreshSubscribers: Array<(ok: boolean) => void> = [];

const onRefreshed = (ok: boolean) => {
    for (const cb of refreshSubscribers) cb(ok);
    refreshSubscribers = [];
};

const subscribeRefresh = (cb: (ok: boolean) => void) => {
    refreshSubscribers.push(cb);
};

export const responseErrorInterceptor = async (error: AxiosError) => {
    const originalRequest =
        (error.config as AxiosRequestConfig & { _retry?: boolean }) ?? undefined;

    if (error.response) {
        const { status } = error.response;

        // 인증 만료 처리
        if (status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            // 이미 리프레시 중이면 완료까지 대기 후 재시도/실패
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    subscribeRefresh((ok) => {
                        if (!ok) return reject(error);
                        resolve(BigtabletAxios(originalRequest));
                    });
                });
            }

            isRefreshing = true;
            try {
                // 1) 쿠키에서 refreshToken 확보
                const refreshToken = Token.getToken(REFRESH_TOKEN);
                if (!refreshToken) throw new Error("No refresh token");

                // 2) 리프레시 호출 (인터셉터 미적용 axios로 구현된 refreshApi 권장)
                const accessToken = await refreshApi({ refreshToken });

                // 3) 새 accessToken 쿠키 저장
                Token.setToken(ACCESS_TOKEN, accessToken);

                // 4) 대기열 해제 및 원 요청 재시도
                isRefreshing = false;
                onRefreshed(true);
                return BigtabletAxios(originalRequest);
            } catch (e) {
                // 리프레시 실패: 쿠키 정리 후 로그인 페이지로
                isRefreshing = false;
                onRefreshed(false);
                Token.clearToken();
                errorHandler(e as AxiosError);
                if (typeof window !== "undefined") window.location.href = "/signin";
                return Promise.reject(e);
            }
        }
    }

    errorHandler(error);
    return Promise.reject(error);
};