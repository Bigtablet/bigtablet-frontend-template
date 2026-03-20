import { useMutation } from "@tanstack/react-query";
import { signinApi } from "src/entities/sign-in/api/sign-in.api";
import type { SigninSchema } from "src/entities/sign-in/schema/sign-in.schema";
import { AuthMutationKeys } from "src/features/sign-in/mutation/keys";

/**
 * @description
 * 로그인 요청 뮤테이션 훅입니다.
 *
 * - `signinApi`를 호출하여 이메일/비밀번호 기반 인증을 수행
 * - `AuthMutationKeys.signin`으로 뮤테이션을 식별
 *
 * @returns `UseMutationResult<AuthResponseSchema, Error, SigninSchema>`
 */
export const useSigninMutation = () => {
	return useMutation({
		mutationKey: AuthMutationKeys.signin,
		mutationFn: signinApi,
	});
};
