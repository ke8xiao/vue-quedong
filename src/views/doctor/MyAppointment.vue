<template>
  <div class="content-box">
    <div class="content">
      <div class="content-head">
        <el-form :inline="true" :model="form">
          <span class="title" style="padding-left:30px;margin-right:100px">所有患者</span>

          <el-form-item label="患者姓名:" style="margin:0 50px">
            <el-input v-model="form.name" placeholder="请输入查询"></el-input>
          </el-form-item>
          <el-form-item label="患者编号:">
            <el-input v-model="form.name" placeholder="请输入查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="nextStep" @click="getPrescription">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table ref="multipleTable" @selection-change="selectchange" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column label="序号" width="60" type="index">
        </el-table-column>
        <el-table-column prop="disease_sort" label="姓名">
        </el-table-column>
        <el-table-column prop="disease_position" label="编号">
        </el-table-column>
        <el-table-column prop="name" label="性别">
        </el-table-column>
        <el-table-column prop="create_date" label="年龄">
        </el-table-column>
        <el-table-column prop="stagesnum" label="出生日期">
        </el-table-column>
        <el-table-column prop="assess_times" label="联系方式">
        </el-table-column>
        <el-table-column prop="train_times" label="注册时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color: #F49B4D;" size="mini" @click="watchMedicine(scope.row)">查看</el-button>
            <el-button type="text" style="color: #BCA791;" size="mini" @click="editMedicine(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 确认删除对话框 -->
      <template>
        <el-dialog title="删除" :visible.sync="dialogVisible" width="30%">
          <span>确认要删除{{dialog.name}}处方吗</span>
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
import { deletePrescriptions, view } from '@/api/index'
import service from '@/utils/service'
import Aside from '@/components/Aside.vue'
import router from '@/router'
export default {
  name: 'MyAppointment',
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
          disease_position: '头部',
          name: '时间测试',
          disease_sort: '神经康复',
          stagesnum: 0,
          id: '7bd180fb-3564-493d-ba2c-8d8a1527a177',
          create_date: '2022-08-22 09:28:59',
          stagesnum: 0,
          assess_times: '',
          train_times: ''
        }
      ],
      form: {
        userid: '3',
        disease_sort: '',
        disease_position: '',
        name: '',
        create_date: ''
      },
      disease_sort: [
        {
          value: '骨科康复'
        },
        {
          value: '神经康复'
        },
        {
          value: '心脏康复'
        }
      ],
      disease_position: [
        {
          value: '头部'
        },
        {
          value: '肩胛'
        },
        {
          value: '肘部'
        },
        {
          value: '臀部'
        }
      ]
    }
  },
  created() {
    this.getMyMedicine()
  },

  methods: {
    // 获取所有处方
    getMyMedicine() {
      let obj = {
        userid: '0212170e-8c6b-4540-895c-a9115625e59e'
      }
      view(obj).then(res => {
        this.tableData = res.data
      })
    },
    // 条件查询处方
    getPrescription() {
      console.log(this.form.create_date)
      service({
        url: '/specialist/prescription/getPrescription',
        params: {
          userid: '0212170e-8c6b-4540-895c-a9115625e59e',
          disease_sort: this.form.disease_sort,
          disease_position: this.form.disease_position,
          name: this.form.name,
          create_date: this.form.create_date
        }
      }).then(res => {
        this.tableData = res.data
      })
    },
    // 查看处方
    watchMedicine(b) {
      console.log(b)
    },
    // 编辑处方
    editMedicine(data) {
      console.log(data.id)
      this.$router.push({
        path: '/choosesick',
        query: {
          id: data.id
        }
      })
    },
    // 单条删除处方
    deleteMedicine(data) {
      this.dialogVisible = true
      this.dialog = data
    },
    // 点击确定按钮之后再进行删除
    saveBtn() {
      this.dialogVisible = false
      let obj = {
        ids: this.dialog.id
      }
      deletePrescriptions(obj).then(res => {
        console.log(res, 'sahn')
        if (res.code == 200) {
          this.getMyMedicine()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    },
    selectchange(val) {
      this.selectData = val
    },
    // 批量删除处方
    deleteLot() {
      let list = []
      if (this.selectData.length) {
        this.selectData.map(item => {
          list.push(item.id)
        })
        let obj = {
          ids: list.join(',')
        }
        deletePrescriptions(obj).then(res => {
          if (res.code == 200) {
            this.getMyMedicine()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
        })
      }
    },
    // 新增处方
    addMedicine() {
      this.$router.push('choosesick')
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