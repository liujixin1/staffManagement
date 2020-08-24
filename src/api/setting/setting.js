import request from '@/utils/request'
export function SelectSetting(data) {
    return request({
        url: '/api/setting/selectSetting',
        method: 'post',
        data
    })
}
export function SaveSetting(data) {
    return request({
        url: '/api/setting/saveSetting',
        method: 'post',
        data
    })
}
//系统设置-系统配置
// 应聘职位列表
export function selectAcceptOffer(data) {
    return request({
        url: '/api/option/selectAcceptOffer',
        method: 'post',
        data
    })
}
// 新增职位
export function addAcceptOffer(data) {
    return request({
        url: '/api/option/addAcceptOffer',
        method: 'post',
        data
    })
}
// 修改职位
export function editAcceptOffer(data) {
    return request({
        url: '/api/option/editAcceptOffer',
        method: 'post',
        data
    })
}
// 职位详情
export function findAcceptOffer(data) {
    return request({
        url: '/api/option/findAcceptOffer',
        method: 'post',
        data
    })
}
// 职位删除
export function delAcceptOffer(data) {
    return request({
        url: '/api/option/delAcceptOffer',
        method: 'post',
        data
    })
}

// 意向工作地点列表
export function selectIntended(data) {
    return request({
        url: '/api/option/selectIntended',
        method: 'post',
        data
    })
}
// 新增意向工作地点
export function addIntended(data) {
    return request({
        url: '/api/option/addIntended',
        method: 'post',
        data
    })
}
// 修改意向工作地点
export function editIntended(data) {
    return request({
        url: '/api/option/editIntended',
        method: 'post',
        data
    })
}
// 意向工作地点详情
export function findIntended(data) {
    return request({
        url: '/api/option/findIntended',
        method: 'post',
        data
    })
}
// 意向工作地点删除
export function delIntended(data) {
    return request({
        url: '/api/option/delIntended',
        method: 'post',
        data
    })
}

// 入司渠道列表
export function selectChannel(data) {
    return request({
        url: '/api/option/selectChannel',
        method: 'post',
        data
    })
}
//入司渠道新增
export function addChannel(data) {
    return request({
        url: '/api/option/addChannel',
        method: 'post',
        data
    })
}
// 入司渠道修改
export function editChannel(data) {
    return request({
        url: '/api/option/editChannel',
        method: 'post',
        data
    })
}
// 入司渠道详情
export function findChannel(data) {
    return request({
        url: '/api/option/findChannel',
        method: 'post',
        data
    })
}
// 入司渠道删除
export function delChannel(data) {
    return request({
        url: '/api/option/delChannel',
        method: 'post',
        data
    })
}


//短信模板新增
export function addMessageTpl(data) {
    return request({
        url: '/api/option/addMessageTpl',
        method: 'post',
        data
    })
}
// 短信模板修改
export function editMessageTpl(data) {
    return request({
        url: '/api/option/editMessageTpl',
        method: 'post',
        data
    })
}
// 短信模板删除
export function delMessageTpl(data) {
    return request({
        url: '/api/option/delMessageTpl',
        method: 'post',
        data
    })
}
// 短信模板列表
export function selectMessageTpl(data) {
    return request({
        url: '/api/option/selectMessageTpl',
        method: 'post',
        data
    })
}
// 短信模板详情
export function findMessageTpl(data) {
    return request({
        url: '/api/option/findMessageTpl',
        method: 'post',
        data
    })
}

//所在公司新增
export function addCompany(data) {
    return request({
        url: '/api/option/addCompany',
        method: 'post',
        data
    })
}
// 所在公司修改
export function editCompany(data) {
    return request({
        url: '/api/option/editCompany',
        method: 'post',
        data
    })
}
// 所在公司删除
export function delCompany(data) {
    return request({
        url: '/api/option/delCompany',
        method: 'post',
        data
    })
}
// 所在公司列表
export function selectCompany(data) {
    return request({
        url: '/api/option/selectCompany',
        method: 'post',
        data
    })
}
// 所在公司详情
export function findCompany(data) {
    return request({
        url: '/api/option/findCompany',
        method: 'post',
        data
    })
}
//所在校区新增
export function addSchool(data) {
    return request({
        url: '/api/option/addSchool',
        method: 'post',
        data
    })
}
// 所在校区修改
export function editSchool(data) {
    return request({
        url: '/api/option/editSchool',
        method: 'post',
        data
    })
}
// 所在校区删除
export function delSchool(data) {
    return request({
        url: '/api/option/delSchool',
        method: 'post',
        data
    })
}
//所在校区列表
export function selectSchool(data) {
    return request({
        url: '/api/option/selectSchool',
        method: 'post',
        data
    })
}
// 所在校区详情
export function findSchool(data) {
    return request({
        url: '/api/option/findSchool',
        method: 'post',
        data
    })
}

