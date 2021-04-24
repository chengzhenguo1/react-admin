import React, { memo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, Result } from 'antd'

const SuccessPage: React.FC = memo(() => {
    const { state } = useLocation<{title: string, path: string}>()
    const { push, goBack } = useHistory()
    return (
        <Result 
          status='success'
          title={state.title}
          subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
          extra={[
              <Button type='primary' key='console' onClick={() => push(state.path || '/')}>
                  查看列表
              </Button>,
              <Button key='buy' onClick={goBack}>再次添加</Button>,
      ]} />
)
 })

export default SuccessPage
