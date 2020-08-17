import request from '@/utils/request'
import { urls } from '@/api/baseApi'

export function getList() {
  return request({
    baseURL: urls.urla,
    url: '/system/findAll',
    method: 'get'
  })
}

