/**
 * @name Topics
 * @description
 * @author darcrand
 */

import { apiTopic } from '@/services/topic'
import { useQuery } from '@tanstack/react-query'
import { Avatar, FloatButton } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigate } from 'react-router-dom'

dayjs.extend(relativeTime)

function Topics() {
  const navigate = useNavigate()

  const { data } = useQuery(['topics'], apiTopic.pages, {
    placeholderData: [],
    select(res) {
      if (res && Array.isArray(res.data?.data)) {
        return res.data.data.map((v) => ({
          ...v,
          dateStr: dayjs(v.create_at).isValid() ? dayjs(v.create_at).fromNow() : '',
        }))
      }

      return []
    },
  })

  return (
    <>
      <h1 className="py-10 font-extrabold text-center text-4xl text-violet-500">Topics of cnodejs</h1>

      <ul className="mx-auto p-4 w-[800px] max-w-full divide-y">
        {data.map((v) => (
          <li
            key={v.id}
            onClick={() => navigate(`/topics/${v.id}`)}
            className="my-4 p-4 cursor-pointer rounded-md transition-all hover:bg-violet-100"
          >
            <p className="flex items-center">
              <Avatar size="large" src={v.author.avatar_url} className="shadow-md"></Avatar>
              <span className="ml-2 font-bold">{v.author.loginname}</span>
              <i className="flex-1"></i>
              <span className="text-gray-500">{v.dateStr}</span>
            </p>

            <h3 className="mt-2 text-lg">{v.title}</h3>
          </li>
        ))}
      </ul>

      <FloatButton.BackTop />
    </>
  )
}

export default Topics
