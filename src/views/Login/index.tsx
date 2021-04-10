import React, { memo, useState } from 'react'

import './index.less'
import { IDictionary } from '@src/typings/global'
import LoginForm from './Form/loginForm'
import RegisterForm from './Form/registerForm'

interface State {
    title: string
    toggleText: string
}

const FormType: IDictionary<State> = {
    LOGIN: {
        title: '登录',
        toggleText: '去注册',
    },
    REGISTER: {
        title: '注册',
        toggleText: '去登录',
    },
}

const Login: React.FC = memo(() => {
   const [state, setState] = useState(FormType.LOGIN)

   const handleToggleState = () => {
    if (state === FormType.LOGIN) {
        setState(FormType.REGISTER)
    } else {
        setState(FormType.LOGIN)
    }
   }

   return (
       <div className='login'>
           <div className='login-card'>
               <div className='login-header'>
                   <div className='login-title'>
                       {state.title}
                   </div>
                   <div className='login-toggle' onClick={handleToggleState}>
                       {state.toggleText}
                   </div>
               </div>
               {state === FormType.LOGIN ? <LoginForm /> : <RegisterForm toggleState={handleToggleState} />}
           </div>
       </div>
    )
})

export default Login