/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 15 MAY 2021        *
*  Version    : 0.1.0.01.03-0521   *
************************************
*/

// Varaoble to store SCFLD #div element
var eventBus = null;

// Event emitter module has state, mutations and actions required to handle events based on SCFLD
const eventEmitter = {

    actions:{

        // Method used to call SET_EVENT_BUS
        createEventEmitter({}, element){
            eventBus = element;
        },

        // Method used to call ADD_EVENT_LISTENER
        onEvent({}, event){
            eventBus.addEventListener(event.type, event.listener);
        },

        // Method used to call CREATE_CUSTOM_EVENT
        emitEvent({}, event){
            eventBus.dispatchEvent(new CustomEvent(event.type, {detail: { message: event.data ? event.data : null}}));
        },

        // Method used to call REMOVE_EVENT_LISTENER
        offEvent({}, event){
            eventBus.removeEventListener(event.type, event.listener);
        },

        // Method used to call ONE_TIME_EVENT
        onceEvent({}, event){
            eventBus.addEventListener(event.type, event.listener, {once: true} );
        }
    }
}

export default eventEmitter;