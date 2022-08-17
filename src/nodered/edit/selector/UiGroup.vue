<template>
  <div flex="~" items="center" gap="x-3">
    <el-select :value="value" placeholder="选择Group" @input="$emit('input', $event)">
      <el-option v-for="config of brokers" :value="config.id" :label="config.name">
      </el-option>
    </el-select>
    <button @click="editConfig(ConfigType, value)" v-if="value">
      <i class=" i-mdi-circle-edit-outline" text="2xl gray-500"></i>
    </button>
    <button @click="editConfig(ConfigType, null)">
      <i class=" i-mdi-plus-circle-outline" text="2xl gray-500"></i>
    </button>
  </div>
</template>

<script setup>
import { inject, unref, computed } from "vue";
const ConfigType = "ui_group";
defineProps({
  value: String,
});
//由NodeConfig注入的配置
const getConfigs = inject("getConfigs");
const configs = computed(getConfigs);
const editConfig = inject("editConfig");
const brokers = computed(() => unref(configs).filter((it) => it.type === ConfigType));
</script>

<style lang="scss" scoped></style>
