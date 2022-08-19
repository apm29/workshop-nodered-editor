<template>
  <el-form size="mini" min="w-150" max="w-300px">
    <el-form-item label="链接">
      <el-input v-model="config.path" placeholder="链接 ws://ws-path.com/path"></el-input>
    </el-form-item>
    <el-form-item label="发送/接收">
      <el-select v-model="config.wholemsg" placeholder="发送/接收">
        <el-option value="true" label="完整信息"></el-option>
        <el-option value="false" label="有效载荷"></el-option>
      </el-select>
    </el-form-item>

    <el-alert type="warning" m="!b-3">
      默认情况下，payload将包含要发送或从Websocket接收的数据。侦听器可以配置为以JSON格式的字符串发送或接收整个消息对象.
    </el-alert>

    <Saver @save="saveConfig(config)" @cancel="cancelSaveConfig(config)"> </Saver>
  </el-form>
</template>
<script setup>
import Saver from "./component/Saver.vue";
const props = defineProps({
  config: Object,
});
const saveConfig = inject("saveConfig");
const cancelSaveConfig = inject("cancelSaveConfig");
</script>

<style lang="scss" scoped></style>
