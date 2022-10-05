<template>
  <div class="content-box">
    <div class="head">
      <ul class="step">
        <li style="color:#BCA791;font-size:16px">{{disease_sort}}-{{disease_position}}-{{name}}</li>
        <li><span style="background:#F49B4D;">1</span>康复阶段</li>
        <li><span>2</span>禁忌症</li>
        <li><span>3</span>康复评估</li>
        <li><span>4</span>康复方案</li>
      </ul>
    </div>

    <el-row type="flex" style="height:100%">
      <el-col :span="4">
        <el-card class="left" shadow="always" style="margin:0 10px">
          <ul>
            <li :class="{active : isActive===index }" style="white-space: nowrap;text-overflow:ellipsis; overflow:hidden;" v-for="(item,index) in stages" @click="changeStages(index)">
              {{item.name }}
              <el-button icon="el-icon-edit" size="mini" type="text"></el-button>
              <el-button icon="el-icon-delete" size="mini" type="text" @click="deleteStages(item)"></el-button>
            </li>
            <li style="background:#FFEAE3" @click="addStages"><span>+</span></li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="20">
        <el-card class="right" shadow="always" style="margin-right:10px;">
          <div class="right-head">
            <el-form :inline="true" :model="form">
              <el-form-item>
                <el-button @click="addStageDetail" style="background:#F49B4D;">新增功能</el-button>
                <el-button style="background: rgba(0,0,0,0.2);color: #FFFFFF;">新增力量测试</el-button>
                <el-button @click="deleteLot" style="color:#F49B4D;border:1px solid #F49B4D">批量删除</el-button>
                <el-button @click="failed" style="color:#F49B4D;border:1px solid #F49B4D">进阶失败</el-button>
              </el-form-item>
              <el-form-item label="阶段名称：">
                <el-input placeholder="请输入内容" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="该阶段时长(天)：">
                <el-input placeholder="" v-model="form.total_times"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <el-table @selection-change="selectchange" ref="multipleTable" :data="tableData" :header-cell-style="{background:'#EBE0D8',color:'#000000'}" @cell-dblclick="handleCellDblclick" @cell-mouse-leave="handleCellLeave">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="序号" width="60" type="index">
            </el-table-column>
            <el-table-column prop="name" label="功能名称" width="170">
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                <div class="item__txt">{{scope.row.name}}</div>
              </div>
            </el-table-column>
            <el-table-column prop="type" label="类型" show-overflow-tooltip>
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.type" placeholder="请输入内容"></el-input>
                <div class="item__txt">{{scope.row.type}}</div>
              </div>
            </el-table-column>
            <el-table-column prop="target" label="进阶下一段目标值" show-overflow-tooltip>
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.target" placeholder="请输入内容"></el-input>
                <div class="item__txt">{{scope.row.target}}</div>
              </div>
            </el-table-column>
            <el-table-column prop="condition" label="条件" show-overflow-tooltip>
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.condition" placeholder="请输入内容"></el-input>
                <div class="item__txt">{{scope.row.condition}}</div>
              </div>
            </el-table-column>
            <el-table-column prop="attribute" label="属性" show-overflow-tooltip>
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.attribute" placeholder="请输入内容"></el-input>
                <div class="item__txt">{{scope.row.attribute}}</div>
              </div>
            </el-table-column>
          </el-table>

          <div class="btn">
            <el-button @click="saveTable" style="margin-right:150px">保存</el-button>
            <el-button class="nextStep" @click="next">下一步</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增功能弹框1 -->
    <template>
      <el-dialog title="新增功能" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="dialog">
          <el-form-item label="功能名称：" :label-width="formLabelWidth">
            <el-input v-model="dialog.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="dialog.type" placeholder="数值">
              <el-option label="数值" value="数值"></el-option>
              <el-option label="量表" value="量表"></el-option>
              <el-option label="是/否" value="是/否"></el-option>
              <el-option label="等长-最大力量" value="等长-最大力量"></el-option>
              <el-option label="等速-峰值力矩" value="等速-峰值力矩"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进阶下一段目标值" :label-width="formLabelWidth">
            <el-input v-model="dialog.target" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="条件" :label-width="formLabelWidth">
            <el-select v-model="dialog.condition" placeholder="小于">
              <el-option label="大于" value="大于"></el-option>
              <el-option label="小于" value="小于"></el-option>
              <el-option label="等于" value="等于"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="属性" :label-width="formLabelWidth">
            <el-select v-model="dialog.attribute" placeholder="主观评估">
              <el-option label="主观评估" value="主观评估"></el-option>
              <el-option label="客观评估" value="客观评估"></el-option>
              <el-option label="力量评估" value="力量评估"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveBtn">保 存</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 进阶失败弹框2 -->
    <template>
      <el-dialog title="未达到进阶标准" :visible.sync="dialogFormVisible2" width="30%" center>
        <el-form :model="dialog2">
          <el-form-item label="增加评估次数(次)" label-width="150px">
            <el-input v-model="dialog2.add_assess" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="增加训练次数(次)" label-width="150px">
            <el-input v-model="dialog2.add_train" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2=false">取 消</el-button>
          <el-button type="primary" @click="saveBtn2">保 存</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 新增阶段的弹框3 -->
    <template>
      <el-dialog title="新增康复阶段" :visible.sync="dialogFormVisible3" width="30%">
        <el-form :model="dialog3">
          <el-form-item label="阶段名称" label-width="150px">
            <el-input v-model="dialog3.stageName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时长(天)" label-width="150px">
            <el-input v-model="dialog3.totalTimes" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3=false">取 消</el-button>
          <el-button type="primary" @click="saveBtn3">保 存</el-button>
        </div>
      </el-dialog>
    </template>
  </div>

