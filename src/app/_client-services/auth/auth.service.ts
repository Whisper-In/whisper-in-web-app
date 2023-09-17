import { UserProfile, logout as userLogout } from "@/store/slices/user.slice";
import { AppDispatch } from "@/store/store";
import axios from "axios";

const route = "/api/auth"

export async function login(loginUrl:string) {
    return new Promise<{ user: UserProfile }>((resolve, reject) => {
        try {
            const newWindow = window.open(`${route}${loginUrl}`, "_blank", "toolbar=0,menu=0,location=0");

            if (newWindow) {
                const closedCheck = setInterval(() => {
                    if (newWindow.closed) {
                        reject("Login window was closed.");
                    }
                }, 1000);

                window.addEventListener("message", (event) => {
                    if (event.origin == window.location.origin) {
                        console.log(event.data)
                        if (event.data?.signin_status == "SUCCESS") {
                            newWindow.close();
                            const user = event.data.user;

                            clearInterval(closedCheck)
                            resolve({ user });
                        } else {
                            clearInterval(closedCheck)
                            reject("Failed to login.");
                        }
                    }
                }, false)
            } else {
                reject("Failed to open window.");
            }
        } catch (error) {
            reject(error)
        }
    });
}

export async function logout(dispatch: AppDispatch) {
    dispatch(userLogout());

    await axios.get(`${route}/logout`);
}