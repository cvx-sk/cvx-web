import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Contact from '../views/Contact.vue';
import NotFound from '../views/404.vue';
import About from '../views/About.vue';
import Form from '../views/Form.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/calendar',
        name: 'Kalendár',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue'),
    },
    {
        path: '/about',
        name: 'O nás',
        component: About,
    },
    {
        path: '/contact',
        name: 'Kontakt',
        component: Contact,
    },
    {
        path: '/form/:code',
        name: 'Form',
        component: Form,
    },
    {
        path: '*',
        name: '404',
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
