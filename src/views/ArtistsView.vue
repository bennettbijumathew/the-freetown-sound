<template>
    <div class="artists row g-4">
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="artists-catchphrase neuton-extrabold"> 
                <h2 class="neuton-bold"> featured artists. </h2>
            </div>
        </div>

        <div v-for="artist in artists" class="col-4 col-sm-12 col-lg-2">
            <div class="neuton-extrabold artists-list"> 
                <h3> {{artist.title}} </h3>
                <img :src="artist.thumb" class="img-fluid">
            </div>
        </div>
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
                let artist = '';

                const response = await axios.get(`https://api.discogs.com/database/search?type=artist&q=${artist}&${keySecret}`);
                this.artists = response.data.results;
            }

            catch (error) {
                console.error(error);
            }
        }
    }
</script>

<style scoped>
    .artists {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .artists-catchphrase {
        background: url(../assets/focal.png);
        color: whitesmoke; 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;
    }

    .artists-list {
        text-align: center;
        background-color: blanchedalmond;
        border-radius: 2em;
        height: 100%;
        padding: 1em;
    }

</style>