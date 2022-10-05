import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/style/common.css'

// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
// main.js (需要先引入 Vue 和 Element-UI 依赖库, 并在 <el-table></el-table> 组件下使用该组件)
import AFTableColumn from 'af-table-column'
Vue.use(AFTableColumn)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
