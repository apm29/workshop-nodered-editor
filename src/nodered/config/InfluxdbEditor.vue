<template>
  <el-form size="mini" min="w-150">
    <el-form-item label="名称">
      <el-input v-model="config.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="版本">
      <el-select v-model="config.influxdbVersion" placeholder="版本">
        <el-option value="1.x"></el-option>
        <el-option value="1.8-flux"></el-option>
        <el-option value="2.0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="链接" v-if="config.influxdbVersion != '1.x'">
      <el-input v-model="config.url" placeholder="链接"></el-input>
    </el-form-item>
    <template v-if="config.influxdbVersion === '1.x'">
      <el-form-item label="主机">
        <el-input v-model="config.hostname" placeholder="主机"></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model="config.port" placeholder="端口"></el-input>
      </el-form-item>
      <el-form-item label="数据库">
        <el-input v-model="config.database" placeholder="数据库"></el-input>
      </el-form-item>
    </template>
    <template v-if="config.influxdbVersion != '2.0'">
      <el-form-item label="用户名">
        <el-input v-model="config.credentials.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="config.credentials.password" placeholder="密码"></el-input>
      </el-form-item>
    </template>
    <template v-if="config.influxdbVersion === '2.0'">
      <el-form-item label="Token">
        <el-input v-model="config.credentials.token" placeholder="Token"></el-input>
      </el-form-item>
    </template>
    <template v-if="config.influxdbVersion !== '1.x'">
      <el-checkbox label="身份验证" v-model="config.rejectUnauthorized"></el-checkbox>
    </template>
    <Saver @save="saveConfig(config)" @cancel="cancelSaveConfig(config)"> </Saver>
  </el-form>
</template>

<script setup>
import Saver from "./component/Saver.vue";
const props = defineProps({
  config: Object,
});
if (!props.config.credentials) {
  props.config.credentials = {};
}
const saveConfig = inject("saveConfig");
const cancelSaveConfig = inject("cancelSaveConfig");
</script>

<style lang="scss" scoped></style>
