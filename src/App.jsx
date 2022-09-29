/**
 * @name App
 * @description
 * @author darcrand
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import TopicDetail from './pages/TopicDetail'
import Topics from './pages/Topics'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate to="topics" />} />
          <Route path="topics" element={<Topics />} />
          <Route path="topics/:id" element={<TopicDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
