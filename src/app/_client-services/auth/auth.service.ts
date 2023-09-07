import { convertClientCookieToObject } from "@/utils/cookies.util";
import { error } from "console";
import { resolve } from "path";

export async function googleLogin() {
    return new Promise<{ token: string, user: string }>((resolve, reject) => {
        try {
            const newWindow = window.open("/api/auth/google/login", "_blank", "toolbar=0,menu=0,location=0");

            if (newWindow) {
                const checkCookie = setInterval(() => {
                    if (newWindow.document.cookie.includes("token")) {
                        const cookies = convertClientCookieToObject(newWindow.document.cookie);

                        clearInterval(checkCookie);

                        newWindow.close();

                        return resolve(<any>cookies);
                    }
                }, 500);

                newWindow.onbeforeunload = (() => {
                    clearInterval(checkCookie);
                });
            } else {
                reject("Failed to open window.");
            }
        } catch (error) {
            reject(error)
        }
    });
}