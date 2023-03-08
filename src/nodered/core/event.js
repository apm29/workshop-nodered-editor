import { ref, watch } from "vue";
import { useThrottleFn } from "@vueuse/core";
import { createNodeId } from "../biz/id";
export function useEditorEvent(
  getGraphFn,
  handleNodeEdit,
  handleNodeSelect,
  handleNodeUnselect,
  handleGraphDataChange,
  handleEdgeSelect,
  handleEdgeUnselect
) {
  function mountEventListener(graph) {
    if (graph) {
      // copy cut paste
      graph.bindKey(["meta+c", "ctrl+c"], () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          graph.copy(cells);
        }
        return false;
      });
      graph.bindKey(["meta+x", "ctrl+x"], () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          graph.cut(cells);
        }
        return false;
      });
      graph.bindKey(["meta+v", "ctrl+v"], () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 });
          graph.cleanSelection();
          graph.select(cells);
        }
        return false;
      });

      //undo redo
      graph.bindKey(["meta+z", "ctrl+z"], () => {
        if (graph.history.canUndo()) {
          graph.history.undo();
        }
        return false;
      });
      graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
        if (graph.history.canRedo()) {
          graph.history.redo();
        }
        return false;
      });

      // select all
      graph.bindKey(["meta+a", "ctrl+a"], () => {
        const nodes = graph.getNodes();
        if (nodes) {
          graph.select(nodes);
        }
      });

      //delete
      graph.bindKey("backspace", () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          graph.removeCells(cells);
        }
      });

      // zoom
      graph.bindKey(["ctrl+shift+1", "meta+shift+1"], () => {
        const zoom = graph.zoom();
        if (zoom < 1.5) {
          graph.zoom(0.1);
        }
      });
      graph.bindKey(["ctrl+shift+2", "meta+shift+2"], () => {
        const zoom = graph.zoom();
        if (zoom > 0.5) {
          graph.zoom(-0.1);
        }
      });

      graph.on("node:dblclick", ({ node }) => {
        handleNodeEdit?.({ data: node.data, node });
      });
      graph.on("node:selected", ({ node }) => {
        // console.log("node:selected", node);
        handleNodeSelect?.({ data: node.data, node });
      });
      graph.on("node:unselected", ({ node }) => {
        // console.log("node:unselected", node);
        handleNodeUnselect?.({ data: node.data, node });
      });
      graph.on("edge:selected", ({ edge }) => {
        handleEdgeSelect?.({ edge });
      });
      graph.on("edge:unselected", ({ edge }) => {
        handleEdgeUnselect?.({ edge });
      });
      const throttledHandler = useThrottleFn(handleGraphDataChange, 2000, true);
      const takeLastFn = useTakeLastFn(handleGraphDataChange);
      graph.on("cell:change:*", ({ key }) => {
        // console.log("change", key);
        takeLastFn();
      });
      graph.on("cell:added", () => {
        // console.log("added");
        // handleGraphDataChange();
        takeLastFn();
      });
      graph.on("cell:removed", () => {
        // console.log("removed");
        // handleGraphDataChange();
        takeLastFn();
      });
    }
  }
  watch(getGraphFn, mountEventListener);
}

function useTakeLastFn(fn, time = 2000) {
  const timeout = time;
  let handler = null;
  //忽略第一次更新
  let called = true;
  return function (...args) {
    clearTimeout(handler);
    handler = setTimeout(() => {
      if (!called) {
        fn(args);
        called = true;
      } else {
        called = false;
      }
    }, timeout);
  };
}
