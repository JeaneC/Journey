import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

import { provider, firebase } from './firebase/firebase';

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
  signIn = () =>{
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user)
      console.log(token)
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render() {
    const Firebase = styled.button`
    `

    return (
      <div>
        <Firebase onClick={this.signIn}>Login</Firebase>
      </div>
    );
  }
}

export default App;
