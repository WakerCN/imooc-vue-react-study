<template>
  <ElSpace class="exception-header">
    <ElButton type="primary" @click="$router.push({ name: 'apply' })">异常处理</ElButton>
    <ElDatePicker
      type="month"
      v-model="curMonth"
      style="width: 110px"
      :clearable="false"
      @change="changeMonth"
    />
  </ElSpace>
  <ElRow :gutter="20" class="content">
    <ElCol :span="12">
      <ElTimeline>
        <ElTimelineItem
          v-for="(activity, index) in detail"
          :key="index"
          :timestamp="activity[0]"
          placement="top"
        >
          <ElCard>
            <span class="status">{{ activity[1] }}</span>
            <ElText type="info">打卡详情：{{ renderDetail(activity[2]) }}</ElText>
          </ElCard>
        </ElTimelineItem>
      </ElTimeline>
    </ElCol>
    <ElCol :span="12">
      <ElEmpty v-if="!applyList.length" description="暂无审批信息" />
      <ElTimeline v-else>
        <ElTimelineItem
          v-for="(apply, index) in applyList"
          :key="index"
          :timestamp="apply.reason"
          placement="top"
        >
          <ElCard>
            <div>
              <span class="label">审批状态：</span><ElText type="info">{{ apply.state }}</ElText>
            </div>
            <div>
              <span class="label">申请时间：</span>
              <ElText type="info">{{ apply.time.join(' ~ ') }}</ElText>
            </div>
            <div>
              <span class="label">备注：</span><ElText type="info">{{ apply.note }}</ElText>
            </div>
          </ElCard>
        </ElTimelineItem>
      </ElTimeline>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import dayjs from '@/utils/dayjs'
import _ from 'lodash'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useStore()

const curMonth = ref(route.query.time ? new Date(route.query.time as string) : new Date())

const changeMonth = (date: Date) => {
  router.push({
    name: 'exception',
    query: { time: date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') }
  })
}

const detail = computed<any>(() => {
  const year = curMonth.value.getFullYear()
  const month = String(curMonth.value.getMonth() + 1).padStart(2, '0')
  const signInfos = store.state.sign.infos
  return _.sortBy(
    _.toPairs((signInfos!.detail as Record<string, undefined>)[month]),
    ([k]) => k
  ).map(([time, status]) => [
    `${year}-${month}-${time}`,
    status,
    (signInfos!.time as any)[month][time]
  ])
})

const renderDetail = (detail: unknown): string => {
  if (_.isEmpty(detail)) {
    return '暂无打卡信息'
  } else if (Array.isArray(detail)) {
    return detail.join(' ~ ')
  } else {
    return ''
  }
}

const applyList = computed(() =>
  store.state.check.applyList.filter((apply) =>
    dayjs(curMonth.value).isBetween(
      dayjs(apply.time[0]).startOf('month'),
      dayjs(apply.time[1]).endOf('month'),
      'month',
      '[]'
    )
  )
)
</script>

<style scoped lang="scss">
.exception-header {
  @include flex-center(space-between);
  margin-bottom: 20px;
}
.content {
  min-height: calc(100% - 52px);
  .status {
    display: inline-block;
    min-width: 90px;
  }

  .label {
    text-align: right;
    display: inline-block;
    min-width: 70px;
  }
}
</style>
