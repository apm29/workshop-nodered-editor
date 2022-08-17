<template>
  <div>
    <el-form-item label="输出">
      <div flex="~" gap="x-3">
        <el-select
          v-model="data.targetType"
          placeholder="输出"
          @change="(data.complete === data.targetType) === 'full' ? 'true' : ''"
        >
          <el-option label="msg." value="msg"></el-option>
          <el-option label="与调试输出相同" value="full"></el-option>
          <el-option label="表达式" value="jsonata"></el-option>
        </el-select>
        <el-input
          v-if="['msg', 'jsonata'].includes(data.targetType)"
          v-model="data.complete"
          placeholder="输入值"
        ></el-input>
      </div>
    </el-form-item>
    <el-form-item label="目标">
      <el-checkbox v-model="data.tosidebar" label="调试窗口"></el-checkbox>
      <el-checkbox v-model="data.console" label="控制台"></el-checkbox>
      <el-checkbox v-model="data.tostatus" label="节点状态(32位字符)"></el-checkbox>
      <div flex="~" gap="x-3">
        <el-select v-model="data.statusType">
          <el-option label="自动的" value="auto"></el-option>
          <el-option label="msg." value="msg"></el-option>
          <el-option label="表达式" value="jsonata"></el-option>
          <el-option label="message count" value="counter"></el-option>
        </el-select>
        <el-input
          v-if="['msg', 'jsonata'].includes(data.statusType)"
          v-model="data.statusVal"
          placeholder="输入值"
        ></el-input>
      </div>
    </el-form-item>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
