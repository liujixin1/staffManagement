import request from '@/utils/request'

export function selectEmployee(data) {
    return request({
        url: '/api/employee/selectEmployee',
        method: 'post',
        data
    })
}
export function addEmployee(data) {
    return request({
        url: '/api/employee/addEmployee',
        method: 'post',
        data
    })
}
export function findEmployee(data) {
    return request({
        url: '/api/employee/findEmployee',
        method: 'post',
        data
    })
}
export function delEmployee(data) {
    return request({
        url: '/api/employee/delEmployee',
        method: 'post',
        data
    })
}
export function appraiseEmployee(data) {
    return request({
        url: '/api/employee/appraiseEmployee',
        method: 'post',
        data
    })
}
export function sendEmail(data) {
    return request({
        url: '/api/employee/sendEmail',
        method: 'post',
        data
    })
}
export function editEmployeeOption(data) {
    return request({
        url: '/api/employee/editEmployeeOption',
        method: 'post',
        data
    })
}
//入职欢迎
export function sendWelcome(data) {
    return request({
      url: '/api/Employee/sendWelcome',
      method: 'post',
      data
    })
  }
  //全员入职欢迎
export function sendAllWelcome(data) {
    return request({
      url: '/api/Employee/sendAllWelcome',
      method: 'post',
      data
    })
  }