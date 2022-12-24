<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { onMounted } from "vue";
import CorrelationMap from "./components/CorrelationMap.vue";

const sizes = [
  { condition: (w: number) => w < 375, cols: 9 },
  { condition: (w: number) => w >= 375 && w < 440, cols: 10 },
  { condition: (w: number) => w >= 440 && w < 768, cols: 15 },
  { condition: (w: number) => w >= 768 && w < 1024, cols: 24 },
  { condition: (w: number) => w >= 1024 && w < 1440, cols: 30 },
  { condition: (w: number) => w >= 1440, cols: 34 },
];

const screenSize = ref<number>(0);
const colsCount = computed(() => {
  return sizes.find((item) => item.condition(screenSize.value))?.cols || 32;
});

const setWidth = () => (screenSize.value = window.innerWidth);

setWidth();

onMounted(() => window.addEventListener("resize", setWidth));
onBeforeUnmount(() => window.removeEventListener("resize", setWidth));
</script>

<template>
  <CorrelationMap :cols-count="colsCount" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
}
</style>
