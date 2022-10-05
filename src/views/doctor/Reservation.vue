<template>
  <div class="content-box">
    <div class="content">
      <span class="title">张三-预约</span>
      <el-calendar v-model="value">
      </el-calendar>
    </div>
  </div>
</template>
    
<script>
import Aside from '@/components/Aside.vue'
export default {
  name: 'Reservation',
  components: { Aside },
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="css" scoped>
</style>