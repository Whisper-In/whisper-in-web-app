"use client"

import Image from "next/image"
import GoogleSignInButton from "./_components/google-signin-button.component"
import AppleSignInButton from "./_components/apple-signIn-button.component copy"
import * as authService from "@/app/_client-services/auth/auth.service"


export default function SignIn() {    
    const googleSignIn = async () => {
        authService.googleLogin();
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