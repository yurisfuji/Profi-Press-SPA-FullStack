const getDesignTokens = (mode) => ({

    palette: {
        mode,
        ...(mode === 'light'
      ? {

        }
      : {
          // palette values for dark mode
          background: {
            default: '#262626',
          },
        }),
    },
});

export default getDesignTokens