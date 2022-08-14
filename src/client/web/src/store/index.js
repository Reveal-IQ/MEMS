/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 15 MAY 2021        *
*  Version    : 0.1.0.00.01-0521   *
************************************
*/

import { createStore, createLogger } from 'vuex';

// Import modules
import fetchAPI from './modules/fetchAPI';
import socketLink from "./modules/socketLink";
import eventEmitter from "./modules/eventEmitter";
import globalStore from "./modules/globalStore";

const debug = process.env.NODE_ENV !== 'production'

// Create store using modular structure
export default createStore({
    modules:{
        eventEmitter,
        fetchAPI,
        socketLink,
        globalStore
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})