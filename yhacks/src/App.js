import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

import { provider, firebase } from './firebase/firebase';
import art from './assets/menu/art.png';
import fitness from './assets/menu/fitness.png';
import food from './assets/menu/food.png';
import hotel from './assets/menu/hotel.png';
import shopping from './assets/menu/shopping.png';

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

    const PhoneContainer = styled.div`
      background-color: 'black';
      border: 1px solid black;
      height: 667px;
      width: 375px
    `

    const ArtImage = styled.img`
      position: absolute;
      margin-top: 667.0/2.0;
      margin-left: 375:.0/2.0;
    `
    const FoodImage = styled.img`
      position: absolute;
      margin-top: 667.0/2.0;
      margin-left: 375:.0/2.0;
    `
    return (
      <PhoneContainer>
        <ArtImage src={art} />
        <FoodImage src={food} />
        {/* <Firebase onClick={this.signIn}>Login</Firebase> */}
      </PhoneContainer>
    );
  }
}

export default App;
