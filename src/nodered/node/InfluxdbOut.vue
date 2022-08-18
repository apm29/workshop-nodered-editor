<template>
  <BaseNode icon-right="i-mdi-database" fill="#645822" :disabled="disabled">
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
//inject: ["getGraph", "getNode"],
const getGraph = inject("getGraph");
const getNode = inject("getNode");

const node = computed(getNode);
const graph = computed(getGraph);
const data = computed(() => unref(node)?.data);
const label = computed(() => unref(data)?.name || "InfluxDB Out");
const disabled = computed(() => unref(data)?.d ?? false);

//添加port
usePorts(node, 1, "in");

useConnectedEdgeStyle(getGraph, getNode, disabled);
</script>
<script>
export default {
  name: "influxdbout",
  type: "influxdb out",
};
</script>
<style lang="scss" scoped></style>
