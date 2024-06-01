<template>
    <navigation> </navigation>
    
    <router-view> </router-view>
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
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
    }
</style>
