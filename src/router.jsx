import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import App from './App'
import Home from './pages/Home'
import TopicDetail from './pages/TopicDetail'
import Topics from './pages/Topics'

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
