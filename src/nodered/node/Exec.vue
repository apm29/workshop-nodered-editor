<template>
  <BaseNode
    icon-left="i-mdi-cog-play text-xl"
    fill="#CE2C41"
    :disabled="disabled"
  >
    {{ label }}
  </BaseNode>
</template>

<script setup>
import BaseNode from "./base/BaseNode.vue";
import { inject, computed, unref, watch } from "vue";
import { useConnectedEdgeStyle } from "./base/style.js";
import { usePorts } from "./base/ports.js";
//inject: ["getGraph", "getNode"],
const getGraph = inject("getGraph");
const getNode = inject("getNode");

const node = computed(getNode);
const graph = computed(getGraph);
const data = computed(() => unref(node)?.data);
const label = computed(() => unref(data)?.name || "执行");
const disabled = computed(() => unref(data)?.d ?? false);

//添加port
usePorts(node, 1, "in");
usePorts(node, 3, "out");

useConnectedEdgeStyle(getGraph, getNode, disabled);
</script>
<script>
export default {
  name: "Exec",
  type: "exec",
};
</script>

<style lang="scss" scoped></style>
