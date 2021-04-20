import React from 'react'
import { IRoute } from './type'
import Login from '../views/Login/index'

export const routes: IRoute[] = [
    {
        path: '/login',
        meta: {
            title: '登录',
        },
        exact: true,
        component: Login, 
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: React.lazy(() => import('../components/Layout')),
        meta: {
            title: '系统',
        },
        children: [
            {
                path: '/dashboard',
                exact: true,
                roles: ['admin'],
                component: React.lazy(() => import('../views/Dashboard')),
                meta: {
                    title: '控制台',
                    icon: 'AppstoreOutlined',
                },
            },
            {
                path: '/user',
                meta: {
                    title: '用户管理',
                    icon: 'UserOutlined',
                },
                redirect: '/user/add',
                children: [
                    {
                        path: '/user/add',
                        component: React.lazy(() => import('../views/User/Add')),
                        meta: {
                            title: '用户添加',
                        },
                        roles: ['user'],
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
                    icon: 'WechatOutlined',
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
                    icon: 'AuditOutlined',
                },
                children: [
                    {
                        path: '/job/list',
                        meta: {
                            title: '职位列表',
                        },
                        component: React.lazy(() => import('../views/Job/List')),
                    },
                    {
                        path: '/job/add',
                        meta: {
                            title: '添加职位',
                        },
                        component: React.lazy(() => import('../views/Job/Add')),
                    },
                ],
            },
            /* {
                path: '/worker',
                redirect: '/worker/list',
                meta: {
                    title: '员工管理',
                    icon: 'UsergroupAddOutlined',
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
                    icon: 'MailOutlined',
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
        path: '/error',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
        children: [
          {
            path: '/error/404',
            component: React.lazy(() => import('../views/Error/404')),
            meta: {
              title: '页面不存在',
            },
          },
          {
            path: '/error/403',
            component: React.lazy(() => import('../views/Error/403')),
            meta: {
              title: '暂无权限',
            },
          },
        ],
    },
    {
        path: '/*',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
    },
    ],
    },
]

export default routes
