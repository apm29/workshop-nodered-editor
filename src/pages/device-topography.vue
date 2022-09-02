<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    ref="main"
  >
    <Viewer
      v-if="showGraph"
      ref="viewer"
      :tree="treeData"
      :load="loadTreeChildNodes"
      @node:delete="handleDeleteDevice"
      @node:add="handleAddChildDevice"
      @node:edit="handleEditDevice"
      h="screen"
      w="screen"
    ></Viewer>

    <el-tree
      v-if="!showGraph"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      class="h-full border overflow-y-auto scroll-bar pt-20"
      node-key="id"
      :props="{
        label: (data) => data.id,
      }"
      :default-expand-all="expand"
      lazy
      :load="loadTreeChildNodes"
      :key="treeKey"
    >
      <template #default="{ node, data }">
        <div
          class="flex flex-wrap items-center min-w-30rem space-x-2"
          :style="{
            minWidth: `${width - 18 * node.level - 50}px`,
          }"
        >
          <div
            class="text-dark-300 text-sm rounded px-2"
            :class="{
              'bg-yellow-300': !data.businessId,
            }"
          >
            {{ data.businessId ? data.businessName : "未挂载设备" }}
          </div>
          <el-tag size="mini" type="info"> ID:{{ data.id }} </el-tag>
          <el-tag size="mini" type="primary">
            {{ getNodeDeviceType(data.businessTableName) }}
          </el-tag>
          <el-tag size="mini" type="primary"> 等级 {{ data.businessData.level }} </el-tag>
          <div class="flex-grow"></div>
          <el-button
            type="text"
            @click.stop="handleDeleteDevice(data.id)"
            icon="el-icon-delete"
            class="!text-red-500 !hover:text-red-400"
            size="mini"
          >
            删除
          </el-button>
          <el-button
            type="text"
            @click.stop="handleAddChildDevice(data.id, data.businessData.level)"
            icon="el-icon-plus"
            size="mini"
          >
            新增子级
          </el-button>
          <el-button
            type="text"
            @click.stop="
              handleEditDevice(data.id, data.parentId, data.businessData.level)
            "
            icon="el-icon-edit"
            size="mini"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            @click.stop="handleConfigDevice(data.id)"
            icon="el-icon-setting"
            size="mini"
          >
            配置
          </el-button>
        </div>
      </template>
    </el-tree>

    <div
      fixed="~"
      top="3"
      left="3"
      right="3"
      border="~"
      shadow="~"
      min="h-12"
      rounded="~"
      bg="gray-100"
      flex="~"
      p="x-2 y-3"
      items="center"
    >
      <i i-mdi-family-tree text="sky-600 2xl" m="x-3"></i>
      <h1 text="dark-100 lg" font="bold">
        {{ showGraph ? "设备拓扑紧凑树图" : "设备拓扑树型列表" }}
      </h1>
      <div flex="grow"></div>
      <el-button
        size="mini"
        type="primary"
        plain
        icon="el-icon-refresh"
        @click="expandTree"
      >
        加载全部
      </el-button>

      <el-button
        size="mini"
        type="primary"
        icon="i-mdi-swap-horizontal"
        plain
        @click="toggleGraph()"
      >
        {{ showGraph ? "树型列表" : "拓扑树图" }}
      </el-button>
    </div>

    <MountedDeviceEditor
      v-model="showEditDevice"
      :node-id="currentEditNodeId"
      :parent-node-id="currentEditNodeParentId"
      :parent-node-level="currentEditNodeParentLevel"
      :table-dict="topographyTables"
      :hub-dict="hubDict"
      :net-dict="netDict"
      :collector-dict="collectorDict"
      :scanner-dict="scannerDict"
      :reader-dict="readerDict"
      :electricity-box-dict="electricityBoxDict"
      :sensor-dict="sensorDict"
      :switch-dict="switchDict"
      @saved="reloadTree"
      @device:add="getDict"
      @device:mount="reloadTree"
    ></MountedDeviceEditor>
  </div>
</template>

<script setup>
import { deleteDeviceTopoTreeNode, getDeviceTopoTreeChild } from "~/api/device/tree";
import { Notification } from "element-ui";
import { getFlattenTreeNodes } from "~/helpers/tree";
import Viewer from "~/device/Viewer.vue";
import MountedDeviceEditor from "~/device/MountedDeviceEditor.vue";
import {
  useDeviceTopographyTableNames,
  use485HubDict,
  use485NetDict,
  useCollectorDict,
  useElectricityBoxDict,
  useSensorDict,
  useSwitchDict,
  useScannerDict,
  useReaderDict,
  DeviceTopographyTables,
} from "~/composables";

const [showGraph, toggleGraph] = useToggle();

const NODE_ROOT_ID = "0";
const ROOT_NODE = {
  id: NODE_ROOT_ID,
  label: "根节点",
  type: "node-start",
  children: [],
};
const treeData = ref([ROOT_NODE]);

