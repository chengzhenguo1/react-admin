import React from 'react'
import { RouterConfig } from './type'

const menuRouters: RouterConfig[] = [
    {
        path: '/dashboard',
        exact: true,
        component: React.lazy(() => import('../views/Dashboard')),
        meta: {
            title: '控制台',
        },
    },
    {
        path: '/user',
        meta: {
            title: '用户管理',
        },
        redirect: '/user/add',
        children: [
            {
                path: '/user/add',
                component: React.lazy(() => import('../views/User/Add')),
                meta: {
                    title: '用户添加',
                },
            },
            {
                path: '/user/delete',
                component: React.lazy(() => import('../views/User/Delete')),
                meta: {
                    title: '用户删除',
                },
            },
        ],
    },
    {
        path: '/department',
        redirect: '/department/list',
        meta: {
            title: '部门管理',
        },
        children: [
            {
                path: '/department/list',
                meta: {
                    title: '部门列表',
                },
                component: React.lazy(() => import('../views/Department/List')),
            },
            {
                path: '/department/add',
                meta: {
                    title: '添加部门',
                },
                component: React.lazy(() => import('../views/Department/Add')),
            },
        ],
    },
    {
        path: '/job',
        redirect: '/job/list',
        meta: {
            title: '职位管理',
        },
        children: [
            {
                path: '/job/list',
                meta: {
                    title: '职位列表',
                },
            },
            {
                path: '/job/add',
                meta: {
                    title: '添加职位',
                },
            },
        ],
    },
    {
        path: '/worker',
        redirect: '/worker/list',
        meta: {
            title: '员工管理',
        },
        children: [
            {
                path: '/worker/list',
                meta: {
                    title: '员工列表',
                },
            },
        ],
    },
    {
        path: '/announcement',
        redirect: '/announcement/list',
        meta: {
            title: '公告管理',
        },
        children: [
            {
                path: '/announcement/list',
                meta: {
                    title: '公告列表',
                },
            },
            {
                path: '/announcement/add',
                meta: {
                    title: '新增公告',
                },
            },
        ],
    },
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
        },
    },
    {
        path: '/vertime', 
        exact: true,
        meta: {
            title: '加班',
        },
    },
]

export default menuRouters
