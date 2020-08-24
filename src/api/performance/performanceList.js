import request from '@/utils/request'
export function selectAchievement(data) {
    return request({
        url: '/api/achievement/selectAchievement',
        method: 'post',
        data
    })
}
export function findAchievement(data) {
    return request({
        url: '/api/achievement/findAchievement',
        method: 'post',
        data
    })
}
export function delAchievement(data) {
    return request({
        url: '/api/achievement/delAchievement',
        method: 'post',
        data
    })
}
// performancePc
export function findApplyAchievement(data) {
    return request({
        url: '/api/achievement/findApplyAchievement',
        method: 'post',
        data
    })
}
export function editApplyAchievement(data) {
    return request({
        url: '/api/achievement/editApplyAchievement',
        method: 'post',
        data
    })
}
export function base64Uploads(data) {
    return request({
        url: '/api/uploads/base64Uploads',
        method: 'post',
        data
    })
}
export function sendEmail(data) {
    return request({
        url: '/api/achievement/sendEmail',
        method: 'post',
        data
    })
}
export function confirmAchievement(data) {
    return request({
        url: '/api/achievement/confirmAchievement',
        method: 'post',
        data
    })
}
export function addAchievement(data) {
    return request({
        url: '/api/achievement/addAchievement',
        method: 'post',
        data
    })
}

