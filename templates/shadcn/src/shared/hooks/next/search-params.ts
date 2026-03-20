"use client";

import { useSearchParams } from "next/navigation";

/**
 * @description 쿼리스트링을 타입 안전하게 다루는 훅입니다.
 * - Next.js useSearchParams를 래핑하여 타입 변환 유틸을 제공
 * - getString, getNumber, getBoolean 메서드로 안전한 타입 추출
 *
 * @returns {Object} 검색 파라미터 유틸리티 객체
 *
 * @example
 * const params = BigtabletSearchParams();
 * const page = params.getNumber('page', 1);
 * const query = params.getString('q', '');
 * const showArchived = params.getBoolean('archived', false);
 */
export const BigtabletSearchParams = () => {
	const raw = useSearchParams();

	return {
		/**
		 * @description 원본 SearchParams 객체
		 */
		raw,

		/**
		 * @description 문자열 값 조회 (null 반환 가능)
		 *
		 * @param {string} key - 파라미터 키
		 * @returns {string | null} 파라미터 값 또는 null
		 */
		get(key: string): string | null {
			return raw.get(key);
		},

		/**
		 * @description 문자열 값 조회 (기본값 지원)
		 *
		 * @param {string} key - 파라미터 키
		 * @param {string} [defaultValue] - 기본값
		 * @returns {string | undefined} 파라미터 값 또는 기본값
		 */
		getString(key: string, defaultValue?: string): string | undefined {
			return raw.get(key) ?? defaultValue;
		},

		/**
		 * @description 숫자 값 조회 (타입 안전)
		 *
		 * @param {string} key - 파라미터 키
		 * @param {number} [defaultValue] - 기본값
		 * @returns {number | undefined} 숫자 값 또는 기본값
		 */
		getNumber(key: string, defaultValue?: number): number | undefined {
			const v = raw.get(key);
			if (v == null) return defaultValue;
			const n = Number(v);
			return Number.isFinite(n) ? n : defaultValue;
		},

		/**
		 * @description 불린 값 조회 (안전한 파싱)
		 *
		 * @param {string} key - 파라미터 키
		 * @param {boolean} [defaultValue=false] - 기본값
		 * @returns {boolean} true/1/yes/on을 제외한 모든 값은 false
		 */
		getBoolean(key: string, defaultValue = false): boolean {
			const v = raw.get(key);
			if (v == null) return defaultValue;
			return ["true", "1", "yes", "on"].includes(v.toLowerCase());
		},

		/**
		 * @description 검색 파라미터를 문자열로 변환
		 *
		 * @returns {string} 쿼리스트링 문자열 (예: "page=1&q=test")
		 */
		toString() {
			return raw.toString();
		},

		/**
		 * @description 모든 파라미터를 [key, value] 배열 형태로 조회
		 *
		 * @returns {IterableIterator<[string, string]>} 파라미터 엔트리 반복자
		 */
		entries() {
			return raw.entries();
		},
	};
};
