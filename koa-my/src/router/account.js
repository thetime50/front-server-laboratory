export default {
    path: '/account',
    redirect: 'account/signin',
    name: 'account',
    component: () => import('@/page/routerviewcomp.vue'),//todo
    children:[
        {
            path: 'signin',
            name: 'signin',
            component: () => import('@/page/account/signin.vue')
        },
        {
            path: 'signup',
            name: 'signup',
            component: () => import('@/page/account/signup.vue')
        },
    ],
}