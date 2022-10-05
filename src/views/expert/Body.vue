<template>
  <dv-full-screen-container>
    <div class="content-box">
      <div class="content">
        <span class="title">{{disease_sort}}-选择疾病部位</span>
        <div class="body">
          <!-- <img src="@/assets/img/body.png" alt=""> -->
          <div class="img" style="text-align: center;">
            <div @click="choosePosition">
              <span class="common btn1" :class="{active: isActive==1}">肩胛</span>
              <span class="common btn2" :class="{active: isActive==2}">肘部</span>
              <span class="common btn3" :class="{active: isActive==3}">手部</span>
              <span class="common btn4" :class="{active: isActive==4}">膝盖</span>
              <span class="common btn5" :class="{active: isActive==5}">头部</span>
              <span class="common btn6" :class="{active: isActive==6}">胸部</span>
              <span class="common btn7" :class="{active: isActive==7}">腰椎</span>
              <span class="common btn8" :class="{active: isActive==8}">臀部</span>
              <span class="common btn9" :class="{active: isActive==9}">足部</span>
            </div>
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
            <div class="line4"></div>
            <div class="lineR1"></div>
            <div class="lineR2"></div>
            <div class="lineR3"></div>
            <div class="lineR4"></div>
            <div class="lineR5"></div>
            <!-- 绑定按钮点击的值 -->
          </div>
        </div>
        <div style="display: flex;justify-content: center;margin-top: 10px;">
          <el-button @click="goback">返回</el-button>
          <el-button @click="next" style="background:#AF855C;color:#FFFFFF">下一步</el-button>
        </div>
      </div>
    </div>
  </dv-full-screen-container>

</template>
    
 <script>
import service from '@/utils/service'
import Aside from '@/components/Aside.vue'
export default {
  name: 'MyMedicine',
  components: { Aside },
  data() {
    return {
      isActive: 0,
      disease_position: '头部',
      disease_sort: ''
    }
  },
  created() {
    this.disease_sort = this.$route.query.disease_sort
  },
  methods: {
    // 选择疾病部位
    choosePosition(e) {
      if (e.target.className == 'common btn1') {
        this.disease_position = '肩胛'
        this.isActive = 1
      } else if (e.target.className == 'common btn2') {
        this.disease_position = '肘部'
        this.isActive = 2
      } else if (e.target.className == 'common btn3') {
        this.disease_position = '手部'
        this.isActive = 3
      } else if (e.target.className == 'common btn4') {
        this.disease_position = '膝盖'
        this.isActive = 4
      } else if (e.target.className == 'common btn5') {
        this.disease_position = '头部'
        this.isActive = 5
      } else if (e.target.className == 'common btn6') {
        this.disease_position = '胸部'
        this.isActive = 6
      } else if (e.target.className == 'common btn7') {
        this.disease_position = '腰椎'
        this.isActive = 7
      } else if (e.target.className == 'common btn8') {
        this.disease_position = '臀部'
        this.isActive = 8
      } else {
        this.disease_position = '足部'
        this.isActive = 9
      }
    },
    next() {
      console.log(this.$route.query.disease_sort, this.disease_position)
      service({
        url: '/specialist/prescription/savePrescription',
        method: 'post',
        params: {
          disease_position: this.disease_position,
          disease_sort: this.$route.query.disease_sort,
          user_id: '0212170e-8c6b-4540-895c-a9115625e59e'
        }
      }).then(res => {
        console.log(res.data[0].id)
        this.$router.push({
          path: '/sicklist',
          query: {
            disease_position: this.disease_position,
            disease_sort: this.$route.query.disease_sort,
            prescription_id: res.data[0].id
          }
        })
      })
    },
    goback() {
      this.$router.push('/choosesick')
    }
  }
}
</script>
    
<style lang="less" scoped>
.img {
  width: 516px;
  height: 582px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background: url('@/assets/img/body.png') no-repeat center;
}
.active {
  background-color: #f49b4dff;
  color: #ffffffff;
}
.content .title {
  font-size: 18px;
  color: #bca791;
  padding-left: 20px;
}
.body {
  // display: flex;
  // justify-content: center;
  height: 582px;
  position: relative;
  font-weight: bold;
  color: #f49b4d;
  text-align: center;
}
.common {
  width: 64px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #fce0c8;
}
.btn1 {
  position: absolute;
  top: 95px;
  left: -35px;
}
.btn2 {
  position: absolute;
  top: 174px;
  left: -63px;
}
.btn3 {
  position: absolute;
  top: 232px;
  left: -79px;
}
.btn4 {
  position: absolute;
  bottom: 137px;
  left: -49px;
}
.btn5 {
  position: absolute;
  top: 42px;
  left: 429px;
}
.btn6 {
  position: absolute;
  top: 142px;
  left: 452px;
}
.btn7 {
  position: absolute;
  top: 217px;
  left: 452px;
}
.btn8 {
  position: absolute;
  top: 309px;
  left: 458px;
}
.btn9 {
  position: absolute;
  bottom: 15px;
  left: 452px;
}
.line1 {
  position: absolute;
  border: 5px solid #f49b4d33;
  border-radius: 6px;
  width: 145px;
  top: 105px;
  left: 35px;
}
.line2 {
  position: absolute;
  border: 5px solid #f49b4d33;
  border-radius: 6px;
  width: 131px;
  top: 185px;
  left: 5px;
}
.line3 {
  position: absolute;
  border: 5px solid #f49b4d33;
  border-radius: 6px;
  width: 126px;
  top: 244px;
  left: -5px;
}
.line4 {
  position: absolute;
  border: 5px solid #f49b4d33;
  border-radius: 6px;
  width: 159px;
  bottom: 150px;
  left: 20px;
}
.lineR1 {
  position: absolute;
  border: 5px solid #f49b4d33;
  border-radius: 6px;
  width: 166px;
  top: 55px;
  left: 250px;
}
.lineR2 {
  position: absolute;
  border: 5px solid #f49b4d33;
  border-radius: 6px;
  width: 189px;
  top: 155px;
  left: 250px;
}
.lineR3 {
  position: absolute;
  border: 5px solid #f49b4d33;
  border-radius: 6px;
  width: 189px;
  top: 230px;
  left: 250px;
}
.lineR4 {
  position: absolute;
  border: 5px solid #f49b4d33;
  border-radius: 6px;
  width: 163px;
  top: 322px;
  left: 282px;
}
.lineR5 {
  position: absolute;
  border: 5px solid #f49b4d33;
  border-radius: 6px;
  width: 128px;
  bottom: 25px;
  left: 330px;
}
</style>