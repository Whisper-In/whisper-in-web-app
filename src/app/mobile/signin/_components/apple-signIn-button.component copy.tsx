import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import SignInButton from "./signin-button-base.component";

export default function AppleSignInButton({ className, onClick }
    : { className?: string, onClick?: () => void }) {
    return (
        <SignInButton className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faApple} fontSize={30} />

            <label className="font-bold">
                Sign in with Apple
            </label>
        </SignInButton>
    );
}