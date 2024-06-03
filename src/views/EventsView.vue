<template>
    <div class="events row g-4">
        <div class="col-12 col-sm-12 col-lg-12 neuton-extrabold">
            <div class="events-catchphrase"> 
                <h2 class="neuton-bold"> featured events. </h2>
            </div>
        </div>

        <div v-for="event in events" :key="event.id" class="col-12 col-sm-4 col-lg-2"> 
            <router-link :to="{path: '/events/' + event.id}" class="events-information" v-bind:style="{ 'background-image': 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0)), url(' + event.image + ') ' } "> 
                <h2 class="neuton-bold"> {{event.name}} </h2>
            </router-link>
        </div>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                events: []
            }
        },

        async created() {
            try {
                const response = await axios.get(`http://localhost:3000/events`);
                this.events = response.data;
            }
            
            catch (error) {
                console.error(error);
            }
        }
    }
</script>

<style scoped>
    .events {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .events-catchphrase {
        background: url(../assets/focal.png);
        background-size: cover;
        color: whitesmoke; 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;
    }

    .events-information {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0)), url(../assets/focal.png);
        color: white; 

        border-radius: 2em;
        padding: 1em;

        height: 12em; 
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        text-decoration: none;
    }
</style>
