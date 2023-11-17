<template>
  <div class="main-section">
    <div class="login-wrap">
      <ElForm
        class="login-form"
        ref="formRef"
        :model="loginInfo"
        :rules="formRules"
        :label-width="80"
      >
        <ElFormItem label="邮箱" prop="email">
          <ElInput v-model="loginInfo.email" placeholder="请输入邮箱" />
        </ElFormItem>
        <ElFormItem label="密码" prop="pass">
          <ElInput
            v-model="loginInfo.pass"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </ElFormItem>
        <ElFormItem label="预设账号">
          <ElButton type="default" plain @click="handlePreAccount('HR')">黄蓉</ElButton>
          <ElButton type="default" plain @click="handlePreAccount('HQG')">洪七公</ElButton>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" style="width: 100%" @click="onSubmit(formRef)">登录</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PRE_ACCOUNT } from '@/constants/login'
import { useStore } from '@/store'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  email: string
  pass: string
}

const store = useStore()

const router = useRouter()

const formRef = ref<FormInstance>()

const formRules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

let loginInfo = reactive<User>({
  email: '',
  pass: ''
})

const handlePreAccount = (account: keyof typeof PRE_ACCOUNT) => {
  loginInfo.email = PRE_ACCOUNT[account].email
  loginInfo.pass = PRE_ACCOUNT[account].pass
  onSubmit(formRef.value)
}

const onSubmit = async (form: FormInstance | undefined) => {
  if (!form) {
    return
  }
  const valid = await form.validate()
  if (valid) {
    const res = await store.dispatch('user/login', loginInfo)
    if (res.errcode) {
      ElMessage.error('登录失败')
    } else if (res.errcode === 0) {
      ElMessage.success('登录成功')
      store.commit('user/updateToken', res.token)
      router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped lang="scss">
$loginHeight: 300px;

.main-section {
  width: 100%;
  height: 100%;
  min-height: $loginHeight;
  background:
    url('../../assets/image/loginBg.svg') no-repeat,
    url('../../assets/image/loginBgIll-1.svg') no-repeat;
  background-position:
    center,
    left 50px bottom 50px;
  background-size: cover, 400px;
  @include flex-center();

  > .login-wrap {
    height: $loginHeight;
    width: 400px;
    background: rgba(245, 245, 245, 0.3);
    backdrop-filter: blur(10px);
    @include box-shadow();
    @include border-radius();
    @include flex-center();

    > .login-form {
      width: 100%;
      margin: 10px 50px;

      > .login-btn-area {
        @include flex-center();
        margin-bottom: 20px;
      }
    }

    .pre-account {
      @include flex-center();
    }
  }
}
</style>
