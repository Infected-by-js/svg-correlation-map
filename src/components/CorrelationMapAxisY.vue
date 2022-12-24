<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps({
  items: { type: Array, required: true },
  cellSize: { type: Number, required: true },
  alt: { type: Boolean, required: false },
});

const { cellSize, alt, items } = toRefs(props);

const getAxisPosition = (index: number): string => {
  const x = alt.value ? cellSize.value * 1.5 * items.value.length : 0;
  const y = cellSize.value * 1.5 * (index + 1);

  return `translate(${x},${y})`;
};
</script>

<template>
  <g fill="none" :font-size="cellSize" :text-anchor="alt ? 'start' : 'end'">
    <g
      v-for="(row, index) in items"
      :key="index"
      :transform="getAxisPosition(index)"
    >
      <text
        fill="#425376"
        :x="alt ? 0 : -10"
        :y="-1 * (cellSize * 0.75)"
        dy="0em"
      >
        {{ row }}
      </text>
    </g>
  </g>
</template>
