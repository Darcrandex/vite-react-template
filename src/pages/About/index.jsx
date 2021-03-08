/**
 * @name About
 * @description about
 * @author darcrand
 */

import React from 'react'
import { Prompt } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useStore } from '@/store'
import { get } from '@/utils/http'

const About = observer(() => {
  const { counter } = useStore()

  return (
    <>
      <Prompt message='当尝试离开这个页面时会提示这个信息' />

      <h1>About</h1>

      <p>count: {counter.state.count}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.sub}>sub</button>

      <button
        onClick={() => {
          get('/topics')
        }}
      >
        by default proxy
      </button>
      <button
        onClick={() => {
          get('/api-abc/topics')
        }}
      >
        by custom proxy
      </button>
      <button
        onClick={() => {
          get('https://cnodejs.org/api/v1/topics')
        }}
      >
        by http
      </button>
    </>
  )
})

export default React.memo(About)
