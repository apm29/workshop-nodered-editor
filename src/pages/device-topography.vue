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
</script>
