/**
 * @name Home
 * @description
 * @author darcrand
 */

import { Outlet } from 'react-router-dom'
import { Avatar } from 'antd'
import { useUser } from '@/stores/use-user'

function Home() {
  const { userInfo, hadLogin, login } = useUser()
  return (
    <>
      <header className="flex items-center justify-between h-20 px-8 bg-white shadow-lg">
        <div>
          <img src="/vite.svg" alt="" />
        </div>

        <div>
          {hadLogin ? (
            <>
              <span className="mr-4 text-lg font-bold text-violet-700">welcome, {userInfo.nickname}</span>
              <Avatar size="large" className="bg-violet-400">
                {userInfo.nickname}
              </Avatar>
            </>
          ) : (
            <button
              type="button"
              className="px-4 py-2 rounded-md font-bold text-violet-500 border-2 border-violet-500 bg-white transition-all hover:bg-violet-500 hover:text-white hover:shadow-lg"
              onClick={login}
            >
              Login Now
            </button>
          )}
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default Home
