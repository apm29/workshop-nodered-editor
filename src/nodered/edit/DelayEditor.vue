<template>
  <el-form-item label="延时">
    <el-input-number v-model="data.timeout" placeholder="延时"> </el-input-number>
    <el-select v-model="data.timeoutUnits" placeholder="">
      <el-option label="毫秒" value="milliseconds"></el-option>
      <el-option label="秒" value="seconds"></el-option>
      <el-option label="分钟" value="minutes"></el-option>
      <el-option label="小时" value="hours"></el-option>
      <el-option label="天" value="days"></el-option>
    </el-select>
  </el-form-item>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
