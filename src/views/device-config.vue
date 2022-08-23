<template>
  <NodeConfig :flowId="$route.query.flowId"></NodeConfig>
</template>

<script setup>
import NodeConfig from "~/nodered/NodeConfig";
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  title: "人脸信息"
</route>
