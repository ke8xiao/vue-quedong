<template>
  <div class="content-box">
    <div class="content">
      <div class="content-head">
        <el-form :inline="true" :model="form">
          <span class="title" style="padding-left:30px;margin-right:100px">我的处方</span>
          <el-form-item label="疾病分类：">
            <el-select v-model="form.disease_sort" filterable placeholder="骨科康复" style="margin-right:10px;width:100px">
              <el-option v-for="item in disease_sort" :key="item.value" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="form.disease_position" filterable placeholder="头部" style="width:100px">
              <el-option v-for="item in disease_position" :key="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处方名称:" style="margin:0 50px">
            <el-input v-model="form.name" placeholder="请输入查询"></el-input>
          </el-form-item>
          <el-form-item label="创建日期:">
            <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期" value-format="yyyyMMdd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button class="nextStep" @click="getPrescription">查询</el-button>
          </el-form-item>
        </el-form>

        <div class="two">
          <el-button style="background-color: #F49B4D;color: #FFF;" @click="addMedicine">新建</el-button>
          <el-button style="background-color: #F47B4D;color: #FFF;" @click="deleteLot">批量删除</el-button>
        </div>
      </div>
      <el-table ref="multipleTable" @selection-change="selectchange" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
        <af-table-column type="selection">
        </af-table-column>
        <af-table-column label="序号" type="index" align="center">
        </af-table-column>
        <af-table-column prop="disease_sort" label="疾病分类" align="center">
        </af-table-column>
        <af-table-column prop="disease_position" label="疾病部位" align="center">
        </af-table-column>
        <af-table-column prop="name" label="处方名称" align="center">
        </af-table-column>
        <af-table-column prop="create_date" label="创建日期" align="center">
        </af-table-column>
        <af-table-column prop="stagesnum" label="康复阶段" align="center">
        </af-table-column>
        <af-table-column prop="assess_times" label="评估次数" align="center">
        </af-table-column>
        <af-table-column prop="train_times" label="训练次数" align="center">
        </af-table-column>
        <af-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" style="color: #F49B4D;" size="mini" @click="watchMedicine(scope.row)">查看处方</el-button>
            <el-button type="text" style="color: #BCA791;" size="mini" @click="editMedicine(scope.row)">编辑</el-button>
            <el-button type="text" style="color: #BCA791;" size="mini" @click="deleteMedicine(scope.row)">删除</el-button>
          </template>
        </af-table-column>
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

      <!-- 分页器 -->
      <div class="block">
        <el-pagination style="float: right; padding-right: 0.25rem; margin-top: 0.2rem" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { deletePrescriptions, view } from '@/api/index'
import service from '@/utils/service'
import Aside from '@/components/Aside.vue'
export default {
  name: 'MyMedicine',
  components: { Aside },
  data() {
    return {
      // 对话框
      dialogVisible: false,
      dialog: {
        name: '',
        id: ''
      },
      /*   data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
          }]
        }], */
      selectData: [],
      tableData: [],
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