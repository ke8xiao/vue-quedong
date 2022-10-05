<template>
  <div class="content-box">
    <div class="head">
      <ul class="step">
        <li style="color:#BCA791;font-size:16px">{{disease_sort}}-{{disease_position}}-{{name}}</li>
        <li><span>1</span>康复阶段</li>
        <li><span style="background:#F49B4D;">2</span>禁忌症</li>
        <li><span>3</span>康复评估</li>
        <li><span>4</span>康复方案</li>
      </ul>
    </div>
    <el-row type="flex">
      <el-col :span="4">
        <el-card class="left" shadow="always" style="margin:0 10px">
          <ul>
            <li :class="{active : isActive===index }" style="white-space: nowrap;text-overflow:ellipsis; overflow:hidden;" v-for="(item,index) in stages" @click="changeStages(index)">
              {{item.name}}
            </li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="20">
        <el-card class="right" shadow="always" style="margin-right:10px">
          <div class="right-one">
            <div class="right-head">
              <el-form :inline="true" :model="form">
                <span style="font-size:16px;color:#765022;padding-left: 20px;"> 二分类数据</span>
                <el-form-item style="margin:0 10px 0 200px">
                  <el-input v-model="form.name" placeholder="模糊查询禁忌症名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="inquire" class="nextStep">查询</el-button>
                </el-form-item>
                <el-form-item style="position:absolute;right:30px">
                  <el-button @click="addFunction" style="background:#F49B4D;color:#fff">新增功能</el-button>
                  <el-button style="border-color:#F49B4D;color:#F49B4D" @click="deleteThird">批量删除</el-button>
                </el-form-item>
              </el-form>

            </div>

            <el-table @selection-change="selectchange1" ref="multipleTable" :data="tableData1" tooltip-effect="dark" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column label="序号" width="120" type="index">
              </el-table-column>
              <el-table-column prop="factor" label="因素" width="120">
              </el-table-column>
              <el-table-column prop="type" label="类型" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="attribute" label="属性" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="limit_bool" label="限制等级三" show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>

          <div class="right-two">

            <div class="right-head">
              <span style="font-size:16px;color:#765022"> 连续性数据</span>
              <span>
                <el-button @click="addOne" style="background:#F49B4D;color:#fff">新增一级</el-button>
                <el-button @click="addTwo" style="background:#F49B4D;color:#fff">新增二级</el-button>
                <el-button @click="deleteOneAndTwo" style="border-color:#F49B4D;color:#F49B4D">批量删除</el-button>
              </span>
            </div>
            <el-table @selection-change="selectchange2" ref="multipleTable" :data="tableData2" tooltip-effect="dark" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
              <el-table-column type="selection" width="55" :selectable="sele">
              </el-table-column>
              <el-table-column label="序号" width="120" type="index">
              </el-table-column>
              <el-table-column prop="compare" label="比较">
              </el-table-column>
              <el-table-column prop="type" label="类型" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="parameter" label="特异性参数" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="second_limit" label="限制等级二" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="first_limit" label="限制等级一" show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-table @selection-change="selectchange3" v-show="showData3" ref="multipleTable" :data="tableData3" tooltip-effect="dark" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
              <el-table-column type="selection" width="55" :selectable="sele2">
              </el-table-column>
              <el-table-column prop="order" label="序号" width="120" :index="indexMethod">
              </el-table-column>
              <el-table-column prop="sex" label="性别" width="120">
              </el-table-column>
              <el-table-column prop="type" label="运动专项" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="age" label="年龄" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="second_limit" label="限制等级二" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="first_limit" label="限制等级一" show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>

          <div style="display:flex;justify-content:center;margin-top:20px">
            <el-button class="nextStep" @click="next">下一步</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增功能 对话弹框1 -->
    <template>
      <el-dialog title="新增因素" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="dialog">
          <el-form-item label="因素名称：" :label-width="formLabelWidth">
            <el-input v-model="dialog.factor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="dialog.type" placeholder="是/否">
              <el-option label="是" value="否"></el-option>
              <el-option label="否" value="否"></el-option>
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
          <el-form-item label="限制等级三" :label-width="formLabelWidth">
            <el-radio v-model="dialog.limit_bool" label="是">是</el-radio>
            <el-radio v-model="dialog.limit_bool" label="否">否</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="saveBtn">保 存</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 新增一级对话框2 -->
    <template>
      <el-dialog title="新增一级" :visible.sync="dialogFormVisible2" width="30%" center>
        <el-form :model="dialog2">
          <el-form-item label="比较名称" label-width="150px">
            <el-input v-model="dialog2.compare" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" label-width="150px">
            <el-input v-model="dialog2.type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="特异性参数" :label-width="formLabelWidth">
            <el-radio v-model="dialog2.parameter" label="是">是</el-radio>
            <el-radio v-model="dialog2.parameter" label="否">否</el-radio>
          </el-form-item>
          <el-form-item label="限制等级二" :label-width="formLabelWidth">
            <el-input v-model="dialog2.second_limit.start" style="width:50px"></el-input> ~
            <el-input v-model="dialog2.second_limit.end" style="width:50px"></el-input>
          </el-form-item>
          <el-form-item label="限制等级一" :label-width="formLabelWidth">
            <el-input v-model="dialog2.first_limit.start" style="width:50px"></el-input> ~
            <el-input v-model="dialog2.first_limit.end" style="width:50px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="saveBtn2">保 存</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 新增二级对话框3 -->
    <template>
      <el-dialog title="新增二级" :visible.sync="dialogFormVisible3" width="30%" center>
        <el-form :model="dialog3">
          <el-form-item label="比较名称" label-width="150px">
            <el-input v-model="dialog3.compareName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio v-model="dialog3.sex" label="男">男</el-radio>
            <el-radio v-model="dialog3.sex" label="女">女</el-radio>
            <el-radio v-model="dialog3.sex" label="无">无</el-radio>
          </el-form-item>
          <el-form-item label="运动专项" label-width="150px">
            <el-input v-model="dialog3.type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-radio v-model="dialog3.age1" label="是">是</el-radio>
            <el-radio v-model="dialog3.age1" label="否">否</el-radio>
          </el-form-item>
          <el-form-item label="请输入年龄" :label-width="formLabelWidth">
            <el-input v-model="dialog3.age" style="width:50px"></el-input> ~
            <el-input v-model="dialog3.age" style="width:50px"></el-input>
          </el-form-item>
          <el-form-item label="限制等级二" :label-width="formLabelWidth">
            <el-input v-model="dialog3.second_limit.start" style="width:50px"></el-input> ~
            <el-input v-model="dialog3.second_limit.end" style="width:50px"></el-input>
          </el-form-item>
          <el-form-item label="限制等级一" :label-width="formLabelWidth">
            <el-input v-model="dialog3.first_limit.start" style="width:50px"></el-input> ~
            <el-input v-model="dialog3.first_limit.end" style="width:50px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="saveBtn3">保 存</el-button>
        </div>
      </el-dialog>
    </template>
  </div>

