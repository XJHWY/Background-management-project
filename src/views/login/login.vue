<template>
  <div class="login_container">
    <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
      <div class="avatar">
        <img src="@/assets/preview.jpg" alt="">
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username">
          <template #prefix>
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password">
          <template #prefix>
            <i class="el-icon-lock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="right">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="danger" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度为6-16位', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async login () {
      try {
        // 二次验证
        await this.$refs.loginFormRef.validate()
        console.log('校验成功')
        await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    reset () { }
  }
}
</script>

<style lang="scss">
.login_container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    position: relative;
    width: 450px;
    height: 300px;
    background-color: #fff;
    padding: 75px 15px;

    .el-form-item {
      width: 420px;
      height: 40px;
    }

    img {
      // 居中并且垂直方向上居中
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translate(-50%, 100%);
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .right {
      text-align: right;
    }
  }
}
</style>
