import { FC } from 'react'

/* 不需要批量引入的路由 */
const filterRoutes: string[] = ['Login', 'App']

/* 动态批量引入路由 */
const renderDynamicImport = (modules : Record<string, {[key: string]: any}>) => 
     // eslint-disable-next-line implicit-arrow-linebreak
    Object.keys(modules).map((path): { path: string, Component: FC } | undefined => {
        /* 过滤不需要引入的路由 */
        if (!filterRoutes.some((route) => path.includes(route))) {
            /* 解析路径,返回path和组件  */
            const arr = path.split('/')
            const iPath = arr.slice(1, arr.length - 1).join('/').toLowerCase()
            return {
                path: `/${iPath}`,
                Component: modules[path].default,
            }
        }
        return undefined
})

export default {
    renderDynamicImport,
}
