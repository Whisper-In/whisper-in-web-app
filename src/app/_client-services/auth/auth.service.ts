export async function googleLogin() {
    try {
        const newWindow = window.open("/api/auth/google/login", "_blank", "toolbar=0,menu=0,location=0");

        if (newWindow) {
            const checkCookie = setInterval(() => {
                if (newWindow.document.cookie.includes("token")) {
                    newWindow.close();
                    window.location.reload();
                }
            }, 500);

            newWindow.onbeforeunload = (() => {
                clearInterval(checkCookie);
            });
        }
    } catch (error) {

    }
}