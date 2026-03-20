"use client";

import { useParams } from "next/navigation";

/**
 * @description Next.js useParams를 타입 안전하게 래핑한 훅입니다.
 * - 제네릭으로 URL 파라미터 타입을 지정하면 타입 캐스팅을 자동 처리
 *
 * @template T - URL 파라미터 타입 (Record<string, string> 확장)
 * @returns {T} 타입 캐스팅된 URL 파라미터 객체
 *
 * @example
 * type Params = { id: string; slug: string };
 * const params = BigtabletParams<Params>();
 * const { id, slug } = params;
 */
export const BigtabletParams = <T extends Record<string, string>>() => {
	return useParams() as unknown as T;
};
