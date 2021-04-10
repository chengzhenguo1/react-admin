import axios, { AxiosRequestConfig, ResponseType, AxiosInstance } from 'axios'
import { message as Message } from 'antd'
import { IDictionary } from '@src/typings/global'
import { BASE } from '@src/constants/server'

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

    /*  instance.interceptors.response.use(handleResponse, handleError) */

    return instance
}

/* const handleResponse = (response: any) => response.data

const handleError = (error: any) => {
    const { response, message } = error
    return Promise.reject(response ? new Error(response.data.message || message) : error)
} */

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

/* 响应拦截器 */
request.interceptors.response.use((res:any):any => {
    if (res?.data?.resCode !== 0) {
        return Message.error(res?.data?.message || '请求错误')
    }
    return res.data
}, toastError)

export default request
