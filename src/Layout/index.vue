<template>
  <div>
    <el-container class="container">
      <el-header>
        <div class="logo">
          <img src="@/assets/preview.jpg" alt="">
        </div>
        <span class="title">云顶小棋圣</span>
        <div class="btn">
          <el-button @click="logout">退出</el-button>
        </div>
      </el-header>

      <!-- 主体部分 -->
      <el-container>
        <el-aside width="200px" :style="{ width: isCollapse ? '43px' : '200px' }">
          <el-button icon="el-icon-s-fold" class="collapse" :style="{ width: isCollapse ? '43px' : '200px' }"
            @click="isCollapse = !isCollapse"></el-button>
          <el-menu :collapse="isCollapse" background-color="#373d41" text-color="#fff" unique-opened>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="$router.push('users')">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="$router.push('roles')">角色列表</el-menu-item>
                <el-menu-item index="2-2" @click="$router.push('rights')">权限列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="$router.push('goods')">商品列表</el-menu-item>
                <el-menu-item index="3-2" @click="$router.push('params')">分类参数</el-menu-item>
                <el-menu-item index="3-3" @click="$router.push('categories')">商品分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="$router.push('orders')">订单列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>

        <!-- main区域 -->
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () { },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    token (val) {
      if (val === null) {
        this.$router.push('/login')
      }
    }
  },
  filters: {},
  components: {
  }
}
</script>

<style scoped lang='scss'>
.container {
  height: 100vh;
}

.el-container {
  .el-header {
    display: flex;
    align-items: center;
    background-color: #373d41;

    .logo {
      margin-left: 10px;
      width: 60px;
      height: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      margin-left: 10px;
    }

    .btn {
      position: fixed;
      right: 10px;
      top: 10px;
    }
  }

  .el-aside {
    background-color: #373d41;
    height: 100%;

    .el-menu {
      border-right: none;

      .el-icon-menu {
        margin-right: 10px;
        color: #909399;
      }
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

  .collapse {
    width: 200px;
    text-align: center;
  }
}
.el-breadcrumb {
  padding-bottom: 15px;
}
</style>
