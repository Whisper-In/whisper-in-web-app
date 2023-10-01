"use client"

import Image from "next/image"
import GoogleSignInButton from "./_components/google-signin-button.component"
import AppleSignInButton from "./_components/apple-signIn-button.component copy"
import * as authClientService from "@/store/services/auth/auth.service"
import { Alert } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setUser } from "@/store/slices/user.slice"
import { useEffect } from "react"
import { useAlertPrompt } from "@/components/alert-prompt.component"
import { useRouter } from "next/navigation"
import { convertClientCookieToObject } from "@/utils/cookies.util"
import { useSpinner } from "@/components/spinner.component"
import { fetchUserProfile } from "@/store/thunks/user.thunks"

export default function SignIn() {
    const me = useAppSelector((state) => state.user.me);
    const dispatch = useAppDispatch();
    const { promptAlert } = useAlertPrompt();
    const router = useRouter();
    const { showSpinner } = useSpinner();

    const login = async (loginUrl: string) => {
        showSpinner(true);
        authClientService.login(loginUrl).then(({ user }) => {
            dispatch(fetchUserProfile());
        }).catch((error) => {
            console.log("Sign In Error:", error)
            authClientService.logout(dispatch);

            promptAlert({
                title: "Login Failed",
                message: "Opps, login failed. Please try again."
            });
        }).finally(() => {
            showSpinner(false);
        });
    }

    useEffect(() => {
        if (me) {
            const cookie = convertClientCookieToObject(document.cookie);

            if (cookie["token"] != null) {
                router.refresh();
            }
        }
    }, [me])

    return (
        <main className="flex flex-col items-center w-screen gap-5 h-screen py-48">
            <div className="grow">
                <Image src="/icons/icon-full.png" width={250} height={0} alt="" />
            </div>

            <div className="flex flex-col gap-5">
                <GoogleSignInButton onClick={() => login("/google/login")} />

                <AppleSignInButton onClick={() => login("/apple/login")} />
            </div>
        </main>
    )
}