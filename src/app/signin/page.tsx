"use client"

import Image from "next/image"
import GoogleSignInButton from "./_components/google-signin-button.component"
import AppleSignInButton from "./_components/apple-signIn-button.component copy"
import * as authClientService from "@/store/services/auth/auth.service"
import { Alert, Link } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setUser } from "@/store/slices/user.slice"
import { useEffect } from "react"
import { useAlertPrompt } from "@/app/_components/alert-prompt.component"
import { useRouter } from "next/navigation"
import { convertClientCookieToObject } from "@/utils/cookies.util"
import { useSpinner } from "@/app/_components/spinner.component"
import { fetchUserProfile } from "@/store/thunks/user.thunks"

export default function SignIn() {
    const me = useAppSelector((state) => state.user.me);
    const dispatch = useAppDispatch();
    const { promptAlert } = useAlertPrompt();
    const router = useRouter();
    const { showSpinner } = useSpinner();

    const login = async (loginUrl: string) => {
        showSpinner(true);
        authClientService.login(loginUrl).finally(() => {
            const cookie = convertClientCookieToObject(document.cookie);

            if (cookie["token"] != null) {
                router.replace("/");

                promptAlert({
                    title: "DISCLAIMER",
                    message: (
                        <div>
                            <p>This app is for demonstration purposes only. The content in this app was obtained from <Link href="https://www.kaggle.com/datasets/thecoderenroute/instagram-posts-dataset" target="_blank">Kaggle.com</Link>.
                            </p>
                            <p>All rights are reserved to the respective owners of the content.</p>
                        </div>
                    )
                })
            } else {
                authClientService.logout(dispatch);

                promptAlert({
                    title: "Login Failed",
                    message: "Opps, login failed. Please try again."
                });
            }

            showSpinner(false);
        });
    }

    return (
        <main className="flex flex-col items-center w-full h-full gap-5 py-48">
            <div className="grow">
                <Image src="/icons/icon-full.png" width={250} height={0} alt="" />
            </div>

            <div className="flex flex-col gap-5">
                <GoogleSignInButton onClick={() => login("/google/login")} />

                {/* <AppleSignInButton onClick={() => login("/apple/login")} /> */}
            </div>
        </main>
    )
}