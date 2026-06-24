import { MutationCache } from "@tanstack/react-query";
import { getErrorMessage } from "src/shared/libs/api/axios/error/error.util";
import { getToastRef } from "src/shared/libs/api/toast/toast-bridge";

/**
 * @description
 * React Query 뮤테이션 meta 타입 확장입니다.
 *
 * - `errorMessage`: 에러 시 표시할 토스트 메시지 (서버 메시지보다 우선하는 fallback)
 * - `successMessage`: 성공 시 표시할 토스트 메시지
 * - `skipGlobalErrorToast`: 전역 에러 토스트를 건너뛸지 여부
 * - `skipGlobalErrorReport`: 전역 에러 리포팅(Sentry 등)을 건너뛸지 여부 — 정상 흐름의
 *   예상된 에러(404 등)에서 리포팅 노이즈를 막을 때 사용
 */
declare module "@tanstack/react-query" {
	interface Register {
		mutationMeta: {
			errorMessage?: string;
			successMessage?: string;
			skipGlobalErrorToast?: boolean;
			skipGlobalErrorReport?: boolean;
		};
	}
}

/**
 * @description
 * 전역 mutation 에러/성공 토스트를 자동 처리하는 MutationCache 팩토리입니다.
 *
 * - 에러 시: `meta.errorMessage` 가 있으면 에러 토스트 표시 (`meta.skipGlobalErrorToast` 면 건너뜀)
 * - 성공 시: `meta.successMessage` 가 있으면 성공 토스트 표시
 * - `errorReporter` 주입 시: 토스트 노출 여부와 무관하게 에러 리포팅(Sentry 등) 수행.
 *   `meta.skipGlobalErrorReport` 면 건너뛴다 — 라이브러리가 Sentry 에 직접 의존하지 않도록 앱이 주입한다.
 *
 * @param errorReporter - 전역 에러 리포팅 주입 함수 (선택)
 */
export const createMutationCache = (errorReporter?: (error: unknown) => void) =>
	new MutationCache({
		onError: (error, _variables, _context, mutation) => {
			// 리포팅은 토스트 노출 여부와 무관하게 수행 — 리포터(Sentry 등) 실패가 사용자 토스트를 막지 않도록 격리.
			if (errorReporter && !mutation.meta?.skipGlobalErrorReport) {
				try {
					errorReporter(error);
				} catch {
					// 리포팅 실패는 무시 (관측성 < 사용자 피드백 보장).
				}
			}

			if (mutation.meta?.skipGlobalErrorToast) return;
			if (!mutation.meta?.errorMessage) return;

			const toast = getToastRef();
			if (!toast) return;

			toast.error(getErrorMessage(error, mutation.meta.errorMessage));
		},
		onSuccess: (_data, _variables, _context, mutation) => {
			if (!mutation.meta?.successMessage) return;

			const toast = getToastRef();
			if (!toast) return;

			toast.success(mutation.meta.successMessage);
		},
	});
