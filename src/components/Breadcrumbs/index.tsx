import React, { memo, useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import { getBreadcrumbs } from '@src/router/utils'
import { RouterConfig } from '@src/router/type'
import { Link, useLocation } from 'react-router-dom'
import './index.less'

const Breadcrumbs: React.FC = memo(() => {
    const [breadcrumbs, setBreadcrumbs] = useState<RouterConfig []>([])
    const { pathname } = useLocation()

    useEffect(() => {
        setBreadcrumbs(getBreadcrumbs(pathname))
    }, [pathname])

    return (
        <div className='breadcrumb-container mb-20'>
            <Breadcrumb>
                {breadcrumbs.map((item, index) => (
                    index === breadcrumbs.length - 1 ? <Breadcrumb.Item key={item.meta.title}>{item.meta.title}</Breadcrumb.Item>
           : (
               <Breadcrumb.Item key={item.meta.title}>
                   {item.meta.title}
                   {/*  <Link to={item.path as string}>
                       {item.meta.title}
                   </Link> */}
               </Breadcrumb.Item>
            )))}
            </Breadcrumb>
        </div>
)
})

export default Breadcrumbs
