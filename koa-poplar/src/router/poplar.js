export default {
    path: '/poplar',
    redirect: 'poplar/annotaton',
    name: 'poplar',
    component: () => import('@/page/routerviewcomp.vue'),//todo
    children:[
        {
            path: 'annotaton',
            name: 'annotaton',
            component: () => import('@/page/poplar/annotaton.vue')
        },
    ],
}