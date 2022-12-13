import { http } from '@/utils/http'

export const apiTopic = {
  pages: (params) => http.get('/topics', { params }),
  byId: (id) => http.get(`/topic/${id}`),
}
