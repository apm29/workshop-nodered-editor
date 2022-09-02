<template>
  <div
    flex="~"
    items="center"
    relative="~"
    bg="gray-100"
    justify="center"
    w="full"
    h="full"
  >
    <div
      class="node-wrapper"
      flex="~ nowrap grow"
      rounded="lg"
      border="2 dark-100/50"
      overflow="visible"
      items="center"
      justify="center"
      :opacity="disabled ? 50 : 100"
      h="full"
      :style="`border-color: ${fill || 'lightgray'}; border-style: ${
        disabled ? 'dashed' : 'solid'
      }`"
    >
      <span
        flex="~"
        items="center"
        h="full"
        :style="`background-color: ${fill || 'lightgray'};`"
      >
        <slot name="icon-left" v-if="iconLeft">
          <i class="text-white mx-2" :class="iconLeft"></i>
        </slot>
      </span>
      <span
        text="gray-600 12px"
        flex="~ grow"
        h="full"
        break="all"
        items="center"
        justify="center"
      >
        <slot></slot>
      </span>
      <span
        flex="~"
        items="center"
        h="full"
        :style="`background-color: ${fill || 'lightgray'};`"
      >
        <slot name="icon-right" v-if="iconRight">
          <i class="text-white mx-2" :class="iconRight"></i>
        </slot>
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fill: String,
  iconLeft: String,
  iconRight: String,
  disabled: Boolean,
});
</script>

<style lang="scss" scoped></style>
