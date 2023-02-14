import Home from '~/pages/Home';
import Following from '~/pages/Following';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/following',
        component: Following,
    },
    {
        path: '/profile',
        component: Profile,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
