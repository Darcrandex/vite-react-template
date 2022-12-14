/**
 * @name ScreenLoading
 * @description 全屏loading
 * @author darcrand
 */

import React, { useMemo } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './styles.module.less'

/**
 * @prop {boolean} loading 是否loading
 * @prop {number?} zIndex 元素层级
 */
const ScreenLoading = ({ loading = false, zIndex = 100 }) => {
  const computedClassName = useMemo(() => {
    return [styles.container, loading ? styles.show : styles.hide].join(' ')
  }, [loading])

  return (
    <div className={computedClassName} style={{ zIndex }}>
      <span className={styles.loading_ico}>
        <LoadingOutlined />
      </span>
    </div>
  )
}

export default React.memo(ScreenLoading)
