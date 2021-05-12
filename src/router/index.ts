import { lazy } from 'react'
import { lazyImport } from '@src/utils/lazyImport'
import { IRoute } from './type'

const System = lazy(() => import('../components/UserLayout'))
const Layout = lazy(() => import('../components/Layout'))

const Login = lazy(() => import('../views/Login'))

const Dashboard = lazy(() => import('../views/Dashboard'))
/* const UserAdd = lazyImport('../views/User/Add') */
const UserList = lazy(() => import('../views/User/List'))
const DepartmentList = lazy(() => import('../views/Department/List'))
const DepartmentAdd = lazy(() => import('../views/Department/Add'))
const JobList = lazy(() => import('../views/Job/List'))
const JobAdd = lazy(() => import('../views/Job/Add'))
const StaffList = lazy(() => import('../views/Staff/List'))
const StaffAdd = lazy(() => import('../views/Staff/Add'))

export const routes: IRoute[] = [
    {
        path: '/system',
        redirect: '/system/login',
        component: System,
        meta: {
            title: '系统',
        },
        children: [
            {
                path: '/system/login',
                exact: true,
                component: Login,  
                meta: {
                    title: '登录',
                },
            },
        ],
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: Layout,
        meta: {
            title: '系统',
        },
        children: [
            {
                path: '/dashboard',
                exact: true,
                component: Dashboard,
                meta: {
                    title: '控制台',
                    icon: 'AppstoreOutlined',
                },
            },
            {
                path: '/user',
                redirect: '/user/add',
                roles: ['admin'],
                meta: {
                    title: '用户管理',
                    icon: 'UserOutlined',
                },
                children: [
        /*             {
                        path: '/user/add',
                        component: UserAdd,
                        meta: {
                            title: '用户添加',
                        },
                        roles: ['admin'],
                    }, */
                    {
                        path: '/user/list',
                        component: UserList,
                        meta: {
                            title: '用户列表',
                        },
                    },
                ],
            },
            {
                path: '/department',
                redirect: '/department/list',
                roles: ['product', 'information'],
                meta: {
                    title: '部门管理',
                    icon: 'WechatOutlined',
                },
                children: [
                    {
                        path: '/department/list',
                        component: DepartmentList,
                        roles: ['product'],
                        meta: {
                            title: '部门列表',
                        },
                    },
                    {
                        path: '/department/add',
                        roles: ['information'],
                        component: DepartmentAdd,
                        meta: {
                            title: '添加部门',
                        },
                    },
                ],
            },
            {
                path: '/job',
                redirect: '/job/list',
                meta: {
                    title: '职位管理',
                    icon: 'AuditOutlined',
                },
                children: [
                    {
                        path: '/job/list',
                        component: JobList,
                        meta: {
                            title: '职位列表',
                        },
                    },
                    {
                        path: '/job/add',
                        component: JobAdd,
                        meta: {
                            title: '添加职位',
                        },
                    },
                ],
            },
             {
                path: '/staff',
                redirect: '/staff/list',
                meta: {
                    title: '职员管理',
                    icon: 'UsergroupAddOutlined',
                },
                children: [
                    {
                        path: '/staff/list',
                        component: StaffList,
                        meta: {
                            title: '职员列表',
                        },
                    },
                    {
                        path: '/staff/add',
                        component: StaffAdd,
                        meta: {
                            title: '职员添加',
                        },
                    },
                ],
            },
            /*
            {
                path: '/a',
                meta: {
                    title: '嵌套路由A',
                },
                redirect: '/a/a',
                children: [
                    {
                        path: '/a/a',
                        meta: {
                            title: '嵌套路由AA',
                        },
                        children: [
                            {
                                path: '/a/a/a',
                                meta: {
                                    title: '嵌套路由AAA',
                                },
                            },
                            {
                                path: '/a/a/b',
                                meta: {
                                    title: '嵌套路由AAB',
                                },
                            },
                        ],
                    },
                    {
                        path: '/a/b',
                        meta: {
                            title: '嵌套路由AB',
                        },
                        children: [
                            {
                                path: '/a/b/a',
                                meta: {
                                    title: '嵌套路由ABA',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                path: '/askforleave',
                roles: ['admin', 'user'],
                exact: true,
                meta: {
                    title: '请假',
                    icon: 'MehOutlined',
                },
            },
            {
                path: '/vertime', 
                exact: true,
                meta: {
                    title: '加班',
                    icon: 'FrownOutlined',
                },
            }, */
            /* 错误页面 */
    {
        path: '/success',
        hidden: true,
        component: lazy(() => import('../views/Success')),
    },
    {
        path: '/error',
        meta: {
          title: '错误页面',
        },
        hidden: true,
        redirect: '/error/404',
        children: [
          {
            path: '/error/404',
            component: lazy(() => import('../views/Error/404')),
            meta: {
              title: '页面不存在',
            },
          },
          {
            path: '/error/403',
            component: lazy(() => import('../views/Error/403')),
            meta: {
              title: '暂无权限',
            },
          },
        ],
    },
    {
        path: '/*',
        hidden: true,
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
    },
    ],
    },
]

export default routes
