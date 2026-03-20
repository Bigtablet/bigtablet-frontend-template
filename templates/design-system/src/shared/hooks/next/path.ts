"use client";

import { usePathname } from "next/navigation";

/**
 * @function BigtabletPathname
 * @description 현재 페이지의 경로명(pathname)을 반환합니다.
 * @returns {string} 현재 URL 경로명 (예: "/product/123")
 */
export const BigtabletPathname = () => {
	return usePathname();
};
