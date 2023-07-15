<template lang="">
  <div v-if="isLoggedIn"><button @click="signOut">Sign Out</button></div>
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

export default {
  data() {
    return {
      email: null,
      password: null,
      pageRegister: false,
      auth: null,
      isLoggedIn: false,
    };
  },
  methods: {
    signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log('successfully signed in!');
          console.log(auth.currentUser);
          router.push('/Journal');
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    },
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log('successfully signed in!');
          console.log(auth.currentUser);
          router.push('/Journal');
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    },
    switchPage() {
      this.pageRegister = !this.pageRegister;
    },
    googleSignIn() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((data) => {
          router.push('/');
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    },
    signOut() {
      const auth = getAuth();
      signOut(auth);
    },
  },
  mounted() {
    let auth = getAuth();
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
</style>
