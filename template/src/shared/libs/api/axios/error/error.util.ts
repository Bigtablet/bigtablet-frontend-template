import { AxiosError } from "axios";
import {
	getHttpStatusMessage,
	getNetworkErrorMessage,
	translateErrorMessage,
} from "./error-messages";

/**
 * @description
 * 에러 객체의 타입을 판별합니다.
 */
const getErrorType = (error: unknown): "axios" | "error" | "unknown" => {
	if (error instanceof AxiosError) return "axios";
	if (error instanceof Error) return "error";
	return "unknown";
};

/**
 * @description
 * CORS/네트워크 에러인지 확인합니다.
 * (response가 없고 request만 있는 경우)
 */
export const isNetworkError = (error: unknown): boolean => {
	if (!(error instanceof AxiosError)) return false;
	return !error.response && !!error.request;
};

/**
 * @description
 * 에러 객체에서 원본 메시지를 추출합니다. (번역 없이)
 */
export const getRawErrorMessage = (error: unknown): string | null => {
	if (error instanceof AxiosError) {
		return error.response?.data?.message ?? null;
	}
	if (error instanceof Error) {
		return error.message || null;
	}
	return null;
};

/**
 * @description
 * 에러 객체에서 메시지를 추출합니다.
 * 서버 에러 메시지는 한국어로 번역됩니다.
 *
 * @param error - 에러 객체
 * @param fallback - 기본 에러 메시지
 * @returns 에러 메시지
 */
export const getErrorMessage = (
	error: unknown,
	fallback = "알 수 없는 오류가 발생했습니다.",
): string => {
	switch (getErrorType(error)) {
		case "axios": {
			const axiosError = error as AxiosError<{ message?: string }>;

			if (isNetworkError(axiosError)) {
				return getNetworkErrorMessage();
			}

			const message = axiosError.response?.data?.message;
			const status = axiosError.response?.status;

			if (typeof message === "string" && message.length > 0) {
				return translateErrorMessage(message);
			}

			if (status) {
				const statusMessage = getHttpStatusMessage(status);
				if (statusMessage) return statusMessage;
			}

			return fallback;
		}
		case "error": {
			const errorObject = error as Error;
			if (errorObject.message.length > 0) {
				return translateErrorMessage(errorObject.message);
			}
			return fallback;
		}
		default:
			return fallback;
	}
};
