import { menuRouters } from './index'
import { RouterConfig } from './type'

/* 解析当前path路径 */
export const pathToList = (path: string): string[] => {
    const pathList = path.split('/').filter((item) => item)
    return pathList.map((item, index) => `/${pathList.slice(0, index + 1).join('/')}`)
}

/* 解析当前path路径中的路由 */
function findRoutesByPaths(pathList: string[], routes: RouterConfig[]):RouterConfig[] {
    const res: RouterConfig[] = []  
    routes.forEach(
        (child: RouterConfig) => {
            if (pathList.indexOf(`${child.path}`) !== -1) {
                res.push(child)
            }
            if (child.children && child.children.length > 1) {
                res.push(...findRoutesByPaths(pathList, child.children))
            }
        },
    )
    return res
}

export function getBreadcrumbs(path: string): RouterConfig[] {
    return findRoutesByPaths(pathToList(path), menuRouters)
}
