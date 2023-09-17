import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module '@mui/material/styles' {
    interface Palette {
        container: Palette['primary'];
    }

    interface PaletteOptions {
        container?: PaletteOptions['primary'];
    }
}


export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#fff",
            paper: "#fff"
        },
        container: {
            main: grey[300],
            contrastText: grey[600]
        }
    },
    components: {
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
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#121212",
                    color: "#fff"
                }
            }
        }
    }
});