<template>
  <div>
    <el-form-item label="输出">
      <el-input-number v-model="data.outputs" placeholder="输出"></el-input-number>
    </el-form-item>
    <el-form-item label="库">
      <LibraryImporter :libs="data.libs"></LibraryImporter>
    </el-form-item>
    <el-tabs m="b-3">
      <el-tab-pane label="函数" lazy>
        <el-input type="textarea" :rows="8" v-model="data.func"></el-input>
      </el-tab-pane>
      <el-tab-pane label="初始化" lazy>
        <el-input type="textarea" :rows="8" v-model="data.initialize"></el-input>
      </el-tab-pane>
      <el-tab-pane label="结束" lazy>
        <el-input type="textarea" :rows="8" v-model="data.finalize"></el-input>
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
