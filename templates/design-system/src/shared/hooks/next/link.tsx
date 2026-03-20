"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * @typedef {Object} Props
 * @property {boolean} [underline=false] - 링크에 밑줄을 표시할지 여부
 * @description Next.js Link 컴포넌트의 props를 확장한 타입
 */
type Props = ComponentProps<typeof Link> & {
	underline?: boolean;
};

/**
 * @function BigtabletLink
 * @description Next.js Link 컴포넌트를 래핑하여 기본 스타일 클래스를 적용하는 컴포넌트
 * @param {Props} props - 컴포넌트 props
 * @param {boolean} [props.underline=false] - 밑줄 표시 여부
 * @param {string} [props.className] - 추가 CSS 클래스명
 * @returns {JSX.Element} 스타일이 적용된 Link 컴포넌트
 */
export const BigtabletLink = ({ underline = false, className, ...props }: Props) => {
	const merged = ["bt_link", underline && "bt_link--underline", className]
		.filter(Boolean)
		.join(" ");

	return <Link {...props} className={merged} />;
};
