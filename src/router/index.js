import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
    /* Layout */
import Layout from '@/layout'
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/performancePc',
        component: () =>
            import ('@/views/performancePc/index'),
        hidden: true
    },
    {
        path: '/performanceMsg',
        component: () =>
            import ('@/views/performanceMsg/index'),
        hidden: true
    },
    // {
    //     path: '/',
    //     component: Layout,
    //     redirect: '/dashboard',
    //     children: [{
    //         path: 'dashboard',
    //         name: 'Dashboard',
    //         component: () =>
    //             import ('@/views/dashboard/index'),
    //         meta: { title: '首页', icon: 'dashboard' }
    //     }]
    // }
]

export const asyncRoutes = [

    
    {
        path: '/',
        component: Layout,
        redirect: '/interview/index',
        name: '面试',
        id: 10,
        meta: { title: '', icon: 'client', role: [] },
        children: [{
            path: '/interview/index',
            name: '面试',
            id: 11,
            parentId: 10,
            component: () =>
                import ('@/views/interview/index'),
            meta: { title: '面试管理', role: [] }
        }]
    },
    {
        path: '/staff',
        component: Layout,
        redirect: '/staff/index',
        name: '员工',
        id: 20,
        meta: { title: '', icon: 'personal', role: [] },
        children: [{
            path: '/staff/index',
            name: '员工',
            id: 21,
            parentId: 20,
            component: () =>
                import ('@/views/staff/index'),
            meta: { title: '员工管理', role: [] }
        }]
    },
    {
        path: '/performance',
        component: Layout,
        redirect: '/performance/index',
        name: '绩效考核',
        id: 50,
        meta: { title: '', icon: 'performance', role: [] },
        children: [{
            path: '/performance',
            name: '绩效考核',
            id: 51,
            parentId: 50,
            component: () =>
                import ('@/views/performance/index'),
            meta: { title: '绩效考核', role: [] }
        }]
    },
    {
        path: '/log',
        component: Layout,
        redirect: '/log/index',
        name: '操作日志',
        id: 40,
        meta: { title: '', icon: 'universal', role: [] },
        children: [{
            path: '/log',
            name: '操作日志',
            id: 41,
            parentId: 40,
            component: () =>
                import ('@/views/log/index'),
            meta: { title: '操作日志', role: [] }
        }]
    },
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/roleList',
        name: '权限设置',
        id: 1,
        meta: {
            title: '权限设置',
            icon: 'lock',
            role: []
        },
        children: [{
                path: 'roleList',
                name: '角色管理',
                id: 2,
                parentId: 1,
                component: () =>
                    import ('@/views/permission/roleList/index'),
                meta: { title: '角色管理', role: [] }
            },
            {
                path: 'adminList',
                name: '管理员列表',
                id: 3,
                parentId: 1,
                component: () =>
                    import ('@/views/permission/adminList/index'),
                meta: { title: '管理员列表', role: [] }
            },

            {
                path: 'permissionResource',
                name: '权限资源列表',
                id: 4,
                parentId: 1,
                component: () =>
                    import ('@/views/permission/permissionResource/index'),
                meta: { title: '权限资源列表', role: [] }
            },
            {
                path: 'rightsGroup',
                name: '权限分组列表',
                id: 5,
                parentId: 1,
                component: () =>
                    import ('@/views/permission/rightsGroup/index'),
                meta: { title: '权限分组列表', role: [] }
            },
            {
                path: 'setting',
                name: '系统设置',
                id: 6,
                parentId: 1,
                component: () =>
                    import ('@/views/permission/setting/index'),
                meta: { title: '系统设置', role: [] }
            }
        ]
    },
    {
        path: '/setting',
        component: Layout,
        redirect: '/setting/configuration',
        name: '系统设置',
        id: 100,
        meta: {
            title: '系统设置',
            icon: 'setting',
            role: []
        },
        children: [{
                path: 'configuration',
                name: '系统配置',
                id: 101,
                parentId: 100,
                component: () =>
                    import ('@/views/setting/configuration/index'),
                meta: { title: '系统配置', role: [] }
            },

        ]
    },
    {
        path: '/personal',
        component: Layout,
        redirect: '/personal',
        name: '个人中心',
        id: 110,
        meta: { title: '', icon: 'personal', role: [] },
        children: [{
            path: 'personal',
            name: '个人中心',
            id: 111,
            parentId: 110,
            component: () =>
                import ('@/views/personal/index'),
            meta: { title: '个人中心', role: [] }
        }]
    },
    // {
    //   path: '/setting',
    //   component: Layout,
    //   redirect: '/setting',
    //   name: '系统设置',
    //   id: 110,
    //   meta: { title: '', icon: 'setting', role: [] },
    //   children: [{
    //     path: 'setting',
    //     name: '系统设置',
    //     id: 111,
    //     parentId: 110,
    //     component: () => import('@/views/setting/index'),
    //     meta: { title: '系统设置', role: [] }
    //   }]
    // },

    {
        path: '*',
        name: '404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export default router