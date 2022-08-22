<template>
  <div>
    <div grid="~ cols-2" m="b-2">
      <el-input
        v-model="json"
        type="textarea"
        placeholder="粘贴JSON"
        rounded="!none"
        resize="none"
        shadow="hover:lg"
        h="40vh"
      ></el-input>
      <div h="40vh" overflow="y-auto">
        <json-viewer
          :value="jsonArray"
          :expand-depth="5"
          expanded
          copyable
          boxed
          sort
          min="h-40vh"
          rounded="!none"
        >
          <template #copy="{ copied }">
            {{ copied ? "已复制" : "复制" }}
          </template>
        </json-viewer>
      </div>
    </div>
    <el-button type="primary" block="~" w="full" rounded="!none" @click="handleImport"
      > 导入 </el-button
    >
  </div>
</template>

<script setup>
import JsonViewer from "vue-json-viewer";
import { NodeTypes, ConfigTypes, TabTypes } from "../preset";
import { Message } from "element-ui";
const emits = defineEmits(["import-json"]);

const json = ref();
const jsonArray = computed(() => {
  try {
    return JSON.parse(json.value);
  } catch (error) {
    return [];
  }
});
const nodes = computed(() => {
  return jsonArray.value.filter((it) => NodeTypes.includes(it.type));
});
const configs = computed(() => {
  return jsonArray.value.filter((it) => ConfigTypes.includes(it.type));
});
const tabs = computed(() => {
  return jsonArray.value.filter((it) => TabTypes.includes(it.type));
});

function handleImport() {
  if (jsonArray.value && jsonArray.value.length) {
    emits("import-json", {
      tabs: unref(tabs),
      configs: unref(configs),
      nodes: unref(nodes),
    });
  } else {
    Message.error("无效的JSON");
  }
}
</script>

<style lang="scss" scoped></style>
