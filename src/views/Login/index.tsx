import React, { memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getToken } from '@src/utils/auth'
import { Player } from '@lottiefiles/react-lottie-player'
import { LoginPath } from '@src/constants/lottiePath'
import LoginForm from './Form/loginForm'
import RegisterForm from './Form/registerForm'
import './index.less'

interface State {
    title: string
    toggleText: string
}

interface FormTabType {
    LOGIN: State
    REGISTER: State
}

const FormTab: { [key in keyof FormTabType]: State } = {
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
   const [state, setState] = useState(FormTab.LOGIN)
   const { replace } = useHistory()

   useEffect(() => {
       /* 登录后直接跳转到主页 */
        const token = getToken()
        if (token) {
            replace('/dashboard')
        }
   }, [])

   const handleToggleState = () => {
    if (state === FormTab.LOGIN) {
        setState(FormTab.REGISTER)
    } else {
        setState(FormTab.LOGIN)
    }
   }

   return (
       <div className='login-wrap'>
           <Player
             autoplay
             loop
             hover
             src={LoginPath}
             style={{ height: '300px', width: '300px' }} />
           <div className='login-card'>
               <div className='login-header'>
                   <div className='login-title'>
                       {state.title}
                   </div>
                   <div className='login-toggle' onClick={handleToggleState}>
                       {state.toggleText}
                   </div>
               </div>
               {state === FormTab.LOGIN ? <LoginForm /> : <RegisterForm toggleState={handleToggleState} />}
           </div>
       </div>
    )
})

export default Login
