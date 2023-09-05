<template lang="">
  <div v-if="isLoggedIn">
    <h1 class="heading" v-if="auth.currentUser.displayName">
      Welcome {{ auth.currentUser.displayName }}
    </h1>
    <h1 class="heading" v-else>Welcome {{ auth.currentUser.email }}</h1>
    <button class="buttonAuth" @click="signOut">Sign Out</button>
  </div>
  <div v-else>
    <div class="logForm" v-if="!pageRegister">
      <h1 class="heading">Sign in</h1>

      <input
        class="inputField"
        type="text"
        placeholder="Email"
        v-model="email"
      />

      <input
        class="inputField"
        type="password"
        placeholder="Password"
        v-model="password"
      />

      <p class="error">{{ errMessage }}</p>

      <!-- <button class="buttonAuth" @click="switchPage">
          Create New Account
        </button> -->
      <button class="buttonAuth" @click="signIn">Sign in</button>

      <button id="googleSignIn" @click="googleSignIn">
        <img id="google" src="..\assets\google.png" alt="" srcset="" />
        Sign in with Google
      </button>
      <div class="create">
        <p>Don't have an account?</p>
        <p id="register" @click="switchPage">Register Now</p>
      </div>
    </div>
    <div class="logForm" v-else>
      <h1 class="heading">Register</h1>
      <input
        class="inputField"
        type="text"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="inputField"
        type="password"
        placeholder="Password"
        v-model="password"
      />

      <h1 class="error">{{ errMessage }}</h1>
      <button class="buttonAuth" @click="register">Register</button>

      <div class="create">
        <p>Already have an account?</p>
        <p id="register" @click="switchPage">Sign in Now</p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import router from '@/router';
import { auth } from '../firebase/firebaseInit';

export default {
  data() {
    return {
      email: null,
      password: null,
      pageRegister: false,
      auth: null,
      isLoggedIn: false,
      auth: auth,
      errMessage: null,
    };
  },
  methods: {
    signIn() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log('successfully signed in!');
          console.log(auth.currentUser);
          router.push('/Journal');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errMessage = 'Invalid Email';
              break;
            case 'auth/user-not-found':
              this.errMessage = 'No account with this email was found';
              break;
            case 'auth/wrong-password':
              this.errMessage = 'Incorrect password';
              break;
            default:
              this.errMessage = 'Email or password was incorrect';
              break;
          }
        });
    },
    register() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log('successfully signed in!');
          console.log(auth.currentUser);
          router.push('/Journal');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errMessage = 'Invalid Email';
              break;
            case 'auth/user-not-found':
              this.errMessage = 'No account with this email was found';
              break;
            case 'auth/wrong-password':
              this.errMessage = 'Incorrect password';
              break;
            default:
              this.errMessage = 'Email or password was incorrect';
              break;
          }
        });
    },
    switchPage() {
      this.pageRegister = !this.pageRegister;
    },
    googleSignIn() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((data) => {
        router.push('/');
      });
      // .catch((error) => {
      //   switch (error.code) {
      //     case 'auth/invalid-email':
      //       this.errMessage = 'Invalid Email';
      //       break;
      //     case 'auth/user-not-found':
      //       this.errMessage = 'No account with this email was found';
      //       break;
      //     case 'auth/wrong-password':
      //       this.errMessage = 'Incorrect password';
      //       break;
      //   }
      // });
    },
    signOut() {
      signOut(auth);
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
};
</script>
<style>
.logForm {
  border-style: solid;
  border-radius: 5px;
  border-color: rgba(183, 166, 166, 0.203);
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin: auto;
}

.inputField {
  width: 400px;
  height: 35px;
  padding: 5px;
  padding-left: 7px;
  margin-bottom: 25px;
  border-radius: 5px;
  border-style: none;
}
.inputField:focus {
  outline-style: solid;
  outline-color: #7f55e0;
  outline-width: 3px;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}
.buttonAuth {
  width: 412px;
  height: 60px;
  font-size: 18px;
  padding: 5px;
  margin: 0;
  margin-bottom: 25px;
}

#googleSignIn {
  width: 412px;
  height: 70px;
  font-size: 18px;
  padding: 5px;
  margin: 0;
  margin-bottom: 5px;
  background-color: transparent;
  outline: none;
  border-style: solid;
  border-radius: 5px;
  border-color: white;
  display: flex;
  justify-content: center;
}
#google {
  width: 35px;
  margin-right: 15px;
  margin-left: 10px;
}
.error {
  color: red;
  font-size: 16px;
  width: 300px;
  padding-bottom: 10px;
  margin: 0;
}
.heading {
  width: 300px;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 10px;
}
.create {
  display: flex;
  flex-direction: row;
}
#register {
  margin-left: 15px;
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}
@media screen and (max-width: 500px) {
  .buttonAuth {
    width: 312px;
    height: 45px;
    font-size: 18px;
    padding: 5px;
    margin: 0;
    margin-bottom: 25px;
    border-radius: 5px;
  }
  .logForm {
    border-style: solid;
    border-radius: 5px;
    border-color: rgba(183, 166, 166, 0.203);
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    margin: auto;
  }

  .inputField {
    width: 300px;
    height: 35px;
    padding: 5px;
    padding-left: 7px;
    margin-bottom: 25px;
    border-radius: 5px;
    border-style: none;
  }
  .inputField:focus {
    outline-style: solid;
    outline-color: #7f55e0;
    outline-width: 3px;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
  #googleSignIn {
    width: 312px;
    height: 45px;
    font-size: 18px;
    padding: 5px;
    margin: 0;
    margin-bottom: 5px;
    background-color: transparent;
    outline: none;
    border-style: solid;
    border-radius: 5px;
    border-color: white;
    display: flex;
    justify-content: center;
  }
  #google {
    width: 30px;
    margin-right: 15px;
    margin-left: 10px;
  }
  .error {
    color: red;
    font-size: 16px;
    width: 300px;
    padding-bottom: 10px;
    margin: 0;
  }
}
</style>
