<template>
  <div border="~" rounded="~" p="x-4 y-5">
    <el-checkbox-group v-model="data.scope" size="small">
      <div
        v-for="node of nodes.filter((it) => it.id !== data.id)"
        flex="~"
        items="center"
        text="gray-500 sm"
        gap="x-5"
      >
        <el-checkbox :label="node.id">
          <span>{{ node.name }}</span>
        </el-checkbox>

        <span flex="grow"></span>
        <span>{{ node.type }}</span>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";
const props = defineProps({
  data: Object,
});
const getNodes = inject("getNodes");
const nodes = computed(getNodes);
if (!props.data.scope) {
  props.data.scope = [];
}
</script>

<style lang="scss" scoped></style>
