import { type DefaultOptions, QueryClient } from "@tanstack/react-query";
import { createMutationCache } from "./mutation-cache";

/**
 * @description
 * 재시도 가능한 실패인지 판별한다 — axios transport 실패(네트워크 오류 또는 5xx)만
 * 재시도하고, 4xx 와 axios 외 에러는 즉시 실패시킨다.
 *
 * `isAxiosError` 플래그로 transport 에러만 거른다(axios 의존 추가 없이 형태만 덕타이핑) —
 * queryFn 내부에서 던진 TypeError·zod 파싱 에러 등은 재시도해도 똑같이 실패하므로 재요청
 * 낭비를 막는다. transport 에러 중 `response.status` 가 없으면 네트워크 단계 실패로 보고
 * 재시도, 있으면 5xx 만 재시도한다.
 */
const isRetriableError = (error: unknown): boolean => {
	const axiosError = error as { isAxiosError?: boolean; response?: { status?: number } } | null;
	if (!axiosError?.isAxiosError) return false;
	const status = axiosError.response?.status;
	return status === undefined || status >= 500;
};

/**
 * @description
 * 앱 공통 React Query 기본 설정.
 *
 * - `staleTime` 5분 / `gcTime` 30분: 짧은 navigation 동안 캐시를 보존해 재방문 시 즉시 hit.
 * - `refetchOnWindowFocus: false` / `refetchOnMount: false`: 캐시 적극 신뢰. 즉시성이 필요한
 *   쿼리는 `useQuery` 에서 `refetchOnWindowFocus`/`refetchOnMount: "always"` 로 개별 override.
 * - `queries.retry`: 재시도는 이 레이어가 단일 소스 — 네트워크/5xx 만 1회, 4xx 는 즉시 실패.
 *   query(GET)에만 적용되고 `mutations.retry: 0` 이라 비멱등 요청(결제 등)은 절대 재시도 안 됨.
 *   (transport(axios) 레이어에서는 재시도하지 않는다)
 */
const DEFAULT_OPTIONS: DefaultOptions = {
	queries: {
		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
		refetchOnMount: false,
		retry: (failureCount, error) => failureCount < 1 && isRetriableError(error),
	},
	mutations: {
		retry: 0,
	},
};

/**
 * @description
 * 앱 공통 기본 설정으로 `QueryClient` 를 생성한다. Provider 가 동일한 설정을 복붙하던 것을
 * 단일 소스로 통합. 앱별 차이가 필요하면 `options.defaultOptions` 로 override.
 *
 * @param options.defaultOptions - 기본 옵션에 얕게 병합할 override (queries / mutations 키 단위)
 * @param options.errorReporter - 전역 에러 리포팅(Sentry 등) 주입 함수 (mutationCache 로 전달)
 * @returns 설정된 QueryClient 인스턴스
 *
 * @example
 * ```ts
 * const [queryClient] = useState(() => createDefaultQueryClient());
 * ```
 */
export const createDefaultQueryClient = (options?: {
	defaultOptions?: DefaultOptions;
	errorReporter?: (error: unknown) => void;
}): QueryClient =>
	new QueryClient({
		defaultOptions: {
			queries: { ...DEFAULT_OPTIONS.queries, ...options?.defaultOptions?.queries },
			mutations: { ...DEFAULT_OPTIONS.mutations, ...options?.defaultOptions?.mutations },
		},
		mutationCache: createMutationCache(options?.errorReporter),
	});