</template>

<script>
import { editStage, viewStages, saveStageDetails, viewStagesBystage, deleteStageDetails, saveStage, getFailureCondition, saveFailureCondition, deleteStage } from '@/api/index'
import Aside from '@/components/Aside.vue'
export default {
  name: 'KfuEstimate',
  components: { Aside },
  data() {
    return {
      isActive: 0,
      stages: [
        {
          name: '',
          total_times: ''
        }
      ],
      selectdata: [],
      disease_position: '',
      disease_sort: '',
      name: '',
      sort: '',
      activeName: 'second',
      tableData: [
        {
          name: '膝关节伸展角度',
          type: '数值',
          target: 0,
          condition: '大于',
          attribute: '客观评价'
        }
      ],
      // 对话弹框1
      dialogFormVisible: false,
      formLabelWidth: '130px',
      dialog: {
        name: '',
        type: '',
        target: 0,
        condition: '',
        attribute: ''
      },
      // 对话弹框2
      dialogFormVisible2: false,
      dialog2: {
        add_assess: '',
        add_train: ''
      },
      // 对话弹框3
      dialogFormVisible3: false,
      dialog3: {
        stageName: '',
        totalTimes: ''
      },

      editProp: ['name', 'type', 'target', 'condition', 'attribute'],
      form: {
        name: '',
        total_times: 0,
        id: ''
      }
    }
  },
  created() {
    this.disease_position = this.$route.query.disease_position
    this.disease_sort = this.$route.query.disease_sort
    this.name = this.$route.query.name
    this.getLeft()
    //获取左边的阶段数据
  },
  methods: {
    // 点击切换阶段
    changeStages(index) {
      this.isActive = index
      this.form.name = this.stages[index].name
      this.form.total_times = this.stages[index].total_times
      this.getData()
    },
    getLeft() {
      let obj = {
        prescription_details_id: this.$route.query.id
      }
      viewStages(obj).then(res => {
        this.stages = res.data
        this.changeStages(0)
      })
    },
    // 获取阶段名称,id
    getData() {
      let obj1 = {
        stage_id: this.stages[this.isActive].id
      }
      // 获取右边的表格数据
      viewStagesBystage(obj1).then(res => {
        this.tableData = res.data
      })
    },
    // 编辑/更新阶段的详情
    saveTable() {
      let obj = {
        id: this.$route.query.id,
        stage_id: '1',
        name: '',
        type: '',
        target: '',
        condition: '',
        attribute: ''
      }
      editStage(obj).then(res => {
        console.log(res)
      })
    },
    /** 鼠标移入cell */
    // 鼠标双击时进入编辑模式
    handleCellDblclick(row, column, cell, event) {
      const property = column.property
      if (this.editProp.includes(property)) {
        cell.querySelector('.item__input').style.display = 'block'
        cell.querySelector('.item__txt').style.display = 'none'
      }
    },
    /** 鼠标移出cell */
    handleCellLeave(row, column, cell, event) {
      const property = column.property
      if (this.editProp.includes(property)) {
        cell.querySelector('.item__input').style.display = 'none'
        cell.querySelector('.item__txt').style.display = 'block'
      }
      // TODO:发请求进行编辑阶段详情的保存
    },
    // 新增阶段详情
    addStageDetail() {
      this.dialogFormVisible = true
    },
    // 弹框1保存按钮
    saveBtn() {
      this.dialogFormVisible = false
      let obj = {
        stage_id: this.stages[this.isActive].id,
        name: this.dialog.name,
        type: this.dialog.type,
        target: this.dialog.target,
        condition: this.dialog.condition,
        attribute: this.dialog.attribute,
        assess_times: this.dialog.assess_times,
        train_times: this.dialog.train_times
      }
      saveStageDetails(obj).then(res => {
        console.log(res)
        // this.tableData.push(res.data)
        if (res.code == 200) {
          this.getData()
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.getData()
        }
      })
    },

    // 进阶失败保存追加 弹框2保存按钮
    saveBtn2() {
      this.dialogFormVisible2 = false
      let obj = {
        stage_id: this.stages[this.isActive].id,
        add_assess: this.dialog2.add_assess,
        add_train: this.dialog2.add_train
      }
      saveFailureCondition(obj).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },

    // 新增阶段
    addStages() {
      this.dialogFormVisible3 = true
    },
    // 新增阶段 弹框3保存按钮
    saveBtn3() {
      this.dialogFormVisible3 = false
      let obj = {
        prescription_details_id: this.$route.query.id,
        stageName: this.dialog3.stageName,
        totalTimes: this.dialog3.totalTimes
      }
      saveStage(obj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getLeft()
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      })
    },

    selectchange(val) {
      this.selectdata = val
    },
    // 批量删除
    deleteLot() {
      if (this.selectdata.length) {
        var list = []
        this.selectdata.forEach(ele => {
          list.push(ele.id)
        })
        deleteStageDetails({ ids: list.join(',') }).then(res => {
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
    // 修改阶段名称和阶段时长
    editStage() {},

    // 进阶失败查询/追加
    failed() {
      this.dialogFormVisible2 = true
      let obj = {
        stage_id: this.stages[this.isActive].id
      }
      getFailureCondition(obj).then(res => {
        console.log(res.data[0])
        this.dialog2 = res.data[0]
      })
    },
    // 删除阶段
    deleteStages(item) {
      let obj = {
        stage_id: item.id
      }
      deleteStage(obj).then(res => {
        if (res.code == 200) {
          this.getLeft()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    },
    next() {
      this.$router.push({
        path: '/avoidsymptom',
        query: {
          id: this.$route.query.id,
          name: this.$route.query.name,
          disease_position: this.$route.query.disease_position,
          disease_sort: this.$route.query.disease_sort
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.item .item__input {
  display: none;
  width: 100px;
}
.item .item__txt {
  box-sizing: border-box;
  line-height: 24px;
  padding: 0 9px;
}

.el-card {
  height: 100%;
}
.head {
  height: 35px;
  line-height: 35px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
.step {
  display: flex;
  justify-content: space-between;
}

.head .step li span {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid orange;
  padding: 3px 8px;
  margin: 0 5px;
}

/* content的左边康复阶段区域 */
.left ul,
li {
  list-style: none;
}
.left ul {
  width: 100%;
}
.left ul li {
  height: 40px;
  margin-top: 20px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  span {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid orange;
    padding: 3px 8px;
    margin: 0 5px;
    background: #f49b4d;
    color: #fff;
  }
}
.active {
  background-color: #ffdab9;
}

.right-head {
  display: flex;
  padding-top: 20px;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
}
</style>