import request from '@/utils/request'
export function selectOperationLog(data) {
  return request({
    url: '/api/operation/selectOperationLog',
    method: 'post',
    data
  })
}