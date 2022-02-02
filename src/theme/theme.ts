import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  primary: "#18191A",
  secondary: "#242526",
  search: "#090A11",
  highlight: "#60a5fa",
};

const theme = extendTheme({
  config,
  colors,
});

export default theme;
