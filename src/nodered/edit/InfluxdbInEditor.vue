<template>
  <div>
    <el-form-item label="服务端">
      <Influxdb v-model="data.influxdb"></Influxdb>
    </el-form-item>
    <el-form-item label="组织">
      <el-input v-model="data.org" placeholder="组织"></el-input>
    </el-form-item>
    <el-form-item label="查询语句">
      <el-input
        type="textarea"
        :rows="12"
        v-model="data.query"
        placeholder="flux查询语句"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script setup>
import Influxdb from "./selector/Influxdb.vue";
defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
