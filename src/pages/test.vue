<template>
  <div>
    <FormProvider :form="form" :rules="rules" p="x-3 y-4" grid="~ cols-12" gap="x-1">
      <FormItem col="span-12" prop="mqtt" type="text" label="MQTT链接地址"></FormItem>
      <FormItem col="span-6" prop="remark" type="text" label="备注"></FormItem>
      <FormItem col="span-6" prop="count" type="number" label="接口个数"></FormItem>
      <FormItem col="span-12" prop="func" type="code" label="函数"></FormItem>

      <el-button col="span-12" type="primary" block="!~" w="!full">提交</el-button>
    </FormProvider>
  </div>
</template>

<script setup>
import FormItem from "~/form/FormItem.vue";
import FormProvider from "~/form/FormProvider.vue";

const form = ref({});
const rules = ref({});
</script>

<style lang="scss" scoped></style>
