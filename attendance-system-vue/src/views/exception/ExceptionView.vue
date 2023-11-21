<template>
  <ElSpace class="exception-header">
    <ElButton type="primary">异常处理</ElButton>
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
        <ElTimelineItem v-for="(activity, index) in detail" :key="index" :timestamp="activity[0]">
          <ElCard>
            <span class="status">{{ activity[1] }}</span>
            <ElText type="info">打卡详情：{{ renderDetail(activity[2]) }}</ElText>
          </ElCard>
        </ElTimelineItem>
      </ElTimeline>
    </ElCol>
    <ElCol :span="12">
      <ElEmpty description="暂无事件" />
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { rootStore, type StateAll } from '@/store'
import _ from 'lodash'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

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
  const signInfos = (rootStore.state as StateAll).sign.infos
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
console.log('%c 🍺 detail', 'font-size:16px;color:#666666;background:#F5E9AD', detail)
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
}
</style>
