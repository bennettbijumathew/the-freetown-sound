<template>
    <div class="artists row g-4">
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="page-catchphrase neuton-extrabold"> 
                <h2 class="neuton-bold"> The Featured Artists. </h2>
            </div>
        </div>

        <!-- Shows a list of artists -->
        <div v-for="artist in artists" class="col-6 col-sm-4 col-lg-2">
            <div class="artist-information" v-bind:style="{ 'background-image': 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0)), url(' + artist.cover_image + ') ' } "> 
                <h2 class="neuton-bold"> {{artist.title}} </h2>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                apiSecret: process.env.VUE_APP_DISCOGS_SECRET,
                apiKey: process.env.VUE_APP_DISCOGS_KEY,
                artistAmount: 24,
                artists: []
            }
        },

        async created() {
            // Sets the artists array to the response from the Discogs API.
            try {                
                const response = await axios.get(`https://api.discogs.com/database/search?type=artist&page=3&per_page=${this.artistAmount}&key=${this.apiKey}&secret=${this.apiSecret}`);
                this.artists = response.data.results;
            }

            catch (error) {
                console.error(error);
            }
        }
    }
</script>

<style scoped>
    /* Classes for the artists part of the page. */
    .artists {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .artists-catchphrase {
        background: url(../assets/focal.png);
        color: var(--alternate-text); 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;
        background-size: cover;
    }

    .artist-information {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0)), url(../assets/focal.png);
        background-size: cover;
        color: var(--alternate-text);

        border-radius: 2em;
        padding: 1em;

        height: 300px;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        text-decoration: none;
    }
</style>