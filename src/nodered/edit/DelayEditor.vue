<template>
  <el-form-item label="延时">
    <el-input-number v-model="data.timeout" placeholder="延时"> </el-input-number>
    秒
  </el-form-item>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
