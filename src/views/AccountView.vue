<template lang="">
  <div v-if="isLoggedIn">
    <h1 v-if="auth.currentUser.displayName">
      Welcome {{ auth.currentUser.displayName }}
    </h1>
    <h1 v-else>Welcome {{ auth.currentUser.email }}</h1>
    <button class="buttonAuth" @click="signOut">Sign Out</button>
  </div>
  <div v-else>
    <div v-if="!pageRegister">
      <h1 class="heading">Sign in</h1>
      <p>
        <input
          class="inputField"
          type="text"
          placeholder="Email"
          v-model="email"
        />
      </p>
      <p>
        <input
          class="inputField"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </p>
      <p class="error">{{ errMessage }}</p>
      <div id="buttonRow">
        <button class="buttonAuth" @click="switchPage">
          Create New Account
        </button>
        <button class="buttonAuth" @click="signIn">Sign in</button>
      </div>
      <button id="googleSignIn" @click="googleSignIn">
        Sign in with Google
      </button>
    </div>
    <div v-else>
      <h1 class="heading">Register</h1>
      <p>
        <input
          class="inputField"
          type="text"
          placeholder="Email"
          v-model="email"
        />
      </p>
      <p>
        <input
          class="inputField"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </p>
      <h1>{{ errMessage }}</h1>
      <div id="buttonRow">
        <button class="buttonAuth" @click="switchPage">Sign in</button>
        <button class="buttonAuth" @click="register">Register</button>
      </div>
      <button id="googleSignIn" @click="googleSignIn">
        Sign in with Google
      </button>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
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
      signInWithPopup(auth, provider)
        .then((data) => {
          router.push('/');
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
.inputField {
  width: 400px;
  height: 25px;
  padding: 5px;
  padding-left: 7px;
  margin-bottom: 10px;
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
  width: 150px;
  height: 60px;
  font-size: 18px;
  padding: 5px;
}
#googleSignIn {
  width: 200px;
  height: 70px;
  font-size: 18px;
  padding: 5px;
}
.error {
  color: red;
  font-size: 20px;
}
</style>
