<template>
  <BaseNode icon-left="i-mdi-alert-circle" fill="#5DBE8A" :disabled="disabled">
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

//添加port
usePorts(node, 1, "out");

useConnectedEdgeStyle(getGraph, getNode, disabled);
</script>

<style lang="scss" scoped></style>
