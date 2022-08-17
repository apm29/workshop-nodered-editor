import { watch, unref, ref, computed } from "vue";
export function useConnectedEdgeStyle(getGraphFn, getNodeFn, disabledRef) {
  const node = computed(getNodeFn);
  const graph = computed(getGraphFn);
  const disabled = ref(disabledRef);
  //关联边
  const connectedEdges = computed(() =>
    unref(graph)
      .getEdges()
      .filter(
        (edge) =>
          edge.target.cell === unref(node).id ||
          edge.source.cell === unref(node).id
      )
  );
  //监听改变
  watch(
    [disabled, connectedEdges],
    ([disabled, connectedEdges]) => {
      connectedEdges.forEach((edge) => {
        edge.setAttrs({
          line: {
            opacity: disabled ? 0.5 : undefined,
            "stroke-dasharray": disabled ? "10,8" : undefined,
          },
        });
      });
    },
    { immediate: true }
  );
}
