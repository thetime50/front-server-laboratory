export default {
    path: '/poplar',
    redirect: 'poplar/annotator',
    name: 'poplar',
    component: () => import('@/page/routerviewcomp.vue'),//todo
    children:[
        {
            path: 'annotator',
            name: 'annotator',
            component: () => import('@/page/poplar/annotator.vue')
        },
    ],
}