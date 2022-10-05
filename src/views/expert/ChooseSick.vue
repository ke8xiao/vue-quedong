<template>
  <div class="content-box">
    <div class="content">
      <div class="content-head">
        <span class="title" style="padding-left:31px">新增处方-选择疾病种类</span>
        <div class="center">
          <div class="one" :class="{active:isActive===1}" style="margin-right:20px" @click="gukeMethod(1)">
            <span style="font-size:38px;">骨科康复</span>
            <span style="font-size:19px;">Orthopaedic Rehabili</span>
            <span>骨科康复图片</span>
          </div>
          <div class="two" :class="{active:isActive===2}" @click="xinFeiMethod(2)">
            <span style="font-size:38px">心肺康复</span>
            <span style="font-size:19px">Cardiopulmonary Rehabilitation</span>
            <span>心肺康复图片</span>
          </div>
        </div>
        <div class="center">
          <div class="one" :class="{active:isActive===3}" style="margin-right:20px" @click="shenJinMethod(3)">
            <span style="font-size:38px">神经康复</span>
            <span style="font-size:19px">Neurological Rehabilitation</span>
            <span>骨科康复图片</span>
          </div>
          <div class="two" :class="{active:isActive===4}" @click="childrenMethod(4)">
            <span style="font-size:38px">儿童康复</span>
            <span style="font-size:19px">Children's Rehabilitation</span>
            <span>心肺康复图片</span>
          </div>
        </div>
        <div style="position: absolute;left:50%;margin:10px 0 0 -30px;">
          <el-button class="nextStep" @click="next">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Aside from '@/components/Aside.vue'
import router from '@/router'
export default {
  name: 'MyMedicine',
  components: { Aside },
  data() {
    return {
      disease_sort: '',
      isActive: 0
    }
  },

  methods: {
    gukeMethod(index) {
      this.disease_sort = '骨科康复'
      this.isActive = index
      console.log(this.disease_sort)
    },
    xinFeiMethod(index) {
      this.disease_sort = '心肺康复'
      this.isActive = index
      console.log(this.disease_sort)
    },
    shenJinMethod(index) {
      this.disease_sort = '神经康复'
      this.isActive = index
      console.log(this.disease_sort)
    },
    childrenMethod(index) {
      this.disease_sort = '儿童康复'
      this.isActive = index
      console.log(this.disease_sort)
    },
    next() {
      this.$router.push({
        path: '/body',
        query: {
          disease_sort: this.disease_sort
        }
      })
    }
  }
}
</script>
  
  <style lang="css" scoped>
.content-head .title {
  font-size: 16px;
  color: #bca791;
}
.center {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.center span {
  text-align: center;
  font-family: '微软雅黑';
}
.one,
.two {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 240px;
  color: #f49b4d;
  background: #fff1e6;
  font-family: YouSheBiaoTiHei;
}
.active {
  background: #f49b4d;
  color: #fff;
}
</style>