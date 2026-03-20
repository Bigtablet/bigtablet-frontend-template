"use client";

import { useCallback, useRef } from "react";
import type { ScrollOption } from "./type";

/**
 * @description IntersectionObserver 기반 무한 스크롤 / 뷰포트 감지 훅입니다.
 * - ref 콜백을 반환하여 관찰 대상 요소에 연결
 * - 옵저버 재연결 시 기존 옵저버를 자동 해제
 * @param options - ScrollOption 설정 (IntersectionObserverInit + onIntersect 콜백)
 * @returns 관찰 대상 요소에 연결할 ref 콜백 함수
 */
export const useScroll = (options: ScrollOption) => {
	const observerRef = useRef<IntersectionObserver | null>(null);

	const observe = useCallback(
		(node: Element | null) => {
			if (!node) return;

			if (observerRef.current) observerRef.current.disconnect();

			observerRef.current = new IntersectionObserver((entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					options.onIntersect();
				}
			}, options);

			observerRef.current.observe(node);
		},
		[options],
	);

	return observe;
};
