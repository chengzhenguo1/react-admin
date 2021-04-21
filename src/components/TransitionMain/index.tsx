import React, { Suspense } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import './index.less'
import { Spin } from 'antd'

interface TransitionMainProps {
  children: React.ReactNode
}

function TransitionMain({ children }: TransitionMainProps) {
  return (
      <Suspense fallback={<Spin className='lazy_loading' />}>
          <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition
                      key={location.pathname}
                      classNames='fade'
                      timeout={300}>
                        <Switch location={location}>{children}</Switch>
                    </CSSTransition>
                </TransitionGroup>
      )} />
      </Suspense>
  )
}

export default TransitionMain;
