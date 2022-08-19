<template>
  <div w="!full" grid="~ cols-2" p="t-3" sticky="~" bottom="0">
    <el-button
      rounded="!r-0"
      col="span-1"
      class="!m-0"
      type="primary"
      @click="$emit('save')"
    >
      保存
    </el-button>
    <el-button rounded="!l-0" col="span-1" class="!m-0" plain @click="$emit('cancel')">
      取消
    </el-button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
