<template>
  <div>
    <div class="header">
      <div class="left-logo fl">blog</div>
      <div class="right">
        <div class="icon" @click="changeCollapse()">
          <span class="icon-bar"></span>
          <span class="icon-bar icon-bar-t"></span>
          <span class="icon-bar icon-bar-t"></span>
        </div>
        <div class="fr user">
          <el-popover
            placement="bottom"
            width="160"
            v-model="visible">
            <div style="text-align: right; margin: 0">
              <el-button size="mini" @click="changePassword()">修改密码</el-button>
              <el-button size="mini" @click="loginOut()">退出</el-button>
            </div>
            <div slot="reference" class="set">
              <span>{{userName}}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px"
               :close-on-click-modal="false" @close="close">
      <el-form :model="user" :rules="rules" ref="user">
        <el-form-item label="用户名" label-width="100px">
          <el-input size="medium" v-model="user.name" placeholder="用户名" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px" prop="password">
          <el-input auto-complete="off" type="password" size="medium" v-model="user.password"
                    placeholder="请输入6-20位且含有数字和字母的密码"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" label-width="100px" prop="password2">
          <el-input auto-complete="off" type="password" size="medium" v-model="user.password2"
                    placeholder="请重复密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="updatePassword"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <span class="updateSuccess">{{msg}}</span>
      <div class="reRegister">{{countdown}}s后将重新登录</div>
      <span @click="reRegister()" class="pointer updateSuccess">直接重新登录</span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {ERR_OK, SUCCESS_CODE, ERROR_CODE, PAGESIZE} from '../../common/js/config'
  import crypto from 'crypto'
  const COUNTDOWN = 3
  export default{
    data() {
      let validatePassword = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
        if (!value) {
          callback(new Error('请输入密码'))
        } else if (value.length <= 5 || value.length >= 19) {
          callback(new Error('请输入6-20位的密码'))
        } else if (!reg.test(value)) {
          callback(new Error('密码必须同时含有数字和字母'))
        } else {
          if (this.user.password2 !== '') {
            this.$refs.user.validateField('password2')
          }
          callback()
        }
      }
      let validatePassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        dialogFormVisible: false,
        dialogVisible: false,
        timer: null,
        user: {
          password: '',
          password2: ''
        },
        countdown: COUNTDOWN,
        rules: {
          password: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
          password2: [
            {required: true, validator: validatePassword2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      reRegister() {
        sessionStorage.setItem('userName', '')
        this.$router.push('/login')
      },
      changeCollapse() {
        this.setCollapse(!this.collapse)
      },
      loginOut() {
        this.visible = false
        this.reRegister()
      },
      changePassword() {
        this.visible = false
        this.dialogFormVisible = true
        this.user.name = sessionStorage.getItem('userName')
      },
      close() {
        this.$refs.user.resetFields()
      },
      submit() {
        this.$refs.user.validate((valid) => {
          if (valid) {
            let md5 = crypto.createHash('md5')
            let password = md5.update(this.user.password).digest('hex')
            this.$ajax.get(`/user/updatePassword?name=${this.user.name}&password=${password}`).then((response) => {
              if (ERR_OK === response.status) {
                if (response.data.statueCode === SUCCESS_CODE) {
                  this.dialogFormVisible = false
                  this.dialogVisible = true
                  this.msg = response.data.msg
                  this.timer = setInterval(() => {
                    if (this.countdown <= 1) {
                      this.reRegister()
                      clearInterval(this.timer)
                    }
                    this.countdown--
                  }, 1000)
                } else if (response.data.statueCode === ERROR_CODE) {
                  this.$message({
                    message: response.data.msg,
                    type: 'error',
                    duration: 1000
                  })
                }
              } else {
                this.$message({
                  message: '修改失败',
                  type: 'error',
                  duration: 1000
                })
              }
            })
          } else {
            return false
          }
        })
      },
      ...mapMutations({
        setCollapse: 'SET_COLLAPSE'
      })
    },
    created() {
      this.msg = ''
      this.userName = sessionStorage.getItem('userName')
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    computed: {
      ...mapGetters([
        'collapse'
      ])
    }
  }
</script>

<style>
  .header {
    position: fixed;
    z-index: 101;
    top: 0;
    width: 100%;
    height: 50px;
    background: #fff;
  }

  .left-logo {
    width: 200px;
    height: 50px;
    background: #262729;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header .right {
    margin-left: 200px;
    height: 100%;
  }

  .header .right .icon {
    display: inline-block;
    padding: 9px 5px;
    margin: 9px 0 0 5px;
    cursor: pointer;
  }

  .header .right .user {
    height: 100%;
    cursor: pointer;
  }

  .header .user span {
    font-weight: bold;
  }

  .header .user > span, .header .user .set {
    height: 100%;
  }

  .header .user .set {
    display: flex;
    align-items: center;
  }

  .header .right .user:hover {
    color: #C0C4CC;
  }

  .header .icon:hover .icon-bar {
    background: #C0C4CC;
  }

  .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 4px;
    background: #333;
  }

  .icon-bar.icon-bar-t {
    margin-top: 4px;
  }

  .updatePassword .el-dialog__header {
    padding: 0;
  }

  .updatePassword .el-dialog__body {
    text-align: center;
    padding: 10px;
  }

  .updatePassword .updateSuccess {
    color: #409EFF;
  }

  .updatePassword .reRegister {
    color: #f56c6c;
    padding: 5px 0;
  }

  @media screen and (max-width: 560px) {
    .header {
      height: 100px;
    }

    .left-logo {
      width: 100%;
    }

    .header .right {
      margin-left: 0;
    }

    .header .right .user {
      height: 50px;
    }
  }
</style>
