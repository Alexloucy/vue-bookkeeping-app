import { createRouter, createWebHistory, useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeView from '../views/HomeView.vue';
import JournalView from '../views/JournalView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/Journal',
    name: 'Journal',
    component: JournalView,
    meta: {
      requiresAuth: true,
    },
  },
];

// const getCurrentuser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener();
//         resolve(user);
//       },
//       reject
//     );
//   });
// };

// router.beforeEach(async (to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (await getCurrentuser()) {
//       next();
//     } else {
//       alert("You don't have access!");
//       next('/');
//     }
//   } else {
//     next();
//   }
// });

// router.beforeEach(async (to, from) => {
//   if (
//     // make sure the user is authenticated
//     !isAuthenticated &&
//     // ❗️ Avoid an infinite redirect
//     to.name !== 'home'
//   ) {
//     // redirect the user to the login page
//     return { name: 'home' };
//   }
// });

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
