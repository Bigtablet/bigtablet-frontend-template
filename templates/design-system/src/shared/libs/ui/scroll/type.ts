/**
 * @description
 * Intersection Observer의 옵션과 커스텀 콜백을 합친 타입입니다.
 * 스크롤 감지 시 실행할 콜백 함수를 추가로 제공합니다.
 *
 * @property onIntersect - 요소가 뷰포트와 교차할 때 실행할 콜백 함수
 */
export type ScrollOption = IntersectionObserverInit & {
	onIntersect: () => void;
};
