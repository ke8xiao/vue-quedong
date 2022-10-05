import request from '@/utils/request'
import Qs from 'qs'

// 查询所有处方
export function view(param) {
  return request({
    url: '/specialist/prescription/view',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 删除疾病诊断列表
export function deleteDetails(param) {
  return request({
    url: '/specialist/prescription/deleteDetails',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 查询阶段名称，id
export function viewStages(param) {
  return request({
    url: '/specialist/prescription/viewStages',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 通过阶段查询阶段详情
export function viewStagesBystage(param) {
  return request({
    url: '/specialist/prescription/editStageDetails',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 更新阶段的详情
export function editStage(param) {
  return request({
    url: '/specialist/prescription/updateStageDetails',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 新增阶段的详情
export function saveStageDetails(param) {
  return request({
    url: '/specialist/prescription/saveStageDetails',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 删除阶段详情
export function deleteStageDetails(param) {
  return request({
    url: '/specialist/prescription/deleteStageDetails',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 新增阶段
export function saveStage(param) {
  return request({
    url: '/specialist/prescription/saveStage',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 进阶失败追加次数
export function saveFailureCondition(param) {
  return request({
    url: '/specialist/prescription/saveFailureCondition',
    method: 'put',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 查询进阶失败追加次数
export function getFailureCondition(param) {
  return request({
    url: '/specialist/prescription/getFailureCondition',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}

// 模糊查询禁忌症
export function getContraindications(param) {
  return request({
    url: '/specialist/prescription/getContraindications',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 查询三级禁忌症
export function getThirdContraindications(param) {
  return request({
    url: '/specialist/prescription/getThirdContraindications',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 查询二级禁忌症
export function getSecondContraindications(param) {
  return request({
    url: '/specialist/prescription/getSecondContraindications',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 查询一级禁忌症
export function getFirstContraindications(param) {
  return request({
    url: '/specialist/prescription/getFirstContraindications',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 新增三级禁忌症
export function addThirdContraindication(param) {
  return request({
    url: '/specialist/prescription/addThirdContraindication',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 新增二级禁忌症
export function addSecondContraindication(param) {
  return request({
    url: '/specialist/prescription/addSecondContraindication',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 新增一级禁忌症
export function addFirstContraindication(param) {
  return request({
    url: '/specialist/prescription/addFirstContraindication',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 删除三级禁忌症
export function deleteThirdContraindication(param) {
  return request({
    url: '/specialist/prescription/deleteThirdContraindication',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 删除一/二级禁忌症
export function deleteContraindication(param) {
  return request({
    url: '/specialist/prescription/deleteContraindication',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 返回所有一级限制
export function getFirstLimit(param) {
  return request({
    url: '/specialist/prescription/getFirstLimit',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 新增评估
export function addAssess(param) {
  return request({
    url: '/specialist/prescription/addAssess',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 新增评估详情
export function addAssessDetails(param) {
  return request({
    url: '/specialist/prescription/addAssessDetails',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    selfTime: 100000,
    data: param,
  })
}

// 编辑评估详情
export function editAssessDetails(param) {
  return request({
    url: '/specialist/prescription/editAssessDetails',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 加载阶段的评估次数
export function viewStage(param) {
  return request({
    url: '/specialist/prescription/viewStage',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 删除评估详情
export function deleteAssessDetails(param) {
  return request({
    url: '/specialist/prescription/deleteAssessDetails',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 删除评估第n次评估
export function deleteAssess(param) {
  return request({
    url: '/specialist/prescription/deleteAssess',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 查看训练详情
export function editTrainDetails(param) {
  return request({
    url: '/specialist/prescription/editTrainDetails',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 编辑训练详情
export function getTrainDetails(param) {
  return request({
    url: '/specialist/prescription/getTrainDetails',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 保存训练详情
export function saveTrainDetail(param) {
  return request({
    url: '/specialist/prescription/saveTrainDetail',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    selfTime: 100000,
    data: param,
  })
}
// 加载各阶段训练
export function viewStageTrain(param) {
  return request({
    url: '/specialist/prescription/viewStageTrain',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 新增训练
export function addTrain(param) {
  return request({
    url: '/specialist/prescription/addTrain',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 新增训练详情
export function addTrainDetail(param) {
  return request({
    url: '/specialist/prescription/addTrainDetail',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    selfTime: 100000,
    data: param,
  })
}

// 删除训练详情
export function deleteTrainDetails(param) {
  return request({
    url: '/specialist/prescription/deleteTrainDetails',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 删除评估第n次训练
export function deleteTrain(param) {
  return request({
    url: '/specialist/prescription/deleteTrain',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 查询所有设备名称
export function getEquipment(param) {
  return request({
    url: '/specialist/prescription/getEquipment',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}

// 删除处方(单条/批量)
export function deletePrescriptions(param) {
  return request({
    url: '/specialist/prescription/deletePrescriptions',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 删除阶段
export function deleteStage(param) {
  return request({
    url: '/specialist/prescription/deleteStage',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 查询训练禁忌症
export function editTrainDetailContraindication(param) {
  return request({
    url: '/specialist/prescription/editTrainDetailContraindication',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 修改训练禁忌症
export function saveTrainDetailContraindication(param) {
  return request({
    url: '/specialist/prescription/saveTrainDetailContraindication',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
// 修改评估时间
export function saveAssess(param) {
  return request({
    url: '/specialist/prescription/saveAssess',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}
