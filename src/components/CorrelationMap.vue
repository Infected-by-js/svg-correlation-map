<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted, onBeforeUnmount, watch, computed, } from "vue"; // prettier-ignore
import type { Interval, MapCell } from "@/helpers/types";
import { createMap } from "@/helpers/utils";
import { TICKERS } from "@/helpers/tickers";
import AxisX from "./CorrelationMapAxisX.vue";
import AxisY from "./CorrelationMapAxisY.vue";

const MARGIN = 60;

const props = defineProps({
  colsCount: { type: Number, default: 36 },
  padding: { type: Number, default: 0 },
  color: { type: String, default: "#547AA5" },
});

const { colsCount, padding, color } = toRefs(props);
const cell = reactive({
  size: 15,
  offset: 1.5,
});

const interval = ref<Interval | null>(null);
const corrMap = ref<MapCell[]>([]);

const tickersToDraw = computed(() => TICKERS.slice(0, colsCount.value));
const boardSize = computed(() => {
  return colsCount.value * cell.size * cell.offset + MARGIN * 2;
});

const updateCorr = () => {
  const index = Math.floor(Math.random() * Math.pow(colsCount.value, 2));
  const { rowName, colName } = corrMap.value[index];

  if (rowName === colName) return;

  corrMap.value[index].correlation = Math.round(Math.random() * 90) + 10;
};

watch(
  () => colsCount.value,
  () => (corrMap.value = createMap(tickersToDraw.value, colsCount.value)),
  { immediate: true }
);

onMounted(() => (interval.value = setInterval(updateCorr, 100)));
onBeforeUnmount(() => clearInterval(interval.value as Interval));
</script>

<template>
  <svg :width="boardSize" :height="boardSize">
    <g :transform="`translate(${MARGIN}, ${MARGIN})`">
      <g :transform="`translate(${padding}, ${padding})`">
        <AxisX :items="tickersToDraw" :cell-size="cell.size" />
        <AxisX :items="tickersToDraw" :cell-size="cell.size" alt />

        <AxisY :items="tickersToDraw" :cell-size="cell.size" />
        <AxisY :items="tickersToDraw" :cell-size="cell.size" alt />

        <rect
          v-for="{ col, row, correlation, id } in corrMap"
          :key="id"
          :x="(col - 1) * cell.size * 1.5"
          :y="(row - 1) * cell.size * 1.5"
          :width="cell.size"
          :height="cell.size"
          :fill="color"
          :style="{ opacity: correlation / 100 }"
        />
      </g>
    </g>
  </svg>
</template>
