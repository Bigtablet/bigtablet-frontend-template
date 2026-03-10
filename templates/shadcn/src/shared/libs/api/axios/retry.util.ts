import type { AxiosRequestConfig } from "axios";

import { BigtabletAxios } from "src/shared/libs/api/axios/index";

/**
 * @description
 * 지수 백오프(Exponential Backoff) 재시도에 사용되는 설정값들입니다.
 *
 * @constant MAXIMUM_RETRY_COUNT - 최대 재시도 횟수
 * @constant BASE_DELAY_MILLISECONDS - 초기 재시도 대기 시간(ms). 매 재시도마다 2배씩 증가합니다
 */
const MAXIMUM_RETRY_COUNT = 2;
const BASE_DELAY_MILLISECONDS = 1000;

/**
 * @description
 * 5xx 서버 에러 중 재시도 가능한 HTTP 상태 코드 목록입니다.
 * 클라이언트 에러(4xx)나 일시적이지 않은 서버 에러는 포함하지 않습니다.
 */
const RETRYABLE_STATUS_CODES: ReadonlyArray<number> = [500, 502, 503, 504];

/**
 * @description
 * 주어진 HTTP 상태 코드가 재시도 가능한 서버 에러인지 확인합니다.
 *
 * @param statusCode - HTTP 응답 상태 코드
 * @returns 재시도 가능 여부
 */
export const isRetryableStatusCode = (statusCode: number): boolean =>
	RETRYABLE_STATUS_CODES.includes(statusCode);

/**
 * @description
 * 지수 백오프 방식으로 딜레이 후 Axios 요청을 재시도합니다.
 *
 * 재시도 흐름:
 * 1. 현재 재시도 횟수가 MAXIMUM_RETRY_COUNT를 초과하면 에러를 그대로 전파합니다.
 * 2. BASE_DELAY_MILLISECONDS * (2 ^ currentRetryCount) ms 만큼 대기합니다.
 * 3. 재시도 횟수를 1 증가시키고 요청을 재전송합니다.
 *
 * @param requestConfig - 재시도할 Axios 요청 설정 (_retryCount 필드 포함)
 * @param originalError - 원본 에러 (재시도 횟수 초과 시 전파)
 */
export const retryWithExponentialBackoff = async (
	requestConfig: AxiosRequestConfig & { _retryCount?: number },
	originalError: unknown,
): Promise<unknown> => {
	const currentRetryCount = requestConfig._retryCount ?? 0;

	if (currentRetryCount >= MAXIMUM_RETRY_COUNT) {
		return Promise.reject(originalError);
	}

	const delayMilliseconds = BASE_DELAY_MILLISECONDS * 2 ** currentRetryCount;

	await new Promise<void>((resolve) => setTimeout(resolve, delayMilliseconds));

	requestConfig._retryCount = currentRetryCount + 1;

	return BigtabletAxios(requestConfig);
};
