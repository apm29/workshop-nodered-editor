<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <Viewer
      ref="viewer"
      :tree="treeData"
      :load="loadTreeChildNodes"
      @node:delete="handleDeleteDevice"
      @node:add="handleAddChildDevice"
      @node:edit="handleEditDevice"
      h="screen"
      w="screen"
    ></Viewer>
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
      <h1 text="dark-100 lg" font="bold">设备拓扑树</h1>
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
      @saved="loadTreeChildNodes"
      @device:add="getDict"
      @device:mount="loadTreeChildNodes"
    ></MountedDeviceEditor>
  </div>
</template>

<script setup>
import {
  getDeviceTopoTree,
  deleteDeviceTopoTreeNode,
  getDeviceTopoTreeChild,
} from "~/api/device/tree";
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
async function loadTreeChildNodes(nodeId) {
  try {
    loading.value = true;
    const { data } = await getDeviceTopoTreeChild(nodeId);
    const flatten = getFlattenTreeNodes(treeData.value);
    const find = flatten.find((node) => String(node.id) === String(nodeId));
    if (find) {
      find.children = data;
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
async function expandTree() {
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
  await loadTreeChildNodes(parentId);
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
</script>
