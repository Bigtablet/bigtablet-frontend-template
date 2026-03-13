"use client";

import { useModalStore } from "src/shared/libs/modal/modal.store";

/**
 * @description
 * 전역 모달 스택에 쌓인 모달 컴포넌트들을 DOM에 렌더링하는 컴포넌트입니다.
 *
 * - Providers 내부에 위치하여 modalStack 변경을 구독합니다.
 * - 각 모달은 고유한 identifier를 key로 사용하여 불필요한 리렌더링을 방지합니다.
 * - 여러 모달이 동시에 열릴 수 있는 중첩 시나리오를 지원합니다.
 *
 * @example
 * // widgets/layouts/provider/index.tsx 에서 사용
 * <AlertProvider>
 *   <ModalRenderer />
 *   {children}
 * </AlertProvider>
 */
const ModalRenderer = () => {
	const { modalStack } = useModalStore();

	return (
		<>
			{modalStack.map((modalItem) => {
				const ModalComponent = modalItem.component;
				return (
					<ModalComponent
						key={modalItem.identifier}
						{...(modalItem.props ?? {})}
					/>
				);
			})}
		</>
	);
};

export default ModalRenderer;
