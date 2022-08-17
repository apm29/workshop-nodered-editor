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
      <el-input-number
        v-model="config.width"
        placeholder="组件宽度"
      ></el-input-number>
    </el-form-item>
    <el-button type="primary" block="~" w="full" @click="saveConfig(config)">
      保存
    </el-button>
    <el-button
      type="danger"
      plain
      block="~"
      w="full"
      m="!l-0 t-3"
      @click="cancelSaveConfig(config)"
    >
      取消
    </el-button>
  </el-form>
</template>

<script setup>
import { inject, computed, ref, toRefs } from "vue";
import UiTab from "../edit/selector/UiTab";
const props = defineProps({
  config: Object,
});
const saveConfig = inject("saveConfig");
const cancelSaveConfig = inject("cancelSaveConfig");
</script>

<style lang="scss" scoped></style>
