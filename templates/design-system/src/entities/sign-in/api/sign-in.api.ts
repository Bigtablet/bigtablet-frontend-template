import BigtabletAxios from "src/shared/libs/api/axios";
import {
	type AuthResponseSchema,
	type RefreshRequestSchema,
	refreshRequestSchema,
	refreshResponseSchema,
	type SigninSchema,
} from "src/entities/sign-in/schema/sign-in.schema";

/**
 * @description 로그인 요청을 보내고 인증 응답을 받습니다.
 * @param {SigninSchema} signin - 로그인 정보 (이메일, 비밀번호)
 * @returns {Promise<AuthResponseSchema>} 액세스 토큰과 리프레시 토큰을 포함한 인증 응답
 * @throws {AxiosError} 서버 요청 실패 시 에러를 발생시킵니다.
 */
export const signinApi = async (signin: SigninSchema): Promise<AuthResponseSchema> => {
	const { data } = await BigtabletAxios.post<AuthResponseSchema>("/auth/sign-in", signin);
	return data;
};

/**
 * @description 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청합니다.
 * @param {RefreshRequestSchema} refresh - 리프레시 토큰 정보
 * @returns {Promise<string>} 새로운 액세스 토큰
 * @throws {Error} 리프레시 응답에 액세스 토큰이 없을 경우 에러를 발생시킵니다.
 * @throws {AxiosError} 서버 요청 실패 시 에러를 발생시킵니다.
 */
export const refreshApi = async (refresh: RefreshRequestSchema): Promise<string> => {
	refreshRequestSchema.parse(refresh);

	const response = await BigtabletAxios.post("/auth/refresh", refresh, { withCredentials: true });
	const parsed = refreshResponseSchema.parse(response.data);

	const accessToken = parsed.data?.accessToken;
	if (!accessToken) throw new Error("No accessToken in refresh response");

	return accessToken;
};
