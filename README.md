1.## 对于el-table  的宽度无法自适应问题：
基于 element-ui 组件库的 el-table-column 组件, 支持自适应列宽功能
##安装 npm install af-table-column
##引入
 // main.js (需要先引入 Vue 和 Element-UI 依赖库, 并在 <el-table></el-table> 组件下使用该组件)
import AFTableColumn from 'af-table-column'
Vue.use(AFTableColumn)

// demo.vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <af-table-column prop="date" label="日期"> </af-table-column>
    <af-table-column prop="name" label="姓名"> </af-table-column>
    <af-table-column prop="age" label="姓名"> </af-table-column>
    <af-table-column prop="phone" label="姓名"> </af-table-column>
    <af-table-column prop="address" label="地址"> </af-table-column>
  </el-table>
</template>
在工作中遇到这个需求,表格需要完整的展示内容,如果不设置宽度,表格所有的列会平均分配,如果设置了宽度又太局限了

2.