import request from '@/utils/request'
//面试列表
export function selectInterview(data) {
  return request({
    url: '/api/interview/selectInterview',
    method: 'post',
    data
  })
}
//添加面试
export function addInterviewInfo(data) {
  return request({
    url: '/api/interview/addInterviewInfo',
    method: 'post',
    data
  })
}
//面试详情
export function findInterview(data) {
  return request({
    url: '/api/interview/findInterview',
    method: 'post',
    data
  })
}
//面试删除
export function delInterviewInfo(data) {
  return request({
    url: '/api/interview/delInterviewInfo',
    method: 'post',
    data
  })
}
//面试修改
export function editInterviewOption(data) {
  return request({
    url: '/api/interview/editInterviewOption',
    method: 'post',
    data
  })
}
//面试转正
export function autoToEmployee(data) {
  return request({
    url: '/api/employee/autoToEmployee',
    method: 'post',
    data
  })
}

//文件删除
export function deleteFile(data) {
  return request({
    url: '/api/interview/deleteFile',
    method: 'post',
    data
  })
}
