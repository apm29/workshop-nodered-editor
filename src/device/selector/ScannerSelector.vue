<template>
  <el-select
    v-model="internalValue"
    value-key="id"
    @change="handleSelectDevice"
    v-bind="$attrs"
  >
    <el-option
      v-for="device of dict"
      :value="device"
      :key="device.id"
      :label="`${device.remark}(等级${device.level})`"
    >
    </el-option>
  </el-select>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  id: {
    type: [String, Number],
  },
  name: {
    type: [String, Number],
  },
  level: {
    type: [String, Number],
  },
  dict: Array,
});

const emits = defineEmits(["update:id", "update:name", "update:level"]);

const internalValue = ref({
  id: props.id,
  name: props.name,
  level: props.level,
});

//扫描设备选择
function handleSelectDevice(device) {
  emits("update:id", device.id);
  emits("update:name", device.remark);
  emits("update:level", device.level);
}
</script>
