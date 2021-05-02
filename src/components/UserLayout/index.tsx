import React, { Suspense } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import {
 Spin, Result, Button, Typography, 
} from 'antd'
import { IRoute } from '@src/router/type'
import './index.less'
import { systemRouteList } from '@src/router/utils'

interface UserLayoutState {
  isError: boolean
}

class UserLayout extends React.PureComponent<any, UserLayoutState> {
  // eslint-disable-next-line react/state-in-constructor
  state: UserLayoutState = {
    isError: false,
  }

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch() {
    // 上报错误
  }

  render() {
    if (this.state.isError) {
      return (
          <Result
            status='warning'
            title='系统错误，请联系管理员'
            extra={(
                <Button type='primary' key='console'>
                    Go Contact
                </Button>
          )} />
      );
    }

    return (
        <>
            <div className='container'>
                <div className='content'>
                    <ul className='bubble-bgwall'>
                        {/* eslint-disable-next-line react/no-array-index-key */}
                        {new Array(10).fill(0).map((item, index) => <li key={index}>Admin</li>)}
                    </ul>
                    <div className='top'>
                        <Typography.Title className='base-header'>
                            <Link to='/'>
                                <span className='title'>React Ant Admin </span>
                            </Link>
                        </Typography.Title>
                    </div>
                    <Suspense fallback={<Spin className='lazy_loading' />}>
                        <Switch>
                            {systemRouteList.map((menu: IRoute) => (
                                <Route exact key={menu.path as string} path={menu.path} component={menu.component} />
                            ))}
                        </Switch>
                    </Suspense>
                </div>
            </div>
        </>
    )
  }
}

export default UserLayout
