import { atom, useAtom } from 'jotai'
import { useMemo } from 'react'

const userAtom = atom({ id: '', username: '', nickname: '' })

export function useUser() {
  const [userInfo, setUserInfo] = useAtom(userAtom)
  const hadLogin = useMemo(() => Boolean(userInfo.id), [userInfo.id])
  const login = async () => {
    setUserInfo({ id: '001', username: 'darcrand@gmail.com', nickname: 'Darcrand' })
  }

  return { userInfo, login, hadLogin }
}