//所在部门新增
export function addDepartment(data) {
    return request({
        url: '/api/option/addDepartment',
        method: 'post',
        data
    })
}
// 所在部门修改
export function editDepartment(data) {
    return request({
        url: '/api/option/editDepartment',
        method: 'post',
        data
    })
}
//所在部门删除
export function delDepartment(data) {
    return request({
        url: '/api/option/delDepartment',
        method: 'post',
        data
    })
}
//所在部门列表
export function selectDepartment(data) {
    return request({
        url: '/api/option/selectDepartment',
        method: 'post',
        data
    })
}
// 所在部门详情
export function findDepartment(data) {
    return request({
        url: '/api/option/findDepartment',
        method: 'post',
        data
    })
}

//职位名称新增
export function addPosition(data) {
    return request({
        url: '/api/position/addPosition',
        method: 'post',
        data
    })
}
// 职位名称修改
export function editPosition(data) {
    return request({
        url: '/api/position/editPosition',
        method: 'post',
        data
    })
}
//职位名称删除
export function delPosition(data) {
    return request({
        url: '/api/position/delPosition',
        method: 'post',
        data
    })
}
//职位名称列表
export function selectPosition(data) {
    return request({
        url: '/api/position/selectPosition',
        method: 'post',
        data
    })
}
// 职位名称详情
export function findPosition(data) {
    return request({
        url: '/api/position/findPosition',
        method: 'post',
        data
    })
}
// 通过父级ID查询子集
export function selectPositionByPid(data) {
    return request({
        url: '/api/position/selectPositionByPid',
        method: 'post',
        data
    })
}
// 查询职位树形结构数据
export function selectPositionTree(data) {
    return request({
        url: '/api/position/selectPositionTree',
        method: 'post',
        data
    })
}
//岗位性质新增
export function addNature(data) {
    return request({
        url: '/api/option/addNature',
        method: 'post',
        data
    })
}
// 岗位性质修改
export function editNature(data) {
    return request({
        url: '/api/option/editNature',
        method: 'post',
        data
    })
}
//岗位性质删除
export function delNature(data) {
    return request({
        url: '/api/option/delNature',
        method: 'post',
        data
    })
}
//岗位性质列表
export function selectNature(data) {
    return request({
        url: '/api/option/selectNature',
        method: 'post',
        data
    })
}
// 岗位性质详情
export function findNature(data) {
    return request({
        url: '/api/option/findNature',
        method: 'post',
        data
    })
}
//状态配置新增
export function addEmployeeStatus(data) {
    return request({
        url: '/api/option/addEmployeeStatus',
        method: 'post',
        data
    })
}
// 状态配置修改
export function editEmployeeStatus(data) {
    return request({
        url: '/api/option/editEmployeeStatus',
        method: 'post',
        data
    })
}
//状态配置删除
export function delEmployeeStatus(data) {
    return request({
        url: '/api/option/delEmployeeStatus',
        method: 'post',
        data
    })
}
//状态配置列表
export function selectEmployeeStatus(data) {
    return request({
        url: '/api/option/selectEmployeeStatus',
        method: 'post',
        data
    })
}
// 状态配置详情
export function findEmployeeStatus(data) {
    return request({
        url: '/api/option/findEmployeeStatus',
        method: 'post',
        data
    })
}
//查询系统配置项
export function selectOptionList(data) {
    return request({
        url: '/api/option/selectOptionList',
        method: 'post',
        data
    })
}
//系统配置项设置
export function selectOption(data) {
    return request({
        url: '/api/option/selectOption',
        method: 'post',
        data
    })
}

//授课级别新增
export function addLessonsLevel(data) {
    return request({
        url: '/api/option/addLessonsLevel',
        method: 'post',
        data
    })
}
// 授课级别修改
export function editLessonsLevel(data) {
    return request({
        url: '/api/option/editLessonsLevel',
        method: 'post',
        data
    })
}
//授课级别删除
export function delLessonsLevel(data) {
    return request({
        url: '/api/option/delLessonsLevel',
        method: 'post',
        data
    })
}
//授课级别列表
export function selectLessonsLevel(data) {
    return request({
        url: '/api/option/selectLessonsLevel',
        method: 'post',
        data
    })
}
// 授课级别详情
export function findLessonsLevel(data) {
    return request({
        url: '/api/option/findLessonsLevel',
        method: 'post',
        data
    })
}

