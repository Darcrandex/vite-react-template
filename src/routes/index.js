import { lazy } from 'react'

export default [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@/pages/Home')),
  },
  {
    path: '/about',
    exact: true,
    component: lazy(() => import('@/pages/About')),
  },
  {
    path: '/support',
    exact: true,
    component: lazy(() => import('@/pages/Support')),
  },
]
