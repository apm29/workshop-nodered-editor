<template>
  <div>
    <el-form-item label="请求方式">
      <el-select v-model="data.method" placeholder="请求方式">
        <el-option
          v-for="option of requestMethods"
          :key="option.value"
          :label="option.text"
          :value="option.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请求URL">
      <el-input v-model="data.url" placeholder="http://host.name/path"></el-input>
    </el-form-item>
    <el-form-item label="内容" v-if="data.method === 'GET'">
      <el-select v-model="data.paytoqs" placeholder="内容">
        <el-option
          v-for="option of requetsContentTypes"
          :key="option.value"
          :label="option.text"
          :value="option.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="使用安全连接(SSL/TLS)"> TODO </el-form-item>
    <el-form-item label="使用代理服务器"> TODO </el-form-item>
    <el-form-item label="基本认证">
      <el-select v-model="data.authType" placeholder="类型">
        <el-option
          v-for="option of basicAuthTypes"
          :key="option.value"
          :label="option.text"
          :value="option.value"
        ></el-option>
      </el-select>
      <div h="4"></div>
      <template v-if="data.authType === 'basic' || data.authType === 'digest'">
        <el-input v-model="data.credential.user" placeholder="用户名"></el-input>
        <el-input v-model="data.credential.password" placeholder="密码"></el-input>
      </template>
      <template v-if="data.authType === 'bearer'">
        <el-input v-model="data.credential.password" placeholder="Token"></el-input>
      </template>
    </el-form-item>
    <el-form-item label="">
      <template #label>
        <el-checkbox v-model="data.persist"></el-checkbox>
        对连接启用keep-alive
      </template>
    </el-form-item>
    <el-form-item label="">
      <template #label>
        <el-checkbox :value="!data.senderr" @input="data.senderr = !$event"></el-checkbox>
        只发送非2xx返回值到Catch节点
      </template>
    </el-form-item>
    <el-form-item label="返回">
      <el-select v-model="data.ret" placeholder="返回">
        <el-option
          v-for="option of resultTypes"
          :key="option.value"
          :label="option.text"
          :value="option.value"
        ></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
if (!props.data.credential) {
  props.data.credential = {};
}

const requestMethods = [
  {
    value: "GET",
    text: "GET",
  },
  {
    value: "POST",
    text: "POST",
  },
  {
    value: "PUT",
    text: "PUT",
  },
  {
    value: "DELETE",
    text: "DELETE",
  },
  {
    value: "HEAD",
    text: "HEAD",
  },
  {
    value: "use",
    text: "- 用 msg.method 设定 -",
  },
];

const requetsContentTypes = [
  {
    value: "ignore",
    text: "Ignore",
  },
  {
    value: "query",
    text: "Append to query-string parameters",
  },
  {
    value: "body",
    text: "Send as request body",
  },
];
const resultTypes = [
  {
    value: "txt",
    text: "UTF-8 字符串",
  },
  {
    value: "bin",
    text: "二进制数据",
  },
  {
    value: "obj",
    text: "JSON对象",
  },
];
const basicAuthTypes = [
  {
    value: "basic",
    text: "基本认证",
  },
  {
    value: "digest",
    text: "摘要认证",
  },
  {
    value: "bearer",
    text: "bearer认证",
  },
];
</script>

<style lang="scss" scoped></style>
