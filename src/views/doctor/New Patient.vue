<template>
  <div class="content-box">
    <div class="content">
      <div class="content-head">
        <el-form :inline="true" :model="form">
          <span class="title" style="padding-left:30px;margin-right:100px">李思-康复进程</span>

          <el-form-item label="疾病处方" style="margin:0 50px">
            <el-input v-model="form.name" placeholder="请输入查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="nextStep" @click="newDiagnosis">新的诊断</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
    
  <script>
import {} from '@/api/doctor'
import Aside from '@/components/Aside.vue'
export default {
  name: 'NewPatient',
  components: { Aside },
  data() {
    return {
      form: {
        name: ''
      }
    }
  },

  methods: {
    // 创建新的诊断=>路由跳转
    newDiagnosis() {}
  }
}
</script>
    
<style lang="css" scoped>
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.content-head .title {
  font-size: 18px;
  color: orange;
}

.content-head input {
  width: 100px;
  height: 30px;
  border: 1px solid #ccc;
}
.two {
  padding-left: 30px;
  margin-bottom: 10px;
}
</style>