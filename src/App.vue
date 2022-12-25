<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, onMounted } from "vue";
import { getRandomColor } from "./helpers/utils";
import CorrelationMap from "./components/CorrelationMap.vue";
import DescriptionSection from "./components/DescriptionSection.vue";

const sizes = [
  { condition: (w: number) => w < 375, cols: 9 },
  { condition: (w: number) => w >= 375 && w < 440, cols: 10 },
  { condition: (w: number) => w >= 440 && w < 768, cols: 15 },
  { condition: (w: number) => w >= 768 && w < 1024, cols: 24 },
  { condition: (w: number) => w >= 1024 && w < 1440, cols: 30 },
  { condition: (w: number) => w >= 1440, cols: 34 },
];

const screenSize = ref(0);
const tableColor = ref("#547AA5");
const colsCount = computed(() => {
  return sizes.find((item) => item.condition(screenSize.value))?.cols || 32;
});

const setWidth = () => (screenSize.value = window.innerWidth);
const switchColor = () => (tableColor.value = getRandomColor());

setWidth();

onMounted(() => window.addEventListener("resize", setWidth));
onBeforeUnmount(() => window.removeEventListener("resize", setWidth));
</script>

<template>
  <DescriptionSection @switch-color="switchColor" :color="tableColor" />
  <CorrelationMap :cols-count="colsCount" :cell-size="14" :color="tableColor" />
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
  flex-direction: column;
}
</style>
