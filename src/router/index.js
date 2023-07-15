import { createRouter, createWebHistory, useRouter } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import JournalView from '../views/JournalView.vue';
import AccountView from '../views/AccountView.vue';
import { auth } from '../firebase/firebaseInit';

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
  {
    path: '/Account',
    name: 'account',
    component: AccountView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

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
//   if (to.matched.some((record) => record.meta.requiresAuth) &&  !auth.currentUser) {
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

router.beforeEach((to, from, next) => {
  if (to.path === '/' && auth.currentUser) {
    next('/Journal');
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next('/Account');
    return;
  }

  next();
});

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

export default router;
