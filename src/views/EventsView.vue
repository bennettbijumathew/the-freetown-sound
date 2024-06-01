<template>
    <p> i guess this is the events page. </p>

    <div class="row focal"> 
        <h2 class="neuton-bold"> featured events. </h2>
    </div>

    <div class="row"> 
        <div v-for="event in events" :key="event.id" class="col-12 col-sm-4 col-md-2"> 
            <router-link :to="{path: '/events/' + event.id}">
                <img :src=event.image width="100%;" class="events-image">
                <p class="events-name"> {{event.name}} </p>
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
