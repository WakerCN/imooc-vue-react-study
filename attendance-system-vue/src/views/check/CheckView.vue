<template>
  <div class="check-view">
    <ElSpace class="header">
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
      <ElTableColumn
        prop="note"
        label="备注"
        :show-overflow-tooltip="{
          popperClass: 'table-tooltip'
        }"
      />
      <ElTableColumn label="操作" width="140">
        <template #default="{ row }">
          <ElButton type="success" plain size="small" @click="handleApply(row, true)">
            同意
          </ElButton>
          <ElButton type="danger" plain size="small" @click="handleApply(row, false)">
            拒绝
          </ElButton>
        </template>
      </ElTableColumn>
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
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import type { CheckInfo } from '@/store/modules/check'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'

const store = useStore()

const keyword = ref('')
const checkStatus = ref('全部')
const pageSize = ref(10)
const currentPage = ref(1)

/** 过滤搜索条件后所有数据 */
const resultList = computed(() =>
  store.state.check.checkList.filter(
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

const handleApply = async (row: CheckInfo, agree: boolean) => {
  const result = await store.dispatch('check/apply', {
    _id: row._id,
    state: agree ? '已通过' : '未通过'
  })
  if (result.errcode === 0) {
    ElMessage.success(`操作成功，已${agree ? '通过' : '拒绝'}申请`)
    await store.dispatch('check/getCheckList')
  } else {
    ElMessage.error(`操作失败，请稍后再试`)
  }
  console.log('%c 🍤 row', 'font-size:16px;color:#666666;background:#AEDCAB', row)
}
</script>

<style scoped lang="scss">
.check-view {
  .header {
    margin-bottom: 20px;
    @include flex-center(flex-end);
    .header-operate {
      @include flex-center();
    }
  }
  .list-table {
    margin-bottom: 10px;

    ::v-deep(.table-tooltip) {
      max-width: 400px;
    }
  }
  .pagination {
    float: right;
  }
}
</style>
