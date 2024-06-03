<template>
    <div class="home row g-4">
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="home-catchphrase neuton-extrabold"> 
                <h2 class="neuton-bold"> the home of concerts. </h2>        
            </div>
        </div> 
  
        <div class="col-12 col-sm-6 col-lg-6"> 
            <router-link :to="{name: 'events'}" class="home-information events-image"> 
                <h2 class="neuton-bold"> Events </h2>
                <p class="neuton-regular"> Check the events of the concert. </p>
            </router-link>
        </div>

        <div class="col-12 col-sm-6 col-lg-6"> 
            <router-link :to="{name: 'artists'}" class="home-information artists-image"> 
                <h2 class="neuton-bold"> Artists </h2>
                <p class="neuton-regular"> Find the lineup for The Freetown Sound 2024 Concert. </p>
            </router-link>
        </div>

        <div class="col-12 col-sm-6 col-lg-6"> 
            <router-link :to="{name: 'login'}" class="home-information waitlist-image"> 
                <h2 class="neuton-bold"> Accounts </h2>
                <p class="neuton-regular"> Log into the website to access new social features. </p>
            </router-link>
        </div>

        <div class="col-12 col-sm-6 col-lg-6"> 
            <router-link :to="{name: 'home'}" class="home-information location-image"> 
                <h2 class="neuton-bold"> Location </h2>
                <p class="neuton-regular"> Located in the vibrant coast of Queensland. </p>
            </router-link>
        </div>
    </div>

</template>

<style scoped>
    .home {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .home-catchphrase {
        background: url(../assets/focal.png);
        background-size: cover;
        color: whitesmoke; 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;

    }

    .home-information {
        background-color: coral;
        color: white; 

        border-radius: 2em;
        padding: 1em;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        text-decoration: none;
    }

    .home-information:hover {
        filter: grayscale(80%);
        transition: 0.3s;
    }

    .home-information:active {
        filter: grayscale(100%);
        transition: 0.3s;
    }

    .events-image {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0)), url(../assets/events.jpeg);
    }

    .artists-image {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0)), url(../assets/artists.jpg);
    }

    .location-image {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0)), url(../assets/location.jpg);
    }
    
    .waitlist-image {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0)), url(../assets/waitlist.jpg);
    }


    /* classes created for all screens - col */
    @media (min-width: 0px) { 
        .home-information {
            height: 100%;
            padding-top: 10em;
        }
    }

    /* classes created for large screens - col-sm */
    @media (min-width: 576px) {
        .home-information {
            height: 29em;
        }
    }

    /* classes created for large screens - col-lg */
    @media (min-width: 992px) {        
        .home-information {
            height: 26em;
        }
    }
</style>
