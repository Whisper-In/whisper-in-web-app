import { Components, Theme, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module '@mui/material/styles' {
    interface Palette {
        container: Palette['primary'];
    }

    interface PaletteOptions {
        container?: PaletteOptions['primary'];
    }
}

const commonComponents: Components<Omit<Theme, "components">> = {
    MuiContainer: {
        defaultProps: {
            maxWidth: "md",
            disableGutters: true
        },
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.background.default
            })
        }
    },
    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                fontSize: "1rem",
                textTransform: "none"
            })
        }
    },
    MuiDrawer: {
        defaultProps: {
            PaperProps: {
                sx: {
                    left: "50%",
                    translate: "-50% 0",
                    maxWidth: "100vw",
                    width: (theme) => theme.breakpoints.values.md,
                }
            }
        }
    },
    MuiBottomNavigation: {
        styleOverrides: {
            root: ({ theme }) => ({
                width: theme.breakpoints.values.md
            })
        }
    },
    MuiTabs: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.background.default
            })
        }
    }
}


export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#fff",
            paper: "#fff"
        },
        secondary: {
            main: grey[600]
        },
        container: {
            main: grey[300],
            contrastText: grey[600]
        }
    },
    components: {
        ...commonComponents,
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#fff",
                    color: "#121212"
                }
            }
        }
    }
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: lightTheme.palette.primary,
        secondary: {
            main: grey[400]
        },
        background: {
            default: "#121212",
            paper: "#121212"
        },
        container: {
            main: grey[900],
            contrastText: grey[400]
        }
    },
    components: {
        ...commonComponents,
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#000",
                    color: "#fff"
                }
            }
        }
    }
});