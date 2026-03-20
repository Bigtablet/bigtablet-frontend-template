"use client";

import { useParams } from "next/navigation";

/**
 * @function BigtabletParams
 * @description URL 동적 경로 파라미터를 타입 안전성과 함께 반환합니다.
 * @template T - URL 파라미터의 형태를 정의하는 제네릭 타입
 * @returns {T} 지정된 제네릭 타입으로 캐스팅된 URL 파라미터 객체
 * @example
 * // 경로: /product/[id]/review/[reviewId]
 * type Params = { id: string; reviewId: string }
 * const { id, reviewId } = BigtabletParams<Params>()
 */
export const BigtabletParams = <T extends Record<string, string>>(): T => {
	return useParams() as unknown as T;
};
