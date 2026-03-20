import axios from "axios";
import { requestInterceptor } from "./request-interceptor";
import { responseErrorInterceptor } from "./response-error-interceptor";

/**
 * @description 서버 API 베이스 URL (환경변수)
 */
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * @description Bigtablet 공용 Axios 인스턴스입니다.
 * - baseURL: NEXT_PUBLIC_SERVER_URL
 * - Request 인터셉터: 액세스 토큰 자동 주입
 * - Response 인터셉터: 에러 정규화 처리
 */
export const BigtabletAxios = axios.create({
	baseURL: SERVER_URL,
	withCredentials: false,
});

BigtabletAxios.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));

BigtabletAxios.interceptors.response.use((response) => response, responseErrorInterceptor);

export default BigtabletAxios;
