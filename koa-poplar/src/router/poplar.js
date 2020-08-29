export default {
    path: '/poplar',
    redirect: 'poplar/graph',
    name: 'poplar',
    component: () => import('@/page/routerviewcomp.vue'),//todo
    children:[
        {
            path: 'graph',
            name: 'graph',
            component: () => import('@/page/poplar/graph.vue')
        },
    ],
}