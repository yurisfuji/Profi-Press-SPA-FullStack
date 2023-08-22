import { createTheme } from '@mui/material';

// Светлая тема
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    pro: {
      background: 'beige',
      bordercolor : 'var(--mui-palette-warning-main)',
      listBackground : 'var(--mui-palette-primary-main)',
    },
    comment: {
      background: 'rgb(254, 205, 164)',
      color: 'var(--mui-palette-common-background)'
    }
  },
});

  // Темная тема
  export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#292929',
        paper: '#292929'
      },
      pro: {
        background: '#0a0f5c',
        bordercolor : '#298fe2',
        listBackground : 'var(--mui-palette-warning-main)',
      },
      comment: {
        background: '#282873',
        color: '#fff'
      }
    },
  });

  export const toCSSVariables = (theme) => {
    const cssVariables = {};
  
    Object.keys(theme.palette).forEach((key) => {
      const value = theme.palette[key];
      if (typeof value === 'object') {
        // Если значение является объектом палитры, рекурсивно преобразуем его
        Object.keys(value).forEach((subKey) => {
          const subValue = value[subKey];
          cssVariables[`--mui-palette-${key}-${subKey}`] = subValue;
        });
      } else {
        cssVariables[`--mui-palette-${key}`] = value;
      }
    });
  
    return cssVariables;
  }
