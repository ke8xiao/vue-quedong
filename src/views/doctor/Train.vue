<template>
  <div class="content-box">
    <div class="head">
      <ul class="step">
        <li style="color:#BCA791;font-size:16px">{{disease_sort}}-{{disease_position}}-{{name}}</li>
        <li><span>1</span>康复阶段</li>
        <li><span>2</span>禁忌症</li>
        <li><span style="background:#F49B4D;">3</span>康复评估</li>
        <li><span>4</span>康复方案</li>
      </ul>
    </div>
    <el-row type="flex" style="height:100%">
      <el-col :span="4">
        <el-card class="left" shadow="always" style="margin:0 10px">
          <ul>
            <li>
              <el-tree :data="leftData" accordion @node-click="handleNodeClick" node-key="data.id" highlight-current>
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span style="position:absolute;right:30px">
                    <el-button type="text">
                      <span v-if="data.id" class="add" @click="() => removeNode(node,data)">-</span>
                      <span v-else class="add" @click="() => appendNode(node,data)">+</span>
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card class="right" shadow="always" style="margin-right:10px;">
          <div class="right-head">
            <div class="right-two">
              <span>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="已完成训练" name="first">
                    <div style="margin-bottom:10px"><span style="font-size:18px;margin-right: 20px;">训练时间</span>
                      <el-date-picker v-model="form.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                      </el-date-picker>
                      <el-button class="nextStep" style="margin-left:20px" @click="queryByDate">查询</el-button>
                    </div>
                    <el-table ref="multipleTable" :data="tableData1" @selection-change="selectchange1" tooltip-effect="dark" style="width: 100%" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
                      <el-table-column type="selection">
                      </el-table-column>
                      <el-table-column label="序号" type="index">
                      </el-table-column>
                      <el-table-column prop="name" label="疾病诊断">
                      </el-table-column>
                      <el-table-column prop="standard" label="康复进程">
                      </el-table-column>
                      <el-table-column prop="standard" label="训练时间">
                      </el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                          <el-button type="text" style="color: #F49B4D;" size="mini" @click="handleWatch(scope.row)">查看评估结果</el-button>
                          <el-button type="text" style="color: #BCA791;" size="mini" @click="handleEdit(scope.row)">导出报告</el-button>
                          <el-button type="text" style="color: #BCA791;" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>

                  <el-tab-pane label="待完成训练" name="second">
                    <div style="margin-bottom:10px">
                      <el-button class="nextStep">新增</el-button>
                    </div>
                    <el-table ref="multipleTable" :data="tableData2" @selection-change="selectchange2" tooltip-effect="dark" style="width: 100%" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
                      <el-table-column type="selection" width="55">
                      </el-table-column>
                      <el-table-column label="序号" type="index">
                      </el-table-column>
                      <el-table-column prop="name" label="里程碑">
                      </el-table-column>
                      <el-table-column prop="standard" label="现阶段剩余训练">
                      </el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                          <el-button type="text" style="color: #F49B4D;" size="mini" @click="handleWatch(scope.row)">开始训练</el-button>
                          <el-button type="text" style="color: #BCA791;" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                          <el-button type="text" style="color: #BCA791;" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>

                </el-tabs>
              </span>
              <!-- <span>
                  <el-button @click="addAssessBtn" style="background:#F49B4D;color:#fff">新增</el-button>
                  <el-button @click="deleteLot" style="border-color:#F49B4D;color:#F49B4D">批量删除</el-button>
                  <el-button style="background:#F49B4D;color:#fff">预览</el-button>
                </span> -->
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>

    <!-- 主观评估弹框 1-->
    <template>
      <el-dialog title="新增主观评估" :visible.sync="dialogFormVisible1" width="30%" center>
        <el-form :model="dialog1">
          <el-form-item label="指标名称" :label-width="formLabelWidth">
            <el-input v-model="dialog1.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="值" :label-width="formLabelWidth">
            <el-input v-model="dialog1.standard" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="saveBtn1">保 存</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 客观评估弹框 2-->
    <template>
      <el-dialog title="新增客观评估" :visible.sync="dialogFormVisible2" width="30%" center>
        <el-form :model="dialog2">
          <el-form-item label="指标名称" :label-width="formLabelWidth">
            <el-input v-model="dialog2.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="评估标准" :label-width="formLabelWidth">
            <el-input v-model="dialog2.standard" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="saveBtn2">保 存</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 新增评估次数 弹框5-->
    <template>
      <el-dialog title="新增评估次数" :visible.sync="dialogFormVisible5" width="30%" center>
        <el-form :model="dialog5">
          <el-form-item label="康复阶段总时长" :label-width="formLabelWidth">
            <el-input v-model="dialog5.total_times" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="评估次数" :label-width="formLabelWidth">
            <el-input v-model="dialog5.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="评估时间" :label-width="formLabelWidth">
            <el-input v-model="dialog5.assess_time" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible5 = false">取消</el-button>
          <el-button type="primary" @click="saveBtn5">确认</el-button>
        </div>
      </el-dialog>
    </template>

  </div>

</template>
    
    <script>
