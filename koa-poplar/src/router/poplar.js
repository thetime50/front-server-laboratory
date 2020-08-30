export default {
    path: '/poplar',
    redirect: 'poplar/annotation',
    name: 'poplar',
    component: () => import('@/page/routerviewcomp.vue'),//todo
    children:[
        {
            path: 'annotation',
            name: 'annotation',
            component: () => import('@/page/poplar/annotation.vue')
        },
    ],
}