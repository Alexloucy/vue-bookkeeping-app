<template>
  <nav>
    <router-link to="/Account">Account</router-link> |
    <router-link to="/Journal">My Journals</router-link>
  </nav>
  <router-view />
</template>

<script>

export default {
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffffeb;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffffeb;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
