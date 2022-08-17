<template>
  <div flex="~" items="center" gap="x-3">
    <el-input-number
      :value="width"
      @input="$emit('update:width', $event)"
      placeholder="min"
    ></el-input-number>
    <i class="i-mdi-plus i-mdi-rotate-45"></i>
    <el-input-number
      :value="height"
      @input="$emit('update:height', $event)"
      placeholder="max"
    ></el-input-number>
    <span class="text-gray-400 ml-3">全为0表示自动设置宽高</span>
  </div>
</template>

<script setup>
defineProps({
  height: [String, Number],
  width: [String, Number],
});
</script>

<style lang="scss" scoped></style>
