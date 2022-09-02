<template>
  <BaseNode icon-left="i-mdi-database" fill="#645822" :disabled="disabled">
    {{ label }}
  </BaseNode>
</template>
<script>
export default {
  name: "HttpRequest",
};
</script>
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
const label = computed(() => unref(data)?.name || "InfluxDB In");
const disabled = computed(() => unref(data)?.d ?? false);

//添加port
usePorts(node, 1, "in");
usePorts(node, 1, "out");

useConnectedEdgeStyle(getGraph, getNode, disabled);

useLabels(getNode, label);
</script>
<script>
export default {
  name: "influxdbin",
  type: "influxdb in",
};
</script>
<style lang="scss" scoped></style>
