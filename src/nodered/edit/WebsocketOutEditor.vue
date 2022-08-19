<template>
  <div>
    <el-form-item label="类型">
      <div flex="~" gap="x-3">
        <el-select
          :value="data.server ? 'server' : data.client ? 'client' : data.wsType"
          @input="
            data.client = '';
            data.server = '';
            data.wsType = $event;
            $forceUpdate();
          "
          placeholder="类型"
        >
          <el-option label="连接" value="client"></el-option>
          <el-option label="监听" value="server"></el-option>
        </el-select>
      </div>
    </el-form-item>
    <el-form-item
      label="客户端"
      v-if="(data.server ? 'server' : data.client ? 'client' : data.wsType) === 'client'"
    >
      <WebsocketClient v-model="data.client"></WebsocketClient>
    </el-form-item>
    <el-form-item
      label="服务端"
      v-if="(data.server ? 'server' : data.client ? 'client' : data.wsType) === 'server'"
    >
      <WebsocketListener v-model="data.server"></WebsocketListener>
    </el-form-item>
  </div>
</template>

<script setup>
import WebsocketClient from "./selector/WebsocketClient.vue";
import WebsocketListener from "./selector/WebsocketListener.vue";
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
