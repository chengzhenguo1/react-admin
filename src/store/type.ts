import { AppState } from './module/app';
import { UserState } from './module/user'

export interface IStoreState{
    user: UserState
    app: AppState
}

export interface IAction<T> {
    type: string
    payload: T
}
