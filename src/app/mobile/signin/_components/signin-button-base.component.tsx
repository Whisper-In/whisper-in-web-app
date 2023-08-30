import classNames from "classnames";
import { PropsWithChildren } from "react";

export default function SignInButton({ className, onClick, children }
    : { className?: string, onClick?: () => void } & PropsWithChildren) {
    return (
        <button className={classNames(
            `rounded-full flex items-center justify-center gap-3 
            shadow-[rgb(0,0,0,0.25)_0px_4px_10px] w-[300px] h-[50px]
            text-[#555] bg-white`,
            className
        )} onClick={onClick}>
            {children}
        </button>
    );
}