<template>
  <el-form size="mini" min="w-150">
    <el-form-item label="名称">
      <el-input v-model="config.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="图标">
      <el-input v-model="config.icon" placeholder="Tab"></el-input>
    </el-form-item>

    <el-form-item label="是否可用">
      <el-switch
        :active-value="false"
        :inactive-value="true"
        v-model="config.disabled"
      ></el-switch>
    </el-form-item>
    <el-form-item label="显示在导航栏">
      <el-switch
        :active-value="false"
        :inactive-value="true"
        v-model="config.hidden"
      ></el-switch>
    </el-form-item>

    <Saver @save="saveConfig(config)" @cancel="cancelSaveConfig(config)"> </Saver>
  </el-form>
</template>

<script setup>
import Saver from "./component/Saver.vue";
const props = defineProps({
  config: Object,
});
const saveConfig = inject("saveConfig");
const cancelSaveConfig = inject("cancelSaveConfig");
</script>

<style lang="scss" scoped></style>
