import {
  ref,
  watch,
  unref,
  onMounted,
  onUnmounted,
} from "vue";
import { Graph, Path, Shape } from "@antv/x6";

Graph.registerEdge(
  "dag-edge",
  {
    inherit: "edge",
    attrs: {
      line: {
        stroke: "#C2C8D5",
        strokeWidth: 1,
        targetMarker: null,
      },
    },
  },
  true
);

Graph.registerConnector(
  "algo-connector",
  (s, e, r) => {
    const offset = 14;
    const deltaX = Math.abs(e.x - s.x);
    const deltaY = Math.abs(e.y - s.y);
    const controlX = Math.floor((deltaX / 5) * 3);
    const controlY = Math.floor((30 / deltaY) * 30);
    const v1 = { x: s.x + offset + controlX, y: s.y + controlY };
    const v2 = { x: e.x - offset - controlX, y: e.y - controlY };
    if (e.x - s.x > 50) {
      // return Path.normalize(
      //   `M ${s.x} ${s.y}
      //    L ${s.x + offset} ${s.y}
      //    L ${e.x - offset} ${e.y}
      //    L ${e.x} ${e.y}
      //   `
      // );
      // return Path.normalize(
      //   `M ${s.x} ${s.y}

      //    Q ${s.x} ${s.y} ${s.x + offset} ${s.y}
      //    T ${e.x - offset} ${e.y}
      //    Q ${e.x - offset} ${e.y} ${e.x} ${e.y}
      //   `
      // );
      const controlDy = Math.floor((deltaY / 5) * 1);
      const controlDX = Math.floor(10000 / deltaX);
      return Path.normalize(
        `M ${s.x} ${s.y}
         C ${s.x + controlDX} ${s.y + controlDy} ${e.x - controlDX} ${e.y - controlDy
        } ${e.x} ${e.y}
        `
      );
    }
    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x + offset} ${s.y}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x - offset} ${e.y}
       L ${e.x} ${e.y}
      `
    );
  },
  true
);

export function useCreateGraph(
  getGraphContainerFn,
  getMinimapContainerFn,
  postGraphFn
) {
  const graphInstance = ref();

  function createGraph([graphContainer, minimapContainer]) {
    const graphContainerValue = unref(graphContainer);
    const minimapContainerValue = unref(minimapContainer);
    if (!graphContainerValue || !minimapContainerValue) {
      return;
    }
    console.log("create graph");
    graphInstance.value = new Graph({
      container: graphContainerValue,
      panning: {
        enabled: false,
        modifiers: "shift",
      },
      snapline: {
        enabled: true,
      },
      resizing: {
        enabled: (node) => {
          return ["comment"].includes(node.shape);
        },
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: false,
      },
      history: {
        enabled: true,
      },
      selecting: {
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
        filter(node) {
          return true;
        },
      },
      keyboard: true,
      clipboard: true,
      minimap: {
        enabled: true,
        container: minimapContainerValue,
        width: 160,
        height: 120,
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
        type: "mesh",
      },
      autoResize: true,
      connecting: {
        allowBlank: false,
        snap: true,
        allowLoop: false,
        allowPort: true,
        allowNode: false,
        highlight: true,
        connector: "algo-connector",
        connectionPoint: "anchor",
        anchor: "center",
        allowMulti: "withPort",
        router: {
          name: "metro",
          args: {
            startDirections: ["right"],
            endDirections: ["left"],
            // offset: 24,
            // min: 16,
            // direction: "H",
            // side: "right",
            // padding: 40,
          },
        },
        // connector: {
        //   name: "rounded",
        //   args: {},
        // },
        // anchor: {
        //   name: "nodeCenter",
        // },
        // connectionPoint: "anchor",
        createEdge() {
          return new Shape.Edge({
            shape: "dag-edge",
            attrs: {
              line: {
                stroke: "#525153",
                strokeWidth: 1,
                targetMarker: {
                  name: "classic",
                  size: 5,
                },
              },
            },
            zIndex: 0,
          });
        },
        validateConnection({ sourceMagnet, targetMagnet }) {
          if (!targetMagnet) {
            return false;
          }
          if (
            sourceMagnet.getAttribute("port-group") === "out" &&
            targetMagnet.getAttribute("port-group") === "in"
          ) {
            return true;
          }
          return false;
        },
      },
    });
    postGraphFn?.();
  }
  watch([getGraphContainerFn, getMinimapContainerFn], createGraph);

  //页面生命周期相关
  onUnmounted(() => {
    graphInstance.value?.dispose();
  });

  return { graphInstance };
}
