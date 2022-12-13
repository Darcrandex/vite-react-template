/**
 * @name App
 * @description
 * @author darcrand
 */

import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  useEffect(() => {
    console.log('something run on root app')
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
