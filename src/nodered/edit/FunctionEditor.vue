<template>
  <div>
    <el-form-item label="输出">
      <el-input-number v-model="data.outputs" placeholder="输出"></el-input-number>
    </el-form-item>
    <el-form-item label="库">
      <LibraryImporter :libs="data.libs"></LibraryImporter>
    </el-form-item>
    <el-tabs>
      <el-tab-pane label="函数" lazy>
        <textarea v-model="data.func"></textarea>
      </el-tab-pane>
      <el-tab-pane label="初始化" lazy>
        <textarea v-model="data.initialize"></textarea>
      </el-tab-pane>
      <el-tab-pane label="结束" lazy>
        <textarea v-model="data.finalize"></textarea>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import LibraryImporter from "./function/LibraryImporter.vue";
defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
