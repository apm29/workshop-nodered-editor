<template>
  <div border="~" rounded="~" p="x-3 y-4">
    <Draggable
      :animation="200"
      ghost-class="ghost"
      @start="$emit('update:dragging', true)"
      @end="$emit('update:dragging', false)"
      :list="rules"
      handle=".handle"
      group="draggable-list"
    >
      <div v-for="(rule, index) of rules" flex="~" items="center" gap="x-2">
        <i class=" i-mdi-menu handle" text="2xl" cursor="move"></i>
        <div max="w-48">
          <el-select size="mini" v-model="rule.t">
            <el-option value="eq" label="等于"></el-option>
          </el-select>
        </div>
        <el-input size="mini" v-model="rule.v" placeholder="值"></el-input>
        <i class=" i-mdi-arrow-right"></i>
        <span>{{ index + 1 }}</span>
        <button border="~" rounded="~" p="x-2" @click="handleRemove(index)">
          <i class=" i-mdi-close"></i>
        </button>
      </div>
    </Draggable>
    <button
      m="t-4"
      border="~"
      rounded="~"
      cursor="pointer"
      bg="hover:gray-200"
      text="gray-500 sm"
      p="x-4 y-1"
      @click="handleAddProp"
    >
      <i class=" i-mdi-plus"></i>
      添加
    </button>
  </div>
</template>

<script setup>
import Draggable from "vuedraggable";
import { computed, watch } from "vue";
const prop = defineProps({
  rules: Array,
  outputs: Number,
  dragging: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits("update:outputs");
function handleAddProp() {
  prop.rules.push({
    v: null,
    vt: "str",
    t: "eq",
  });
}
function handleRemove(index) {
  prop.rules.splice(index, 1);
}
const ruleCount = computed(() => prop.rules?.length ?? 0);
watch(ruleCount, (count) => {
  emits("update:outputs", count);
});
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.3s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
