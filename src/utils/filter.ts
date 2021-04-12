// eslint-disable-next-line import/prefer-default-export
export const filterPath = (path: string): string[] => path.split('/').slice(1).map((item) => `/${item}`)
