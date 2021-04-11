import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd'
import routes from '@src/router'
import { RouterConfig } from '@src/router/type'

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

const SiderMenu: React.FC = memo(() => (
    <Menu theme='dark' defaultSelectedKeys={['0']} mode='inline'>
        {routes.map((route) => (
            route.children && route.children.length > 0 ? renderSubMenu(route) : renderMenu(route)
          ))}
    </Menu>
))

export default SiderMenu
