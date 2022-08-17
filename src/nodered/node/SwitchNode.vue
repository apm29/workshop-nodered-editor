<template>
  <BaseNode
    icon-left="i-mdi-arrow-decision-outline transform rotate-90"
    fill="#FBB957"
    :disabled="disabled"
  >
    {{ label }}
  </BaseNode>
</template>

<script setup>
import BaseNode from "./BaseNode.vue";
import { inject, computed, unref, watch } from "vue";
import { useConnectedEdgeStyle } from "./style.js";
import { usePorts } from "./ports.js";
//inject: ["getGraph", "getNode"],
const getGraph = inject("getGraph");
const getNode = inject("getNode");

const node = computed(getNode);
const graph = computed(getGraph);
const data = computed(() => unref(node)?.data);
const label = computed(() => unref(data)?.name);
const disabled = computed(() => unref(data)?.disabled ?? false);
const ruleSize = computed(() => unref(data)?.rules?.length ?? 0);
//添加port
usePorts(node, 1, "in");
usePorts(node, ruleSize, "out");
useConnectedEdgeStyle(getGraph, getNode, disabled);
</script>

<style lang="scss" scoped></style>
