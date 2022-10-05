<template>
  <div class="content-box">
    <div class="content">
      <div class="content-head">
        <div class="one">
          <span class="title">新增处方-{{disease_sort}}-{{disease_position}}</span>
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
              <el-button style="background-color: #F49B4D;color: #FFF;" @click="addMedicine">新增</el-button>
              <el-button style="border-color: #F49B4D;color:#F49B4D;" @click="deleteLot">批量删除</el-button>
            </el-form-item>
            <el-form-item label="处方名称：" style="margin-left: 300px;">
              <el-input placeholder="请输入查询" v-model="queryParams.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="getPrescriptionByName" class="nextStep">查询</el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
      <el-table @selection-change="selectchange" ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" width="120" type="index">
        </el-table-column>
        <el-table-column prop="name" label="处方名称" width="120">
        </el-table-column>
        <el-table-column prop="symptom" label="适用症" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="equipment" label="推荐设备" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="create_date" label="创建时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operate" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" style="color:#BCA791" size="mini" @click="editMedicine(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" style="color:#BCA791" size="mini" @click="deleteMedicine(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <!--   <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination> -->

      <!-- 对话弹框 -->
      <template>
        <el-dialog title="新增康复疾病" :visible.sync="dialogFormVisible" width="30%" center>
          <el-form :model="form">
            <el-form-item label="处方名称：" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="适用症：" :label-width="formLabelWidth">
              <el-input v-model="form.symptom" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="推荐设备：" :label-width="formLabelWidth">
              <el-select v-model="form.equipment" placeholder="膝关节屈曲设备">
                <el-option label="膝关节屈曲设备" value="膝关节屈曲设备"></el-option>
                <el-option label="膝关节伸展设备" value="膝关节伸展设备"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveBtn">保 存</el-button>
          </div>
        </el-dialog>
      </template>

    </div>
  </div>
</template>

<script>
import { deleteDetails } from '@/api/index'
import service from '@/utils/service'
import Aside from '@/components/Aside.vue'
export default {
  name: 'MyMedicine',
  components: { Aside },
  data() {
    return {
      selectdata: [],
      tableData: [
        {
          name: '前交叉重建术后',
          symptom: '有膝部 膝前痛',
          equipment: '膝关节伸展设备',
          create_date: '2022-3-7',
          operate: '编辑 删除'
        }
      ],
      queryParams: {
        name: ''
      },
      // 对话弹框
      dialogFormVisible: false,
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
    this.disease_position = this.$route.query.disease_position
    this.disease_sort = this.$route.query.disease_sort
    this.prescription_id = this.$route.query.prescription_id
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 根据名字模糊查询处方
    getPrescriptionByName() {
      service({
        url: '/specialist/prescription/getPrescriptionByName',
        params: {
          name: this.queryParams.name,
          prescription_id: this.prescription_id
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    // 获取列表数据
    getData() {
      service({
        url: '/specialist/prescription/viewDetails',
        params: {
          prescription_id: this.$route.query.prescription_id
        }
      }).then(res => {
        this.tableData = res.data
      })
    },
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
    // 新增=>(获取处方id) 疾病诊断/处方 (弹框)
    addMedicine() {
      this.dialogFormVisible = true
    },
    // 确定按钮之后,新增疾病诊断/处方 ,并跳转到康复阶段
    saveBtn() {
      this.dialogFormVisible = false
      service({
        url: '/specialist/prescription/saveDetails',
        method: 'post',
        params: {
          prescription_id: this.$route.query.prescription_id,
          name: this.form.name,
          symptom: this.form.symptom,
          equipment: this.form.equipment
        }
      }).then(res => {
        this.tableData.push(res.data)
        if (res.code == 200) {
          this.getData()
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        }
        // this.getData()
      })
      /* this.$router.push({
        path: '/kfstage'
      }) */
    },

    // 单条删除处方
    deleteMedicine(index, data) {
      console.log(index, data.id)
      let result = []
      result.push(data.id)
      let obj = {
        ids: data.id
      }
      deleteDetails(obj).then(res => {
        if (res.code == 200) {
          this.getData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
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
      this.$router.push('/')
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