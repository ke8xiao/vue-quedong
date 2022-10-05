<template>
  <div class="aside">
    <!-- 开启路由模式加上 router="true" 即可-->
    <el-menu :default-active="$route.path" class="aside-el-menu" router>
      <el-submenu index="1">
        <template slot="title">
          <span slot="title">处方管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/" style="padding-left:27px">我的处方</el-menu-item>
          <el-menu-item index="/choosesick" style="padding-left:27px">新建处方</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/">
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Aside'
}
</script>

<style lang="css">
.aside {
  display: block;
  position: absolute;
  left: 0;
  top: 52px;
  bottom: 0;
}
.el-menu {
  background-color: #ffe4c4;
}
.aside-el-menu:not(.el-menu--collapse) {
  width: 110px;
}
.aside > ul {
  height: 100%;
}
</style>