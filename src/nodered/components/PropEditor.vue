<template>
  <div
    class="prop-editor"
    flex="~ grow"
    items="center"
    border="~ gray-200"
    rounded="~"
    divide="x-1"
  >
    <el-select flex="grow" size="mini" :value="vt" @input="$emit('update:vt', $event)">
      <el-option
        v-for="type of types"
        :label="type.text"
        :value="type.value"
        :key="type.value"
      >
      </el-option>
    </el-select>
    <el-input
      flex="grow"
      v-if="!noInput"
      size="mini"
      :value="v"
      placeholder="输入值"
      @input="$emit('update:v', $event)"
    >
    </el-input>
    <el-select
      size="mini"
      v-if="selection && selection.length"
      :value="v"
      placeholder="输入值"
      @input="$emit('update:v', $event)"
    >
      <el-option
        v-for="option of selection"
        :key="option.value"
        :value="option.value"
        :label="option.text"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { MsgTypes } from "../edit/const.js";
const props = defineProps({
  v: String, //value
  vt: String, //value type
  types: {
    type: Array,
    default: () => MsgTypes,
  },
});

const noInput = computed(
  () => props.types.find((t) => t.value === props.vt)?.noInput ?? false
);
const selection = computed(
  () => props.types.find((t) => t.value === props.vt)?.selection ?? []
);
</script>

<style lang="scss">
.prop-editor {
  .el-input__inner {
    @apply border-none;
  }
}
</style>
