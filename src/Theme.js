import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DARK_THEME } from "./constants";
import { BREAK_POINTS } from "./config/ThemeConfig";
const darkMode = localStorage.getItem(DARK_THEME);

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: null,
});

const ColorModeContextProvider = ({ children }) => {
  // const [mode, setMode] = useState(darkMode === "light" ? "light" : "dark");
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    // localStorage.setItem(DARK_THEME, mode === "light" ? "dark" : "light");
    // setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
              breakpoints: BREAK_POINTS,
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
              breakpoints: BREAK_POINTS,
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
        mode: "light",
      }}
    >
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useThemeSwitch = () => useContext(ColorModeContext);

export default ColorModeContextProvider;
