<template>
  <div class="content-box">
    <div class="content">
      <div class="content-head">
        <el-form :inline="true" :model="form">
          <span class="title" style="padding-left:30px;margin-right:100px">患者管理</span>

          <el-form-item label="患者姓名" style="margin:0 50px">
            <el-input v-model="form.name" placeholder="请输入查询"></el-input>
          </el-form-item>
          <el-form-item label="患者编号">
            <el-input v-model="form.pingcode" placeholder="请输入查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="nextStep" @click="queryPatient">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="two">
          <el-button style="background-color: #F49B4D;color: #FFF;" @click="handleAdd">新增</el-button>
          <el-button style="background-color: #F47B4D;color: #FFF;" @click="deleteLot">批量删除</el-button>
          <el-button style="background-color: #F47B4D;color: #FFF;" @click="transfer">转移</el-button>
        </div>
      </div>
      <el-table ref="multipleTable" @selection-change="selectchange" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
        <af-table-column type="selection">
        </af-table-column>
        <af-table-column label="序号" type="index" align="center">
        </af-table-column>
        <af-table-column prop="name" label="姓名" align="center">
        </af-table-column>
        <af-table-column prop="pingcode" label="编号" align="center">
        </af-table-column>
        <af-table-column prop="sex" label="性别" align="center">
        </af-table-column>
        <af-table-column prop="age" label="年龄" align="center">
        </af-table-column>
        <af-table-column prop="date" label="注册时间" align="center">
        </af-table-column>
        <af-table-column prop="disease_name" label="疾病诊断" align="center">
        </af-table-column>
        <af-table-column prop="milepost" label="康复阶段" align="center">
        </af-table-column>
        <af-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" style="color: #F49B4D;" size="mini" @click="handleWatch(scope.row)">查看</el-button>
            <el-button type="text" style="color: #BCA791;" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" style="color: #BCA791;" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            <el-button type="text" style="color: #F49B4D;" size="mini" @click="handleProcess(scope.row)">康复进程</el-button>
            <el-button type="text" style="color: #BCA791;" size="mini" @click="handleBooking(scope.row)">预约</el-button>
          </template>
        </af-table-column>
      </el-table>

      <!-- 确认删除对话框 1-->
      <template>
        <el-dialog title="删除" :visible.sync="dialogVisible" width="30%">
          <span>确认要删除{{dialog.name}}患者吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="saveBtn">确定</el-button>
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
          </span>
        </el-dialog>
      </template>

      <!-- 新增患者 对话框2 -->
      <template>
        <el-dialog title="新增/编辑患者" :visible.sync="dialogVisible2" width="30%" center>
          <el-form :model="dialog2">
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="dialog2.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="编号：" :label-width="formLabelWidth">
              <el-input v-model="dialog2.pingcode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别：" :label-width="formLabelWidth">
              <el-radio v-model="dialog2.sex" label="男">男</el-radio>
              <el-radio v-model="dialog2.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="出生日期：" :label-width="formLabelWidth">
              <el-date-picker v-model="dialog2.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="身高(cm)：" :label-width="formLabelWidth">
              <el-input v-model="dialog2.height" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="体重(kg)：" :label-width="formLabelWidth">
              <el-input v-model="dialog2.weight" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" :label-width="formLabelWidth">
              <el-input v-model="dialog2.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="疾病类型：" :label-width="formLabelWidth">
              <el-input v-model="dialog2.disease_sort" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="禁忌症：" :label-width="formLabelWidth">
              <el-input v-model="dialog2.contraindication" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：" :label-width="formLabelWidth">
              <el-input v-model="dialog2.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="治疗师：" :label-width="formLabelWidth">
              <el-input v-model="dialog2.doctorid" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取消</el-button>
            <el-button type="primary" @click="saveBtn2">保存</el-button>
          </div>
        </el-dialog>
      </template>

      <!-- 表格的编辑弹框3 -->
      <template>
        <el-dialog title="新增/编辑患者" :visible.sync="dialogVisible3" width="30%" center>
          <el-form :model="dialog3">
            <el-form-item label="姓名：">
              <el-input v-model="dialog3.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="编号：">
              <el-input v-model="dialog3.pingcode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-radio-group v-model="dialog3.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期：">
              <el-date-picker v-model="dialog3.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="身高(cm)：">
              <el-input v-model="dialog3.height" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="体重(kg)：">
              <el-input v-model="dialog3.weight" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input v-model="dialog3.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="疾病类型：">
              <el-input v-model="dialog3.disease_sort" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="禁忌症：">
              <el-input v-model="dialog3.contraindication" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input v-model="dialog3.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="治疗师：">
              <el-input v-model="dialog3.doctorid" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible3 = false">取消</el-button>
            <el-button type="primary" @click="saveBtn3">保存</el-button>
          </div>
        </el-dialog>
      </template>

    </div>
  </div>
</template>
  
