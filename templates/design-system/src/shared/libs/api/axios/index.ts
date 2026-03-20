import axios from "axios";
import { requestInterceptor } from "./request-interceptor";
import { responseErrorInterceptor } from "./response-error-interceptor";

/**
 * @description
 * 서버의 기본 URL입니다. NEXT_PUBLIC_SERVER_URL 환경 변수에서 읽습니다.
 */
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * @description
 * Bigtablet 서비스의 기본 Axios 인스턴스입니다.
 * 요청/응답 인터셉터가 설정되어 자동으로 토큰 관리 및 에러 처리를 수행합니다.
 */
export const BigtabletAxios = axios.create({
	baseURL: SERVER_URL,
	withCredentials: false,
});

BigtabletAxios.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));

BigtabletAxios.interceptors.response.use((response) => response, responseErrorInterceptor);

export default BigtabletAxios;
