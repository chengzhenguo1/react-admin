import React, { memo } from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const Noauthorized: React.FC = memo(() => {
  console.log('403')
  return (
      <Result
        status='403'
        title='403'
        subTitle='抱歉, 您没有该页面权限.'
        extra={<Button type='primary'><Link to='/dashboard' replace>返回主页</Link></Button>} />
  )
})

export default Noauthorized 
