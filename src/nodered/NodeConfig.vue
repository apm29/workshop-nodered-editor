<template>
  <div h="screen" overflow="hidden">
    <Editor h="screen" overflow="hidden" :data.sync="x6nodes" @node:edit="handleEditNode">
      <template #edit="{ data }">
        <!-- <el-empty v-if="!data" description="点击选择节点">
          <template #image>
            <i class=" i-mdi-cursor-default-click" text="3xl gray-500"></i>
          </template>
        </el-empty> -->
        <el-button
          block="~"
          w="full"
          type="primary"
          rounded="!none"
          m="!l-0"
          @click="handleDeploy"
        >
          部署到云端
        </el-button>
      </template>
      <template #toolbar>
        <button class="toolbar-btn-icon">
          <i class="i-mdi-code-json text-gray-500"></i>
        </button>
      </template>
    </Editor>
    <PartialModal
      containerClass="overflow-auto"
      title="编辑节点数据"
      v-model="showEditor"
      closeable
      z="30"
    >
      <el-form
        min="w-150"
        v-if="editNodeData"
        label-position="top"
        p="x-2 y-2"
        size="mini"
        :model="editNodeData"
      >
        <el-form-item label="状态">
          <el-switch
            v-model="editNodeData.disabled"
            active-text="禁用"
            inactive-text="启用"
          ></el-switch>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="editNodeData.name" placeholder="节点名称"></el-input>
        </el-form-item>
        <component
          :is="getComponentNameByType(editNodeData.type)"
          :data.sync="editNodeData"
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
    <PartialModal
      containerClass="overflow-auto"
      :title="`新增/编辑${editConfig.name}`"
      v-model="editConfig.show"
      z="40"
      persistent
      v-for="(editConfig, index) of editConfigs"
      :key="index"
    >
      <component
        v-if="editConfig.type"
        :is="getComponentNameByType(editConfig.type)"
        :config="editConfig.config"
      />
    </PartialModal>
  </div>
</template>

<script setup>
import "./edit/index.js";
import "./config/index.js";
import { NodeTypes, ConfigTypes, TabTypes } from "./preset";
import Editor from "./Editor.vue";
import { getComponentNameByType } from "./biz/components";
import { remote } from "~/composables";
import cloneDeep from "lodash/cloneDeep";
import PartialModal from "~/components/modal/PartialModal.vue";
import { computed, reactive, unref, ref, provide } from "vue";
import { useToggle } from "@vueuse/core";
import { useNodes } from "./biz/nodes.js";
import { createConfigByType, getConfigNameByType } from "./biz/configs.js";

const {
  //node-red格式的
  configs,
  nodes,
  tabs,
  flow,
  //x6格式的
  x6nodes,
} = useNodes();
provide("nodes", nodes);
provide("getNodes", () => unref(nodes));
provide("configs", configs);
provide("getConfigs", () => unref(configs));
provide("tabs", tabs);
provide("getTabs", () => unref(tabs));

provide("editConfig", handleEditConfig);
provide("saveConfig", handleSaveConfig);
provide("cancelSaveConfig", handleCancelSaveConfig);

const editConfigs = ref([]);
function handleEditConfig(type, id) {
  console.log(type, id);
  const editConfig = {
    type,
    id,
    show: false,
    name: getConfigNameByType(type),
  };
  const old = configs.value.find((it) => it.id === id);
  if (!old) {
    const created = createConfigByType(type, id);
    editConfig.config = created;
  } else {
    editConfig.config = old;
  }
  editConfigs.value.push(editConfig);
  editConfig.show = true;
}
function handleCancelSaveConfig(config) {
  const editConfig = editConfigs.value.pop();
  editConfig.show = false;
}
function handleSaveConfig(config) {
  const old = configs.value.find((it) => it.id === config.id);
  if (!old) {
    configs.value.push(config);
  }
  const editConfig = editConfigs.value.pop();
  editConfig.show = false;
}

function handleDeploy() {
  const nodesData = nodes.value;
  const configsData = configs.value;
  const minX =
    nodesData
      .map((it) => it.x)
      .reduce((minX, x) => {
        return Math.min(minX, x || 99999);
      }, 0) - 150;
  const minY =
    nodesData
      .map((it) => it.y)
      .reduce((minY, y) => {
        return Math.min(minY, y || 99999);
      }, 0) - 30;
  console.log(minX, minY);
  const flowId = "f6f2187d.f17ca8";
  remote.postForm({
    url: "/java/nodeRed/webToMysql",
    data: {
      param: JSON.stringify({
        id: flowId,
        type: "tab",
        label: "回火窑温度测试",
        disabled: false,
        info: "",
        env: [],
        nodes: [
          ...(nodesData || []).map((it) => ({
            z: flowId,
            ...it,
            x: it.x - minX,
            y: it.y - minY,
          })),
          ...(configsData || []).map((it) => ({
            z: flowId,
            ...it,
          })),
        ],
        configs: (configsData || []).map((it) => ({
          z: flowId,
          ...it,
        })),
      }),
    },
  });
}

//编辑
const [showEditor, toggleNodeEditor] = useToggle();
const editNodeData = ref();
const editNode = ref();
function handleEditNode(data, node) {
  editNodeData.value = cloneDeep(data);
  editNode.value = node;
  toggleNodeEditor();
}
function handleSaveNode() {
  //找到编辑节点修改
  const index = nodes.value.findIndex((it) => it.id === editNodeData.value.id);
  const copy = cloneDeep(nodes.value);
  copy[index] = editNodeData.value;
  nodes.value = copy;
  toggleNodeEditor();
  nodeSavedListeners.value.forEach((lisenter) => {
    lisenter(editNodeData.value);
  });
}

//node编辑完成监听
const nodeSavedListeners = ref([]);
provide("registerNodeSavedListener", registerNodeSavedListener);
function registerNodeSavedListener(lisenter) {
  if (lisenter && lisenter instanceof Function) {
    nodeSavedListeners.value.push(lisenter);
  }
}
</script>
<style scoped></style>
