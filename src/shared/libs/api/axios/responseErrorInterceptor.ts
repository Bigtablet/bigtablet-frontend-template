import { AxiosError } from "axios";
import { errorHandler } from "./errorHandler";
import { BigtabletAxios } from "./index";

let isRefreshing = false;
let refreshSubscribers: Array<() => void> = [];

const onRefreshed = () => {
    for (const cb of refreshSubscribers) cb();
    refreshSubscribers = [];
};

const subscribeRefresh = (cb: () => void) => {
    refreshSubscribers.push(cb);
};

export const responseErrorInterceptor = async (error: AxiosError) => {
    if (error.response) {
        const { config: originalRequest, response: { status } } = error;

        // 인증 만료 등
        if (status === 401 && originalRequest) {
            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    // 서버가 httpOnly 쿠키 기반으로 리프레시 수행
                    // (성공 시 Set-Cookie로 새 토큰 쿠키 내려줌)
                    await fetch("/auth/refresh", {
                        method: "POST",
                        credentials: "include",
                    });

                    isRefreshing = false;
                    onRefreshed();

                    // 쿠키가 갱신되었으므로 원 요청 재시도
                    return BigtabletAxios(originalRequest);
                } catch (e) {
                    isRefreshing = false;
                    await errorHandler(e as AxiosError);
                    // 세션 만료 → 로그인 페이지로
                    if (typeof window !== "undefined") {
                        window.location.href = "/auth/login";
                    }
                    return Promise.reject(e);
                }
            }

            // 이미 리프레시 중이면 완료 후 재시도
            return new Promise((resolve) => {
                subscribeRefresh(() => {
                    resolve(BigtabletAxios(originalRequest));
                });
            });
        }
    }

    await errorHandler(error);
    return Promise.reject(error);
};