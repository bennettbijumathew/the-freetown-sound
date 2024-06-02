<template>
    <div class="row navigation">
        <div class="col-12 col-sm-12 col-lg-12">
            <h1 class="neuton-extrabold"> the freetown sound </h1>
        </div>

        <div class="col-12 col-sm-12 col-lg-12">
            <router-link :to="{name: 'home'}"> 
                <button class="button neuton-light"> home </button>
            </router-link>

            <router-link :to="{name: 'events'}"> 
                <button class="button neuton-light"> events </button>
            </router-link>

            <router-link :to="{name: 'login'}"> 
                <button class="button neuton-light"> login </button>
            </router-link>

            <router-link :to="{name: 'artists'}"> 
                <button class="button neuton-light"> artists </button>
            </router-link>
        </div>    
    </div>
</template>

<style scoped>
    /* class for the navigation section */
    .navigation {
        text-align: center;
        padding: 0.5em;
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

    /* classes created for all screens - col */
    @media (min-width: 0px) { 
        .navigation {
            /* background-color: #e676a1; */
        }
    }

    /* classes created for large screens - col-sm */
    @media (min-width: 576px) {
        .navigation {
            background-color: #b9ee3f;
        }
    }

    /* classes created for large screens - col-lg */
    @media (min-width: 992px) {
        .navigation {
            background-color: #3feed1;
        }
        
        .button {
            font-size: 1.2em;
        }
    }

</style>