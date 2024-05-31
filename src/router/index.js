import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'
import EventView from '../views/EventView.vue'
import ArtistsView from '../views/ArtistsView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },

    {
        path: '/events',
        name: 'events',
        component: EventsView
    },

    {
        path: '/events/:id',
        component: EventView
    },

    {
        path: '/artists',
        name: 'artists',
        component: ArtistsView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
