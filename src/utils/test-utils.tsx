import { SpinnerProvider } from "@/app/_components/spinner.component";
import AppThemeProvider from "@/app/theme-provider";
import { lightTheme } from "@/app/themes";
import { AppStore, RootState, setupStore } from "@/store/store";
import { ThemeProvider } from "@mui/material";
import { RenderOptions, render } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>,
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <ThemeProvider theme={lightTheme}>
                <SpinnerProvider>
                    <Provider store={store}>
                        <SWRConfig value={{
                            dedupingInterval: 0,
                            provider: () => new Map()
                        }}>
                            {children}
                        </SWRConfig>
                    </Provider>
                </SpinnerProvider>
            </ThemeProvider>
        )
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}