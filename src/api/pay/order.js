import request from '@/utils/request'
import { urls } from '@/api/baseApi'

export function getList() {
  return request({
    baseURL: urls.urla,
    url: '/pay/order/findAll',
    method: 'get'
  })
}
export function getPage(pageNum,pageSize,data) {
  return request({
    baseURL: urls.urla,
    url: '/pay/order/findPage?pageNum='+pageNum+'&pageSize='+pageSize,
    method: 'post',
    data
  })
}
