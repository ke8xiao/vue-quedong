<template>
  <div class="content-box">
    <div class="content">
      <div class="content-head">
        <div class="one">
          <span class="title">李思-康复诊断</span>
          <span style="position:absolute;right:30px;" @click="goback">
            <span>
              <img src="@/assets/img/goback.png" alt="">
            </span>
            <el-button type="text" style="color:#BCA791;font-size: 14px;">返回列表</el-button>
          </span>
        </div>
        <div class="two">

          <el-form :inline="true">
            <el-form-item>
              <el-button style="border-color: #F49B4D;color:#F49B4D;" @click="deleteLot">批量删除</el-button>
            </el-form-item>
            <el-form-item label="疾病诊断名称：" style="margin-left: 300px;">
              <el-input placeholder="请输入查询" v-model="queryParams.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="queryName" class="nextStep">查询</el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
      <el-table @selection-change="selectchange" ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
        <af-table-column type="selection" width="55">
        </af-table-column>
        <af-table-column label="序号" width="120" type="index">
        </af-table-column>
        <af-table-column prop="name" label="疾病诊断名称">
        </af-table-column>
        <af-table-column prop="operate" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" style="color:#BCA791" size="mini" @click="editMedicine(scope.row)">查看</el-button>
            <el-button type="text" style="color:#BCA791" size="mini" @click="handlEnable(scope.row)">启用</el-button>
            <el-button type="text" style="color:#BCA791" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </af-table-column>
      </el-table>

      <!-- 分页器 -->
      <!--   <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination> -->

      <!-- 表格确认删除对话框 1-->
      <template>
        <el-dialog title="删除" :visible.sync="dialogVisible1" width="30%">
          <span>确认要删除{{dialog1.name}}疾病诊断吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="saveBtn1">确定</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">取消</el-button>
          </span>
        </el-dialog>
      </template>

      <!-- 表格启用话框 2-->
      <template>
        <el-dialog title="初步判断" :visible.sync="dialogVisible2" width="30%" center>
          <el-form :model="dialog2">
            <div style="font-weight:700;font-size:18px;margin:10px 0">依据术后时间</div>
            <el-form-item label="请输入术后时间" :label-width="formLabelWidth">
              <el-input v-model="dialog2.time" autocomplete="off"></el-input>
            </el-form-item>
            <div style="font-weight:700;font-size:18px;margin:10px 0">依据临床经验估计分析</div>
            <el-form-item label="请选择分期" :label-width="formLabelWidth">
              <el-select v-model="dialog2.time">
                <el-option label="完成负重" value="完成负重"></el-option>
                <el-option label="量表" value="量表"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="saveBtn2">确定</el-button>
            <el-button type="primary" @click="dialogVisible2 = false">取消</el-button>
          </span>
        </el-dialog>
      </template>

    </div>
  </div>
</template>
  
  <script>
import { getAllPrescriptions } from '@/api/doctor'
import Aside from '@/components/Aside.vue'
export default {
  name: 'DiseaseDiagnoses',
  components: { Aside },
  data() {
    return {
      selectdata: [],
      tableData: [],
      queryParams: {
        name: ''
      },
      formLabelWidth: '130px',
      // 删除对话框1
      dialogVisible1: false,
      dialog1: {
        name: ''
      },
      // 表格启用对话框2
      dialogVisible2: false,
      dialog2: {
        name: '',
        time: ''
      },
      form: {
        name: '',
        symptom: '',
        equipment: ''
      },
      formLabelWidth: '120px',
      disease_position: '',
      disease_sort: '',
      prescription_id: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取列表数据
    getData() {
      let obj = {}
      getAllPrescriptions(obj).then(res => {
        this.tableData = res.data
      })
    },
    // 查询疾病诊断名称
    queryName() {},
    // 编辑处方
    editMedicine(index, data) {
      this.$router.push({
        path: '/kfstage',
        query: {
          id: data.id,
          name: data.name,
          disease_sort: this.$route.query.disease_sort,
          disease_position: this.$route.query.disease_position
        }
      })
    },
    // 单条删除疾病诊断
    handleDelete(data) {
      this.dialogVisible1 = true
      this.dialog1.name = data.name
    },
    // 确定按钮之后,点击删除疾病诊断
    saveBtn1() {
      this.dialogVisible1 = false
      // TODO:调删除疾病诊断的接口
    },
    //表格的启用
    handlEnable() {
      this.dialogVisible2 = true
    },
    // 启用的对话框确认按钮
    saveBtn2() {
      this.dialogVisible2 = false
    },
    selectchange(val) {
      console.log(val)
      this.selectdata = val
    },
    // 批量删除
    deleteLot() {
      if (this.selectdata.length) {
        var list = []
        this.selectdata.forEach(ele => {
          list.push(ele.id)
        })
        // TODO:换接口
        deleteDetails({ ids: list.join(',') }).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }
    },
    goback() {
      // this.$router.push('/')
    }
  }
}
</script>
  
  <style lang="css" scoped>
.content {
  border-radius: 10px;
  box-shadow: 3px 3px rgb(247, 239, 239);
}
.content-head {
  padding-top: 20px;
}
.content-head .title {
  font-size: 18px;
  color: orange;
}
.content-head .one {
  padding: 0 30px;
}
.content-head input {
  width: 150px;
  height: 30px;
  border: 1px solid #ccc;
}
.two {
  padding-left: 30px;
  margin: 10px 0;
}
.two span:nth-child(2) {
  margin-left: 300px;
}
</style>