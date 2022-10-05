<template>
  <div class="content-box">
    <div class="content">
      <div class="content-head">
        <el-form :inline="true" :model="form">
          <span class="title" style="padding-left:30px;margin-right:100px">所有患者</span>

          <el-form-item label="患者姓名" style="margin:0 50px">
            <el-input v-model="form.name" placeholder="请输入查询"></el-input>
          </el-form-item>
          <el-form-item label="患者编号">
            <el-input v-model="form.pingcode" placeholder="请输入查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="nextStep" @click="queryPatients">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
        <el-table-column label="序号" type="index" width="70" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="pingcode" label="编号" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center">
        </el-table-column>
        <el-table-column prop="birthday" label="出生日期" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center">
        </el-table-column>
        <el-table-column prop="createtime" label="注册时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" style="color: #F49B4D;" size="mini" @click="watchPatient(scope.row)">查看</el-button>
            <el-button type="text" style="color: #BCA791;" size="mini" @click="deletePatient(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 确认删除对话框 -->
      <template>
        <el-dialog title="删除" :visible.sync="dialogVisible" width="30%">
          <span>确认要删除{{dialog.name}}患者吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="saveBtn">确定</el-button>
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
          </span>
        </el-dialog>
      </template>

    </div>
  </div>
</template>

<script>
import { getAllPatients, getPatientByConditions, deletePatients } from '@/api/doctor'
import Aside from '@/components/Aside.vue'
export default {
  name: 'Patient',
  components: { Aside },
  data() {
    return {
      // 对话框
      dialogVisible: false,
      dialog: {
        name: '',
        id: ''
      },
      selectData: [],
      tableData: [
        {
          name: '',
          pingcode: '',
          sex: 0,
          age: '',
          phone: '',
          birthday: '',
          createtime: ''
        }
      ],
      form: {
        name: '',
        pingcode: ''
      }
    }
  },
  created() {
    this.getMyPatients()
  },

  methods: {
    // 获取所有患者信息
    getMyPatients() {
      let obj = {
        doctor_id: '22dc3da0-9510-4c36-ae5e-75ba5f7f2b70'
      }
      getAllPatients(obj).then(res => {
        this.tableData = res.data
      })
    },
    // 所有患者模糊查询
    queryPatients() {
      let obj = {
        doctor_id: '22dc3da0-9510-4c36-ae5e-75ba5f7f2b70',
        name: this.form.name,
        pingcode: this.form.pingcode
      }
      getPatientByConditions(obj).then(res => {
        if (res.code == 200) {
          this.tableData = res.data
        }
      })
    },

    // 查看患者信息
    watchPatient(data) {
      console.log(data)
    },
    // 删除患者
    deletePatient(data) {
      this.dialogVisible = true
      this.dialog = data
    },
    // 点击确定按钮之后再进行删除
    saveBtn() {
      this.dialogVisible = false
      let obj = {
        ids: this.dialog.id
      }
      deletePatients(obj).then(res => {
        if (res.code == 200) {
          this.getMyPatients()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    }
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