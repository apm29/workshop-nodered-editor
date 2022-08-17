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
const label = computed(() => unref(data)?.name ?? "执行");
const disabled = computed(() => unref(data)?.disabled ?? false);

//添加port
usePorts(node, 1, "in");
usePorts(node, 3, "out");

useConnectedEdgeStyle(getGraph, getNode, disabled);
</script>

<style lang="scss" scoped></style>
