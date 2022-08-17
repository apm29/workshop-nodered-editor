<template>
  <div>
    <el-form-item label="属性">
      <PropEditor
        :v.sync="data.property"
        :vt.sync="data.propertyType"
        :types="SwitchPropertyTypes"
      ></PropEditor>
    </el-form-item>

    <el-form-item label="条件">
      <SwitchRulesEditor :rules.sync="data.rules" :outputs.sync="data.outputs" />
    </el-form-item>

    <el-form-item label="条件匹配">
      <el-select v-model="data.checkall" placeholder="">
        <el-option value="true" label="全选所有条件"></el-option>
        <el-option value="false" label="接收第一条匹配后停止"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="其他">
      <el-checkbox label="重建信息队列" v-model="data.repair"></el-checkbox>
    </el-form-item>
  </div>
</template>

<script setup>
import SwitchRulesEditor from "../components/SwitchRulesEditor.vue";
import PropEditor from "../components/PropEditor.vue";
import { SwitchPropertyTypes } from "../edit/const.js";
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
