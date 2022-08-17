<template>
  <div>
    <el-form-item label="服务端">
      <MqttBroker v-model="data.broker"></MqttBroker>
    </el-form-item>
    <el-form-item label="动作">
      <el-select v-model="data.inputs" @input="data.topic = ''" placeholder="动作">
        <el-option :value="0" label="订阅单个主题"> </el-option>
        <el-option :value="1" label="动态订阅订阅"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主题" v-if="!data.inputs">
      <el-input v-model="data.topic" placeholder="主题"></el-input>
    </el-form-item>
    <el-form-item label="QoS" v-if="!data.inputs">
      <el-select v-model="data.qos" clearable>
        <el-option :value="0" label="0"></el-option>
        <el-option :value="1" label="1"></el-option>
        <el-option :value="2" label="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="输出">
      <el-select v-model="data.datatype">
        <el-option
          :value="type.value"
          :label="type.label"
          v-for="type of MqttOutputTypes"
        ></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup>
import MqttBroker from "./selector/MqttBroker.vue";
import { MqttOutputTypes } from "./const.js";
defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
