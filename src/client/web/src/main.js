/*
************************************
DIGITAL HEALTH | REVEAL FOUNDATION    

    Author     : AP                 
    Date       : 26 JUL 2021        
    Version    : 0.14.0             
************************************
*/

//Essential Libraries
import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router";

// Imports styles and fonts
import 'bootstrap/scss/bootstrap.scss';
import { Modal, Tab, Collapse } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

// Create vue app
const app = createApp(App);

// Add font awesome icons as a component in vue app
app.component('font-awesome-icon', FontAwesomeIcon);

// Install plugins store and router on vue app
app.use(store).use(router).mount('#app');

export default app