import { ref, computed } from 'vue'

const backgroundColors = [
  "#B80000",
  "#DB3E00",
  "#FCCB00",
  "#008B02",
  "#006B76",
  "#1273DE",
  "#004DCF",
  "#5300EB",
  "#EB9694",
  "#FAD0C3",
  "#FEF3BD",
  "#C1E1C5",
  "#BEDADC",
  "#C4DEF6",
  "#BED3F3",
  "#D4C4FB",
];

const defaultColor = backgroundColors[13];
const fontColors =
  backgroundColors.map((color, i) => {
    return i >= backgroundColors.length / 2 || color === defaultColor || color === "#FCCB00" ? "#555" : "white";
  })

const bookmarkName = ref("");
const bookmarkUrl = ref("");
const colorFilterState = ref(false);
const bookmarks = ref([]);
const selectedUrl = ref("");
const fontColorIndex = ref(13);
const filteredBookmarks = computed(() => bookmarks.value.filter((v) => v.color === fontColorIndex.value || !colorFilterState.value));

function clearButton() {
  bookmarkName.value = "";
}

function saveBookmark() {
  localStorage.setItem("vue-bookmarks", JSON.stringify(bookmarks.value));
}

function addBookmark() {
  if (bookmarkUrl.value === "") return;
  const value = [...bookmarks.value.filter((v) => v.url !== bookmarkUrl.value)];
  value.splice(0, 0, ({ name: bookmarkName.value || bookmarkUrl.value, url: bookmarkUrl.value, color: fontColorIndex.value }));
  bookmarks.value = value;
  saveBookmark();
}

function selectBookmark(bookmark) {
  selectedUrl.value = bookmark.url;
  fontColorIndex.value = bookmark.color;
}

function clickBookmark(bookmark) {
  const value = [...bookmarks.value.filter((v) => v.url !== bookmark.url)];
  value.splice(0, 0, ({ name: bookmark.name, url: bookmark.url, color: bookmark.color }));
  bookmarks.value = value;
  saveBookmark();
  bookmarkName.value = bookmark.name;
  bookmarkUrl.value = bookmark.url;
  fontColorIndex.value = bookmark.color;
  selectBookmark(bookmark);
  window.open(bookmark.url, "_blank");
}

const updateColor = (color) => {
  const value = [...bookmarks.value.map((v) => {
    if (v.url === selectedUrl.value) {
      return { ...v, color };
    }
    return v;
  })];
  bookmarks.value = value;
  saveBookmark();
}

function nextColor(delta) {
  let value = fontColorIndex.value;
  value += delta;
  if (value >= fontColors.length) value = 0;
  if (value < 0) value = fontColors.length - 1;
  fontColorIndex.value = value;
  updateColor(value);
}

const mount = (() => {
  const data = localStorage.getItem("vue-bookmarks");
  if (typeof data === "string") {
    bookmarks.value = (JSON.parse(data)).filter((v) => v.url);
  }
  const onClick = (e) => {
    selectedUrl.value = "";
  };
  window.addEventListener("click", onClick);
  const onKeyDown = (e) => {
    if (e.key === "Backspace") {
      const value = [...bookmarks.value.filter((v) => v.url !== selectedUrl.value)];
      bookmarks.value = value;
      saveBookmark();
    }
    if (e.key === "ArrowRight") {
      nextColor(1);
    }
    if (e.key === "ArrowLeft") {
      nextColor(-1);
    }
  };
  window.addEventListener("keydown", onKeyDown);
})

export default {
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
}
