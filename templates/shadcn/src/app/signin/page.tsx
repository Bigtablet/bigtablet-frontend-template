"use client";

import useSignin from "src/features/sign-in/model/sign-in.hook";

/**
 * @description
 * 로그인 페이지입니다. (shadcn/ui + Tailwind CSS 버전)
 *
 * shadcn 컴포넌트를 추가하려면:
 * npx shadcn add button input
 * 그 후 Button, Input 컴포넌트로 교체할 수 있습니다.
 */
const SigninPage = () => {
	const {
		signinFormData,
		fieldErrors,
		handleSigninFieldChange,
		handleKeyboardEnterSubmit,
		submitSigninForm,
		isSubmitting,
	} = useSignin();

	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="flex w-full max-w-sm flex-col gap-6 rounded-xl bg-white p-8 shadow-sm">
				<h1 className="text-2xl font-bold text-gray-900">로그인</h1>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-gray-700" htmlFor="email">
							이메일
						</label>
						<input
							id="email"
							type="email"
							name="email"
							value={signinFormData.email}
							placeholder="이메일을 입력하세요"
							onChange={(event) => handleSigninFieldChange("email", event.target.value)}
							onKeyDown={handleKeyboardEnterSubmit}
							className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
						/>
						{fieldErrors.email && (
							<span className="text-xs text-red-500">{fieldErrors.email}</span>
						)}
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-gray-700" htmlFor="password">
							비밀번호
						</label>
						<input
							id="password"
							type="password"
							name="password"
							value={signinFormData.password}
							placeholder="비밀번호를 입력하세요"
							onChange={(event) => handleSigninFieldChange("password", event.target.value)}
							onKeyDown={handleKeyboardEnterSubmit}
							className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
						/>
						{fieldErrors.password && (
							<span className="text-xs text-red-500">{fieldErrors.password}</span>
						)}
					</div>
				</div>

				<button
					type="button"
					onClick={submitSigninForm}
					disabled={isSubmitting}
					className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? "로그인 중..." : "로그인"}
				</button>
			</div>
		</main>
	);
};

export default SigninPage;
