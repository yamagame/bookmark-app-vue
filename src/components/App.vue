<script setup>
import { onMounted } from "vue";
import App from "./App.js";
const {
  backgroundColors,
  fontColorIndex,
  colorFilterState,
  bookmarkName,
  bookmarkUrl,
  filteredBookmarks,
  fontColors,
  selectedUrl,
  clickBookmark,
  selectBookmark,
  addBookmark,
  clearButton,
  nextColor,
  mount,
} = App;
onMounted(mount);
</script>

<template>
  <div class="mark-top-header" @click.stop>
    <div class="mark-container" @click.stop>
      <div class="mark-color" :style="{ 'background-color': backgroundColors[fontColorIndex] }"
        @click="() => nextColor(1)"></div>
      <div class="mark-item">
        <input id="filterCheckbox" type="checkbox" v-model="colorFilterState" />
      </div>
      <div class="mark-cell-small">
        <button class="mark-button" @click="clearButton">
          Clear
        </button>
      </div>
      <div class="mark-cell">
        <input placeholder="name" class="mark-input" type="text" @keyDown.stop v-model="bookmarkName" />
      </div>
      <div class="mark-cell-small">
        <button class="mark-button" @click="addBookmark">
          Add
        </button>
      </div>
      <div class="mark-cell-2">
        <input placeholder="url" class="mark-input" type="text" @keyDown.stop v-model="bookmarkUrl" />
      </div>
    </div>
  </div>
  <div class="mark-body-container">
    <div class="mark-card" v-for="bookmark of filteredBookmarks"
      :style="{ 'border': (selectedUrl === bookmark.url ? `solid 2px blue` : `solid 2px white` ), 'background-color': backgroundColors[bookmark.color] }"
      @click.stop="(e) => selectBookmark(bookmark)">
      <a :href="bookmark.url" rel="noopener noreferrer" target="_blank" :style="{ color: fontColors[bookmark.color] }"
        @click.prevent.stop="(e) => clickBookmark(bookmark)">
        {{bookmark.name}}
      </a>
    </div>
  </div>
</template>

<style src="./App.css" scoped>

</style>
