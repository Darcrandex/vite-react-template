import { makeAutoObservable, runInAction } from 'mobx'

function sleep(ms = 1000) {
  return new Promise((r) => {
    const t = setTimeout(() => {
      clearTimeout(t)
      r()
    }, ms)
  })
}

// 模块的另一种写法
const counter = makeAutoObservable({
  // 支持深层监听
  state: { count: 0 },

  add() {
    counter.state.count++
  },

  // 异步更新
  async sub() {
    await sleep()

    runInAction(() => {
      counter.state.count--
    })
  },
})

export default counter
