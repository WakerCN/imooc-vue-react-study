<template>
  <div class="sign-view">
    <ElDescriptions class="desc-wrap" title="考勤详情" direction="vertical" :column="9" border>
      <ElDescriptionsItem label="月份" align="right" :width="60">
        {{ month }}月
      </ElDescriptionsItem>
      <ElDescriptionsItem
        v-for="(value, key) in DetailKey"
        :key="key"
        :label="value"
        align="right"
      >
        {{ detailInfo[key] }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="操作" :width="120" align="center">
        <ElButton type="primary" plain @click="$router.push({ name: 'exception' })">
          查看详情
        </ElButton>
      </ElDescriptionsItem>
      <ElDescriptionsItem label="考勤状态" :width="90" align="right">
        <ElTag :type="detailState.type">{{ detailState.text }}</ElTag>
      </ElDescriptionsItem>
    </ElDescriptions>

    <ElCalendar ref="calendar" :modelValue="selectDate">
      <template #header>
        <div class="calendar-header">
          <ElButton type="primary" @click="handleSign">打卡</ElButton>
          <ElSpace>
            <el-date-picker
              style="width: 110px"
              placeholder="选择一个月份"
              type="month"
              :clearable="false"
              v-model="selectMonth"
              @change="changeMonth"
              :popper-options="{ placement: 'bottom-end' }"
            />
            <ElButton @click="handleToday">今天</ElButton>
          </ElSpace>
        </div>
      </template>
      <template #date-cell="{ data }">
        <div class="date-cell" @click="clickCell(data)">
          <div class="date">
            {{ renderDate(data) }}
          </div>
          <div class="sign-time">
            {{ renderTime(data) }}
          </div>
        </div>
      </template>
    </ElCalendar>
  </div>
</template>

<script setup lang="ts">
import { rootStore, type StateAll } from '@/store'
import type { CalendarInstance } from 'element-plus'
import _ from 'lodash'
import { computed, reactive, ref, watchEffect } from 'vue'

const selectDate = ref(new Date())
const selectMonth = ref(selectDate.value)
const month = computed(() => selectDate.value.getMonth() + 1)
const calendar = ref<CalendarInstance>()

const changeMonth = (value: Date) => {
  value.setDate(1)
  selectDate.value = value
  selectMonth.value = value
}

const handleToday = () => {
  selectDate.value = new Date()
}

enum DetailKey {
  normal = '正常出勤',
  absent = '旷工',
  miss = '漏打卡',
  late = '迟到',
  early = '早退',
  lateAndEarly = '迟到并早退'
}

const defaultDetail: { [index: string]: number } = {
  normal: 0,
  absent: 0,
  miss: 0,
  late: 0,
  early: 0,
  lateAndEarly: 0
}

/** 详情 */
let detailInfo = reactive(defaultDetail)

const detailState = reactive<{ type: 'danger' | 'success'; text: '正常' | '异常' }>({
  type: 'success',
  text: '正常'
})

watchEffect((onCleanup) => {
  const monthStr = String(month.value).padStart(2, '0')
  const curMonthDetail = (
    (rootStore.state as StateAll).sign.infos!.detail as { [index: string]: unknown }
  )[monthStr]
  /* 更具当月详情计算各个处理次数
  =========================================== */
  const vToKey = _.invert(DetailKey)
  _.values(curMonthDetail).forEach((k) => {
    detailInfo[vToKey[k]]++
  })
  for (const key in detailInfo) {
    if (key !== 'normal' && detailInfo[key] !== 0) {
      detailState.text = '异常'
      detailState.type = 'danger'
    }
  }

  onCleanup(() => {
    for (const key in detailInfo) {
      detailInfo[key] = 0
      detailState.text = '正常'
      detailState.type = 'success'
    }
  })
})

const renderDate = (data: { [index: string]: any }) => {
  return data.day.split('-').slice(1).join('-')
}

/** 渲染签到时间 */
const renderTime = (data: { [index: string]: any }) => {
  const signInfos = (rootStore.state as StateAll).sign.infos
  const [, month, day] = data.day.split('-')
  if (signInfos?.time) {
    const time = (signInfos?.time as { [index: string]: string })[month][day]
    return Array.isArray(time) ? time.join(' ~ ') : time
  }
}

const clickCell = (data: { [index: string]: any }) => {
  const date = new Date(data.day)
  selectDate.value = date
  selectMonth.value = date
}

/** 打卡签到 */
const handleSign = async () => {
  await rootStore.dispatch('sign/sign')
}
</script>

<style scoped lang="scss">
.sign-view {
  --el-border-color-lighter: rgba(0, 0, 0, 0.05);
  .desc-wrap {
    margin-bottom: 20px;
  }

  .el-descriptions {
    background: none;
    :deep(.el-descriptions__body) {
      @include forsted-glass();
    }
  }

  .el-calendar {
    @include forsted-glass();
    .calendar-header {
      width: 100%;
      @include flex-center(space-between);
    }

    :deep(.el-calendar-day) {
      padding: 0;
    }

    .date-cell {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-direction: column;
      .date {
        font-size: 12px;
      }
      .sign-time {
        flex: 1;
        @include flex-center();
      }
    }
  }
}
</style>
