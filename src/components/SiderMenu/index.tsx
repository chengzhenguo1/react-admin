import React, { memo, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { IRoute } from '@src/router/type'
import { pathToList } from '@src/router/utils'
import { IDictionary } from '@src/typings/global'
import {
 UserOutlined, AppstoreOutlined, WechatOutlined, UsergroupAddOutlined, AuditOutlined, MailOutlined, MehOutlined, FrownOutlined,
} from '@ant-design/icons'
import { IStoreState } from '@src/store/type'
import { Min_Width } from '@src/constants/app'

const { SubMenu } = Menu

interface IProps {
  routes?: IRoute[]
}

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
const renderMenu = ({ path, meta }: IRoute) => (
    <Menu.Item key={path as React.Key} icon={meta?.icon && IconMap[meta.icon]}>
        <Link to={path as string}>
            {meta?.title}
        </Link>
    </Menu.Item>
)

/* 子级菜单处理 */
const renderSubMenu = ({ children, path, meta }: IRoute) => (
    <SubMenu key={path as React.Key} title={meta?.title} icon={meta?.icon && IconMap[meta.icon]}>
        {children?.map((item) => (
        item.children && item.children.length > 0 ? renderSubMenu(item) : renderMenu(item)
        ))}
    </SubMenu>  
)

const SiderMenu: React.FC<IProps> = memo((props) => {
    const { pathname } = useLocation()

    const width = useMemo(() => document.body.clientWidth, [])

    return (
        <Menu 
          theme='dark' 
          mode='inline' 
          selectedKeys={[pathname]}
          defaultOpenKeys={width > Min_Width ? pathToList(pathname) : []}>
            {props?.routes?.map((route) => (
            route.children && route.children.length > 0 ? renderSubMenu(route) : renderMenu(route)
          ))}
        </Menu>
)
 })

export default connect(({ app: { routes } }: IStoreState) => ({ routes }), null)(SiderMenu)
