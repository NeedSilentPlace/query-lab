import { createStitches } from "@stitches/react";

const stitches = createStitches({
  theme: {
    fonts: {
      system: "system-ui",
    },
    colors: {
      white: "#FFFFFF",
      purple10: "#FAF6FF",
      purple50: "#F0E5FF",
      purple100: "#E5D1FF",
      purple200: "#C6A0F7",
      purple300: "#9E64E6",
      purple400: "#8137D6",
      purple500: "#6415B7",
      purple600: "#510F9D",
      purple700: "#3E0A7D",
      purple800: "#270757",
      purple900: "#190636",
      purple1000: "#0F051E",
      grey100: "#F1F4F7",
      grey200: "#DEE1E3",
      grey300: "#BABEC2",
      grey400: "#9DA1A6",
      grey500: "#7F8387",
      grey600: "#65686B",
      grey700: "#4A4C4F",
      grey800: "#2D2F30",
      grey900: "#1D1E1F",
      grey1000: "#141414",
      grey1100: "#000000",
    },
    fontSizes: {
      1: "13px",
      2: "15px",
      3: "17px",
    },
  },
  utils: {
    paddingX: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    marginX: (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: string) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
});

export const { styled, getCssText, css } = stitches;
