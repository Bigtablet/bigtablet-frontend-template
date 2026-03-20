"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * @description Portal 컴포넌트 Props 타입입니다.
 */
interface PortalProps {
	children: React.ReactNode;
}

/**
 * @description React Portal을 사용하여 DOM 트리 외부에 자식을 렌더링하는 컴포넌트입니다.
 * - id="modal" 엘리먼트에 자식을 마운트
 * - SSR 안전: 클라이언트 마운트 후에만 렌더링
 * @param children - 렌더링할 자식 요소
 */
const Portal = ({ children }: PortalProps) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const modalElement = document.getElementById("modal");
	if (!modalElement) return null;

	return createPortal(children, modalElement);
};

export default Portal;
