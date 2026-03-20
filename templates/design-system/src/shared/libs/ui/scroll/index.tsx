"use client";

import { useCallback, useRef } from "react";
import type { ScrollOption } from "./type";

/**
 * @description
 * Intersection Observer를 이용한 스크롤 감지 훅입니다.
 * 요소가 뷰포트에 진입할 때 콜백을 실행합니다.
 * 주로 무한 스크롤이나 lazy loading 구현에 사용됩니다.
 *
 * @param options - ScrollOption (onIntersect 콜백 및 Intersection Observer 설정)
 * @returns observe 함수 - 감지할 DOM 노드에 ref로 전달
 *
 * @example
 * const observe = useScroll({
 *   onIntersect: () => loadMore(),
 *   root: null,
 *   threshold: 0.1
 * });
 * return <div ref={observe}>Trigger element</div>;
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
