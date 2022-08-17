import { computed } from "vue";
export function useGraphControl(getGraphFn) {
  const graphInstance = computed(getGraphFn);
  //zoom
  function zoomOut() {
    const graph = graphInstance.value;
    if (graph) {
      const zoom = graph.zoom();
      if (zoom < 2) {
        graph.zoom(0.1);
      }
    }
  }

  function zoomIn() {
    const graph = graphInstance.value;
    if (graph) {
      const zoom = graph.zoom();
      if (zoom > 0.2) {
        graph.zoom(-0.1);
      }
    }
  }

  function zoomReset() {
    const graph = graphInstance.value;
    if (graph) {
      graph.zoomTo(1);
      graph.centerContent({
        animation: true,
      });
    }
  }
  return {
    zoomIn,
    zoomOut,
    zoomReset,
  };
}
