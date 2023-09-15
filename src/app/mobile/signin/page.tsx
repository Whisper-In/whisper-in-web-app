"use client"

import Image from "next/image"
import GoogleSignInButton from "./_components/google-signin-button.component"
import AppleSignInButton from "./_components/apple-signIn-button.component copy"
import * as authClientService from "@/app/_client-services/auth/auth.service"
import { Alert } from "@mui/material"
import { useAppDispath, useAppSelector } from "@/store/hooks"
import { UserProfile, setUser } from "@/store/slices/user.slice"
import { useEffect } from "react"

export default function SignIn() {
    const me = useAppSelector((state) => state.user.me);
    const dispatch = useAppDispath();

    const googleSignIn = async () => {
        authClientService.googleLogin().then(({ user }) => {
            if (user) {
                dispatch(setUser({
                    me: user
                }));

                location.reload();
            } else {
                throw "No user found.";
            }
        }).catch((error) => {
            authClientService.logout(dispatch);
            Alert(error)
        });
    }

    return (
        <main className="flex flex-col items-center w-screen h-screen py-48">
            <div className="grow">
                <Image src="/icons/icon-full.png" width={250} height={0} alt="" />
            </div>

            <div className="flex flex-col gap-5">
                <GoogleSignInButton onClick={() => googleSignIn()} />

                <AppleSignInButton />
            </div>
        </main>
    )
}