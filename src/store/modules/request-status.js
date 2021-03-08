import { makeAutoObservable } from 'mobx'

const requestStatus = makeAutoObservable({
  requestCount: 0,
  get isFetching() {
    return this.requestCount > 0
  },

  add() {
    ++requestStatus.requestCount
  },

  sub() {
    --requestStatus.requestCount
  },
})

export default requestStatus
