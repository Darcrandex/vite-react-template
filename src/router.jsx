import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import App from './App'

const suspenseWrapper = (Component) => {
  const LazyComponent = () => {
    return (
      <React.Suspense
        fallback={
          <section className="flex items-center justify-center h-24 text-center text-violet-500">
            <LoadingOutlined />
            <span className="ml-4">Loading...</span>
          </section>
        }
      >
        <Component />
      </React.Suspense>
    )
  }

  return LazyComponent
}

const Home = suspenseWrapper(React.lazy(() => import('./pages/Home')))
const Topics = suspenseWrapper(React.lazy(() => import('./pages/Topics')))
const TopicDetail = suspenseWrapper(React.lazy(() => import('./pages/TopicDetail')))

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<Home />}>
        <Route index element={<Navigate to="topics" />} />
        <Route path="topics" element={<Topics />} />
        <Route path="topics/:id" element={<TopicDetail />} />
      </Route>
    </Route>
  )
)
