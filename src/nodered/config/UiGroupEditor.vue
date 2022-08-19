<template>
  <el-form size="mini" min="w-150">
    <el-form-item label="名称">
      <el-input v-model="config.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="Tab">
      <UiTab v-model="config.tab" placeholder="Tab"></UiTab>
    </el-form-item>
    <el-form-item label="组件类名(Class)">
      <el-input v-model="config.class" placeholder="组件类名"></el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input-number v-model="config.width" placeholder="组件宽度"></el-input-number>
    </el-form-item>
   <Saver @save="saveConfig(config)" @cancel="cancelSaveConfig(config)"> </Saver>
  </el-form>
</template>

<script setup>
import Saver from "./component/Saver.vue";
import UiTab from "../edit/selector/UiTab";
const props = defineProps({
  config: Object,
});
const saveConfig = inject("saveConfig");
const cancelSaveConfig = inject("cancelSaveConfig");
</script>

<style lang="scss" scoped></style>
