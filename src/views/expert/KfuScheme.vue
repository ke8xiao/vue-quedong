<template>
  <div class="content-box">
    <div class="head">
      <ul class="step">
        <li style="color:#BCA791;font-size:16px">{{disease_sort}}-{{disease_position}}-{{name}}</li>
        <li><span>1</span>康复阶段</li>
        <li><span>2</span>禁忌症</li>
        <li><span>3</span>康复评估</li>
        <li><span style="background:#F49B4D;color: #000000;">4</span>康复方案</li>
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
                      <span v-if="!data.children" class="add" @click="() => removeNode(node,data)">-</span>
                      <span v-else class="add" @click="() => appendNode(node,data)">+</span>
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </li>
            <!--   <li :class="{active : isActive===index }" style="white-space: nowrap;text-overflow:ellipsis; overflow:hidden;" v-for="(item,index) in stages" @click="changeStages(index)">
              {{item.name}}
            </li> -->
          </ul>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card class="right" shadow="always" style="margin-right:10px;">
          <div class="right-head">
            <div class="right-two">
              <span>
                <el-tabs v-model="activeName" @tab-click="handleClick">

                  <el-tab-pane label="运动疗法" name="first">
                    <el-table ref="multipleTable" :data="tableData1" @selection-change="selectchange" tooltip-effect="dark" style="width: 100%" :header-cell-style="{background:'#EBE0D8',color:'#000000'}">
                      <af-table-column type="selection">
                      </af-table-column>
                      <af-table-column label="序号" type="index">
                      </af-table-column>
                      <af-table-column prop="equipment" label="训练名称">
                      </af-table-column>
                      <af-table-column prop="type" label="类型">
                      </af-table-column>
                      <af-table-column prop="pattern" label="模式">
                      </af-table-column>
                      <af-table-column prop="parameter" label="参数" align="center">
                      </af-table-column>
                      <af-table-column prop="operate" label="操作" align="center" width="120">
                        <template slot-scope="scope">
                          <el-button type="text" style="color:#BCA791" size="mini" @click="editTrain(scope.row)">编辑</el-button>
                          <el-button type="text" style="color:#BCA791" size="mini" @click="jinjiz(scope.row)">禁忌症</el-button>
                        </template>
                      </af-table-column>
                    </el-table>
                  </el-tab-pane>

                  <el-tab-pane label="手法治疗" name="second" disabled>
                  </el-tab-pane>

                  <el-tab-pane label="物理因子" name="third" disabled>
                  </el-tab-pane>

                </el-tabs>
              </span>
              <span>
                <el-button @click="addSport" style="background:#F49B4D;color:#fff">新增</el-button>
                <el-button @click="deleteLot" style="border-color:#F49B4D;color:#F49B4D">批量删除</el-button>
                <el-button style="background:#F49B4D;color:#fff">预览</el-button>
              </span>
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>

    <!-- 运动疗法弹框 1-->
    <template>
      <el-dialog title="运动疗法" :visible.sync="dialogFormVisible1" width="40%">
        <el-form :model="dialog1" :inline="true">
          <el-form-item label="类别：" :label-width="formLabelWidth">
            <el-select v-model="dialog1.type" placeholder="鹊动测训单元">
              <el-option label="鹊动测训单元" value="鹊动测训单元"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left:120px">
            <el-button @click="dialogFormVisible2=true" type="primary">使用该设备</el-button>
          </el-form-item>
        </el-form>
        <div class="imgs">
          <div class="img" @click="chooseDevice">
            <a>
              <el-button type="text" @click="dialogFormVisible3=true">【查看】</el-button>
            </a>
            <img src="@/assets/img/GL.png" alt="" style="width:100px;height:100px">
            <span style="text-align: center">设备名称</span>
          </div>
          <div class="img">
            <a>
              <el-button type="text">【查看】</el-button>
            </a>
            <img src="@/assets/img/GL.png" alt="" style="width:100px;height:100px">
            <span style="text-align: center">设备名称</span>
          </div>
          <div class="img">
            <a>
              <el-button type="text">【查看】</el-button>
            </a>
            <img src="@/assets/img/GL.png" alt="" style="width:100px;height:100px">
            <span style="text-align: center">设备名称</span>
          </div>
          <div class="img">
            <a>
              <el-button type="text">【查看】</el-button>
            </a>
            <img src="@/assets/img/GL.png" alt="" style="width:100px;height:100px">
            <span style="text-align: center">设备名称</span>
          </div>
        </div>
        <div slot="footer" style="display: flex;justify-content: center;">
          <el-button type="primary" @click="dialogFormVisible1=false">关闭</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 使用该设备弹框 2-->

    <el-dialog title="添加测训单元" :visible.sync="dialogFormVisible2" width="30%" center>
      <el-form :model="dialog2">
        <el-form-item label="类型：" :label-width="formLabelWidth">
          <el-radio-group v-model="dialog2.pattern" @change="radioChange">
            <el-radio :label="1" value="等张">等张</el-radio>
            <el-radio :label="2" value="等长">等长</el-radio>
            <el-radio :label="3" value="等速">等速</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="show" v-show="isShow1">
          <el-form-item label="起始位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.start_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终末位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.end_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="强度：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.strength" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="组数：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.set_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="次数：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="间歇：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.intermission" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="阻力特征：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.resistance" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="节律：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.rhythm.start" autocomplete="off" style="width:70px"></el-input> -
            <el-input v-model="dialog2.rhythm.middle" autocomplete="off" style="width:70px"></el-input> -
            <el-input v-model="dialog2.rhythm.end" autocomplete="off" style="width:70px"></el-input>
          </el-form-item>

          <div slot="footer" class="dialog-footer" style="display:flex;justify-content:center">
            <el-button type="primary" @click="saveBtn">保存</el-button>
            <el-button type="primary" @click="copyParameter">复制参数</el-button>
            <el-button type="primary" @click="clearAll">清空</el-button>
          </div>
        </div>

        <div class="show" v-show="isShow2">
          <el-form-item label="起始位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.start_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终末位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.end_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="力量：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.strength" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="组数：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.set_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="保持时间：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.duration" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="间歇：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.intermission" autocomplete="off"></el-input>
          </el-form-item>

          <div slot="footer" class="dialog-footer" style="display:flex;justify-content:center">
            <el-button type="primary" @click="saveBtn">保存</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false">关闭</el-button>
          </div>
        </div>

        <div class="show" v-show="isShow3">
          <el-form-item label="起始位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.start_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终末位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.end_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="速度：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.strength" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="组数：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.set_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="次数：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="间歇：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.intermission" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="离心向心比：" :label-width="formLabelWidth">
            <el-input v-model="dialog2.ratio" autocomplete="off"></el-input>
          </el-form-item>

          <div slot="footer" class="dialog-footer" style="display:flex;justify-content:center">
            <el-button type="primary" @click="saveBtn">保存</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false">关闭</el-button>
          </div>
        </div>

      </el-form>

    </el-dialog>

    <!-- 查看设备弹框 3 -->
    <template>
      <el-dialog title="运动疗法" :visible.sync="dialogFormVisible3" width="40%">
        <template slot="title">
          <span style="margin-right:20px">运动疗法：</span>
          <span style="margin-right:20px">类别：</span>
          <span> 坐位膝关节伸展</span>
        </template>

        <div style="display:flex;justify-content:left">
          <div class="img">
            <img src="@/assets/img/video.jpg" alt="" style="">
          </div>
          <div class="description">
            描述....
            description....
          </div>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="dialogFormVisible3=false">关闭</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 表格编辑弹框 4 -->
    <el-dialog title="添加测训单元" :visible.sync="dialogFormVisible4" width="30%" center>
      <el-form :model="dialog4">
        <el-form-item label="类型：" :label-width="formLabelWidth">
          <el-radio-group v-model="dialog4.pattern" @change="radioChange">
            <el-radio :label="1" value="等张">等张</el-radio>
            <el-radio :label="2" value="等长">等长</el-radio>
            <el-radio :label="3" value="等速">等速</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="show" v-show="isShow1">
          <el-form-item label="起始位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.start_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终末位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.end_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="强度：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.strength" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="组数：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.set_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="次数：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="间歇：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.intermission" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="离心向心比:" :label-width="formLabelWidth">
            <el-input v-model="dialog4.ratio" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="阻力特征：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.resistance" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="节律：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.rhythm.start" autocomplete="off" style="width:70px"></el-input> -
            <el-input v-model="dialog4.rhythm.middle" autocomplete="off" style="width:70px"></el-input> -
            <el-input v-model="dialog4.rhythm.end" autocomplete="off" style="width:70px"></el-input>
          </el-form-item>

          <div slot="footer" class="dialog-footer" style="display:flex;justify-content:center">
            <el-button type="primary" @click="saveBtn4">保存</el-button>
            <el-button type="primary" @click="copyParameter">复制参数</el-button>
            <el-button type="primary" @click="clearAll">清空</el-button>
          </div>
        </div>

        <div class="show" v-show="isShow2">
          <el-form-item label="起始位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.start_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终末位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.end_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="力量：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.strength" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="组数：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.set_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="保持时间：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.duration" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="间歇：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.intermission" autocomplete="off"></el-input>
          </el-form-item>

          <div slot="footer" class="dialog-footer" style="display:flex;justify-content:center">
            <el-button type="primary" @click="saveBtn4">保存</el-button>
            <el-button type="primary" @click="dialogFormVisible4 = false">关闭</el-button>
          </div>
        </div>

        <div class="show" v-show="isShow3">
          <el-form-item label="起始位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.start_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终末位置：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.end_position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="速度：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.strength" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="组数：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.set_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="次数：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="间歇：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.intermission" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="离心向心比：" :label-width="formLabelWidth">
            <el-input v-model="dialog4.ratio" autocomplete="off"></el-input>
          </el-form-item>

          <div slot="footer" class="dialog-footer" style="display:flex;justify-content:center">
            <el-button type="primary" @click="saveBtn4">保存</el-button>
            <el-button type="primary" @click="dialogFormVisible4 = false">关闭</el-button>
          </div>
        </div>

      </el-form>
    </el-dialog>

    <!-- 查看/编辑禁忌症 弹框5-->
    <template>
      <el-dialog title="禁忌症" :visible.sync="dialogFormVisible5" width="50%" center>
        <div style="display:flex;justify-content: space-around;">
          <el-form :model="dialog5">
            <el-form-item>
              <span style="font-weight:700;font-size:18px;color: #000000;">限制等级II</span>
            </el-form-item>
            <el-form-item>
              <el-select v-model="dialog5.type1" placeholder="限制重量">
                <el-option label="限制重量" value="限制重量"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上限负荷" style="display:flex">
              <el-input style="width:80px" v-model="dialog5.limit1_weight"></el-input> % <el-select placeholder="BW" v-model="dialog5.type2" style="width:80px">
                <el-option label="BW" value="BW"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="减少负荷" v-model="dialog5.type6">
                <el-option v-model="dialog5.type3" label="减少负荷" value="减少负荷"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="强度减少" :inline="true">
              <el-input style="width:80px" v-model="dialog5.limit1_load"></el-input>
              %
              <el-select placeholder="Fmax" v-model="dialog5.type4" style="width:80px">
                <el-option label="Fmax" value="Fmax"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :model="dialog5">
            <el-form-item>
              <span style="font-weight:700;font-size:18px;color: #000000;">限制等级I</span>
            </el-form-item>
            <el-form-item>
              <el-select v-model="dialog5.type1" placeholder="限制重量">
                <el-option label="限制重量" value="限制重量"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上限负荷" style="display:flex">
              <el-input style="width:80px" v-model="dialog5.limit2_weight"></el-input> % <el-select placeholder="BW" v-model="dialog5.type2" style="width:80px">
                <el-option label="BW" value="BW"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="减少负荷" v-model="dialog5.type5">
                <el-option v-model="dialog5.type3" label="减少负荷" value="减少负荷"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="强度减少" :inline="true">
              <el-input style="width:80px" v-model="dialog5.limit2_load"></el-input>
              % <el-select placeholder="Fmax" v-model="dialog5.type4" style="width:80px">
                <el-option label="Fmax" value="Fmax"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" style="display: flex;justify-content: center;">
          <el-button type="primary" @click="saveBtn5">保存</el-button>
          <el-button type="primary" @click="dialogFormVisible5=false">关闭</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 新增训练次数 弹框6-->
    <template>
      <el-dialog title="新增训练次数" :visible.sync="dialogFormVisible6" width="30%" center>
        <el-form :model="dialog6">
          <el-form-item label="训练名称" :label-width="formLabelWidth">
            <el-input v-model="dialog6.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible6 = false">取消</el-button>
          <el-button type="primary" @click="saveBtn6">确认</el-button>
        </div>
      </el-dialog>
    </template>

  </div>

