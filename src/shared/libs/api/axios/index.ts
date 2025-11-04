import axios, { type AxiosRequestConfig } from "axios";
import { requestInterceptor } from "./requestInterceptor";
import { responseErrorInterceptor } from "./responseErrorInterceptor";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const createCustomAxiosInstance = (baseUrl?: AxiosRequestConfig) => {
    const basecConfig: AxiosRequestConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };
    return axios.create({
        ...basecConfig,
        ...baseUrl,
        withCredentials: true,
    });
};

export const BigtabletAxios = createCustomAxiosInstance({
    baseURL: SERVER_URL,
});

BigtabletAxios.interceptors.request.use((res) => res, requestInterceptor);
BigtabletAxios.interceptors.response.use((res) => res, responseErrorInterceptor);