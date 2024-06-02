<template>
    <p> test </p>

    <div v-for="artist in artists">
        <p> {{artist.title}} </p>
        <img :src="artist.thumb"> </img>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                artists: []
            }
        },

        async created() {
            try {
                let keySecret = 'key=CONZXLfHzoFkwAqljPSO&secret=YovrnkerVkmaBbTKSCPoMXPrEprsKXyq';
                let artist = 'Travis Scott';

                const response = await axios.get(`https://api.discogs.com/database/search?type=artist&q=${artist}&${keySecret}`);
                this.artists = response.data.results;
            }

            catch (error) {
                console.error(error);
            }
        }
    }
</script>