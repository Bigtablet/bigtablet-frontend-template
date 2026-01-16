"use client";

import useSignin from "src/features/signin/model/signin.hook";
import Image from "next/image";
import "./style.scss";
import {Button, TextField} from "@bigtablet/design-system";

const Signin = () => {
    const {
        signinData,
        errors,
        handleSigninData,
        handleKeyDown,
        submitSigninData,
        isLoading
    } = useSignin();

    return (
        <main className="auth-main">
            <div className="auth-container">
                <Image
                    width={320}
                    height={80}
                    src="/images/logo/bigtablet.png"
                    alt="Bigtablet Logo"
                    priority
                />

                <div className="auth-textfield">
                    <TextField
                        label="Email"
                        name="email"
                        size="sm"
                        fullWidth
                        value={signinData.email}
                        placeholder="Input your Email"
                        onChangeAction={handleSigninData}
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
                        onChangeAction={handleSigninData}
                        onKeyDown={handleKeyDown}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </div>

                <Button
                    style={{width: "100%"}}
                    onClick={submitSigninData}
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Signin"}
                </Button>
            </div>
        </main>
    );
};

export default Signin;