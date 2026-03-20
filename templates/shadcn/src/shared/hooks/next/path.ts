"use client";

import { usePathname } from "next/navigation";

/**
 * @description 현재 페이지의 경로(pathname)를 반환하는 훅입니다.
 * - Next.js usePathname을 래핑하여 일관된 인터페이스 제공
 *
 * @returns {string} 현재 페이지의 경로
 *
 * @example
 * const pathname = BigtabletPathname();
 * if (pathname === '/dashboard') {
 *   // render dashboard specific content
 * }
 */
export const BigtabletPathname = () => {
	return usePathname();
};
