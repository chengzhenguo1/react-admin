import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import './index.less'

interface TransitionMainProps {
  children: React.ReactNode
}

function TransitionMain({ children }: TransitionMainProps) {
  return (
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
  );
}

export default TransitionMain;
