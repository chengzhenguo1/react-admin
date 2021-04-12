import { RouteProps } from 'react-router-dom'

export type Roles = ('admin'| 'user')

export interface RouterConfig extends RouteProps{
    title: string
    icon?: string
    children?: RouterConfig[]
    roles?: Roles[]
}
