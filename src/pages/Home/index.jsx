/**
 * @name Home
 * @description 首页
 * @author darcrand
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import styles from './styles.module.less'

const Home = () => {
  return (
    <div>
      <h1 className={styles.title}>Home</h1>
      <p>
        <Link to='/about'>
          <Button type='primary'>测试页面</Button>
        </Link>
      </p>
      <p>
        <Link to='/support'>
          <Button type='primary'>浏览器兼容性测试</Button>
        </Link>
      </p>
    </div>
  )
}

export default React.memo(Home)
