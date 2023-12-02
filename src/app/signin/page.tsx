"use client"

import Image from "next/image"
import GoogleSignInButton from "./_components/google-signin-button.component"
import * as authClientService from "@/store/services/auth/auth.service"
import { Link, Stack } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useAlertPrompt } from "@/app/_components/alert-prompt.component"
import { useRouter } from "next/navigation"
import { convertClientCookieToObject } from "@/utils/cookies.util"
import { useSpinner } from "@/app/_components/spinner.component"

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
                        <Stack spacing={1}>
                            <p>This app is for demonstration purposes only. The content in this app was obtained from <Link href="https://www.kaggle.com/datasets/thecoderenroute/instagram-posts-dataset" target="_blank">Kaggle.com</Link>.</p>
                            <p>All rights reserved to the respective owners of the content.</p>
                        </Stack>
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
        <Stack flexGrow={1}
            gap={10}
            justifyContent="center"
            alignItems="center">
            <Image src="/icons/icon-full.png" width={250} height={0} alt="" />

            <Stack gap={2}>
                <GoogleSignInButton onClick={() => login("/google/login")} />

                {/* <AppleSignInButton onClick={() => login("/apple/login")} /> */}
            </Stack>
        </Stack>
    )
}