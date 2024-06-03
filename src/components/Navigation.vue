<template>
    <div class="row navigation">
        <div class="col-12 col-sm-12 col-lg-12">
            <h1 class="neuton-extrabold"> the freetown sound </h1>
        </div>

        <div class="col-12 col-sm-12 col-lg-12">
            <router-link :to="{name: 'home'}"> 
                <button class="button neuton-regular"> home </button>
            </router-link>

            <router-link :to="{name: 'events'}"> 
                <button class="button neuton-regular"> events </button>
            </router-link>

            <router-link :to="{name: 'login'}"> 
                <button class="button neuton-regular"> login </button>
            </router-link>

            <router-link :to="{name: 'artists'}"> 
                <button class="button neuton-regular"> artists </button>
            </router-link>
        </div>    
    </div>
</template>

<style scoped>
    /* class for the navigation section */
    .navigation {
        text-align: center;
        padding: 0.5em;
        padding-top: 1em;
    }

    /* classes for navigation buttons */
    .button {
        padding-left: 0.8em;
        padding-right: 0.8em;
        padding-bottom: 0.2em;

        margin-left: 0.2em;
        margin-right: 0.2em;

        border-radius: 2em;
        border: none; 

        background-color: black;
        color: white;

        font-size: 1.1em;
        width: 5em;
    }

    .button:hover {
        background-color: #ff9e4f;
        color: white;
        transition: 0.3s;
    }

    .button:active {
        background-color: #ee8d3f;
        color: white;
        transition: 0.3s;
    }

    /* classes created for large screens - col-lg */
    @media (min-width: 992px) {        
        .button {
            font-size: 1.2em;
        }
    }

</style>