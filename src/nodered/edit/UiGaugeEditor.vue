<template>
  <div>
    <el-form-item label="Dashboard Group">
      <UiGroup v-model="data.group"></UiGroup>
    </el-form-item>
    <el-form-item label="尺寸">
      <SizeSelector :width.sync="data.width" :height.sync="data.height"></SizeSelector>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="data.gtype" placeholder="仪表板类型">
        <el-option label="gauge" value="gage"></el-option>
        <el-option label="Donut" value="donut"></el-option>
        <el-option label="Compass" value="compass"></el-option>
        <el-option label="Level" value="wave"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="data.title" placeholder="输入值"></el-input>
    </el-form-item>
    <el-form-item label="数值格式">
      <el-input v-model="data.format" placeholder="数值格式"></el-input>
    </el-form-item>
    <el-form-item label="单位">
      <el-input v-model="data.label" placeholder="数值单位"></el-input>
    </el-form-item>
    <el-form-item label="范围">
      <div flex="~" gap="x-3" items="center">
        <el-input-number v-model="data.min" placeholder="min"></el-input-number>
        ~
        <el-input-number v-model="data.max" placeholder="max"></el-input-number>
      </div>
    </el-form-item>
    <el-form-item label="颜色渐变">
      <input
        type="color"
        :value="color"
        :key="color"
        @input="data.colors[index] = $event.target.value"
        v-for="(color, index) of data.colors"
      />
    </el-form-item>
    <el-form-item label="分段">
      <div flex="~" gap="x-3">
        <span>{{ data.min }}</span>
        <span>...</span>
        <el-input v-model="data.seg1" placeholder="可选"></el-input>
        <span>...</span>
        <el-input v-model="data.seg2" placeholder="可选"></el-input>
        <span>...</span>
        <span>{{ data.max }}</span>
      </div>
    </el-form-item>
    <el-form-item label="组件类名(Class)">
      <el-input v-model="data.class" placeholder="组件类名"></el-input>
    </el-form-item>
  </div>
</template>

<script setup>
import SizeSelector from "./ui/SizeSeletor.vue";
import UiGroup from "./selector/UiGroup.vue";
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
