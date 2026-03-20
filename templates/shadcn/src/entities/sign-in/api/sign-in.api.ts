import BigtabletAxios from "src/shared/libs/api/axios";
import {
	type AuthResponseSchema,
	type RefreshRequestSchema,
	refreshRequestSchema,
	refreshResponseSchema,
	type SigninSchema,
} from "src/entities/sign-in/schema/sign-in.schema";

/**
 * @description
 * 로그인 API를 호출합니다.
 *
 * - 이메일/비밀번호 기반 인증 요청
 * - 성공 시 `accessToken`, `refreshToken`을 포함한 응답 반환
 *
 * @param signin - 로그인 요청 데이터 (`SigninSchema`)
 * @returns 인증 응답 데이터 (`AuthResponseSchema`)
 */
export const signinApi = async (signin: SigninSchema): Promise<AuthResponseSchema> => {
	const { data } = await BigtabletAxios.post<AuthResponseSchema>("/auth/sign-in", signin);
	return data;
};

/**
 * @description
 * 액세스 토큰 갱신 API를 호출합니다.
 *
 * - `refreshToken`으로 새 `accessToken`을 발급받음
 * - 요청 데이터를 Zod 스키마로 사전 검증
 * - 응답에 `accessToken`이 없으면 에러를 던짐
 *
 * @param refresh - 리프레시 요청 데이터 (`RefreshRequestSchema`)
 * @returns 새로 발급된 액세스 토큰 문자열
 * @throws {Error} 응답에 `accessToken`이 없는 경우
 */
export const refreshApi = async (refresh: RefreshRequestSchema): Promise<string> => {
	refreshRequestSchema.parse(refresh);

	const response = await BigtabletAxios.post("/auth/refresh", refresh, { withCredentials: true });
	const parsed = refreshResponseSchema.parse(response.data);

	const accessToken = parsed.data?.accessToken;
	if (!accessToken) throw new Error("No accessToken in refresh response");

	return accessToken;
};
