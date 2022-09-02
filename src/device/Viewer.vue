<template>
  <div id="viewer-container" ref="container" class="relative" @contextmenu="">
    <div class="minimap absolute left-3 bottom-3 bg-white border shadow">
      <div id="minimap"></div>
    </div>

    <div class="mouse absolute right-0 bottom-0">X:{{ x }} Y:{{ y }}</div>
    <div
      ref="contextMenu"
      v-if="showContextMenu"
      class="shadow-lg border fixed px-6 py-3 bg-white flex flex-col items-start"
      :style="{ left: `${x}px`, top: `${y}px` }"
    >
      <div class="text-sm text-gray-400">设备编辑菜单</div>
      <el-divider class="my-2"></el-divider>

      <el-button
        type="text"
        class="!ml-0"
        icon="el-icon-plus"
        @click="handleAddChildDevice"
      >
        新增子级设备
      </el-button>
      <el-button
        v-if="!isRootNode"
        type="text"
        class="!ml-0"
        icon="el-icon-edit"
        @click="handleMountOrEditDevice"
      >
        挂载/编辑设备
      </el-button>
      <el-button
        v-if="!isRootNode"
        type="text"
        icon="el-icon-delete"
        class="!ml-0 !text-red-500 !hover:text-red-400"
        @click="handleDeleteDevice"
      >
        删除设备
      </el-button>
    </div>
  </div>
</template>
<script setup>
import G6 from "@antv/g6";
import { getStartNodeSize, NODE_START } from "./nodes/node-start";
import { getEmptyNodeSize, NODE_EMPTY } from "./nodes/node-empty";
import { getHubNodeSize, NODE_HUB } from "./nodes/node-hub";
import { getNetNodeSize, NODE_NET } from "./nodes/node-net";
import { getCollectorNodeSize, NODE_COLLECTOR } from "./nodes/node-collector";
import { getSwitchNodeSize, NODE_SWITCH } from "./nodes/node-switch";
import { getSensorNodeSize, NODE_SENSOR } from "./nodes/node-sensor";
import { getScannerNodeSize, NODE_SCANNER } from "./nodes/node-scanner";
import { getReaderNodeSize, NODE_READER } from "./nodes/node-reader";
import {
  getElectricityBoxNodeSize,
  NODE_ELECTRICITY_BOX,
} from "./nodes/node-electricity-box";
import { useElementSize } from "@vueuse/core";
import { convertTreeData } from "./helpers";
import { onClickOutside, useToggle, useThrottleFn } from "@vueuse/core";
import { MessageBox } from "element-ui";
const NODE_ROOT_ID = "0";
function getVGap(d) {
  return 15;
}
function getHGap(d) {
  return 25;
}
function getWidth(d) {
  if (d.type === NODE_ELECTRICITY_BOX) {
    const [width, _] = getElectricityBoxNodeSize(d.label);
    return width;
  }
  if (d.type === NODE_START) {
    const [width, _] = getStartNodeSize(d.label);
    return width;
  }
  if (d.type === NODE_EMPTY) {
    const [width, _] = getEmptyNodeSize(d.label);
    return width;
  }
  if (d.type === NODE_HUB) {
    const [width, _] = getHubNodeSize(d.label);
    return width;
  }
  if (d.type === NODE_NET) {
    const [width, _] = getNetNodeSize(d.label);
    return width;
  }
  if (d.type === NODE_COLLECTOR) {
    const [width, _] = getCollectorNodeSize(d.label);
    return width;
  }
  if (d.type === NODE_SWITCH) {
    const [width, _] = getSwitchNodeSize(d.label);
    return width;
  }
  if (d.type === NODE_SENSOR) {
    const [width, _] = getSensorNodeSize(d.label);
    return width;
  }
  if (d.type === NODE_SCANNER) {
    const [width, _] = getScannerNodeSize(d.label);
    return width;
  }
  if (d.type === NODE_READER) {
    const [width, _] = getReaderNodeSize(d.label);
    return width;
  }
  return 60;
}

function getHeight(d) {
  if (d.type === NODE_ELECTRICITY_BOX) {
    const [_, height] = getElectricityBoxNodeSize(d.label);
    return height;
  }
  if (d.type === NODE_START) {
    const [_, height] = getStartNodeSize(d.label);
    return height;
  }
  if (d.type === NODE_EMPTY) {
    const [_, height] = getEmptyNodeSize(d.label);
    return height;
  }
  if (d.type === NODE_HUB) {
    const [_, height] = getHubNodeSize(d.label);
    return height;
  }
  if (d.type === NODE_NET) {
    const [_, height] = getNetNodeSize(d.label);
    return height;
  }
  if (d.type === NODE_COLLECTOR) {
    const [_, height] = getCollectorNodeSize(d.label);
    return height;
  }
  if (d.type === NODE_SWITCH) {
    const [_, height] = getSwitchNodeSize(d.label);
    return height;
  }
  if (d.type === NODE_SENSOR) {
    const [_, height] = getSensorNodeSize(d.label);
    return height;
  }
  if (d.type === NODE_SCANNER) {
    const [_, height] = getScannerNodeSize(d.label);
    return height;
  }
  if (d.type === NODE_READER) {
    const [_, height] = getReaderNodeSize(d.label);
    return height;
  }
  return 30;
}
const layoutConfigTree = {
  type: "compactBox",
  direction: "TB",
  radial: false,
  getVGap,
  getHGap,
  getWidth,
  getHeight,
};

const layoutConfigRadial = {
  type: "compactBox",
  direction: "RL",
  radial: true,
  getVGap,
  getHGap,
  getWidth,
  getHeight,
};
const props = defineProps({
  tree: {
    type: [Array, Object],
    default: () => ({}),
  },
  hideRoot: {
    type: Boolean,
  },
  radial: {
    type: Boolean,
  },
  load: {
    type: Function,
  },
});

