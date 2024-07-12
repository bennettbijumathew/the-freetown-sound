<template>
    <div class="artists row g-4">
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="artists-catchphrase neuton-extrabold"> 
                <h2 class="neuton-bold"> featured artists. </h2>
            </div>
        </div>

        <div v-for="artist in artists" class="col-4 col-sm-12 col-lg-2">
            <div class="neuton-extrabold artists-list"> 
                <h6 class="neuton-bold"> {{artist.title}} </h6>
                <img :src="artist.cover_image" class="img-fluid artists-image">
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
                let keySecret = ''; // variable for the discogs api key.
                let artist = '';

                const response = await axios.get(`https://api.discogs.com/database/search?type=artist&q=${artist}&key=${keySecret}`);
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
        background-size: cover;
    }

    .artists-list {
        text-align: center;
        background-color: blanchedalmond;
        border-radius: 2em;
        height: 100%;
        padding: 1em;
    }

    .artists-image {
        border-radius: 2em;
        height: 200px;
        width: 200px;
        object-fit: cover;
    }

</style>