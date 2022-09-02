<template>
  <BaseNode icon-right="i-mdi-bug-outline" fill="#3abb11" :disabled="disabled">
    {{ label }}
  </BaseNode>
</template>

<script setup>
import BaseNode from "./base/BaseNode.vue";
import { inject, computed, unref, watch } from "vue";
import { useConnectedEdgeStyle } from "./base/style.js";
import { usePorts } from "./base/ports.js";
import { useLabels } from "./base/label-width.js";
//inject: ["getGraph", "getNode"],
const getGraph = inject("getGraph");
const getNode = inject("getNode");

const node = computed(getNode);
const graph = computed(getGraph);
const data = computed(() => unref(node)?.data);
const label = computed(() => unref(data)?.name || "调试");
const disabled = computed(() => unref(data)?.d ?? false);

//添加port
usePorts(node, 1, "in");

useConnectedEdgeStyle(getGraph, getNode, disabled);

useLabels(getNode, label);
</script>

<script>
export default {
  name: "Debug",
  type: "debug",
};
</script>

<style lang="scss" scoped></style>
