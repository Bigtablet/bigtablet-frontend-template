"use client";

import Image from "next/image";
import useSignin from "src/features/sign-in/model/use-sign-in";
import styles from "./style.module.scss";
import { Button, TextField } from "@bigtablet/design-system";

/**
 * @description
 * 로그인 페이지 컴포넌트입니다. 이메일과 비밀번호를 입력받아 로그인 요청을 처리합니다.
 */
const Signin = () => {
	const { signinData, errors, handleSigninData, handleKeyDown, submitSigninData, isLoading } =
		useSignin();

	return (
		<main className={styles.auth_main}>
			<div className={styles.auth_container}>
				<Image
					width={320}
					height={80}
					src="/images/logo/bigtablet.png"
					alt="Bigtablet Logo"
					priority
				/>

				<div className={styles.auth_textfield}>
					<TextField
						label="Email"
						name="email"
						size="sm"
						fullWidth
						value={signinData.email}
						placeholder="Input your Email"
						onChangeAction={(value) => handleSigninData("email", value)}
						onKeyDown={handleKeyDown}
						error={!!errors.email}
						helperText={errors.email}
					/>
					<TextField
						label="Password"
						type="password"
						name="password"
						size="sm"
						fullWidth
						value={signinData.password}
						placeholder="Input your Password"
						onChangeAction={(value) => handleSigninData("password", value)}
						onKeyDown={handleKeyDown}
						error={!!errors.password}
						helperText={errors.password}
					/>
				</div>

				<Button style={{ width: "100%" }} onClick={submitSigninData} disabled={isLoading}>
					{isLoading ? "Signing in..." : "Signin"}
				</Button>
			</div>
		</main>
	);
};

export default Signin;
