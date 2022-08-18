<template>
  <div border="~" rounded="~" p="x-3 y-4">
    <Draggable
      :animation="200"
      ghost-class="ghost"
      @start="$emit('update:dragging', true)"
      @end="$emit('update:dragging', false)"
      :list="props"
      handle=".handle"
      group="draggable-list"
    >
      <div v-for="(prop, index) of props" :key="index" flex="~" items="center" gap="x-2">
        <i class="i-mdi-menu handle" text="2xl" cursor="move"></i>
        <div max="w-48">
          <el-input size="mini" v-model="prop.p">
            <template slot="prepend">msg.</template>
          </el-input>
        </div>
        =
        <PropEditor
          @update:v="handelVChange(prop.p, $event)"
          @update:vt="handelVTChange(prop.p, $event)"
          :v.sync="prop.v"
          :vt.sync="prop.vt"
        ></PropEditor>
        <button border="~" rounded="~" p="x-2" @click="handleRemove(index)">
          <i class="i-mdi-close"></i>
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
      <i class="i-mdi-plus"></i>
      添加
    </button>
  </div>
</template>

<script setup>
import Draggable from "vuedraggable";
import PropEditor from "./PropEditor.vue";
const prop = defineProps({
  props: Array,
  payloadType: String,
  payload: [String, Number],
  dragging: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits(["update:payload", "update:payloadType"]);
function handleAddProp() {
  prop.props.push({
    v: null,
    vt: "str",
    p: "",
  });
}
function handleRemove(index) {
  prop.props.splice(index, 1);
}

function handelVTChange(p, vt) {
  if (p === "payload") {
    emits("update:payloadType", vt);
  }
}
function handelVChange(p, v) {
  if (p === "payload") {
    emits("update:payload", v);
  }
}
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
