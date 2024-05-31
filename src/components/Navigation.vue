<template>
    <div class="row">
        <div class="col--12 col-sm-6 col-md-6">
            <h1 class="navigation-title neuton-extrabold"> the freetown sound </h1>
        </div>

        <div class="col--12 col-sm-6 col-md-6 navigation-interaction">
            <router-link :to="{name: 'home'}"> 
                <button class="navigation-button button"> home </button>
            </router-link>

            <router-link :to="{name: 'events'}"> 
                <button class="navigation-button button"> events </button>
            </router-link>

            <router-link :to="{name: 'artists'}"> 
                <button class="navigation-button button"> artists </button>
            </router-link>
        </div>    
    </div>
</template>

<script>
    export default {
        name: 'navigation',
    }
</script>

<style scoped>

</style>