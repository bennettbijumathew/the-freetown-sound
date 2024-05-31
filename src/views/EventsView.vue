<template>
    <p> i guess this is the events page. </p>

    <div class="row focal"> 
        <h2 class="neuton-bold"> featured events. </h2>
    </div>

    <div class="row"> 
        <div v-for="(event, index) in events" :key="event.name" class="col-12 col-sm-4 col-md-2"> 
            <router-link :to="{path: '/events/' + index}">
                <img :src=event.image width="100%;" class="events-image">
                <p class="events-name"> {{event.name}} </p>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: mapState ({
            events: 'events'
        })
    }
</script>
