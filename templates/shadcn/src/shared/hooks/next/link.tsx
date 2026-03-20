"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * @description Next.js Link를 확장한 Props 타입입니다.
 * - underline: 밑줄 표시 여부 (기본값: false)
 */
type Props = ComponentProps<typeof Link> & {
	underline?: boolean;
};

/**
 * @description Next.js Link를 래핑한 커스텀 링크 컴포넌트입니다.
 * - 기본 클래스 bt_link를 자동 적용
 * - underline 옵션으로 밑줄 스타일 토글 가능
 *
 * @param {Props} props - Link 컴포넌트의 Props와 underline 옵션
 * @param {boolean} [props.underline=false] - 밑줄 표시 여부
 * @returns {JSX.Element} 스타일이 적용된 Link 컴포넌트
 *
 * @example
 * <BigtabletLink href="/page" underline>
 *   Click me
 * </BigtabletLink>
 */
export const BigtabletLink = ({ underline = false, className, ...props }: Props) => {
	const merged = ["bt_link", underline && "bt_link--underline", className]
		.filter(Boolean)
		.join(" ");

	return <Link {...props} className={merged} />;
};
