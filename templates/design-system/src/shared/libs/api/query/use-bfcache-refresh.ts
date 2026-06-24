"use client";

import type { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * @description
 * bfcache (Back-Forward Cache) 복원 시 React Query 캐시를 invalidate 하는 훅.
 *
 * iOS / Safari / Chrome 의 bfcache 가 페이지를 메모리 상태 그대로 복원할 때,
 * `useQuery` 가 stale-but-pending 상태로 박혀 Suspense fallback(skeleton) 이 무한
 * 표시되는 버그를 해소한다. (OAuth 후 뒤로 가기 → 화면이 skeleton 으로 stuck 되는 케이스)
 *
 * Provider 레벨에 한 번 걸어두면 모든 라우트가 자동 회복된다. `invalidateQueries()` 는
 * 데이터를 유지한 채 백그라운드 refetch(stale-while-revalidate) 하므로 복원 직후 화면이
 * 비지 않고, stuck 된 pending 쿼리도 새 fetch 로 회복된다.
 *
 * @param queryClient - 대상 QueryClient 인스턴스
 *
 * @example
 * ```tsx
 * const [queryClient] = useState(() => createDefaultQueryClient());
 * useBfcacheRefresh(queryClient);
 * ```
 */
const useBfcacheRefresh = (queryClient: QueryClient) => {
	useEffect(() => {
		const handler = (event: PageTransitionEvent) => {
			// `persisted` true = bfcache 에서 복원된 경우. 일반 navigation 은 false.
			if (event.persisted) {
				queryClient.invalidateQueries();
			}
		};
		window.addEventListener("pageshow", handler);
		return () => {
			window.removeEventListener("pageshow", handler);
		};
	}, [queryClient]);
};

export default useBfcacheRefresh;
