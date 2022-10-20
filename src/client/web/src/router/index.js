import { createRouter, createWebHistory } from 'vue-router';

// Import route components
import USLGN from "../components/CURA/USLGN/USLGN.vue";
import SCFLD from '../components/CORE/SCFLD/SCFLD.vue';
import STPWZ from '../components/CORE/STPWZ/STPWZ.vue';

// Define routes for USLGN and SCFLD
const routes = [
    {
      path: '/',
      name: 'USLGN',
      component: USLGN
    },
    {
      path: '/',
      name: 'SCFLD',
      component: SCFLD
    },
    {
      path: '/',
      name: 'STPWZ',
      component: STPWZ
    }
];

// Create router instance and pass the 'routes' options  
const router = createRouter({
    // Provide the history implementation to use.
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
  
export default router;
  