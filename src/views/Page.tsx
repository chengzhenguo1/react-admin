import React, { memo } from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from '@src/components/PrivateRoute'
import LayOut from '@src/components/Layout'
import NotFount from '@src/components/NotFount'
import prase from '@src/utils/prase'

const modules = import.meta.globEager('./**/*.tsx')

const Page: React.FC = memo(() => (
    <LayOut>
        <Switch>
            {prase.renderDynamicImport(modules).map((item) => item?.Component 
                && (
                <PrivateRoute 
                  path={item.path} 
                  key={item.path} 
                  component={item.Component} />
            ))}
            <PrivateRoute path='*' component={NotFount} exact />
        </Switch>
    </LayOut>
))

export default Page
