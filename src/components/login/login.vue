<template>
  <div class="login" @keyup.enter.stop="login()">
    <form name="login" class="login-i">
      <h1 class="title">后台管理</h1>
      <el-input v-model="loginForm.name" placeholder="请输入用户名">
      </el-input>
      <el-input v-model="password" placeholder="请输入密码" type="password">
      </el-input>
      <div>
        <el-input v-model="loginForm.captcha" placeholder="请输入验证码" class="captcha fl">
        </el-input>
        <div v-html="svgCaptcha" class="svgCaptcha fl pointer" @click="getCaptcha"></div>
      </div>
      <el-button type="primary" :disabled="!loginForm.name||!password||!loginForm.captcha" @click="login()">登录
      </el-button>
    </form>
  </div>
</template>
<script type="text/ecmascript-6">
  import crypto from 'crypto'
  import {stringify} from 'qs'
  import {ERR_OK, SUCCESS_CODE, ERROR_CODE} from '../../common/js/config'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data() {
      return {
        loginForm: {},
        password: '',
        svgCaptcha: '',
        captchaTime: ''
      }
    },
    created() {
      this.loginForm = {}
      this.password = ''
      sessionStorage.setItem('userName', '')
      this.getCaptcha()
    },
    methods: {
      login() {
        let md5 = crypto.createHash('md5')
        this.loginForm.password = md5.update(this.password).digest('hex')
        this.loginForm.time = this.captchaTime
        this.$ajax.get(`/login?${stringify(this.loginForm)}`).then((response) => {
          if (ERR_OK === response.status) {
            if (response.data.statueCode === SUCCESS_CODE) {
              sessionStorage.setItem('userName', this.loginForm.name)
              sessionStorage.setItem('userId', response.data.user._id)
              this.addRouterAndMenu({
                menuList: response.data.user.menuList
              })
              this.$router.addRoutes(this.routes)
              this.$router.push('/home')
            } else if (response.data.statueCode === ERROR_CODE) {
              this.getCaptcha()
              this.$message({
                message: response.data.msg,
                type: 'error',
                duration: 1000
              })
            }
          } else {
            this.getCaptcha()
            this.$message({
              message: '登录失败',
              type: 'error',
              duration: 1000
            })
          }
        })
      },
      getCaptcha() {
        this.captchaTime = (new Date()).valueOf()
        this.$ajax.get(`/captcha?_t=${this.captchaTime}`).then((response) => {
          if (ERR_OK === response.status) {
            this.svgCaptcha = response.data
          }
        })
      },
      ...mapActions([
        'addRouterAndMenu'
      ])
    },
    computed: {
      ...mapGetters([
        'routes'
      ])
    }
  }
</script>

<style>
  .login {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('./bg.jpg');
    background-attachment: fixed;
    background-size: cover;
  }

  .login-i {
    width: 300px;
    padding: 40px;
    background: rgba(28, 214, 189, .8);
    border-radius: 5px;
  }

  .login-i .title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }

  .login-i .el-input {
    margin-bottom: 15px;
  }

  .login-i .captcha.el-input, .svgCaptcha {
    width: 50%;
  }

  .login-i .el-button {
    width: 100%;
  }

</style>
