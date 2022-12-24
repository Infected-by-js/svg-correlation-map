<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps({
  items: { type: Array, required: true },
  cellSize: { type: Number, required: true },
  alt: { type: Boolean, required: false },
});

const { cellSize, alt, items } = toRefs(props);

const getAxisPosition = (index: number): string => {
  const x = cellSize.value * 1.5 * (index + 1);
  const y = alt.value ? cellSize.value * 1.5 * items.value.length : 0;

  return `translate(${x},${y})`;
};
</script>

<template>
  <g :text-anchor="alt ? 'end' : 'start'" fill="none" :font-size="cellSize">
    <g
      v-for="(item, index) in items"
      :key="index"
      :transform="getAxisPosition(index)"
    >
      <text
        fill="#425376"
        :x="alt ? -5 : 10"
        :y="-1 * (cellSize * 0.75)"
        dy="0em"
        style="transform: rotate(-90deg)"
      >
        {{ item }}
      </text>
    </g>
  </g>
</template>
