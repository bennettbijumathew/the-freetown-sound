import { createStore } from 'vuex'
import eventsJSON from "../json/events.json";
import commentsJSON from "../json/events.json";


export default createStore({
    state: {
        events: eventsJSON,
        // comments: JSON.parse(localStorage.getItem('comments')),
        comments: commentsJSON
    },

    getters: {
        getEvents: (state) => {
            return state.events;
        },

        getEventComments: (state) => (eventID) => {
            return state.comments.filter(comment => comment.eventID == eventID)
        }
    },

    mutations: {
        addComments (state, comment) {
            state.comments.push(comment);
            // localStorage.setItem(`comments`, JSON.stringify(state.comments)); 

            fetch(commentsJSON, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(state.comments)
            })

            .then(response => {
                return response.json( )
            })

            .then(data => {
                console.log(data) 
            })
            .catch(error => console.log('The error is: ', error))	
        }
    },
    
    actions: {
    },

    modules: {
    }
})
