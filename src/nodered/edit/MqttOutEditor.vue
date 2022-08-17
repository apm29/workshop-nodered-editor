<template>
  <div>
    <el-form-item label="服务端">
      <MqttBroker v-model="data.broker"></MqttBroker>
    </el-form-item>
    <el-form-item label="主题">
      <el-input v-model="data.topic" placeholder="主题"></el-input>
    </el-form-item>
    <el-form-item label="QoS">
      <el-select v-model="data.qos" clearable>
        <el-option :value="0" label="0"></el-option>
        <el-option :value="1" label="1"></el-option>
        <el-option :value="2" label="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="保留">
      <el-select v-model="data.retain" clearable>
        <el-option value="true" label="是"></el-option>
        <el-option value="false" label="否"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup>
import MqttBroker from "./selector/MqttBroker.vue";
defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
