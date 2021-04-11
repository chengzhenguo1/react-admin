import { RouteProps } from 'react-router-dom'

export interface RouterConfig extends RouteProps{
    title: string
    icon?: string
    children?: RouterConfig[]
}
