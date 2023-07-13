<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/Account">My Account</router-link>
  </nav>
  <router-view />
</template>

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
