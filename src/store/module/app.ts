import { Reducer } from 'redux'
import { IRoute } from '@src/router/type'
import store from 'store'
import { flattenRoute } from '@src/router/utils';
import { IAction } from '../type'

export interface AppState {
  sidebar: {
    opened: boolean
  }
  routes: IRoute[]
  /* flattenRoutes: IRoute[], */
  init: boolean
}

const SIDEBAR_KEY = 'React-ant-Admin-SideBar-Opened';

const opened = store.get(SIDEBAR_KEY, true)

const defaultApp: AppState = {
  sidebar: {
    opened: typeof opened === 'boolean' ? opened : true,
  },
  routes: [], // 过滤后的侧边栏
  /* flattenRoutes: [], // 路由表进行打平后的结果，用来进行校验使用 */
  init: false, // 进行判断是否初始化
}

const SET_SIDE_BAR_OPENED = 'SET_SIDE_BAR_OPENED'
const SET_SIDE_BAR_ROUTES = 'SET_SIDE_BAR_ROUTES'
const RMOVE_SIDE_BAR_ROUTES = 'RMOVE_SIDE_BAR_ROUTES'

export const updateSideBar = (sidebar: AppState['sidebar']) => ({
  type: SET_SIDE_BAR_OPENED,
  payload: sidebar,
})

export const setSideBarRoutes = (routes: IRoute[]) => ({
  type: SET_SIDE_BAR_ROUTES,
  payload: routes,
})

export const clearSideBarRoutes = () => ({
  type: RMOVE_SIDE_BAR_ROUTES,
  payload: null,
})

const appReducer: Reducer<AppState, IAction<any>> = (state = defaultApp, action: IAction<any>) => {
  const { type, payload } = action

  switch (type) {
    case SET_SIDE_BAR_OPENED:
      store.set(SIDEBAR_KEY, (payload as AppState['sidebar']).opened)

      return {
        ...state,
        sidebar: payload,
      }

      /* 路由 */
    case SET_SIDE_BAR_ROUTES:
      return {
        ...state,
        routes: payload,
        /* flattenRoutes: flattenRoute(payload, true), */
        init: true,
      }
      /* 移除路由 */
    case RMOVE_SIDE_BAR_ROUTES:
      return {
        ...state,
        routes: [],
        /* flattenRoutes: [], */
        init: false,
      }

    default:
      return {
        ...state,
      }
  }
}

export default appReducer
