"use client";

import { useSearchParams } from "next/navigation";

/**
 * @function BigtabletSearchParams
 * @description URL 쿼리 파라미터를 타입 안전성과 함께 관리합니다.
 * 다양한 메서드를 통해 문자열, 숫자, 불린 형식의 파라미터를 손쉽게 추출할 수 있습니다.
 * @returns {Object} 쿼리 파라미터 관리 메서드를 포함하는 객체
 * @returns {URLSearchParams} returns.raw - 원본 URLSearchParams 객체
 * @returns {Function} returns.get - 쿼리 파라미터 값을 문자열로 반환 (없으면 null)
 * @returns {Function} returns.getString - 문자열 값을 반환 (기본값 지정 가능)
 * @returns {Function} returns.getNumber - 숫자 값으로 변환하여 반환 (기본값 지정 가능)
 * @returns {Function} returns.getBoolean - 불린 값으로 변환하여 반환
 * @returns {Function} returns.toString - 전체 쿼리 스트링을 반환
 * @returns {Function} returns.entries - 모든 [key, value] 항목을 반환
 * @example
 * const params = BigtabletSearchParams()
 * const page = params.getNumber('page', 1)
 * const sort = params.getString('sort', 'asc')
 * const isActive = params.getBoolean('active', false)
 */
export const BigtabletSearchParams = () => {
	const raw = useSearchParams();

	return {
		raw,

		/**
		 * @function get
		 * @description 쿼리 파라미터를 문자열로 반환합니다.
		 * @param {string} key - 파라미터 키
		 * @returns {string | null} 파라미터 값, 없으면 null
		 */
		get(key: string): string | null {
			return raw.get(key);
		},

		/**
		 * @function getString
		 * @description 쿼리 파라미터를 문자열로 반환합니다. 기본값을 지정할 수 있습니다.
		 * @param {string} key - 파라미터 키
		 * @param {string} [defaultValue] - 파라미터가 없을 때의 기본값
		 * @returns {string | undefined} 파라미터 값 또는 기본값
		 */
		getString(key: string, defaultValue?: string): string | undefined {
			return raw.get(key) ?? defaultValue;
		},

		/**
		 * @function getNumber
		 * @description 쿼리 파라미터를 숫자로 변환하여 반환합니다.
		 * @param {string} key - 파라미터 키
		 * @param {number} [defaultValue] - 파라미터가 없거나 유효하지 않을 때의 기본값
		 * @returns {number | undefined} 변환된 숫자 값 또는 기본값
		 */
		getNumber(key: string, defaultValue?: number): number | undefined {
			const v = raw.get(key);
			if (v == null) return defaultValue;
			const n = Number(v);
			return Number.isFinite(n) ? n : defaultValue;
		},

		/**
		 * @function getBoolean
		 * @description 쿼리 파라미터를 불린 값으로 변환합니다.
		 * 'true', '1', 'yes', 'on' (대소문자 무시)은 true로, 나머지는 false로 변환됩니다.
		 * @param {string} key - 파라미터 키
		 * @param {boolean} [defaultValue=false] - 파라미터가 없을 때의 기본값
		 * @returns {boolean} 변환된 불린 값
		 */
		getBoolean(key: string, defaultValue = false): boolean {
			const v = raw.get(key);
			if (v == null) return defaultValue;
			return ["true", "1", "yes", "on"].includes(v.toLowerCase());
		},

		/**
		 * @function toString
		 * @description 전체 쿼리 스트링을 반환합니다.
		 * @returns {string} 쿼리 스트링 (예: "page=1&sort=asc")
		 */
		toString() {
			return raw.toString();
		},

		/**
		 * @function entries
		 * @description 모든 쿼리 파라미터의 [key, value] 항목을 반환합니다.
		 * @returns {IterableIterator<[string, string]>} [키, 값] 쌍의 이터레이터
		 */
		entries() {
			return raw.entries();
		},
	};
};
