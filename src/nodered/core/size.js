import { unref, ref, computed, watch } from "vue";
import { useThrottleFn, useElementSize, useWindowSize } from "@vueuse/core";
export function useSizeWatcher(getGraphFn, graphContainer) {
  const { height: graphHeight, width: graphWidth } =
    useElementSize(graphContainer);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  function setupSizeWatcher(graph) {
    if (!graph) {
      return;
    }

    function changeSize() {
      graph.resize(graphWidth.value, graphHeight.value);
    }

    function changeWindowSize() {
      graph.resize(windowWidth.value - 500, windowHeight.value - 30);
    }
    const throttledChangeSize = useThrottleFn(changeSize, 200);
    const throttledChangeWindowSize = useThrottleFn(changeWindowSize, 200);
    // onMounted(viewerCreate);

    watch([graphHeight, graphWidth], throttledChangeSize);
    watch([windowHeight, windowWidth], throttledChangeWindowSize);
  }

  watch(getGraphFn, setupSizeWatcher);
}
