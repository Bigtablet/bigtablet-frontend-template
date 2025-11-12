import { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import Token from "src/shared/libs/api/cookie";
import { ACCESS_TOKEN } from "src/entities/signin/constants/signin.constants";

const asAxiosHeaders = (h?: InternalAxiosRequestConfig["headers"]) =>
    h instanceof AxiosHeaders ? h : AxiosHeaders.from(h || {});

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    const access = typeof window !== "undefined" ? Token.getToken(ACCESS_TOKEN) : undefined;

    config.headers = asAxiosHeaders(config.headers);
    config.headers.delete?.("Authorization");

    if (access) {
        config.headers.set("Authorization", `Bearer ${access}`);
    }

    return config;
};