</template>

<script>
import { getContraindications, getThirdContraindications, getFirstContraindications, getSecondContraindications, deleteThirdContraindication, deleteContraindication, addThirdContraindication } from '@/api/index'
import { addSecondContraindication, addFirstContraindication, getFirstLimit, viewStages } from '@/api/index'
import Aside from '@/components/Aside.vue'
export default {
  name: 'KfuEstimate',
  components: { Aside },
  data() {
    return {
      isActive: 0,
      stages: [{ id: '' }],
      disease_position: '',
      disease_sort: '',
      name: '',
      showData3: true,
      selectdata1: [],
      selectdata2: [],
      selectdata3: [],
      table_name: '',
      day: 10,
      sort: '',
      activeName: 'second',
      form: {
        name: ''
      },
      tableData1: [
        {
          factor: '骨挫伤',
          type: '是/否',
          attribute: '其他',
          limit_bool: '是'
        }
      ],
      tableData2: [
        {
          compare: '向心与离心力量比',
          type: '数值',
          parameter: '是',
          second_limit: '',
          first_limit: ''
        }
      ],
      tableData3: [],
      // 对话弹框1
      dialogFormVisible: false,
      formLabelWidth: '130px',
      dialog: {
        factor: '',
        limit_bool: '是',
        attribute: '',
        type: ''
      },
      // 对话弹框2
      dialogFormVisible2: false,
      dialog2: {
        add_assess: '',
        add_train: '',
        radio: '是',
        second_limit: {
          start: '',
          end: ''
        },
        first_limit: {
          start: '',
          end: ''
        }
      },
      // 对话弹框3
      dialogFormVisible3: false,
      dialog3: {
        compareName: '',
        sex: '',
        type: '',
        age: '',
        age1: '',
        second_limit: {
          start: '',
          end: ''
        },
        first_limit: {
          start: '',
          end: ''
        }
      }
    }
  },
  created() {
    this.disease_position = this.$route.query.disease_position
    this.disease_sort = this.$route.query.disease_sort
    this.name = this.$route.query.name
    this.getLeft()
  },
  mounted() {},
  methods: {
    // 点击切换阶段
    changeStages(index) {
      this.isActive = index
      this.getData()
    },
    //获取左边阶段的数据
    getLeft() {
      let obj = {
        prescription_details_id: this.$route.query.id
      }
      viewStages(obj).then(res => {
        this.stages = res.data
        this.changeStages(0)
      })
    },
    // 获取表格数据
    getData() {
      let obj1 = {
        stage_id: this.stages[this.isActive].id
      }
      // 获取三级禁忌症数据列表
      getThirdContraindications(obj1).then(res => {
        // console.log(res)
        this.tableData1 = res.data
      })
      // 获取一级禁忌症数据列表
      getFirstContraindications(obj1).then(res => {
        this.tableData2 = res.data
      })

      // 获取二级禁忌症数据列表 => 先拿到一级禁忌症id
      let result = []
      getFirstContraindications(obj1).then(res => {
        res.data.forEach(item => {
          result.push(item.id)
        })
        let obj2 = {
          ids: result.join(',')
        }
        console.log(obj2, '一级禁忌症id')
        let itemList = []
        getSecondContraindications(obj2).then(res => {
          result.forEach(item => {
            itemList.push('jsonObject_' + item)
          })
          this.tableData3 = []
          itemList.forEach((ele, index) => {
            if (res.data[ele].length) {
              let twoIndex = index + 1
              res.data[ele].map((item, index) => {
                this.$set(item, 'order', this.indexMethod(twoIndex, index + 1))
                this.tableData3.push(item)
              })
            }
          })
        })
      })
    },
    // 按钮禁用
    sele() {
      if (this.selectdata3.length) {
        return false
      } else {
        return true
      }
    },
    sele2() {
      if (this.selectdata2.length) {
        return false
      } else {
        return true
      }
    },
    // 获取二级禁忌症数据列表 ？？？如何与一级对应？？
    getDataSecond() {
      let result = []
      getFirstContraindications({ stage_id: '1' }).then(res => {
        res.data.forEach(item => {
          result.push(item.id)
        })
        let obj = {
          ids: result.join(',')
        }
        let itemList = []
        getSecondContraindications(obj).then(res => {
          result.forEach(item => {
            itemList.push('jsonObject_' + item)
          })
          itemList.forEach((ele, index) => {
            if (res.data[ele].length) {
              let twoIndex = index + 1
              res.data[ele].map((item, index) => {
                this.$set(item, 'order', this.indexMethod(twoIndex, index + 1))
                this.tableData3.push(item)
              })
            }
          })
        })
      })
    },
    // 一二级禁忌症序号对应
    indexMethod(index1, index2) {
      return (this.order = index1 + '.' + index2)
    },
    // 按名字模糊查询禁忌症
    inquire() {
      let obj = {
        name: this.form.name,
        stage_id: this.stages[this.isActive].id
      }
      getContraindications(obj).then(res => {
        this.tableData1 = res.data.thirdLimit
        this.tableData2 = res.data.firstLimit
        // this.showData3 = false
        console.log(res)
      })
    },
    // 新增功能按钮弹框
    addFunction() {
      this.dialogFormVisible = true
    },
    saveBtn() {
      let obj = {
        factor: this.dialog.factor,
        type: this.dialog.type,
        attribute: this.dialog.attribute,
        limit_bool: this.dialog.limit_bool,
        stage_id: this.stages[this.isActive].id
      }
      addThirdContraindication(obj).then(res => {
        this.dialogFormVisible = false
        if (res.code == 200) {
          this.getData()
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        }
      })
    },
    // 新增一级 弹框
    addOne() {
      this.dialogFormVisible2 = true
    },
    saveBtn2() {
      let obj = {
        stage_id: this.stages[this.isActive].id,
        compare: this.dialog2.compare,
        type: this.dialog2.type,
        parameter: this.dialog2.parameter,
        first_limit: this.dialog2.first_limit.start + '~' + this.dialog2.first_limit.end,
        second_limit: this.dialog2.second_limit.start + '~' + this.dialog2.second_limit.end
      }
      addFirstContraindication(obj).then(res => {
        this.dialogFormVisible2 = false
        if (res.code == 200) {
          this.getData()
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        }
      })
    },
    // 新增二级 弹框
    addTwo() {
      this.dialogFormVisible3 = true
    },
    //二级禁忌症新增
    saveBtn3() {
      // 通过一级禁忌症名称查询对应id
      let first_id = ''
      getFirstLimit({ stage_id: this.stages[this.isActive].id }).then(res => {
        console.log(res.data, 'id!!!')
        res.data.map(item => {
          if (this.dialog3.compareName == item.compare) {
            first_id = item.id
          }
        })
        console.log(first_id, '一级id添加后')
        let obj = {
          first_id,
          sex: this.dialog3.sex,
          type: this.dialog3.type,
          age: this.dialog3.age,
          first_limit: this.dialog3.first_limit.start + '~' + this.dialog3.first_limit.end,
          second_limit: this.dialog3.second_limit.start + '~' + this.dialog3.second_limit.end
        }
        addSecondContraindication(obj).then(res => {
          console.log(res, '添加后返回结果')
          if (res.code == 200) {
            this.dialogFormVisible3 = false
            // TODO:重新渲染列表
            this.getData()
            this.$message({
              type: 'success',
              message: '新增成功'
            })
          }
        })
      })
    },
    selectchange1(val) {
      this.selectdata1 = val
    },
    selectchange2(val) {
      this.table_name = 'firstLimit'
      this.selectdata2 = val
      console.log(val)
    },
    selectchange3(val) {
      this.table_name = 'secondLimit'
      this.selectdata3 = val
    },

    // 批量删除三级禁忌症
    deleteThird() {
      if (this.selectdata1.length) {
        let list = []
        this.selectdata1.forEach(item => {
          list.push(item.id)
        })
        console.log(list)
        let obj = {
          ids: list.join(',')
        }
        deleteThirdContraindication(obj).then(res => {
          console.log(res)
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
    // 批量删除一/二级禁忌症
    deleteOneAndTwo() {
      let id = []
      if (this.selectdata2.length) {
        this.selectdata2.map(item => {
          id.push(item.id)
        })
      } else {
        this.selectdata3.map(item => {
          id.push(item.id)
        })
      }
      let obj = {
        id: id.join(','),
        table_name: this.table_name
      }
      deleteContraindication(obj).then(res => {
        if (res.code == 200) {
          this.tableData2 = []
          this.tableData3 = []
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    },
    next() {
      this.$router.push({
        path: '/kfestimate',
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

<style lang="css" scoped>
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
.head .step {
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

.content .left {
  height: 100%;
  margin-right: 20px;
}
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
}
.active {
  background-color: #ffdab9;
}
.right {
  flex: 1;
  border-radius: 10px;
  box-shadow: 3px 3px rgb(247, 239, 239);
}
.right-one .right-head {
  padding-top: 20px;
  margin-bottom: 20px;
}
.right-two .right-head {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  margin: 10px 0;
}
</style>