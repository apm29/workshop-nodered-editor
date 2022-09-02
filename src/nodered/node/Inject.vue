<template>
  <BaseNode icon-left="i-mdi-flash" fill="#4E7CA1" :disabled="disabled">
    {{ label }}
    <i i-mdi-refresh v-if="repeat"></i>
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
const label = computed(() => unref(data)?.name || "注入");
const disabled = computed(() => unref(data)?.d ?? false);
const repeat = computed(() => !!unref(data)?.repeat);

//添加port
usePorts(node, 1, "out");

useConnectedEdgeStyle(getGraph, getNode, disabled);

useLabels(getNode, label);
</script>
<script>
export default {
  name: "Inject",
  type: "inject",
};
</script>
<style lang="scss" scoped></style>