</template>

<script>
import { addTrainDetail, deleteTrain, deleteTrainDetails, editTrainDetails, getEquipment, viewStageTrain, viewStages, addTrain, getTrainDetails, saveTrainDetail, saveTrainDetailContraindication, editTrainDetailContraindication } from '@/api/index'
import Aside from '@/components/Aside.vue'
export default {
  name: 'KfuScheme',
  components: { Aside },
  data() {
    return {
      isActive: 0,
      leftData: [],
      stages: [{ stages_id: '', train_id: '' }],
      equipmentNames: [],
      isShow1: true,
      isShow2: false,
      isShow3: false,
      activeName: 'first',
      disease_position: '',
      disease_sort: '',
      name: '',
      selectdata: [],
      tableData1: [
        {
          equipment: '',
          type: '',
          pattern: '',
          parameter: ''
        }
      ],
      tableData2: [],
      tableData3: [],
      // 对话弹框1
      dialogFormVisible1: false,
      formLabelWidth: '130px',
      dialog1: {
        type: '',
        equipment: ''
      },
      // 对话弹框2
      dialogFormVisible2: false,
      dialog2: {
        pattern: '',
        start_position: '',
        end_position: '',
        strength: '',
        set_number: '',
        number: '',
        intermission: '',
        ratio: '',
        resistance: '',
        rhythm: {
          start: '',
          middle: '',
          end: ''
        },
        duration: ''
      },
      // 对话弹框3
      dialogFormVisible3: false,
      dialog3: {
        name: '',
        radio: '',
        standard: ''
      },
      // 编辑表格的 对话弹框4
      dialogFormVisible4: false,
      dialog4: {
        id: '',
        pattern: '',
        start_position: '',
        end_position: '',
        strength: '',
        set_number: '',
        number: '',
        intermission: '',
        ratio: '',
        resistance: '',
        rhythm: {
          start: '',
          middle: '',
          end: ''
        },
        duration: ''
      },
      // 表格禁忌症的编辑/查看 弹框5
      dialogFormVisible5: false,
      dialog5: {
        limit1_weight: '',
        limit1_load: '',
        limit2_weight: '',
        limit2_load: ''
      },
      // 新增训练次数的弹框 6
      dialogFormVisible6: false,
      dialog6: {
        name: ''
      }
    }
  },
  created() {
    this.disease_position = this.$route.query.disease_position
    this.disease_sort = this.$route.query.disease_sort
    this.name = this.$route.query.name
    this.getEquipmentName()
    this.getData()
  },
  methods: {
    handleNodeClick(data) {
      let obj = {
        prescription_details_id: this.$route.query.id
      }
      // 利用是否有id来判断，点击的是否为根节点 =>阶段
      if (data.children) {
        viewStages(obj).then(res => {
          res.data.map(item => {
            if (item.name === data.label) {
              this.stages.stages_id = item.id
            }
          })
        })
      } else {
        // 点击的为子节点
        this.stages.train_id = data.id
        this.getDataList()
      }
    },
    //获取阶段的训练数据
    getData() {
      let obj = {
        prescription_details_id: this.$route.query.id
      }
      // 加载阶段的训练次数
      viewStageTrain(obj).then(res => {
        this.leftData = res.data
      })
    },
    // 新增训练次数
    saveBtn6() {
      this.dialogFormVisible6 = false
      let obj = {
        stage_id: this.stages.stages_id,
        name: this.dialog6.name
      }
      addTrain(obj).then(res => {
        console.log(res, '234567')
        if (res.code == 200) {
          this.getData()
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      })
    },
    appendNode(node, data) {
      this.dialogFormVisible6 = true
    },
    // 删除第n次训练次数
    removeNode(node, data) {
      let obj = {
        id: data.id
      }
      deleteTrain(obj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    },

    // 获取数据列表
    getDataList() {
      let obj = {
        train_id: this.stages.train_id
      }
      editTrainDetails(obj).then(res => {
        this.tableData1 = res.data
      })
    },
    // 查询所有设备名称
    getEquipmentName() {
      getEquipment().then(res => {
        this.equipmentNames = res.data
      })
    },
    // 表格的编辑按钮
    editTrain(data) {
      this.dialogFormVisible4 = true
      let obj = {
        id: data.id
      }
      getTrainDetails(obj).then(res => {
        console.log(res, '@!#$^%U')
        if (res.code == 200) {
          let rhythm = {
            start: '',
            middle: '',
            end: ''
          }
          // res.data.rhythm = rhythm
          if (res.data.rhythm) {
            rhythm.start = res.data.rhythm.split('-')[0]
            rhythm.middle = res.data.rhythm.split('-')[1]
            rhythm.end = res.data.rhythm.split('-')[2]
            res.data.rhythm = rhythm
          } else {
            res.data.rhythm = rhythm
          }
          this.dialog4 = Object.assign({}, res.data)
          if (res.data.pattern === '等张模式') {
            this.dialog4.pattern = 1
            this.isShow1 = true
            this.isShow2 = false
            this.isShow3 = false
          } else if (res.data.pattern === '等长模式') {
            this.dialog4.pattern = 2
            this.isShow1 = false
            this.isShow2 = true
            this.isShow3 = false
          } else {
            this.dialog4.pattern = 3
            this.isShow1 = false
            this.isShow2 = false
            this.isShow3 = true
          }
        }
      })
    },
    // 表格的编辑保存按钮
    saveBtn4() {
      let obj = {
        id: this.dialog4.id,
        type: this.dialog4.type,
        equipment: this.dialog4.equipment,
        pattern: this.dialog4.pattern,
        start_position: this.dialog4.start_position,
        end_position: this.dialog4.end_position,
        strength: this.dialog4.strength,
        set_number: this.dialog4.set_number, //组数
        number: this.dialog4.number, //次数
        intermission: this.dialog4.intermission, //间歇
        ratio: this.dialog4.ratio, //离心向心比
        resistance: this.dialog4.resistance, //阻力
        rhythm: this.dialog4.rhythm.start + '-' + this.dialog4.rhythm.middle + '-' + this.dialog4.rhythm.end,
        duration: this.dialog4.duration //保持时间
      }
      if (obj.pattern == '1') {
        obj.pattern = '等张模式'
      } else if (obj.pattern == '2') {
        obj.pattern = '等长模式'
      } else if (obj.pattern == '3') {
        obj.pattern = '等速模式'
      }
      console.log(obj)
      saveTrainDetail(obj).then(res => {
        if (res.code == 200) {
          this.dialogFormVisible4 = false
          this.getDataList()
        }
      })
    },
    // 禁忌症编辑/查看
    jinjiz(data) {
      this.dialogFormVisible5 = true
      // this.dialog5.id = data.id
      let obj = {
        stage_detail_id: data.id
      }
      editTrainDetailContraindication(obj).then(res => {
        console.log(res, '124345768')
        if (res.code == 200) {
          // this.$set(this.dialog5, 'id', res.data[0].id)
          this.dialog5 = Object.assign({}, res.data[0])
          console.log(this.dialog5, 'ty7u890-')
        }
      })
    },
    // 禁忌症编辑的保存按钮
    saveBtn5() {
      this.dialogFormVisible5 = false
      let obj = {
        id: this.dialog5.id,
        limit1_weight: this.dialog5.limit1_weight,
        limit1_load: this.dialog5.limit1_load,
        limit2_weight: this.dialog5.limit2_weight,
        limit2_load: this.dialog5.limit2_weight
      }
      saveTrainDetailContraindication(obj).then(res => {
        if (res.code == 200) {
          console.log(res, 'bianji')
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
        }
      })
    },
    radioChange(val) {
      if (val == '1') {
        this.isShow1 = true
        this.isShow2 = false
        this.isShow3 = false
      } else if (val == '2') {
        this.isShow2 = true
        this.isShow1 = false
        this.isShow3 = false
      } else {
        this.isShow3 = true
        this.isShow1 = false
        this.isShow2 = false
      }
    },
    // 点击选项卡处理事件
    handleClick(tab, event) {
      if (tab.name == 'first') {
        this.activeName = 'first'
      } else if (tab.name == 'second') {
        this.activeName = 'second'
      } else if (tab.name == 'third') {
        this.activeName = 'third'
      } else {
        this.activeName = 'fourth'
      }
    },
    // 新增运动疗法
    addSport() {
      this.dialogFormVisible1 = true
    },
    // 新增选择该设备
    chooseDevice() {
      this.dialog1.equipment = '膝关节屈曲训练器'
    },
    // 添加测训单元的保存
    saveBtn() {
      this.dialogFormVisible2 = false
      let obj = {
        train_id: this.stages.train_id,
        type: this.dialog1.type,
        equipment: this.dialog1.equipment,
        pattern: this.dialog2.pattern,
        start_position: this.dialog2.start_position,
        end_position: this.dialog2.end_position,
        strength: this.dialog2.strength,
        set_number: this.dialog2.set_number, //组数
        number: this.dialog2.number, //次数
        intermission: this.dialog2.intermission, //间歇
        ratio: this.dialog2.ratio, //离心向心比
        resistance: this.dialog2.resistance, //阻力
        rhythm: this.dialog2.rhythm.start + '-' + this.dialog2.rhythm.middle + '-' + this.dialog2.rhythm.end,
        duration: this.dialog2.duration //保持时间
      }
      if (obj.pattern == '1') {
        obj.pattern = '等张模式'
      } else if (obj.pattern == '2') {
        obj.pattern = '等长模式'
      } else if (obj.pattern == '3') {
        obj.pattern = '等速模式'
      }
      console.log(obj, '23r4t5y6u')
      addTrainDetail(JSON.stringify(obj)).then(res => {
        if (res.code == 200) {
          this.getDataList()
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      })
    },

    // 复制参数
    copyParameter() {},
    // 清空按钮
    clearAll() {
      this.dialogFormVisible2 = false
    },
    selectchange(val) {
      this.selectdata = val
    },
    // 批量删除
    deleteLot() {
      let list = []
      this.selectdata.map(item => {
        list.push(item.id)
      })
      let obj = {
        ids: list.join(',')
      }
      deleteTrainDetails(obj).then(res => {
        if (res.code == 200) {
          this.getDataList()
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

.description
  width: 200px
  height: 200px
  border: 1px solid #ccc
  margin-left: 30px
  margin-top: 10px

.imgs
  display: flex
  justify-content: space-between

  .img
    display: flex
    flex-direction: column
    position: relative

.img a
  position: absolute
  right: -10px
  top: -8px

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