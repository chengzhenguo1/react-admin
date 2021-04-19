import { routes } from './index'
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

export function flattenRoute(routeList: RouterConfig[], deep: boolean, auth: boolean): RouterConfig[] {
    const result: RouterConfig[] = []
  
    for (let i = 0; i < routeList.length; i += 1) {
      const route = routeList[i]
  
      result.push({
        ...route,
        /* auth: typeof route.auth !== 'undefined' ? route.auth : auth, */
      });
  
      if (route.children && deep) {
        result.push(...flattenRoute(route.children, deep, auth))
      }
    }
  
    return result
}

function getLayoutRouteList(): RouterConfig[] {
    console.log(flattenRoute(routes, false, false))
    return flattenRoute(routes, false, false)
}

function getBusinessRouteList(): RouterConfig[] {
    const routeList = routes.filter((route) => route.path === '/')
  
    if (routeList.length > 0) {
      return flattenRoute(routeList, true, true)
    }
    return []
}
  
function getSystemRouteList(): RouterConfig[] {
    const routeList = routes.filter((route) => route.path === '/system')

    if (routeList.length > 0) {
        return flattenRoute(routeList, true, false);
    }
    return []
}

export const layoutRouteList = getLayoutRouteList()
export const businessRouteList = getBusinessRouteList()
export const systemRouteList = getSystemRouteList()

/* 页面标题 */
export function getPageTitle(routeList: RouterConfig[]): string {
  const route = routeList.find((child) => child.path === window.location.pathname)

  return route ? route.meta.title : ''
}

/* 面包屑 */
export function getBreadcrumbs(path: string): RouterConfig[] {
    return findRoutesByPaths(pathToList(path), routes)
}
