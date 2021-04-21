import { routes } from './index'
import { IRoute } from './type'

/*
   动态生成路由流程
   1.首先遍历生成最外层的布局路由，也就是layoutRouteList属性
   在app.tsx中以下代码
   {layoutRouteList.map((route: IRoute) => (
        <Route
        key={`${route.path}`}
        path={route.path}
        exact={route.exact}
        component={route.component} />
    ))}
    2.在layout中遍历 /下的路由，需要检验的路由，进行条件渲染businessRouteList属性
    在Layout/MainRoutes/index.tsx
      2.1使用auth包裹进行条件渲染，渲染出有权限的的路由,没有权限的进行403跳转
    有权限但有redirect属性的进行重定向
      2.2使用AsyncRoutes包裹剩下条件渲染后的组件。使用dashboardRouteList属性动态生成侧边栏以及进行渲染动画
    3.在UserLayout中遍历 /system下的路由，即登录，注册等。及systemRouteList属性下的路由
    在UserLayout/index.tsx 
      2.1进行循环生成以及布局和捕获错误
      
*/

/* 解析当前path路径, /a/a/a 解析成[/a],[/a/a],[/a/a/a] */
export const pathToList = (path: string): string[] => {
    const pathList = path.split('/').filter((item) => item)
    return pathList.map((item, index) => `/${pathList.slice(0, index + 1).join('/')}`)
}

/* 递归查找当前path路径中的路由,[/a/a/a],将a,aa,aaa加入进去 */
function findRoutesByPaths(pathList: string[], routes: IRoute[]): IRoute[] {
    const res: IRoute[] = []  
    routes.forEach(
        (child: IRoute) => {
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

/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 * @param deep 是否深层转化
 */

export function flattenRoute(routeList: IRoute[], deep: boolean): IRoute[] {
    const result: IRoute[] = []
  
    for (let i = 0; i < routeList.length; i += 1) {
      const route = routeList[i]
  
      result.push({
        ...route,
      })
  
      if (route.children && deep) {
        result.push(...flattenRoute(route.children, deep))
      }
    }
  
    return result
}

function getLayoutRouteList(): IRoute[] {
    return flattenRoute(routes, false)
}

function getBusinessRouteList(): IRoute[] {
    const routeList = routes.filter((route) => route.path === '/')
    if (routeList.length > 0) {
      return flattenRoute(routeList, true)
    }
    return []
}

function getSystemRouteList(): IRoute[] {
    const routeList = routes.filter((route) => route.path === '/system');
  
    if (routeList.length > 0) {
       return flattenRoute(routeList, true).slice(1)
    }
    return []
}

function getDashboardRouteList(): IRoute[] {
    const routeList = routes.filter((route) => route.path === '/')
    return routeList[0].children || []
}

/**
 * 这里会将 config 中所有路由解析成三个数组
 * 第一个: 最外层的路由，例如  Layout UserLayout ...
 * 第二个: 系统路由, 例如 Login Register RegisterResult
 * 第三个: 业务路由，为 /system 路由下的业务路由
 * 第四个: 业务路由，为 /dashboard 路由下的业务路由渲染侧边栏
 */

export const layoutRouteList = getLayoutRouteList()
export const businessRouteList = getBusinessRouteList()
export const systemRouteList = getSystemRouteList()
export const dashboardRouteList = getDashboardRouteList()

/* 页面标题 */
export function getPageTitle(routeList: IRoute[]): string {
  const route = routeList.find((child) => child.path === window.location.pathname)
  return route ? route.meta.title : ''
}

/* 面包屑 */
export function getBreadcrumbs(path: string): IRoute[] {
    return findRoutesByPaths(pathToList(path), routes)
}
