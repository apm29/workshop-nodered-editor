<template>
  <div p="x-4 y-6">
    <el-form>
      <el-form-item label="网络请求BaseURL">
        <el-input v-model="url" placeholder="http://localhost:8080/"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="warning" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import axios from "axios";
import { MessageBox } from "element-ui";
const url = ref(axios.defaults.baseURL);
console.log(url);
function save() {
  axios.defaults.baseURL = url.value;
  MessageBox.alert("保存成功");
}
</script>

<style lang="scss" scoped></style>