defineExpose({
  reload: viewInit,
});

const emits = defineEmits(["node:delete", "node:add", "node:edit"]);

const container = ref();
const { tree, hideRoot, radial, load } = toRefs(props);
// onMounted(() => setTimeout(viewInit, 500));
onMounted(() => {
  if (load.value && typeof load.value === "function") {
    load.value(NODE_ROOT_ID);
  }
});

watch(tree, viewInit, { deep: true });
const { width, height } = useElementSize(container);
const graphInstance = ref(null);
const layoutConfig = computed(() =>
  radial.value ? layoutConfigRadial : layoutConfigTree
);
function viewInit() {
  const data = convertTreeData(tree.value);
  const initial = !graphInstance.value;
  if (initial) {
    // 实例化 minimap 插件
    const minimap = new G6.Minimap({
      size: [250, 150],
      container: "minimap",
      type: "default",
    });
    //grid网格
    const grid = new G6.Grid();
    graphInstance.value = new G6.TreeGraph({
      container: "viewer-container", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: width.value, // Number，必须，图的宽度
      height: height.value, // Number，必须，图的高度
      plugins: [minimap, grid], // 将 minimap 实例配置到图上
      // fitView: true, //是否将图适配到画布大小，可以防止超出画布或留白太多。
      // fitViewPadding: [20, 20, 20, 20], //画布上的四周留白宽度。
      animate: true, //是否启用图的动画。
      preventOverlap: true, // 防止节点重叠
      linkCenter: true,
      layout: layoutConfig.value,

      modes: {
        default: ["drag-canvas", "zoom-canvas"],
      }, //图上行为模式的集合
      // 节点在默认状态下的样式配置（style）和其他配置
      defaultNode: {
        size: [40, 20],
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      // 边在默认状态下的样式配置（style）和其他配置
      defaultEdge: {
        type: "line", //"cubic-vertical",
        style: {
          stroke: "#DE2A18",
        },
      },
    });

    const graph = graphInstance.value;

    //监听节点选择
    graph.on("node:click", async function (event) {
      event.preventDefault();
      //handleNodeEdit(event);
      if (load.value && typeof load.value === "function") {
        const nodeID = event.item.getID();
        load.value(nodeID);
      }
    });
    //监听节点右键
    graph.on("node:contextmenu", function (event) {
      event.preventDefault();
      handleNodeEdit(event);
    });
  }

  const graph = graphInstance.value;

  //统一处理node
  graph.node(function (node) {
    return {
      label: node.label || node.id,
      labelCfg: {
        position: "center",
      },
    };
  });
  if (initial) {
    graph.data(data); // 读取 Step 2 中的数据源到图上
    graph.render(); // 渲染图
    graph.fitView();
  } else {
    graph.data(data);
    graph.layout(false);
  }
  handleRootNodeVisiblilty();
}

function handleRootNodeVisiblilty() {
  const graph = graphInstance.value;
  const hide = hideRoot.value;
  const root = graph.findById(NODE_ROOT_ID);
  if (root) {
    // 隐藏元素
    root.changeVisibility(!hide);
    const edges = graph.findAll("edge", (edge) => {
      return edge.getSource().getID() === root.getID();
    });
    edges.forEach((e) => {
      e.changeVisibility(!hide);
    });
  }
}

//辐射式
watch(radial, () => {
  const graph = graphInstance.value;
  graph.updateLayout(layoutConfig.value);
});
//隐藏根节点和边
watch(hideRoot, handleRootNodeVisiblilty);
const onViewerSizeChange = useThrottleFn(() => {
  const graph = graphInstance.value;
  if (!graph || graph.get("destroyed")) {
    return;
  }
  if (!width.value || !height.value) {
    return;
  }
  graph.changeSize(width.value, height.value);
}, 2000);
//监听大小变化
watch([width, height], onViewerSizeChange);

const x = ref(0);
const y = ref(0);
const contextMenu = ref();
const [showContextMenu] = useToggle();
const currentContextMenuEditModel = ref();
const isRootNode = computed(() => currentContextMenuEditModel.value?.id === NODE_ROOT_ID);
onClickOutside(contextMenu, (event) => (showContextMenu.value = false));
function handleNodeEdit(event) {
  const node = event.item; // 被操作的节点 item
  const nodeModel = node.getModel(); // 被操作的节点 Model
  // graphInstance.value.setItemState(node.getID(), "selected", true);
  showContextMenu.value = true;
  currentContextMenuEditModel.value = nodeModel;
  x.value = event.clientX;
  y.value = event.clientY;
}

//编辑删除

function handleAddChildDevice() {
  const model = currentContextMenuEditModel.value;
  emits(
    "node:add",
    model?.topographyBusiness?.id || undefined,
    model.topographyBusiness?.businessData?.level || 0
  );
  showContextMenu.value = false;
}
function handleMountOrEditDevice() {
  const model = currentContextMenuEditModel.value;
  emits(
    "node:edit",
    model.topographyBusiness.id,
    model.topographyBusiness?.parentId || 0,
    model.topographyBusiness?.businessData?.level || 0
  );
  showContextMenu.value = false;
}
async function handleDeleteDevice() {
  const model = currentContextMenuEditModel.value;
  const hasChildren = model.children && model.children.length;
  const confirm = await MessageBox.confirm(
    hasChildren ? "当前设备存在子级,确认删除吗?" : "确认删除该设备吗?"
  );
  if (confirm) {
    emits("node:delete", model.topographyBusiness.id, model.topographyBusiness.parentId);
    showContextMenu.value = false;
  }
}
</script>

<style>
.viewer-container {
  color: #605d6c;
  background-color: #ebf1ff;
}
</style>
