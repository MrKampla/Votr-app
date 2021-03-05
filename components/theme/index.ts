import { createGlobalStyle, DefaultTheme } from "styled-components";

import colors from "./colors";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.primary};
    transition: 0.25s;
    font-family: Lato, Helvetica, sans-serif;
    margin: 0px;
    padding: 0px;
  }
`;

const breakpoints = {
  small: 360,
  mobile: 425,
  tablet: 768,
  laptop: 1024,
  large: 1440
}

export const lightTheme: DefaultTheme = {
  ...colors.light,
  ...colors.additional,
  breakpoints
}

export const darkTheme: DefaultTheme = {
  ...colors.dark,
  ...colors.additional,
  breakpoints
}
