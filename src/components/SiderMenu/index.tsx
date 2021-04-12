import React, { memo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Menu } from 'antd'
import routes from '@src/router'
import { RouterConfig } from '@src/router/type'
import { filterPath } from '@src/utils/filter'

const { SubMenu } = Menu

  /* 无极菜单 */
const renderMenu = ({ path, title }: RouterConfig) => (
    <Menu.Item key={path as React.Key}>
        <Link to={path as string}>
            {title}
        </Link>
    </Menu.Item>
)

/* 子级菜单处理 */
const renderSubMenu = ({ children, path, title }: RouterConfig) => (
    <SubMenu key={path as React.Key} title={title}>
        {children?.map((item) => (
        item.children && item.children.length > 0 ? renderSubMenu(item) : renderMenu(item)
        ))}
    </SubMenu>  
)

const SiderMenu: React.FC = memo(() => {
    const { pathname } = useLocation()
    
    return (
        <Menu 
          theme='dark' 
          mode='inline' 
          selectedKeys={[pathname]}
          defaultOpenKeys={filterPath(pathname)}>
            {routes.map((route) => (
            route.children && route.children.length > 0 ? renderSubMenu(route) : renderMenu(route)
          ))}
        </Menu>
)
 })

export default SiderMenu
