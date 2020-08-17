import request from '@/utils/request'
import { urls } from '@/api/baseApi'

export function findPage(data,pageIndex,pageNum) {
  return request({
    baseURL: urls.urla,
    url: '/shop/brand/findPage?pageIndex='+pageIndex +"&pageNum="+pageNum,
    method: 'post',
    data
  })
}
export function del(id) {
  return request({
    baseURL: urls.urla,
    url: '/shop/brand/del?id='+id,
    method: 'get',
  })
}
export function add(data) {
  return request({
    baseURL: urls.urla,
    url: '/shop/brand/brandAdd',
    method: 'post',
    data
  })
}
export function brandByid(id) {
  return request({
    baseURL: urls.urla,
    url: '/shop/brand/findByid?id='+id,
    method: 'get'
  })
}
export function upDate(data) {
  return request({
    baseURL: urls.urla,
    url: '/shop/brand/update',
    method: 'post',
    data
  })
}