<script>
import { addPatient, getPatientByNameAndPincode, getPatients, deletePatients, editPatient, getUserDetails } from '@/api/doctor'
import Aside from '@/components/Aside.vue'
export default {
  name: 'ManagePatient',
  components: { Aside },
  data() {
    return {
      formLabelWidth: '120px',
      // 对话框1
      dialogVisible: false,
      dialog: {
        name: '',
        id: ''
      },
      //新增患者 对话框2
      dialogVisible2: false,
      dialog2: {
        name: '',
        pingcode: '',
        sex: '',
        birthday: '',
        height: '',
        weight: '',
        phone: '',
        disease_sort: '',
        contraindication: '',
        description: '',
        doctorid: ''
      },
      //表格的编辑 对话框3
      dialogVisible3: false,
      dialog3: {
        id: '',
        name: '',
        pingcode: '',
        sex: '',
        birthday: '',
        height: '',
        weight: '',
        phone: '',
        disease_sort: '',
        contraindication: '',
        description: '',
        doctorid: ''
      },
      selectData: [],
      tableData: [],
      form: {
        name: '',
        pingcode: ''
      }
    }
  },
  created() {
    this.getData()
  },

  methods: {
    getData() {
      let obj = {
        doctor_id: '22dc3da0-9510-4c36-ae5e-75ba5f7f2b70'
      }
      getPatients(obj).then(res => {
        if (res.code == 200) {
          this.tableData = res.data
        }
      })
    },
    // 模糊查询患者
    queryPatient() {
      let obj = {
        doctor_id: '22dc3da0-9510-4c36-ae5e-75ba5f7f2b70',
        name: this.form.name,
        pingcode: this.form.pingcode
      }
      getPatientByNameAndPincode(obj).then(res => {
        console.log(res, '#$%')
        if (res.code == 200) {
          this.tableData = res.data
        }
      })
    },
    // 查看患者信息
    handleWatch() {},
    // 表格编辑患者信息
    handleEdit(data) {
      this.dialogVisible3 = true
      getUserDetails({ id: data.id }).then(res => {
        this.dialog3 = Object.assign({}, res.data[0])
        this.dialog3.id = data.id
        if (res.data[0].sex == '1') {
          this.dialog3.sex = 1
        } else {
          this.dialog3.sex = 2
        }
      })
    },
    // 表格编辑患者的保存按钮
    saveBtn3() {
      this.dialogVisible3 = false
      let obj = {
        id: this.dialog3.id,
        name: this.dialog3.name,
        sex: this.dialog3.sex,
        age: this.dialog3.age,
        birthday: this.dialog3.birthday,
        phone: this.dialog3.phone,
        pingcode: this.dialog3.pingcode,
        height: this.dialog3.height,
        weight: this.dialog3.weight,
        disease_sort: this.dialog3.disease_sort,
        contraindication: this.dialog3.contraindication,
        description: this.dialog3.description,
        doctorid: '22dc3da0-9510-4c36-ae5e-75ba5f7f2b70'
      }
      /*   if ((this.dialog3.sex = '男')) {
        this.dialog3.sex = '1'
      } else {
        this.dialog3.sex = '2'
      } */
      console.log(obj)
      editPatient(obj).then(res => {
        if (res.code == 200) {
          this.getData()
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      })
    },
    // 单条删除患者信息
    handleDelete(data) {
      this.dialogVisible = true
      this.dialog = data
    },
    // 单条删除患者信息的保存按钮
    saveBtn() {
      this.dialogVisible = false
      let obj = {
        ids: this.dialog.id
      }
      deletePatients(obj).then(res => {
        if (res.code == 200) {
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    },
    // 康复进程
    handleProcess() {},
    // 预约
    handleBooking() {},

    // 新增患者信息
    handleAdd() {
      this.dialogVisible2 = true
    },
    // 新增患者的保存按钮
    saveBtn2() {
      this.dialogVisible2 = false
      let obj = {
        name: this.dialog2.name,
        sex: this.dialog2.sex,
        age: this.dialog2.age,
        birthday: this.dialog2.birthday,
        phone: this.dialog2.phone,
        pingcode: this.dialog2.pingcode,
        height: this.dialog2.height,
        weight: this.dialog2.weight,
        disease_sort: this.dialog2.disease_sort,
        contraindication: this.dialog2.contraindication,
        description: this.dialog2.description,
        doctorid: '22dc3da0-9510-4c36-ae5e-75ba5f7f2b70'
      }
      addPatient(obj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getData()
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      })
    },
    selectchange(val) {
      this.selectData = val
    },
    // 批量删除患者信息
    deleteLot() {
      let list = []
      if (this.selectData.length) {
        this.selectData.map(item => {
          list.push(item.id)
        })
        let obj = {
          ids: list.join(',')
        }
        deletePatients(obj).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
        })
      }
    },
    // 转移
    transfer() {}
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