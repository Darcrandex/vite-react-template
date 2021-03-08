/**
 * @name App
 * @description
 * @author darcrand
 */

import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'

import { useStore } from '@/store'
import routes from '@/routes'
import { ScreenLoading } from '@/components'

const App = () => {
  return (
    <>
      <Suspense fallback={<ScreenLoading loading />}>
        <Switch>
          {routes.map(({ path, ...rest }) => (
            <Route key={path} path={path} {...rest} />
          ))}
        </Switch>
      </Suspense>

      <RequestLoadingTips />
    </>
  )
}

// 请求 loading 提示(细粒度控制)
const RequestLoadingTips = observer(() => {
  const { request } = useStore()
  return <ScreenLoading loading={request.isFetching} />
})

export default React.memo(App)
