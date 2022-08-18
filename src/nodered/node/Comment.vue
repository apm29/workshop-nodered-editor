<template>
  <BaseNode icon-left="i-mdi-comment" :disabled="disabled">
    {{ label }}
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
const label = computed(() => unref(data)?.name || "注释");
const disabled = computed(() => unref(data)?.d ?? false);
</script>

<script>
export default {
  name: "Comment",
  type: "comment",
};
</script>

<style lang="scss" scoped></style>
