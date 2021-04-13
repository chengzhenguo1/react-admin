import React, {
 memo, useState, useEffect, useRef, 
} from 'react'
import { IDictionary } from '@src/typings/global'
import { Button, FormInstance, message } from 'antd'
import authApi from '@src/api/auth'
import { useAsyncFn, useCounter } from 'react-use'

const COUNT_STATIC = 60
interface IProps {
    module: 'login' | 'register'
    form: FormInstance
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

const Captcha: React.FC<IProps> = memo(({ module, form }) => {
    const [state, setState] = useState(currentState.init)
    const [, { get, set, reset }] = useCounter(COUNT_STATIC)
    const timer = useRef<null | number>(null)
    const [, getSmsFn] = useAsyncFn(authApi.getSms)

    /* 清理定时器 */
    useEffect(() => () => {
        if (timer.current)clearInterval(timer.current)
    }, [])
    
    /* 按钮状态 */
    const handleGetCaptcha = async () => {
        form.validateFields(['username']).then((res) => {
                setState(currentState.sending)
                getSmsFn({ username: res.username, module }).then((data) => {
                    /* 校验通过，开始倒计时 */
                    message.success(data.message)
                    timer.current = window.setInterval(() => {
                        set((value) => value - 1)
                        setState({
                            info: `${get()}${currentState.countDown.info}`,
                            state: currentState.countDown.state,
                        })
    
                        if (get() <= 0) {
                            clearInterval(Number(timer.current))
                            setState(currentState.Error)
                            reset()
                        }
                    }, 1000)
                }).catch(() => {
                    /* 校验失败，需重新获取验证码 */
                    setState(currentState.Error)
                    reset()
                })
        })
    }

    return (
        <Button type='primary' block onClick={handleGetCaptcha} loading={state.state}>
            {state.info}
        </Button>
)
 })

export default Captcha
