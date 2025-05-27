import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  shadow: {
    lg: "none",
    md: "none",
    sm: "none",
    xs: "none",
  },
  radius: {
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "10px",
    xl: "14px",
  },
  fontFamily: {
    body: "Mona Sans, sans-serif",
    fallback: "helvetica, arial, sans-serif",
    code: "JetBrains Mono, monospace",
    display: "Mona Sans, sans-serif",
  },
  colorSchemes: {
    dark: {
      palette: {
        mode: "dark",
        common: {
          black: "#1E2022",
          white: "#fff",
        },
        neutral: {
          50: "#EFF1F6",
          100: "#DEE3ED",
          200: "#BDC7DB",
          300: "#9CABC9",
          400: "#7B8FB7",
          500: "#5A73A5",
          600: "#485C84",
          700: "#364563",
          800: "#242E42",
          900: "#242E42",
        },
        primary: {
          100: "#D7DFEA",
          200: "#ABBCD3",
          300: "#839CBE",
          400: "#5879A7",
          500: "#435C7F",
          600: "#2D3E56",
          700: "#212E40",
          800: "#171F2C",
          900: "#171F2C",
        },

        success: {
          50: "#F3F9F1",
          100: "#E7F3E3",
          200: "#CEE6C6",
          300: "#B6DAAA",
          400: "#9DCE8D",
          500: "#85C171",
          600: "#6CB554",
          700: "#5A9C44",
          800: "#4A8038",
          900: "#4A8038",
        },
        warning: {
          50: "#FFF9F0",
          100: "#FFF0DB",
          200: "#FFE1B8",
          300: "#FFD294",
          400: "#FFC370",
          500: "#FFB54D",
          600: "#FFA82E",
          700: "#FF990A",
          800: "#E68600",
          900: "#E68600",
        },
        danger: {
          50: "#FBEEEE",
          100: "#F9E2E2",
          200: "#F1C0C0",
          300: "#EBA3A3",
          400: "#E48181",
          500: "#DD6464",
          600: "#D64242",
          700: "#C92C2C",
          800: "#A82424",
          900: "#A82424",
        },
      },
    },
  },
  components: {
    JoyChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
    JoyTabList: {
      styleOverrides: {
        root: {
          gap: 4,
        },
      },
    },
    JoyTab: {
      defaultProps: {
        disableIndicator: true,
      },
      styleOverrides: {
        root: {
          marginBottom: 4,
          borderRadius: 4,
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
    },
    JoyLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
  },
});

export default theme;
