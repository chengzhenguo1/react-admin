import React, { memo } from 'react'

import { Menu } from 'antd'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons'
import routes from '@src/router'
import { RouterConfig } from '@src/router/type'

const { SubMenu } = Menu

const SiderMenu: React.FC = memo(() => {
  const renderMenu = (route: RouterConfig) => (
      <Menu.Item key={route.path as React.Key}>
          {route.title}
      </Menu.Item>
  )

  const renderSubMenu = ({ children, path, title }: RouterConfig) => (
      <SubMenu key={path as React.Key} title={title}>
          {children?.map((item) => (
          item.children && item.children.length > 0 ? renderSubMenu(item) : renderMenu(item)
          ))}
      </SubMenu>  
  )

  return (
      <Menu theme='dark' defaultSelectedKeys={['0']} mode='inline'>
          {routes.map((route) => (
            route.children && route.children.length > 0 ? renderSubMenu(route) : renderMenu(route)
          ))}
      </Menu>
)
 })

export default SiderMenu
