/**
 * @description IntersectionObserver 옵션에 교차 콜백을 추가한 타입입니다.
 * - IntersectionObserverInit을 확장
 * - onIntersect: 요소가 뷰포트에 진입할 때 호출되는 콜백
 */
export type ScrollOption = IntersectionObserverInit & {
	onIntersect: () => void;
};
