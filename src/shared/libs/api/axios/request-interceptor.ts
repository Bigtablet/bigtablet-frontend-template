import { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "src/entities/signin/model/constants/signin.constants";
import Token from "src/shared/libs/api/cookie";

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
