<template>
  <div class="page-wrapper">
    <div class="todo-wrapper">
      <div class="search-area">
        <v-text-field
          class="search-input"
          variant="solo-filled"
          placeholder="请输入姓名"
          clearable
          v-model="search"
        />
        <v-btn-toggle class="search-btn" v-model="sex" divided variant="outlined">
          <v-btn text="男" value="male" />
          <v-btn text="女" value="female" />
        </v-btn-toggle>
      </div>
      <v-list class="list-area rounded-lg" v-fade-transition>
        <v-list-item class="list-item" v-for="item in resultList" :key="item.id">
          <span>{{ item.id }} -- {{ item.name }} , {{ item.sex }}</span>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { todoList as list, type TodoList } from './mock-data'
import { computed } from 'vue'

type Sex = 'male' | 'female'

const search = ref<string>('')
const sex = ref<Sex>('male')
const todoList = ref<TodoList>(list)

const resultList = computed(() => {
  return todoList.value.filter(
    (item) => item.sex === sex.value && (search.value ? item.name.includes(search.value) : true)
  )
})
</script>

<style scoped lang="less">
.page-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #aed4f7;

  .todo-wrapper {
    width: 400px;
    height: 600px;
    background: #0d47a1;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;

    .search-area {
      height: 80px;
      width: 100%;
      padding: 20px;
      display: flex;

      > .search-input {
        margin-right: 20px;
      }
      > .search-btn {
        height: 56px;
      }
    }

    .list-area {
      height: calc(100% - 80px);
      margin: 20px;
      overflow: auto;

      .list-item {
        height: 50px;
        margin: 20px;
        border: 1px solid gray;
      }
    }
  }
}
</style>
