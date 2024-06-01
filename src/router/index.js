import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'
import EventView from '../views/EventView.vue'
import LoginView from '../views/LoginView.vue'

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
        path: '/login',
        name: 'login',
        component: LoginView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
