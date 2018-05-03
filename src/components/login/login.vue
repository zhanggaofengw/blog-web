<template>
    <div class="login">
        <div class="login-i">
            <h1 class="title">后台管理</h1>
            <el-input v-model="name" placeholder="请输入用户名">
            </el-input>
            <el-input v-model="password" placeholder="请输入密码" type="password">
            </el-input>
            <el-button type="primary" :disabled="!name||!password" @click="login()">登录</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import crypto from 'crypto'
    import {ERR_OK, SUCCESS_CODE, ERROR_CODE} from '../../common/js/config'
    export default {
        data() {
            return {
                name: '',
                password: ''
            }
        },
        methods: {
            login() {
                let md5 = crypto.createHash('md5')
                let password = md5.update(this.password).digest('hex')
                this.$ajax.get(`/login?name=${this.name}&password=${password}`).then((response) => {
                    if (ERR_OK === response.status) {
                        if (response.data.statueCode === SUCCESS_CODE) {
                            this.$router.push('/articleManage')
                        } else if (response.data.statueCode === ERROR_CODE) {
                            this.$message({
                                message: response.data.msg,
                                type: 'error',
                                duration: 1000
                            })
                        }
                    } else {
                        this.$message({
                            message: '登录失败',
                            type: 'error',
                            duration: 1000
                        })
                    }
                })
            }
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
    }

    .login-i {
        width: 300px;
        padding: 40px;
        background: rgba(87, 250, 255, .8);
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

    .login-i .el-button {
        width: 100%;
    }
</style>
