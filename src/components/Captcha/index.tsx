import React, {
 memo, useState, useEffect, useRef, 
} from 'react'
import { IDictionary } from '@src/typings/global'
import { Button, message } from 'antd'
import authApi from '@src/api/auth'
import { useAsyncFn } from 'react-use'
import { EMAILREG } from '@src/constants/validate'

interface IProps {
    module: 'login' | 'register'
    username: string
}

interface BtnState {
    state: boolean
    info: string
}

const currentState: IDictionary<BtnState> = {
    init: {
        info: '获取验证码',
        state: false,
    },
    sending: {
        info: '发送中',
        state: true,
    },
    countDown: {
        info: 'S',
        state: true,
    },
    Error: {
        info: '重新获取',
        state: false,
    },
}

const Captcha: React.FC<IProps> = memo(({ module, username }) => {
    let count = 60

    const timer = useRef<null | number>(null)
    
    const [state, setState] = useState(currentState.init)

    const [, getSmsFn] = useAsyncFn(authApi.getSms)

    /* 清理定时器 */
    useEffect(() => () => {
        if (timer.current)clearInterval(timer.current)
    }, [])

    /* 按钮状态 */
    const handleGetCaptcha = () => {
        if (username && EMAILREG.test(username)) {
            setState(currentState.sending)
            getSmsFn({ username, module }).then((code) => {
                message.success(code)
                timer.current = window.setInterval(() => {
                    count -= 1
                    setState({
                        info: `${count}${currentState.countDown.info}`,
                        state: currentState.countDown.state,
                    })

                    if (count <= 0) {
                        clearInterval(Number(timer.current))
                        setState(currentState.Error)
                    }
                }, 1000)
           })
        } else {
            message.error('请输入合法的用户名!')
        }
    }

    return (
        <Button type='primary' block onClick={handleGetCaptcha} loading={state.state}>
            {state.info}
        </Button>
)
 })

export default Captcha
