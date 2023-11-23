<template>
  <div class="apply-view">
    <ElSpace class="header">
      <ElButton type="primary" @click="dialogVisible = true">添加审批</ElButton>
      <div class="header-operate">
        <ElInput placeholder="请输入搜索关键字" style="width: 240px" v-model="keyword">
          <template #append><ElButton icon="search" /></template>
        </ElInput>
        <ElDivider direction="vertical" />
        <ElRadioGroup v-model="checkStatus">
          <ElRadioButton label="全部" />
          <ElRadioButton label="待审批" />
          <ElRadioButton label="已通过" />
          <ElRadioButton label="未通过" />
        </ElRadioGroup>
      </div>
    </ElSpace>
    <ElTable class="list-table" :data="pageList" :border="true">
      <ElTableColumn prop="applicantname" label="申请人" width="120" />
      <ElTableColumn prop="reason" label="审批事由" width="120" />
      <ElTableColumn prop="time" label="时间" width="340">
        <template #default="{ row }">
          <div>
            <span>{{ row.time.join(' ~ ') }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="note" label="备注" />
      <ElTableColumn prop="approvername" label="审批人" width="120" />
      <ElTableColumn prop="state" label="状态" width="120" />
    </ElTable>
    <ElPagination
      class="pagination"
      v-model:page-size="pageSize"
      v-model:current-page="currentPage"
      :total="resultList.length"
      :page-sizes="[1, 2, 3, 4, 10]"
      layout="prev, pager, next, sizes, total"
      small
      background
    />
    <ElDialog v-model="dialogVisible" title="添加审批" width="600px" :close-on-click-modal="false">
      <ElForm ref="formRef" class="form" :model="formData" label-width="80px" :rules="rules">
        <ElFormItem prop="approvername" label="审批人">
          <ElSelect
            v-model="formData.approvername"
            placeholder="请选择审批人"
            style="width: 200px"
            clearable
          >
            <ElOption
              v-for="approver in approverList"
              :key="approver._id"
              :value="approver.name"
              :label="approver.name"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="事由" prop="reason">
          <ElSelect
            v-model="formData.reason"
            placeholder="请选择审批事由"
            style="width: 200px"
            clearable
          >
            <ElOption
              v-for="r in ['年假', '事假', '病假', '外出', '补签']"
              :key="r"
              :label="r"
              :value="r"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="时间" prop="time">
          <ElDatePicker
            v-model="formData.time"
            type="datetimerange"
            range-separator=" ~ "
            start-placeholder="起始时间"
            end-placeholder="结束时间"
          />
        </ElFormItem>
        <ElFormItem label="备注" prop="note">
          <ElInput v-model="formData.note" type="textarea" :rows="3" placeholder="请输入备注" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="resetForm(formRef)">重置</ElButton>
          <ElButton type="primary" @click="onSubmit(formRef)">提交</ElButton>
        </span>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import {
  dayjs,
  type DateModelType,
  type FormInstance,
  type FormRules,
  ElMessage
} from 'element-plus'
import { computed, reactive, ref } from 'vue'

interface CheckForm {
  /** 申请人 id */
  applicantid: string
  /** 申请人 */
  applicantname: string
  /** 审批人id */
  approverid: string
  /** 审批人 */
  approvername: string
  /** 审批事由 */
  reason: string
  /** 时间 */
  time: [DateModelType, DateModelType]
  /** 备注 */
  note: string
}

const defaultCheckForm: Partial<CheckForm> = {}

const store = useStore()

const keyword = ref('')
const checkStatus = ref('全部')
const pageSize = ref(10)
const currentPage = ref(1)
const dialogVisible = ref(false)

/** 过滤搜索条件后所有数据 */
const resultList = computed(() =>
  store.state.check.applyList.filter(
    (item) =>
      (item.reason.includes(keyword.value) || item.note.includes(keyword.value)) &&
      (checkStatus.value === '全部' || item.state === checkStatus.value)
  )
)

/** 当前页展示数据 */
const pageList = computed(() =>
  resultList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
)

const approverList = store.state.user.infos!.approver as Array<Record<string, string>>

const formData = reactive<Partial<CheckForm>>(defaultCheckForm)
const formRef = ref<FormInstance>()

const rules = reactive<FormRules<CheckForm>>({
  approvername: [{ required: true, message: '请选择审批人', trigger: 'change' }],
  reason: [{ required: true, message: '请输入审批事由', trigger: 'change' }],
  time: [{ required: true, message: '请选择时间', trigger: 'change' }]
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('%c 🌭 formData ', 'font-size:16px;color:#666666;background:#F5E9AD', formData)
      const uploadFormData = {
        ...formData,
        applicantid: store.state.user.infos!._id as string,
        applicantname: store.state.user.infos!.name as string,
        approverid: approverList.find((a) => a.name === formData.approvername)!._id,
        time: formData.time?.map((t) => dayjs(t).format('YYYY-MM-DD HH:mm:ss'))
      }
      const result = await store.dispatch('check/addApply', uploadFormData)
      if (result.errcode === 0) {
        ElMessage.success('添加审批成功！')
        dialogVisible.value = false
        await store.dispatch('check/getList')
      }
      console.log('%c 🥛 result', 'font-size:16px;color:#666666;background:#C5AEDA', result)
      console.log('%c 🍣 result', 'font-size:16px;color:#666666;background:#C0EBD7', result)
      console.log(
        '%c 🍷 uploadFormData ',
        'font-size:16px;color:#666666;background:#FBCED4',
        uploadFormData
      )
    }
  })
}
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 20px;
  @include flex-center(space-between);
  .header-operate {
    @include flex-center();
  }
}
.list-table {
  margin-bottom: 10px;
}
.pagination {
  float: right;
}

.form {
  width: 470px;
  margin: auto;
  .dialog-footer {
    float: right;
  }
}
</style>
