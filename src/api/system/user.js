import request from '@/utils/request'
import { urls } from '@/api/baseApi'

export function getList(page) {
  return request({
    baseURL: urls.urla,
    url: `/system/user/page/${page.size}/${page.curr}`,
    method: 'post',
    data: page.data
  })
}
export function findUserById(id) {
  return request({
    baseURL: urls.urla,
    url: `/system/user/findUserById?id=${id}`,
    method: 'get'
  })
}

