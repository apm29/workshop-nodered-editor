<template>
  <el-form ref="formRef" :model="form" :rules="rules" v-bind="$attrs">
    <slot />
  </el-form>
</template>

<script setup>
const props = defineProps({
  form: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  rules: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const formRef = ref();
provide("getForm", () => props.form);
provide("getRules", () => props.rules);
</script>

<style lang="scss" scoped></style>
