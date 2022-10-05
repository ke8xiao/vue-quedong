<template>
  <div class="header">
    <header>
      <span class="logo">
        <img src="../assets/img/logo.png" alt="">
      </span>
      <h3>鹊动管理平台</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>
header {
  display: flex;
  width: 100%;
  height: 52px;
  line-height: 52px;
  background-color: burlywood;
}
header .logo {
  padding: 9px 0 16px 8px;
}
header h3 {
  position: absolute;
  left: 140px;
  color: white;
  font-size: 24px;
}
</style>