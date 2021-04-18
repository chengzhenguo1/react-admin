import React, { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Menu } from 'antd'
import routes from '@src/router'
import { RouterConfig } from '@src/router/type'
import { pathToList } from '@src/router/utils'
import { IDictionary } from '@src/typings/global'
import {
 UserOutlined, AppstoreOutlined, WechatOutlined, UsergroupAddOutlined, AuditOutlined, MailOutlined, MehOutlined, FrownOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu

const IconMap: IDictionary<any> = {
  UserOutlined: <UserOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
  WechatOutlined: <WechatOutlined />,
  AuditOutlined: <AuditOutlined />,
  UsergroupAddOutlined: <UsergroupAddOutlined />,
  MailOutlined: <MailOutlined />,
  MehOutlined: <MehOutlined />,
  FrownOutlined: <FrownOutlined />,
}

  /* 无极菜单 */
const renderMenu = ({ path, meta }: RouterConfig) => (
    <Menu.Item key={path as React.Key} icon={meta?.icon && IconMap[meta.icon]}>
        <Link to={path as string}>
            {meta.title}
        </Link>
    </Menu.Item>
)

/* 子级菜单处理 */
const renderSubMenu = ({ children, path, meta }: RouterConfig) => (
    <SubMenu key={path as React.Key} title={meta.title} icon={meta?.icon && IconMap[meta.icon]}>
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
          defaultOpenKeys={pathToList(pathname)}>
            {routes.map((route) => (
            route.children && route.children.length > 0 ? renderSubMenu(route) : renderMenu(route)
          ))}
        </Menu>
)
 })

export default SiderMenu
