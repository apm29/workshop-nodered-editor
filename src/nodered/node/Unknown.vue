<template>
  <BaseNode fill="#f16162" :disabled="disabled">
    <span flex="~" h="full" w="full">
      <span
        text="white xs"
        bg="red-500"
        h="full"
        rounded="l"
        p="x-1"
        flex="~"
        items="center"
        justify="center"
      >
        未知节点
      </span>
      <span white-space="nowrap" flex="~ grow" items="center" justify="center">
        {{ data.type }}
      </span>
    </span>
  </BaseNode>
</template>

<script setup>
import BaseNode from "./base/BaseNode.vue";
import { inject, computed, unref } from "vue";

//inject: ["getGraph", "getNode"],
const getGraph = inject("getGraph");
const getNode = inject("getNode");

const node = computed(getNode);
const graph = computed(getGraph);
const data = computed(() => unref(node)?.data);
const disabled = computed(() => unref(data)?.d ?? false);
</script>

<script>
export default {
  name: "Unknown",
  type: "unknown",
};
</script>

<style lang="scss" scoped></style>
