import { useRecoilState, atom } from 'recoil'

const stateAtom = atom({ key: 'user', default: { id: '', username: '', nickname: '' } })

export function useUser() {
  const [userInfo, setUserInfo] = useRecoilState(stateAtom)
  const hadLogin = Boolean(userInfo.id)

  const login = async () => {
    setUserInfo({ id: '001', username: 'jake@gmail.com', nickname: 'Jake' })
  }

  return { userInfo, hadLogin, login }
}
