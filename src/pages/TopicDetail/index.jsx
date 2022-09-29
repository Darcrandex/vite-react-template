/**
 * @name TopicDetail
 * @description
 * @author darcrand
 */

import { useQuery } from '@tanstack/react-query'
import { Avatar, BackTop, Breadcrumb } from 'antd'
import { useParams, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { apiTopic } from '@/services/topic'

dayjs.extend(relativeTime)

function TopicDetail() {
  const { id } = useParams()

  const { data } = useQuery(['topic', id], () => apiTopic.byId(id), {
    enabled: !!id,
    select(res) {
      if (res?.data?.data) {
        return {
          ...res.data.data,
          dateStr: dayjs(res.data.data.create_at).isValid() ? dayjs(res.data.data.create_at).fromNow() : '',
        }
      }
      return {}
    },
  })

  if (!data) return <p className="py-10 text-center text-lg text-gray-700">Loading...</p>

  return (
    <>
      <Breadcrumb className="m-8">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="my-8 text-center text-xl text-violet-500 font-extrabold">{data.title}</h1>
      <p className="flex items-center justify-center">
        <Avatar src={data.author?.avatar_url} className="shadow-md"></Avatar>
        <span className="ml-2 text-lg font-bold text-gray-700">{data.author?.loginname}</span>
        <span className="mx-4">-</span>
        <span className=" text-gray-500">{data.dateStr}</span>
      </p>

      <div className="w-[800px] mx-auto p-6 max-w-full" dangerouslySetInnerHTML={{ __html: data?.content || '' }}></div>

      <BackTop />
    </>
  )
}

export default TopicDetail
