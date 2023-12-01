"use client"

import { Provider } from "react-redux"
import { store } from "./store"
import { persistStore } from "redux-persist";
import AppThemeProvider from "@/app/theme-provider";
import { ToastProvider } from "@/app/_components/toast.component";
import { AlertPromptProvider } from "@/app/_components/alert-prompt.component";
import { SpinnerProvider } from "@/app/_components/spinner.component";
import { ShareModalProvider } from "@/app/_components/share-modal.component";

persistStore(store);

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ToastProvider>
                <AlertPromptProvider>
                    <SpinnerProvider>
                        <ShareModalProvider>
                            <AppThemeProvider options={{ key: "mui" }}>
                                {children}
                            </AppThemeProvider>
                        </ShareModalProvider>
                    </SpinnerProvider>
                </AlertPromptProvider>
            </ToastProvider>
        </Provider>
    )
}