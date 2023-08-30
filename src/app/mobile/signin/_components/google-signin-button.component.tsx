import Image from "next/image";
import SignInButton from "./signin-button-base.component";

export default function GoogleSignInButton({ className, onClick }
    : { className?: string, onClick?: () => void }) {
    return (
        <SignInButton className={className} onClick={() => onClick && onClick()}>
            <Image src="/icons/google.png" width={25} height={0} alt="" />

            <label className="font-bold">
                Sign in with Google
            </label>
        </SignInButton>
    );
}