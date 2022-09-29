import { http } from '@/utils/http'

export const apiTopic = {
  pages: () => http.get('/topics'),
  byId: (id) => http.get(`/topic/${id}`),
}
