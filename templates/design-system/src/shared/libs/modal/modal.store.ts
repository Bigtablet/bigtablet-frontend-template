import { create } from "zustand";

import type { ModalItem, ModalStore } from "src/shared/libs/modal/modal.types";

/**
 * @description
 * 전역 모달 상태를 스택 구조로 관리하는 Zustand 스토어입니다.
 *
 * 스택 구조를 사용하는 이유:
 * - 모달 위에 모달을 띄우는 중첩 시나리오를 자연스럽게 지원합니다.
 * - 마지막에 열린 모달부터 순서대로 닫히는 LIFO 방식으로 동작합니다.
 *
 * @example
 * const { openModal, closeModal } = useModalStore();
 * openModal(ConfirmModalComponent, { title: "삭제하시겠습니까?" });
 */
export const useModalStore = create<ModalStore>((set) => ({
	modalStack: [],

	openModal: (component, props) =>
		set((state) => {
			const newModalItem: ModalItem = {
				identifier: crypto.randomUUID(),
				component,
				props,
			};
			return { modalStack: [...state.modalStack, newModalItem] };
		}),

	replaceModal: (component, props) =>
		set((state) => {
			const stackWithoutTopItem = state.modalStack.slice(0, -1);
			const replacementModalItem: ModalItem = {
				identifier: crypto.randomUUID(),
				component,
				props,
			};
			return { modalStack: [...stackWithoutTopItem, replacementModalItem] };
		}),

	closeModal: () =>
		set((state) => ({
			modalStack: state.modalStack.slice(0, -1),
		})),

	closeAllModals: () => set({ modalStack: [] }),
}));
