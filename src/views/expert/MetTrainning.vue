<template>
  <div class="content-box">
    <div class="head">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="测评和训练" name="first"></el-tab-pane>
        <el-tab-pane label="直接训练" name="second">直接训练</el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <div class="title">张三-女-脑卒中方案</div>
      <div class="list">

        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="选择疾病"></el-step>
          <el-step title="填写参数"></el-step>
          <el-step title="生成推荐方案"></el-step>
          <el-step title="开始训练"></el-step>
        </el-steps>

        <div class="illness">

          <div class="illness-one">
            <span>疾病分类：</span>
            <span>
              <el-button>肌肉骨骼病</el-button>
              <el-button>神经系统疾病</el-button>
              <el-button>心脏复苏</el-button>
            </span>
          </div>

          <div class="illness-two">
            <span>疾病分类：</span>
            <span>
              <el-button>脑卒中</el-button>
              <el-button>神经系统疾病</el-button>
              <el-button>肌肉骨骼病</el-button>
              <el-button>帕金森</el-button>
              <el-button>肌肉骨骼病</el-button>
              <el-button>心脏复苏</el-button>
              <el-button>肌肉骨骼病</el-button>
              <el-button>神经系统疾病</el-button>
              <el-button>肌肉骨骼病</el-button>
              <el-button>帕金森</el-button>
              <el-button>肌肉骨骼病</el-button>
            </span>
          </div>

        </div>

      </div>
      <div class="nextStep">
        <el-button class="nextStep">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
export default {
  components: { Aside },
  data() {
    return {
      activeName: 'first',
      active: 0
    }
  },
  methods: {
    getdata() {},
    handleClick() {}
  }
}
</script>

<style scoped lang="css">
.head {
  height: 35px;
  line-height: 35px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
.head span {
  padding-right: 30px;
}
.head .active {
  color: orange;
}
.content .title {
  padding: 10px 0;
  padding-left: 30px;
}

.content .illness {
  padding: 0 200px;
  margin: 50px;
}

.content .illness span {
  line-height: 30px;
}
.nextStep {
  display: flex;
  justify-content: center;
}
.nextStep button {
  position: absolute;
  bottom: 40px;
}
</style>