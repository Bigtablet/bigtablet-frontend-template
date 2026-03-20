"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useNavigationStore } from "src/shared/hooks/next/navigation";

/**
 * @description 기본 쓰로틀 간격 (밀리초)
 */
const DEFAULT_THROTTLE_MS = 300;

/**
 * @description 쓰로틀링이 적용된 커스텀 라우터 훅입니다.
 * - Next.js useRouter를 래핑하여 중복 네비게이션을 방지
 * - 모든 라우팅 액션에 BigtabletNavigation의 로딩 상태를 자동 연동
 * - 기본 300ms 쓰로틀 간격, 각 메서드에서 개별 조정 가능
 *
 * @returns {Object} 라우팅 메서드 객체
 * @returns {Function} returns.push - 페이지 이동 (히스토리 추가)
 * @returns {Function} returns.replace - 페이지 이동 (현재 페이지 대체)
 * @returns {Function} returns.back - 이전 페이지 이동
 * @returns {Function} returns.refresh - 현재 페이지 새로고침
 *
 * @example
 * const router = BigtabletRouter();
 * router.push('/new-page');
 * router.replace('/current-page', 500); // 500ms 쓰로틀 적용
 */
export const BigtabletRouter = () => {
	const router = useRouter();
	const { setLoading } = useNavigationStore();
	const lastCallRef = useRef(0);

	/**
	 * @description 쓰로틀 간격 내 중복 호출을 무시하는 래퍼 함수입니다.
	 *
	 * @param {Function} fn - 실행할 함수
	 * @param {number} [limit=DEFAULT_THROTTLE_MS] - 쓰로틀 간격 (밀리초)
	 * @returns {void}
	 */
	const runWithThrottle = (fn: () => void, limit = DEFAULT_THROTTLE_MS) => {
		const now = Date.now();
		if (now - lastCallRef.current < limit) return;
		lastCallRef.current = now;
		fn();
	};

	/**
	 * @description 페이지 이동 (히스토리에 추가)
	 *
	 * @param {string} href - 이동할 경로
	 * @param {number} [throttleMs=DEFAULT_THROTTLE_MS] - 쓰로틀 간격 (밀리초)
	 * @returns {void}
	 */
	const push = (href: string, throttleMs = DEFAULT_THROTTLE_MS) => {
		runWithThrottle(() => {
			setLoading(true);
			router.push(href);
		}, throttleMs);
	};

	/**
	 * @description 페이지 이동 (현재 페이지 대체)
	 *
	 * @param {string} href - 이동할 경로
	 * @param {number} [throttleMs=DEFAULT_THROTTLE_MS] - 쓰로틀 간격 (밀리초)
	 * @returns {void}
	 */
	const replace = (href: string, throttleMs = DEFAULT_THROTTLE_MS) => {
		runWithThrottle(() => {
			setLoading(true);
			router.replace(href);
		}, throttleMs);
	};

	/**
	 * @description 이전 페이지로 이동
	 *
	 * @param {number} [throttleMs=DEFAULT_THROTTLE_MS] - 쓰로틀 간격 (밀리초)
	 * @returns {void}
	 */
	const back = (throttleMs = DEFAULT_THROTTLE_MS) => {
		runWithThrottle(() => {
			setLoading(true);
			router.back();
		}, throttleMs);
	};

	/**
	 * @description 현재 페이지 새로고침
	 *
	 * @param {number} [throttleMs=DEFAULT_THROTTLE_MS] - 쓰로틀 간격 (밀리초)
	 * @returns {void}
	 */
	const refresh = (throttleMs = DEFAULT_THROTTLE_MS) => {
		runWithThrottle(() => {
			setLoading(true);
			router.refresh();
		}, throttleMs);
	};

	return { push, replace, back, refresh };
};
