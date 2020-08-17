import request from '@/utils/request'
import { urls } from '@/api/baseApi'
export function findPage(data,pageIndex,pageNum) {
  return request({
    baseURL: urls.urla,
    url: '/shop/category/findPage?pageIndex='+pageIndex +"&pageNum="+pageNum,
    method: 'post',
    data
  })
}
export function del(id) {
  return request({
    baseURL: urls.urla,
    url: '/shop/category/del?id='+id,
    method: 'get',
  })
}
export function add(data) {
  return request({
    baseURL: urls.urla,
    url: '/shop/category/add',
    method: 'post',
    data
  })
}
export function categoryByid(id) {
  return request({
    baseURL: urls.urla,
    url: '/shop/category/findByid?id='+id,
    method: 'get'
  })
}
export function upDate(data) {
  return request({
    baseURL: urls.urla,
    url: '/shop/category/update',
    method: 'post',
    data
  })
}
