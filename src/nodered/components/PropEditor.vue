<template>
  <div flex="~ grow" items="center" border="~ gray-200" bg="gray-200">
    <el-select w="full" size="mini" :value="vt" @input="$emit('update:vt', $event)">
      <el-option
        v-for="type of types"
        :label="type.text"
        :value="type.value"
        :key="type.value"
      >
      </el-option>
    </el-select>
    <el-input v-if="!noInput" size="mini" :value="v" @input="$emit('update:v', $event)">
    </el-input>
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
</script>

<style lang="scss"></style>