const viewer = ref();
const loading = ref(false);
async function loadGraphTreeChildNodes(nodeId) {
  console.log(nodeId);
  try {
    loading.value = true;

    const flatten = getFlattenTreeNodes(treeData.value);
    const find = flatten.find((node) => String(node.id) === String(nodeId));
    if (find) {
      if (!find.children || !find.children.length || nodeId === NODE_ROOT_ID) {
        const { data } = await getDeviceTopoTreeChild(nodeId);
        find.children = data;
      } else {
        find.children = [];
      }
    } else {
      console.log("find failed", flatten);
      console.log("find nodeId", nodeId);
    }
    viewer.value?.reload?.();
  } catch (error) {
    console.log(error);
    Notification({
      title: "错误",
      message: "获取树结构失败",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
}

//展开
async function expandGraphTree() {
  const root = {
    ...ROOT_NODE,
  };
  try {
    loading.value = true;
    await loadNodeChildren(root);
    treeData.value = [root];
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

//加载所有子节点
async function loadNodeChildren(parent) {
  const { data } = await getDeviceTopoTreeChild(parent.id);
  parent.children = data || [];
  if (parent.children && parent.children.length) {
    await Promise.all(parent.children.map((child) => loadNodeChildren(child)));
  }
}

//字典
const { topographyTables } = useDeviceTopographyTableNames();
const { get485HubDict, hubDict } = use485HubDict();
const { get485NetDict, netDict } = use485NetDict();
const { getCollectorDict, collectorDict } = useCollectorDict();
const { getElectricityBoxDict, electricityBoxDict } = useElectricityBoxDict();
const { getSensorDict, sensorDict } = useSensorDict();
const { getSwitchDict, switchDict } = useSwitchDict();
const { getScannerDict, scannerDict } = useScannerDict();
const { getReaderDict, readerDict } = useReaderDict();

onMounted(get485HubDict);
onMounted(get485NetDict);
onMounted(getCollectorDict);
onMounted(getElectricityBoxDict);
onMounted(getSensorDict);
onMounted(getSwitchDict);
onMounted(getScannerDict);
onMounted(getReaderDict);

function getDict(tableName) {
  switch (tableName) {
    case DeviceTopographyTables.HUB:
      return get485HubDict();
    case DeviceTopographyTables.NET:
      return get485NetDict();
    case DeviceTopographyTables.COLLECTOR:
      return getCollectorDict();
    case DeviceTopographyTables.EBOX:
      return getElectricityBoxDict();
    case DeviceTopographyTables.SENSOR:
      return getSensorDict();
    case DeviceTopographyTables.SWITCH:
      return getSwitchDict();
    case DeviceTopographyTables.SCANNER:
      return getScannerDict();
    case DeviceTopographyTables.READER:
      return getReaderDict();
    default:
      return;
  }
}

//删除
async function handleDeleteDevice(id, parentId) {
  await deleteDeviceTopoTreeNode(id);
  await reloadTree(parentId);
}

//新增
const [showEditDevice, toggleEditDevice] = useToggle();
const currentEditNodeParentId = ref();
const currentEditNodeParentLevel = ref();
const currentEditNodeId = ref();
async function handleAddChildDevice(parentId, parentLevel) {
  showEditDevice.value = true;
  currentEditNodeParentId.value = parentId;
  currentEditNodeParentLevel.value = parentLevel;
  currentEditNodeId.value = null;
}

//编辑挂载的设备
async function handleEditDevice(nodeId, parentId, parentLevel) {
  showEditDevice.value = true;
  currentEditNodeParentId.value = parentId;
  currentEditNodeParentLevel.value = parentLevel;
  currentEditNodeId.value = nodeId;
}

//tree
function reloadElementTree() {
  treeKey.value += 1;
}
const treeKey = ref(1000);
//展开
const [expand, toggleExpand] = useToggle();
function expandElementTree() {
  toggleExpand();
  reloadElementTree();
}

function getNodeDeviceType(tableName) {
  return topographyTables.find((t) => t.tableName === tableName)?.name ?? " -- ";
}

//容器
const main = ref();
const { width } = useElementSize(main);

async function loadElementTreeChildNodes(node, resolve) {
  try {
    loading.value = true;
    const parentId = node.level === 0 ? 0 : node.data.id;
    const { data } = await getDeviceTopoTreeChild(parentId);
    resolve(data);
  } catch (error) {
    Notification({
      title: "错误",
      message: "获取树结构失败",
      type: "error",
    });
    resolve([]);
  } finally {
    loading.value = false;
  }
}

function expandTree() {
  if (showGraph.value) {
    expandGraphTree();
  } else {
    expandElementTree();
  }
}
async function loadTreeChildNodes(...args) {
  if (showGraph.value) {
    await loadGraphTreeChildNodes(...args);
  } else {
    await loadElementTreeChildNodes(...args);
  }
}

async function reloadTree(...args) {
  if (showGraph.value) {
    await loadGraphTreeChildNodes(...args);
  } else {
    reloadElementTree(...args);
  }
}
</script>
