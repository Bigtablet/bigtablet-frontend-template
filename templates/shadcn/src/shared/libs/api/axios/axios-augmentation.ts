import "axios";

/**
 * @description
 * Axios `AxiosRequestConfig` 모듈 확장입니다.
 * 인터셉터가 사용하는 커스텀 설정 속성을 타입으로 선언합니다.
 *
 * - `skipUnauthorizedRedirect`: true면 401 에러 시 `/signin` 리다이렉트를 건너뜁니다.
 *   (로그인 요청 등 401을 호출부에서 직접 처리해야 할 때 사용)
 */
declare module "axios" {
	export interface AxiosRequestConfig {
		skipUnauthorizedRedirect?: boolean;
	}
}
