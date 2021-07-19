type Theme = {
  mode: 'light' | 'dark';
  primary: string;
  font: string;
  disabled: string;
  border: string;
};

const colors: {
  light: Theme;
  dark: Theme;
  additional: {
    cta: string;
    danger: string;
    success: string;
    link: string;
  };
} = {
  light: {
    mode: 'light',
    primary: '#F9FAFB',
    font: '#25272D',
    disabled: '#F3F3F3',
    border: 'rgba(37, 39, 45, 0.16)',
  },
  dark: {
    mode: 'dark',
    primary: '#111111',
    font: '#F9FAFB',
    disabled: '#222222',
    border: 'rgba(249, 250, 251, 0.16)',
  },
  additional: {
    cta: '#FFB334',
    danger: '#CA001B',
    success: '#237A57',
    link: '#176EDE',
  },
};
export default colors;
