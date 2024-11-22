<template>
    <div class="container-fluid background">
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
    /* Import fonts from Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap');

    /* Color variables */
    * {
        --background: rgb(255, 253, 249); 
        --comments-background: rgb(242, 229, 237);
        --comments-inputs-background: rgb(226, 210, 220);
        --signup-background: rgb(255, 244, 213);
        --login-background: rgb(230, 238, 243);

        --text: rgb(27, 27, 27); 
        --alternate-text: var(--background); 

        --button: var(--text);
        --button-disabled: rgb(67, 54, 63);
        --button-current: rgb(98, 84, 93);

        --button-hover: rgb(226, 117, 29);
        --button-active: rgb(185, 103, 37);
        --button-text: var(--background);

        --error: #ffb6b6; 
    }

    /* Classes for fonts */    
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

    /* Classes that are used in the pages */
    .page-catchphrase {
        background: url(assets/focal.png);
        background-size: cover;
        color: var(--background); 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;
    }

    .background {
        background-color: var(--background);
        color: var(--text)
    }
</style>
