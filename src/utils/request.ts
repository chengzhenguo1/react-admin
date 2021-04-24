import axios, { AxiosRequestConfig, ResponseType, AxiosInstance } from 'axios'
import { message as Message, Modal } from 'antd'
import { IDictionary } from '@src/typings/global'
import { BASE } from '@src/constants/server'
import { clearSideBarRoutes } from '@src/store/module/app'
import { logout } from '@src/store/module/user'
import store from '../store'
import { getToken, getUser } from './auth'

const TIMEOUT = 40000

const MIME_TYPE: IDictionary<ResponseType> = {
    JSON: 'json',
}

const createInstance = () => {
    const instance = axios.create({
        baseURL: BASE,
        withCredentials: true,
        timeout: TIMEOUT,
        responseType: MIME_TYPE.JSON,
    })
    return instance
}

const toastError = (error: any) => {
    const { response, message } = error

    Message.error(response?.data?.message || message)

    return Promise.reject(error)
}

interface Instance extends AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
}

export const requestWithoutErrorToast: Instance = createInstance()

const request: Instance = createInstance()

/* 请求拦截器 */
request.interceptors.request.use((config) => {
    config.headers.Token = getToken()
    config.headers.Username = getUser()
    return config
}, toastError)

/* 响应拦截器 */
request.interceptors.response.use((res:any):any => {
    if (res?.data?.resCode !== 0) {
        /* token过期 */
        if (res?.data?.resCode === 1040) {
            Modal.confirm({
                title: '系统提示',
                content: res?.data?.message,
                okText: '重新登录',
                cancelText: '取消',
                onOk() {
                  store.dispatch(clearSideBarRoutes())
                  store.dispatch(logout())
                  window.location.href = `${
                    window.location.origin
                  }/system/login?redirectURL=${encodeURIComponent(window.location.href)}`
                },
            })
        }
        Message.error(res?.data?.message || '网络错误')
        return Promise.reject()
    }
    
    return Promise.resolve(res.data)
}, toastError)

export default request
