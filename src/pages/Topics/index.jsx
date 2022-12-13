/**
 * @name Topics
 * @description
 * @author darcrand
 */

import { apiTopic } from '@/services/topic'
import useUrlState from '@ahooksjs/use-url-state'
import { useQuery } from '@tanstack/react-query'
import { Avatar, FloatButton, Radio } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigate } from 'react-router-dom'

dayjs.extend(relativeTime)

const tabOptions = [
  { value: '', label: 'All' },
  { value: 'ask', label: 'Ask' },
  { value: 'share', label: 'Share' },
  { value: 'job', label: 'Job' },
  { value: 'good', label: 'Good' },
]

function Topics() {
  const navigate = useNavigate()

  const [params, setParams] = useUrlState({ tab: tabOptions[0].value })
  const { data, isFetching } = useQuery(['topics', params], () => apiTopic.pages(params), {
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

      <main className="mx-auto px-4 w-[800px] max-w-full">
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          size="large"
          options={tabOptions}
          value={params.tab}
          onChange={(e) => setParams({ tab: e.target.value })}
        />

        {isFetching && <p className="my-8 text-center text-xl">Loading...</p>}

        <ul className="divide-y">
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
      </main>

      <FloatButton.BackTop />
    </>
  )
}

export default Topics
