<template>
  <div class="player-wrap">
    <div class="search-header">
      <span class="icon icon-search" />
      <input
        v-model="keywords"
        @input="handleSearch"
        @keydown.enter="
          addHistory(($event.target as HTMLInputElement).value),
            handleResult(($event.target as HTMLInputElement).value)
        "
      />
      <span v-if="keywords !== ''" class="icon icon-delete" @click="handleClean" />
    </div>
    <div class="search-info" v-if="keywords !== ''">
      <span class="text">搜索“{{ keywords }}”</span>
      <div class="clear-btn" @click="clearHistory">
        <span>清空 </span>
        <span class="icon icon-trash_fill"></span>
      </div>
    </div>
    <ul class="history-area">
      <li v-for="h in history" :key="h" class="history-item" @click="handleResult(h)">{{ h }}</li>
    </ul>
    <ul v-if="searchType === SearchType.SUGGEST" class="suggest-area">
      <el-scrollbar>
        <li
          v-for="suggest in suggestions"
          :key="suggest.id"
          class="list-item"
          @click="handleResult(suggest.name), addHistory(suggest.name)"
        >
          <ElIcon class="icon" color="#000"><Search /></ElIcon>
          <div class="name">
            {{ suggest.name }}
          </div>
        </li>
      </el-scrollbar>
    </ul>
    <ul v-if="searchType === SearchType.RESULT" class="suggest-area">
      <li v-for="song in songs" :key="song.id" class="list-item">
        <span class="icon icon-systemprompt_fill"></span>
        <div class="name">
          {{ song.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { SearchType } from './enum'
import { useSearch, useSuggestion, useHistory, useResult } from './netease'

const { keywords, searchType, handleClean } = useSearch()

const { suggestions, getList: getSuggestList } = useSuggestion()

const { songs, getResultList } = useResult()

const { history, addHistory, clearHistory } = useHistory()

const handleSearch = async (e: Event) => {
  if ((e.target as HTMLInputElement).value === '') {
    searchType.value = null
  } else {
    searchType.value = SearchType.SUGGEST
    await getSuggestList(keywords.value)
  }
}

const handleResult = async (word: string) => {
  searchType.value = SearchType.RESULT
  keywords.value = word
  await getResultList(word)
}
</script>

<style scoped lang="less">
.player-wrap {
  width: 100%;
  height: 100%;
  padding: 20px;

  .search-header {
    height: 40px;
    position: relative;

    > * {
      height: 40px;
    }
    > .icon {
      position: relative;
      color: #aaa;
      font-size: 20px;

      &::before {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
      }

      &.icon-search {
        float: left;
        left: 10px;
      }
      &.icon-delete {
        float: right;
        right: 30px;
      }
    }

    > input {
      background: none;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 6px;
      position: absolute;
      left: 0px;
      right: 0px;
      text-indent: 30px;
      transition: all 0.3s ease;

      &:focus {
        border-color: powderblue;
      }
    }
  }

  .search-info {
    margin: 10px 0;
    height: 20px;
    display: flex;
    justify-content: space-between;

    > .text {
      max-width: 300px;
      .ellipsis();
    }
    > .clear-btn {
      .flex-center-h();
    }
  }

  .history-area {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    font-size: 10px;
    > .history-item {
      display: inline-block;
      background: #aaa;
      border-radius: 6px;
      padding: 4px 8px;
      margin: 0 8px 8px 0;
      .ellipsis();
      max-width: 100px;
    }
  }

  .suggest-area {
    height: calc(100% - 80px);

    .list-item {
      width: 100%;
      margin-bottom: 2px;
      padding: 10px 0;
      border-radius: 6px;
      .flex-center-h();

      > .name {
        .ellipsis();
      }

      > .icon {
        margin-right: 6px;
      }
    }
  }
}
</style>
