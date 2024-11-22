import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'
import EventView from '../views/EventView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
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
        path: '/accounts/login',
        name: 'login',
        component: LoginView
    },

    {
        path: '/accounts/signup',
        name: 'signup',
        component: SignUpView
    },

    {
        path: '/artists',
        name: 'artists',
        component: ArtistsView
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router
