import { useMutation } from "@tanstack/react-query";
import { signinApi } from "src/entities/sign-in/api/sign-in.api";
import type { SigninSchema } from "src/entities/sign-in/schema/sign-in.schema";
import { AuthMutationKeys } from "src/features/sign-in/mutation/keys";

/**
 * @description 로그인 요청을 수행하는 React Query Mutation입니다.
 * @returns {UseMutationResult} 로그인 뮤테이션 결과 (isLoading, error, data, mutate 등)
 */
export const useSigninMutation = () => {
	return useMutation({
		mutationKey: AuthMutationKeys.signin,
		mutationFn: async (body: SigninSchema) => {
			return await signinApi(body);
		},
	});
};
