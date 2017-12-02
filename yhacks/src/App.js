import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';

class App extends Component {
  componentDidMount() {
    this.normalizeCSS()
  }

  normalizeCSS() {
    injectGlobal`
      @import url('https://fonts.googleapis.com/css?family=Open+Sans');

      :root {
        --color-primary: red;
        --color-primary-light: #651b1b;
        --color-primary-dark: #940b0b;

        --shadow-dark: 0 2rem 6rem rgba(0,0,0,.3);
        --shadow-light: 0 2rem 5rem rgba(0,0,0,.2);

        --line: 1px solid var(--color-grey-light-2);

      }

      *,
      *::after,
      *::before, {
        margin: 0;
        padding: 0;
        box-sizing: inherit;

      }

      html {
        box-sizing: border-box;
        font-size: 62.5%
      }

      body {
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        line-height: 1.6;
        margin: 0;
        color: var(--color-grey-dark-2);
        background-image: linear-gradient(
          to right bottom,
          var(--color-primary-light),
          var(--color-primary-dark));
        background-repeat: no-repeat;

        min-height: 100vh;
      }
    `
  }

  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

export default App;
