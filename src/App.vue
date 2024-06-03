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
    /* import fonts from google fonts */
    @import url('https://fonts.googleapis.com/css2?family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap');

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
