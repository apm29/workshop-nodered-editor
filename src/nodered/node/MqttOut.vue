<template>
  <BaseNode
    :key="node.id"
    icon-right="i-mdi-protocol"
    fill="#815C94"
    :disabled="disabled"
  >
    {{ label }}
    <i
      v-if="!data.broker"
      class=" i-mdi-alert"
      absolute="~"
      top="-6"
      right="0"
      text="orange-500"
    ></i>
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
usePorts(node, 1, "in");

useConnectedEdgeStyle(getGraph, getNode, disabled);
</script>

<style lang="scss" scoped></style>
