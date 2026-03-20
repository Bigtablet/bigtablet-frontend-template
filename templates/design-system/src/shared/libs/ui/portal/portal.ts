"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * @description
 * Portal 컴포넌트의 Props 타입입니다.
 *
 * @property children - 포탈로 렌더링할 React 노드
 */
interface PortalProps {
	children: React.ReactNode;
}

/**
 * @description
 * React Portal을 이용하여 DOM 트리의 특정 위치에 컴포넌트를 렌더링합니다.
 * 하이드레이션 에러를 방지하기 위해 마운트 후에만 렌더링됩니다.
 *
 * @param props - PortalProps 객체
 * @returns 포탈로 렌더링된 컴포넌트, 아직 마운트 전이면 null
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
