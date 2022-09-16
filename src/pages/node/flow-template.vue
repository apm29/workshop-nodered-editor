<template>
  <div flex="~ col" h="full">
    <div class="toolbar">
      <i i-carbon-list></i>
      <h1>流程模板列表</h1>
      <div flex="grow"></div>

      <el-button
        size="mini"
        type="primary"
        @click="handleAddTemplate"
        icon="el-icon-plus"
      >
        新增流程模板
      </el-button>
    </div>
    <div flex="grow" overflow="y-auto">
      <div
        v-for="template of templates"
        class="node-template-item"
        flex="~"
        gap="3"
        items="center"
      >
        <i i-carbon-pcn-p-node></i>
        <span>{{ template.name }}</span>
        <el-tag v-if="template.isModel" size="mini"> 模板 </el-tag>
        <div flex="grow"></div>
        <el-button type="text" size="mini" @click="handleEditNode(template)">
          编辑
        </el-button>
      </div>
      <el-empty v-if="!templates || !templates.length" description="未查询到数据">
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import "~/nodered/edit";
import { addFlowTemplate } from "~/api/nodered";
import { ImplementedNodeTypes, NodeDataCreator } from "~/nodered/preset";
import { useAllFlowTemplate } from "~/composables";
import camelcase from "camelcase";

const { getAll, templates } = useAllFlowTemplate();
onMounted(getAll);

const TypesDict = ImplementedNodeTypes.map((type) => ({
  text: camelcase(type, { pascalCase: true }),
  value: type,
}));

const currentEditTemplate = ref({});
const [showEdit, toggleEdit] = useToggle();
function handleEditNode(template) {
  currentEditTemplate.value = { ...template };
  toggleEdit();
}

function handleAddTemplate() {
  currentEditTemplate.value = {
    isModel: 1,
    ...NodeDataCreator[type.value]?.(),
  };
  toggleEdit();
}
function handleSaveNode() {
  addFlowTemplate(type.value, currentEditTemplate.value).then(getAll).then(toggleEdit);
}
</script>

<style lang="scss" scoped>
.toolbar {
  @apply border shadow rounded px-3 py-2 bg-gray-200 flex flex-wrap items-center justify-start;

  > * {
    @apply mr-2;
  }
}
.node-template-item {
  @apply border rounded px-2 py-2 mx-2 my-1px text-gray-600 text-sm;
}
</style>
