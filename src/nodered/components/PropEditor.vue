<template>
  <div flex="~" items="center">
    <el-select
      class="square-r"
      size="mini"
      :value="vt"
      @input="$emit('update:vt', $event)"
    >
      <el-option v-for="type of types" :label="type.text" :value="type.value">
      </el-option>
    </el-select>
    <el-input rounded="l-none" size="mini" :value="v" @input="$emit('update:v', $event)">
    </el-input>
  </div>
</template>

<script setup>
import { MsgTypes } from "../edit/const.js";
defineProps({
  v: String, //value
  vt: String, //value type
  types: {
    type: Array,
    default: () => MsgTypes,
  },
});
</script>

<style lang="scss">
.square-r {
  .el-input__inner {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-right: 0;
  }
}
</style>
