<template lang="">
  <div v-if="isLoggedIn"><button @click="signOut">Sign Out</button></div>
  <div v-else>
    <div v-if="!pageRegister">
      <h1 class="heading">Sign in</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <div id="buttonRow">
        <button @click="signIn">Sign in</button>
        <button @click="switchPage">Create New Account</button>
      </div>
      <button @click="googleSignIn">Sign in with Google</button>
    </div>
    <div v-else>
      <h1 class="heading">Register</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <div id="buttonRow">
        <button @click="register">Register</button>
        <button @click="switchPage">Sign in</button>
      </div>
      <button @click="googleSignIn">Sign in with Google</button>
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
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log('successfully signed in!');
          console.log(auth.currentUser);
          router.push('/');
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    },
    register() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log('successfully signed in!');
          console.log(auth.currentUser);
          router.push('/');
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
<style lang=""></style>
