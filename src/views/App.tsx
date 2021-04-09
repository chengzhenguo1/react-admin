import React, { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { Button } from 'antd'
import authApi from '../api/auth'

function App() {
  const [login, loginFn] = useAsyncFn(authApi.login)
  useEffect(() => {
    console.log(loginFn({ username: 'asd', password: 'sad', code: '10123' }))
  }, [])
  return (
      <div className='App'>
          <Button>btn</Button>
      </div>
  )
}

export default App
