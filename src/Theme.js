import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DARK_THEME } from "./constants";
const darkMode = localStorage.getItem(DARK_THEME);

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: null,
});

const ColorModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(darkMode === "light" ? "light" : "dark");

  const toggleColorMode = () => {
    localStorage.setItem(DARK_THEME, mode === "light" ? "dark" : "light");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // recreate theme everytime mode changes
  const appTheme = useMemo(
    () =>
      createTheme(
        mode === "light"
          ? {
              palette: {
                mode: "light",
                primary: {
                  main: "#084975",
                },
                secondary: {
                  main: "#6aa342",
                },
                background: {
                  paper: "#fafbfb",
                  default: "#fafbfb",
                },
              },
              components: {
                MuiAppBar: {
                  styleOverrides: {
                    root: ({ theme }) => ({
                      color: theme.palette.primary.main,
                    }),
                  },
                },
                MuiDrawer: {
                  styleOverrides: {
                    paper: {
                      backgroundColor: "white",
                    },
                  },
                },
                MuiCard: {
                  styleOverrides: {
                    root: {
                      height: "100%",
                    },
                  },
                },
              },
              breakpoints: {
                values: {
                  xs: 0,
                  cm: 400,
                  sm: 600,
                  md: 900,
                  lg: 1200,
                  xl: 1536,
                },
              },
            }
          : {
              palette: {
                mode: "dark",
                primary: {
                  main: "#003892",
                },
                secondary: {
                  main: "#6aa342",
                },
              },
              breakpoints: {
                values: {
                  xs: 0,
                  cm: 400,
                  sm: 600,
                  md: 900,
                  lg: 1200,
                  xl: 1536,
                },
              },
              components: {
                MuiAppBar: {
                  styleOverrides: {
                    root: ({ theme }) => ({
                      color: theme.palette.primary.main,
                    }),
                  },
                },
                MuiDrawer: {
                  styleOverrides: {
                    paper: {
                      backgroundColor: "#0b0b0b",
                    },
                  },
                },
                MuiCard: {
                  styleOverrides: {
                    root: {
                      height: "100%",
                    },
                  },
                },
              },
            }
      ),
    [mode]
  );

  return (
    <ColorModeContext.Provider
      value={{
        toggleColorMode,
        mode,
      }}
    >
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useThemeSwitch = () => useContext(ColorModeContext);

export default ColorModeContextProvider;
