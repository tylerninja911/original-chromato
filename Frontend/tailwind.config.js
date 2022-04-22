const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'

  theme: {
    fill: (theme) => ({
      red: theme('colors.red.500'),
      green: theme('colors.green.500'),
      blue: theme('colors.blue.500'),
      white: '#ffffff',
    }),

    screens: {
      // '360px':'360px',
      '0px': '0px',
      '200px': '200px',
      '400px': '400px',
      smallScreen: { min: '0px', max: '600px' },
      myScreen: { min: '451px', max: '500px' },
      forLoginScreen: { min: '0px', max: '767px' },
      xs: '475px',
      '501px': '501px',
      '530px': '530px',
      '600px': '600px',
      '605px': '605px',
      '700px': '700px',
      '720px': '720px',
      '800px': '800px',
      '835px': '835px',
      '850px': '850px',
      '900px': '900px',
      '1000px': '1000px',
      '1035px': '1035px',

      ...defaultTheme.screens,
    },

    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#3490dc',
      secondary: '#ffed4a',
      danger: '#e3342f',

      yellow: '#FED928',
      'white-smoke': '#F5F5F5',
      white: '#ffffff',
      grey: 'rgba(45, 49, 56, 0.15)',
    }),
    // borderColor: (theme) => ({
    //   primary: "#3490dc",
    //   secondary: "#ffed4a",
    //   danger: "#e3342f",
    //   // gray: "rgba(45, 49, 56, 0.15)",
    //   white: "#fff",
    //   red: "#FF0000",
    //   "light-black": "#555555",
    // }),
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      left: '-2px 0px 10px 2px #aaaaaa',
    },
    extend: {
      inset: {
        24.8: '6.1rem',
        25: '6.8rem',
      },

      gridTemplateColumns: {
        4: 'repeat(4,1fr)',
      },

      textColor: {
        heading: '#4f4f4f',
        white: '#FFFAFA',
        red: 'rgb(236, 70, 84)',
        green: '#00CC99',
        yellow: '#FED928',
        gold: '#FFD700',
      },

      zIndex: {
        'z-1': 1,
        'z-4': 4,
      },

      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        times: 'Times New Roman,serif',
        okra: ['Okra', 'Helvetica', 'sans-serif'],
        marker: ['"Permanent Marker"', 'cursive'],
        barlow: ['Barlow, sans-serif'],
        'barlow-semi-condensed': ['"Barlow Semi Condensed", sans-serif'],
      },

      fontSize: {
        30: '30px',
        10: '10px',
        20: '20px',
        24: '24px',
        12: '12px',
        '13px': '13px',
        xs: '.75rem',
        sm: '.875rem',
        tiny: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },

      margin: {
        33: '33px',
        22: '22px',
        11: '11px',
        100: '100px',
        '80px': '80px',
        '20px': '20px',
      },

      outline: {
        red: ['0.5px solid #FF4433', '1px'],
      },

      width: {
        15: '15px',
        '20px': '20px',
        '30px': '30px',
        '40px': '40px',
        '60px': '60px',
        '70px': '70px',
        '80px': '80px',
        '90px': '90px',
        '100px': '100px',
        '155px': '155px',
        '178px': '178px',
        '200px': '200px',
        '300px': '300px',
        '320px': '320px',
        '338px': '338px',
        '350px': '350px',
        '360px': '360px',
        '400px': '400px',
        '450px': '450px',
        '500px': '500px',
        '550px': '550px',
        '600px': '600px',
        '800px': '800px',
        '1100px': '1100px',

        '10%': '10%',
        '37.5%': '37.5%',
        '41%': '41%',
        '48%': '48%',
        '60%': '60%',

        '28rem': '28rem',
        '22rem': '22rem',
      },
      height: {
        '15px': '15px',
        '20px': '20px',
        '60px': '60px',
        '80px': '80px',
        '70px': '70px',
        '131px': '131px',
        '100px': '100px',
        '30px': '30px',
        '0.5px': '0.5px',
        '308px': '308px',
        '256px': '256px',
        '394px': '394px',
      },
    },
  },
};
