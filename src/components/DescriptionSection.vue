<script setup lang="ts">
defineProps({
  color: String,
});
</script>

<template>
  <div class="description">
    <h1>Correlation Matrix</h1>
    <button
      @click="$emit('switch-color')"
      class="btn"
      :style="{ borderColor: color, color }"
    >
      Switch table color
    </button>
  </div>
</template>

<style>
.description {
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  padding: 1rem;
  border: 2px solid;
  background-color: transparent;
  margin: 0 10px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 800;
  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
  box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.btn:hover {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.15);
}
</style>
