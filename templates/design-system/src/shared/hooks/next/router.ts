"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useNavigationStore } from "src/shared/hooks/next/navigation";

/**
 * @constant {number} DEFAULT_THROTTLE_MS
 * @description 라우팅 동작의 기본 throttle 시간(밀리초)
 */
const DEFAULT_THROTTLE_MS = 300;

/**
 * @function BigtabletRouter
 * @description Throttle 기능이 포함된 Next.js 라우터 훅입니다.
 * 빠른 연속 클릭으로 인한 중복 네비게이션을 방지합니다.
 * @returns {Object} 라우팅 메서드를 포함하는 객체
 * @returns {Function} returns.push - 경로로 이동합니다 (새 히스토리 항목 추가)
 * @returns {Function} returns.replace - 현재 경로를 변경합니다 (히스토리 항목 교체)
 * @returns {Function} returns.back - 이전 페이지로 이동합니다
 * @returns {Function} returns.refresh - 현재 페이지를 새로고침합니다
 * @example
 * const { push, replace, back, refresh } = BigtabletRouter()
 * push('/product/123', 500) // 500ms throttle 적용
 */
export const BigtabletRouter = () => {
	const router = useRouter();
	const { setLoading } = useNavigationStore();
	const lastCallRef = useRef(0);

	/**
	 * @function runWithThrottle
	 * @description 함수를 지정된 시간 간격으로 실행하도록 제한합니다.
	 * @param {Function} fn - 실행할 함수
	 * @param {number} [limit=DEFAULT_THROTTLE_MS] - throttle 시간 간격(밀리초)
	 */
	const runWithThrottle = (fn: () => void, limit = DEFAULT_THROTTLE_MS) => {
		const now = Date.now();
		if (now - lastCallRef.current < limit) return;
		lastCallRef.current = now;
		fn();
	};

	/**
	 * @function push
	 * @description 지정된 경로로 이동합니다. 네비게이션 시작 시 로딩 상태를 true로 설정합니다.
	 * @param {string} href - 이동할 경로
	 * @param {number} [throttleMs=DEFAULT_THROTTLE_MS] - throttle 시간(밀리초)
	 */
	const push = (href: string, throttleMs = DEFAULT_THROTTLE_MS) => {
		runWithThrottle(() => {
			setLoading(true);
			router.push(href);
		}, throttleMs);
	};

	/**
	 * @function replace
	 * @description 현재 히스토리 항목을 지정된 경로로 교체합니다. 네비게이션 시작 시 로딩 상태를 true로 설정합니다.
	 * @param {string} href - 변경할 경로
	 * @param {number} [throttleMs=DEFAULT_THROTTLE_MS] - throttle 시간(밀리초)
	 */
	const replace = (href: string, throttleMs = DEFAULT_THROTTLE_MS) => {
		runWithThrottle(() => {
			setLoading(true);
			router.replace(href);
		}, throttleMs);
	};

	/**
	 * @function back
	 * @description 브라우저 히스토리에서 이전 페이지로 이동합니다.
	 * @param {number} [throttleMs=DEFAULT_THROTTLE_MS] - throttle 시간(밀리초)
	 */
	const back = (throttleMs = DEFAULT_THROTTLE_MS) => {
		runWithThrottle(() => {
			setLoading(true);
			router.back();
		}, throttleMs);
	};

	/**
	 * @function refresh
	 * @description 현재 페이지를 새로고침합니다. 서버에서 데이터를 다시 가져옵니다.
	 * @param {number} [throttleMs=DEFAULT_THROTTLE_MS] - throttle 시간(밀리초)
	 */
	const refresh = (throttleMs = DEFAULT_THROTTLE_MS) => {
		runWithThrottle(() => {
			setLoading(true);
			router.refresh();
		}, throttleMs);
	};

	return { push, replace, back, refresh };
};
