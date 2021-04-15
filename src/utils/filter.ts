// eslint-disable-next-line import/prefer-default-export
export const pathToList = (path: string): string[] => {
    const pathList = path.split('/').filter((item) => item)
    return pathList.map((item, index) => `/${pathList.slice(0, index + 1).join('/')}`)
}
