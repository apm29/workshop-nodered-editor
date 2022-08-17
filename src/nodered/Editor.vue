<template>
  <div class="editor-grid" grid="~" divide="x y" h="screen" overflow="hidden">
    <!-- 侧边栏 -->
    <div h="screen" relative="~">
      <div ref="stencilContainer" h="full" class="relative"></div>
    </div>

    <!-- 画布 -->
    <div class="graph-grid" flex="~ col" h="screen" overflow="hidden">
      <div ref="container" class="relative" flex="grow">
        <div ref="graphContainer" h="full" w="full"></div>
        <div
          v-show="showMinimap"
          class="minimap"
          bg="white"
          shadow="~"
          z="30"
          absolute="~"
          right="4"
          bottom="4"
        >
          <div ref="minimapContainer" id="minimap"></div>
        </div>
      </div>
      <!-- 工具栏 -->
      <div class="toolbar-bottom" flex="~ shrink-0" justify="end" h="25px">
        <slot name="toolbar"> </slot>
        <div flex="grow"></div>
        <button class="toolbar-btn-icon">
          <i class="i-mdi-map text-gray-500" @click="toggleMinimap()"></i>
        </button>
        <button class="toolbar-btn-icon">
          <i class="i-mdi-minus text-gray-500" @click="zoomIn"></i>
        </button>
        <button class="toolbar-btn-icon">
          <i class="i-mdi-circle-outline text-gray-500" @click="zoomReset"></i>
        </button>
        <button class="toolbar-btn-icon">
          <i class="i-mdi-plus text-gray-500" @click="zoomOut"></i>
        </button>
      </div>
    </div>
    <!-- 侧边栏  -->
    <div class="sidebar" flex="~ col" bg="gray-100" h="screen" overflow="hidden">
      <div
        flex="grow"
        bg="gray-100"
        overflow="auto"
        class="sidebar-content-edit"
        h="[calc(100vh - 90px)]"
      >
        <!-- 节点编辑部分,交给上层组件 -->
        <slot :data="viewNodeData">
          <json-viewer
            :value="viewNodeData || nodes"
            :expand-depth="5"
            expanded
            copyable
            boxed
            sort
            rounded="!none"
          >
            <template #copy="{ copied }">
              {{ copied ? "已复制" : "复制" }}
            </template>
          </json-viewer>
        </slot>
      </div>

      <el-button block="~" w="full" m="!l-0" rounded="!none" @click="handleDeploy">
        保存到本地
      </el-button>
      <slot :data="viewNodeData" name="edit"> </slot>
    </div>
  </div>
</template>

<script setup>
import { useToggle } from "@vueuse/core";
import { useEditorEvent } from "./core/event.js";
import { useCreateGraph } from "./core/graph.js";
import { useCreateStencil } from "./core/component.js";
import { useGraphControl } from "./core/control.js";
import { useSizeWatcher } from "./core/size.js";
import JsonViewer from "vue-json-viewer";
import "./node/register.js";
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      nodes: [],
      edges: [],
    }),
  },
});

const emits = defineEmits(["node:edit", "update:data"]);

const { data: nodes } = toRefs(props);

const graphContainer = ref();
const minimapContainer = ref();
const stencilContainer = ref();
const container = ref();
// const graphInstance = ref();

const { graphInstance } = useCreateGraph(
  () => graphContainer.value,
  () => minimapContainer.value,
  renderData
);
//监听数据修改
watch(nodes, renderData);

const { stencilInstance } = useCreateStencil(
  () => graphInstance.value,
  () => stencilContainer.value
);
useEditorEvent(
  () => graphInstance.value,
  handleNodeEdit,
  handleNodeSelect,
  handleNodeUnselect,
  handleGraphDataChange
);
useSizeWatcher(() => graphInstance.value, container);

const { zoomIn, zoomOut, zoomReset } = useGraphControl(() => graphInstance.value);

function renderData() {
  const graph = graphInstance.value;
  if (graph && nodes.value) {
    console.log("render data");
    graph.fromJSON(nodes.value);
  }
}

//minimap
const [showMinimap, toggleMinimap] = useToggle(true);

//节点选择/编辑
const viewNodeData = ref();
const editNodeData = ref();
const editNode = ref();
function handleNodeSelect({ data, node }) {
  viewNodeData.value = data;
}
function handleNodeUnselect({ data, node }) {
  viewNodeData.value = null;
}
function handleNodeEdit({ data, node }) {
  //先手动保存下节点
  handleGraphDataChange();
  emits("node:edit", data, node);
}
//节点在上层保存后同步下数据
function handleNodeSaved(data) {
  viewNodeData.value = data;
}
//监听编辑节点保存
const registerNodeSavedListener = inject("registerNodeSavedListener");
registerNodeSavedListener(handleNodeSaved);
//监听节点/边的变更
async function handleGraphDataChange() {
  const graph = graphInstance.value;
  const json = graph.toJSON();
  console.log(json);
  emits("update:data", json.cells);
}

//保存
function handleDeploy() {
  handleGraphDataChange();
}
</script>

<style lang="scss">
.x6-edge-selected {
  path {
    stroke: orange !important;
    stroke-width: 3px;
  }
}
.x6-widget-stencil-title {
  display: none;
}
.editor-in-grid {
  grid-template-rows: minmax(0, 1fr) 25px;
}
.editor-grid {
  grid-template-columns: 200px minmax(0, 1fr) 300px;
}
.toolbar-btn-icon {
  @apply border hover:bg-gray-200 px-1 flex justify-center items-center;
}
.sidebar-content-edit,
.x6-graph-scroller,
.x6-widget-stencil-content {
  @apply scrollbar 
  scrollbar-thumb-gray-300 
  scrollbar-track-gray-100 
  scrollbar-thumb-rounded;
}
</style>