//教师类别新增
export function addTeacherType(data) {
    return request({
        url: '/api/option/addTeacherType',
        method: 'post',
        data
    })
}
// 教师类别修改
export function editTeacherType(data) {
    return request({
        url: '/api/option/editTeacherType',
        method: 'post',
        data
    })
}
//教师类别删除
export function delTeacherType(data) {
    return request({
        url: '/api/option/delTeacherType',
        method: 'post',
        data
    })
}
//教师类别列表
export function selectTeacherType(data) {
    return request({
        url: '/api/option/selectTeacherType',
        method: 'post',
        data
    })
}
// 教师类别详情
export function findTeacherType(data) {
    return request({
        url: '/api/option/findTeacherType',
        method: 'post',
        data
    })
}
//教师星级新增
export function addTeacherStar(data) {
    return request({
        url: '/api/option/addTeacherStar',
        method: 'post',
        data
    })
}
// 教师星级修改
export function editTeacherStar(data) {
    return request({
        url: '/api/option/editTeacherStar',
        method: 'post',
        data
    })
}
//教师星级删除
export function delTeacherStar(data) {
    return request({
        url: '/api/option/delTeacherStar',
        method: 'post',
        data
    })
}
//教师星级列表
export function selectTeacherStar(data) {
    return request({
        url: '/api/option/selectTeacherStar',
        method: 'post',
        data
    })
}
// 教师星级详情
export function findTeacherStar(data) {
    return request({
        url: '/api/option/findTeacherStar',
        method: 'post',
        data
    })
}
//岗位类别新增
export function addPositionType(data) {
    return request({
        url: '/api/option/addPositionType',
        method: 'post',
        data
    })
}
// 岗位类别修改
export function editPositionType(data) {
    return request({
        url: '/api/option/editPositionType',
        method: 'post',
        data
    })
}
//岗位类别删除
export function delPositionType(data) {
    return request({
        url: '/api/option/delPositionType',
        method: 'post',
        data
    })
}
//岗位类别列表
export function selectPositionType(data) {
    return request({
        url: '/api/option/selectPositionType',
        method: 'post',
        data
    })
}
// 岗位类别详情
export function findPositionType(data) {
    return request({
        url: '/api/option/findPositionType',
        method: 'post',
        data
    })
}
//合同性质新增
export function addContractType(data) {
    return request({
        url: '/api/option/addContractType',
        method: 'post',
        data
    })
}
// 合同性质修改
export function editContractType(data) {
    return request({
        url: '/api/option/editContractType',
        method: 'post',
        data
    })
}
//合同性质删除
export function delContractType(data) {
    return request({
        url: '/api/option/delContractType',
        method: 'post',
        data
    })
}
//合同性质列表
export function selectContractType(data) {
    return request({
        url: '/api/option/selectContractType',
        method: 'post',
        data
    })
}
// 合同性质详情
export function findContractType(data) {
    return request({
        url: '/api/option/findContractType',
        method: 'post',
        data
    })
}
//合同性质新增
export function addAuditionInvitation(data) {
    return request({
        url: '/api/option/addAuditionInvitation',
        method: 'post',
        data
    })
}
// 合同性质修改
export function editAuditionInvitation(data) {
    return request({
        url: '/api/option/editAuditionInvitation',
        method: 'post',
        data
    })
}
//合同性质删除
export function delAuditionInvitation(data) {
    return request({
        url: '/api/option/delAuditionInvitation',
        method: 'post',
        data
    })
}
//合同性质列表
export function selectAuditionInvitation(data) {
    return request({
        url: '/api/option/selectAuditionInvitation',
        method: 'post',
        data
    })
}
// 合同性质详情
export function findAuditionInvitation(data) {
    return request({
        url: '/api/option/findAuditionInvitation',
        method: 'post',
        data
    })
}

// CEO邮箱详情
export function findCEOEmail(data) {
    return request({
        url: '/api/option/findCEOEmail',
        method: 'post',
        data
    })
}
// 设置CEO详情
export function editCEOEmail(data) {
    return request({
        url: '/api/option/editCEOEmail',
        method: 'post',
        data
    })
}
// 设置HRD详情
export function findHRDEmail(data) {
    return request({
        url: '/api/option/findHRDEmail',
        method: 'post',
        data
    })
}
// 设置HRD详情
export function editHRDEmail(data) {
    return request({
        url: '/api/option/editHRDEmail',
        method: 'post',
        data
    })
}
// 设置SSC详情
export function findSSCEmail(data) {
    return request({
        url: '/api/option/findSSCEmail',
        method: 'post',
        data
    })
}
// 设置SSC详情
export function editSSCEmail(data) {
    return request({
        url: '/api/option/editSSCEmail',
        method: 'post',
        data
    })
}