import { getAllAssess, getAssessByDate, getAllTrain } from '@/api/doctor'
import Aside from '@/components/Aside.vue'
export default {
  name: 'Train',
  components: { Aside },
  data() {
    return {
      leftData: [],
      isActive: 0,
      assess_id: '',
      stages: {
        stages_id: '',
        total_times: ''
      },
      activeName: 'first',
      disease_position: '',
      disease_sort: '',
      name: '',
      selectdata: [],
      form: { date: '' },
      tableData1: [],
      tableData2: [],
      // 对话弹框1
      dialogFormVisible1: false,
      formLabelWidth: '130px',
      dialog1: {
        name: '',
        standard: ''
      },
      // 对话弹框2
      dialogFormVisible2: false,
      dialog2: {
        name: '',
        standard: ''
      },
      // 对话弹框3
      dialogFormVisible3: false,
      dialog3: {
        aim_muscle: '',
        parameter_type: '',
        power_type: ''
      },
      // 对话弹框4
      dialogFormVisible4: false,
      dialog4: {
        name: '',
        type: '',
        standard: ''
      },
      // 对话弹框5
      dialogFormVisible5: false,
      dialog5: {
        total_times: '',
        name: '',
        assess_time: ''
      }
    }
  },
  created() {
    this.disease_position = this.$route.query.disease_position
    this.disease_sort = this.$route.query.disease_sort
    this.name = this.$route.query.name
    this.getData()
  },
  methods: {
    // 根据日期查询所有评估
    queryByDate() {
      let obj = {
        patient_id: 'e3be635d-34ca-4312-9e93-010da64bdd40',
        date: this.form.date
      }
      console.log(obj)
      getAssessByDate(obj).then(res => {
        this.tableData1 = res.data.json_assessed
      })
    },
    // 树型结构处理事件
    handleNodeClick() {},
    //
    getData() {
      let obj = {
        patient_id: 'e3be635d-34ca-4312-9e93-010da64bdd40'
      }
      getAllTrain(obj).then(res => {
        if (res.code == 200) {
          res.data.json_trained = this.tableData1
          res.data.json_nottrain = this.tableData2
        }
      })
    },
    // 点击选项卡处理事件
    handleClick(tab) {
      if (tab.name == 'first') {
        this.activeName = 'first'
      } else {
        this.activeName = 'second'
      }
    },

    addAssessByStage() {
      this.dialogFormVisible5 = true
      this.dialog5.total_times = this.stages[this.isActive].total_times
    },
    // 新增评估次数
    saveBtn5() {
      this.dialogFormVisible5 = false
      let obj = {
        stage_id: this.stages.stages_id,
        name: this.dialog5.name,
        assess_time: this.dialog5.assess_time
      }
      addAssess(obj).then(res => {
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
    // 新增评估详情
    addAssessBtn() {
      if (this.activeName == 'first') {
        this.dialogFormVisible1 = true
      } else if (this.activeName == 'second') {
        this.dialogFormVisible2 = true
      } else if (this.activeName == 'third') {
        this.dialogFormVisible3 = true
      } else {
        this.dialogFormVisible4 = true
      }
    },
    // 主观评估
    saveBtn1() {
      this.dialogFormVisible1 = false
      let obj = {
        type: '1',
        assess_id: this.assess_id,
        name: this.dialog1.name,
        standard: this.dialog1.standard
      }
      console.log(obj)
      addAssessDetails(obj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getDataList()
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      })
    },
    // 客观评估
    saveBtn2() {
      this.dialogFormVisible2 = false
      let obj = {
        type: '2',
        assess_id: this.assess_id,
        name: this.dialog2.name,
        standard: this.dialog2.standard,
        aim_muscle: '',
        parameter_type: '',
        power_type: ''
      }
      addAssessDetails(obj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getDataList()
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      })
    },

    selectchange1(val) {
      this.selectdata = val
      console.log(val)
    },
    selectchange2(val) {
      this.selectdata = val
    },
    // 批量删除评估详情
    deleteLot() {
      let list = []
      if (this.selectdata.length) {
        this.selectdata.map(item => {
          list.push(item.id)
        })
      }
      deleteAssessDetails({ ids: list.join(',') }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getDataList()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    }
    //
  }
}
</script>
    
    <style lang="sass" scoped>
.add
  width: 30px
  height: 30px
  border-radius: 15px
  border: 1px solid orange
  padding: 3px 8px
  margin: 0 5px
  background: #f49b4d
  color: #fff

.el-card
  height: 100%

.head
  height: 35px
  line-height: 35px
  background: #fff
  border: 1px solid #ddd
  border-radius: 5px
  padding: 10px
  margin: 10px

.step
  display: flex
  justify-content: space-between

  .head & li span
    width: 30px
    height: 30px
    border-radius: 15px
    border: 1px solid orange
    padding: 3px 8px
    margin: 0 5px

.content
  display: flex

  & .left
    width: 20%
    background-color: aliceblue
    border-radius: 10px
    box-shadow: 3px 3px rgb(247, 239, 239)
    margin-right: 20px

.left ul,
li
  list-style: none

.left ul
  width: 100%

  & li
    margin-top: 20px
    text-align: center
    font-size: 14px
    line-height: 40px

    & .active
      background-color: #ffdab9

.right
  flex: 1
  border-radius: 10px
  box-shadow: 3px 3px rgb(247, 239, 239)

  &-two
    padding: 0 30px
    position: relative

    &-two span:nth-child(2)
      position: absolute
      right: 30px
      top: 5px

    &-head input
      display: inline
      width: 140px
      height: 30px
      border: 1px solid #ccc

    &-two
      /deep/ .el-tabs__item:hover 
      color: #f49b4d
      cursor: pointer

    &-two
      /deep/ .el-tabs__item.is-active 
      color: #f49b4d
</style>