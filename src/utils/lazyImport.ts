import { lazy } from 'react'

// eslint-disable-next-line import/prefer-default-export  
export function lazyImport(url: string, timer = 300) {
    return lazy(() => new Promise((resolve) => {
        setTimeout(() => resolve(import(/*  @vite-ignore */url)), timer)
    }))
}
