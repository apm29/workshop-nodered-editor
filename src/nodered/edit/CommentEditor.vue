<template>
  <div>
    <el-form-item label="注释">
      <el-input
        type="textarea"
        :rows="12"
        placeholder="注释"
        v-model="data.info"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
