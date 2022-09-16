<template>
  <div flex="~ col" h="full">
    <div class="toolbar">
      <i i-carbon-list></i>
      <h1>节点列表</h1>
      <div flex="grow"></div>
      <label text="gray-500 sm">
        节点类型
        <el-select v-model="type" placeholder="节点类型" size="mini">
          <el-option
            v-for="option of TypesDict"
            :key="option.value"
            :value="option.value"
            :lable="option.text"
          ></el-option>
        </el-select>
      </label>

      <el-button
        size="mini"
        type="primary"
        @click="handleAddTemplate"
        icon="el-icon-plus"
      >
        新增节点
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

    <PartialModal containerClass="overflow-auto" title="编辑" v-model="showEdit" z="40">
      <el-form
        min="w-150"
        v-if="currentEditTemplate"
        label-position="top"
        p="x-2 y-2"
        size="mini"
        :model="currentEditTemplate"
      >
        <el-form-item label="名称">
          <el-input v-model="currentEditTemplate.name" placeholder="节点名称"></el-input>
        </el-form-item>
        <el-form-item label="模板">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="currentEditTemplate.isModel"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="currentEditTemplate.d"
            active-text="禁用"
            inactive-text="启用"
          ></el-switch>
        </el-form-item>
        <component
          v-if="type"
          :is="getComponentNameByType(type)"
          :data.sync="currentEditTemplate"
        />
        <el-button
          sticky="~"
          bottom="1"
          block="~"
          w="full"
          z="10"
          type="primary"
          @click="handleSaveNode"
        >
          保存
        </el-button>
      </el-form>
    </PartialModal>
  </div>
</template>

<script setup>
import "~/nodered/edit";
import { ImplementedNodeTypes, NodeDataCreator } from "~/nodered/preset";
import { getComponentNameByType } from "~/nodered/biz/components";
import { useAllNodeTemplate } from "~/composables/node-template";
import { addNodeTemplate } from "~/api/nodered";
import camelcase from "camelcase";
const type = ref("function");
const { getAll, templates } = useAllNodeTemplate(() => type.value);
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
  addNodeTemplate(type.value, currentEditTemplate.value).then(getAll).then(toggleEdit);
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
