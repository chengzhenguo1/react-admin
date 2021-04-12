import { RouterConfig } from './type'

const menuRouters: RouterConfig[] = [
    {
        path: '/dashboard',
        title: '控制台',
        exact: true,
    },
    {
        path: '/user',
        title: '用户管理',
        children: [
            {
                path: '/user/add',
                title: '用户添加',
            },
            {
                path: '/user/delete',
                title: '用户删除',
            },
        ],
    },
    {
        path: '/department',
        title: '部门管理',
        children: [
            {
                path: '/department/list',
                title: '部门列表',
            },
            {
                path: '/department/delete',
                title: '添加部门',
            },
        ],
    },
    {
        path: '/job',
        title: '职位管理',
        children: [
            {
                path: '/job/list',
                title: '职位列表',
            },
            {
                path: '/job/delete',
                title: '添加职位',
            },
        ],
    },
    {
        path: '/worker',
        title: '员工管理',
        children: [
            {
                path: '/worker/list',
                title: '员工列表',
            },
        ],
    },
    {
        path: '/announcement',
        title: '公告管理',
        children: [
            {
                path: '/announcement/list',
                title: '公告列表',
            },
            {
                path: '/announcement/add',
                title: '新增公告',
            },
        ],
    },
    {
        path: '/a',
        title: '嵌套路由A',
        children: [
            {
                path: '/a/a',
                title: '嵌套路由AA',
                children: [
                    {
                        path: '/a/a/a',
                        title: '嵌套路由AAA',
                    },
                    {
                        path: '/a/a/b',
                        title: '嵌套路由AAB',
                    },
                ],
            },
            {
                path: '/a/b',
                title: '嵌套路由AB',
                children: [
                    {
                        path: '/a/b/a',
                        title: '嵌套路由ABA',
                    },
                ],
            },
        ],
    },
    {
        path: '/askforleave',
        title: '请假',
        exact: true,
    },
    {
        path: '/vertime',
        title: '加班',
        exact: true,
    },
]

export default menuRouters
