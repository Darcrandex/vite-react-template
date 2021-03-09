/**
 * @name About
 * @description about
 * @author darcrand
 */

import React from 'react'
import { Prompt } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Button } from 'antd'
import { useStore } from '@/store'
import { get } from '@/utils/http'
import styles from './styles.module.less'

const About = observer(() => {
  const { counter } = useStore()

  return (
    <>
      <Prompt message='当尝试离开这个页面时会提示这个信息' />

      <h1>About Page</h1>

      <ol>
        <li>
          <h2>mobx hooks</h2>
          <p>count: {counter.state.count}</p>
          <Button onClick={counter.add}>add</Button>
          <Button onClick={counter.sub}>sub async</Button>
        </li>
        <li>
          <h2>axios proxy</h2>
          <Button
            onClick={() => {
              get('/topics')
            }}
          >
            默认代理
          </Button>
          <Button
            onClick={() => {
              get('/api-abc/topics')
            }}
          >
            自定义代理
          </Button>
          <Button
            onClick={() => {
              get('https://cnodejs.org/api/v1/topics')
            }}
          >
            不使用代理
          </Button>
        </li>
        <li>
          <h2>less css module</h2>
          <p className={styles.text}>测试文本</p>
        </li>
      </ol>
    </>
  )
})

export default React.memo(About)
