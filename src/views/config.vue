<template>
  <NodeConfig :flowId="flowId"></NodeConfig>
</template>

<script setup>
import NodeConfig from "~/nodered/NodeConfig";
function getQuery(name) {
  const search = window.location.search.substring(1);
  const regex = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const result = search.match(regex);
  if (result == null) {
    return null;
  } else {
    return result[2];
  }
}
const flowId = computed(() => {
  return getQuery("flowId");
});
</script>

<style lang="scss" scoped></style>
