import request from '@/utils/request'
import Qs from 'qs'

// 获取某位治疗师所有患者信息
export function getAllPatients(param) {
  return request({
    url: '/trainer/getAllPatients',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 模糊查询患者
export function getPatientByNameAndPincode(param) {
  return request({
    url: '/trainer/getPatientByNameAndPincode',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}

// 所有模糊查询患者
export function getPatientByConditions(param) {
  return request({
    url: '/trainer/getPatientByConditions',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 删除患者
export function deletePatients(param) {
  return request({
    url: '/trainer/deletePatients',
    method: 'post',
    selfTime: 100000,
    data: Qs.stringify(param),
  })
}

// 新增患者
export function addPatient(param) {
  return request({
    url: '/trainer/addPatient',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    selfTime: 100000,
    data: param,
  })
}

// 患者管理加载
export function getPatients(param) {
  return request({
    url: '/trainer/getPatients',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 编辑患者
export function editPatient(param) {
  return request({
    url: '/trainer/editPatient',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    selfTime: 100000,
    data: param,
  })
}

// 获取某个患者的信息
export function getUserDetails(param) {
  return request({
    url: '/trainer/getUserDetails',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 返回所有疾病诊断
export function getAllPrescriptions(param) {
  return request({
    url: '/trainer/getAllPrescriptions',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 获取所有评估信息
export function getAllAssess(param) {
  return request({
    url: '/trainer/getAllAssess',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 按日期查询已评估
export function getAssessByDate(param) {
  return request({
    url: '/trainer/getAssessByDate',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 开始评估
export function startAssess(param) {
  return request({
    url: '/trainer/startAssess',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}

// 获取所有训练信息
export function getAllTrain(param) {
  return request({
    url: '/trainer/getAllTrain',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
// 开始训练
export function startTrain(param) {
  return request({
    url: '/trainer/startTrain',
    method: 'get',
    selfTime: 100000,
    params: param,
  })
}
