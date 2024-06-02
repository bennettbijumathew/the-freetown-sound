<template>
    <div class="container-fluid">
        <navigation> </navigation>
        
        <router-view> </router-view>
    </div>
</template>

<script>
import navigation from '@/components/Navigation.vue'

export default {    
    components: {
        navigation
    }
}
</script>

<style>
    /* classes created for all screens - col */
    @media (min-width: 0px) { 
        body {
            background-color: #fffaf2;
        }
    }

    /* classes for smaller sized screens - col-sm */
    @media (min-width: 576px) {
        body {
            background-color: #fff1da;
        }
    }

    /* classes for large screens - col-lg */
    @media (min-width: 992px) {
        body {
            background-color: #ebdabf;
        }
    }

    /* classes for fonts */
    .neuton-extralight {
        font-family: "Neuton", serif;
        font-weight: 200;
        font-style: normal;
    }
    
    .neuton-light {
        font-family: "Neuton", serif;
        font-weight: 300;
        font-style: normal;
    }
    
    .neuton-regular {
        font-family: "Neuton", serif;
        font-weight: 400;
        font-style: normal;
    }
    
    .neuton-bold {
        font-family: "Neuton", serif;
        font-weight: 700;
        font-style: normal;
    }
    
    .neuton-extrabold {
        font-family: "Neuton", serif;
        font-weight: 800;
        font-style: normal;
    }
    
    .neuton-regular-italic {
        font-family: "Neuton", serif;
        font-weight: 400;
        font-style: italic;
    }
</style>
