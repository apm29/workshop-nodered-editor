<template>
  <div>
    <el-form-item label="服务端">
      <Influxdb v-model="data.influxdb"></Influxdb>
    </el-form-item>
    <el-form-item label="数据库">
      <el-input v-model="data.database" placeholder="数据库"></el-input>
    </el-form-item>
    <el-form-item label="Measurement">
      <el-input v-model="data.measurement" placeholder="Measurement"></el-input>
    </el-form-item>
    <el-form-item label="时间精度">
      <el-select v-model="data.precisionV18FluxV20" clearable>
        <el-option value="s" label="秒s"></el-option>
        <el-option value="ms" label="毫秒ms"></el-option>
        <el-option value="us" label="微秒μs"></el-option>
        <el-option value="ns" label="纳秒ns"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="保留政策(Retention Policy)">
      <el-input v-model="data.retentionPolicy" placeholder="Retention Policy"></el-input>
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
