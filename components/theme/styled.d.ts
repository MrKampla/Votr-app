import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    cta: string;
    danger: string;
    success: string;
    link: string;
    primary: string;
    font: string;
    disabled: string;
    border: string;
    breakpoints: {
      small: number;
      mobile: number;
      tablet: number;
      laptop: number;
      large: number;
    };
  }
}
