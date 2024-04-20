<template>
    <div class="login-box">
        <el-form ref="loginFormRef" style="max-width: 600px" :model="loginData" status-icon :rules="rules"
            label-width="80px" class="login-form">
            <h2>xxx系统登录</h2>
            <el-form-item label="账号" prop="accountName">
                <el-input v-model="loginData.accountName"  autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginData.password" type="password"  autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="loginButton" @click="submitForm(loginFormRef)">
                    登录
                </el-button>
                <el-button class="loginButton" @click="resetForm(loginFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance  } from 'element-plus'
import { login } from '@/server/user/index'

const loginFormRef = ref<FormInstance>()
const loginData= ref({
    accountName: '',
    password: ''
});
const rules = ref({
    accountName: [
        { required: true, message: '请输入你的账号', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入你的密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' }
    ]
});

/** 登录 */
const submitForm = (formEl: FormInstance) => {
    console.log(formEl) // TODO 提示登录中
    if(!formEl) return;
    formEl.validate((valid: boolean) => {
        if (valid) {
            login(loginData.value).then(() => {
                // 登录成功
                console.log('登录成功') // TODO 跳转到首页      
            }).catch(() => {
                // 登录失败
                console.log('登录失败') // TODO 提示错误信息    
            })

        }else{
            console.log('表单验证失败') // TODO 提示错误信息
            return false;
        }
    })
}

/** 重置表单 */
const resetForm = (formEl: FormInstance) => {
    if(!formEl) return;
    formEl.resetFields();
}
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url('../assets/images/bg.jpg') no-repeat;
    padding: 1px;
    text-align: center;
    .login-form {
        width: 500px;
        margin: 200px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 40px;
    
    }
    .loginButton{
        width: 48%;
    }
    h2{
        margin-bottom: 10px;
    }
}

</style>