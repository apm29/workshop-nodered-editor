import { computed, watch, unref } from "vue";

function convertAsGetter(getFn) {
  if (getFn instanceof Function) {
    return getFn;
  } else {
    return () => unref(getFn);
  }
}

export function usePorts(getNode, getCount, getGroup) {
  const node = computed(convertAsGetter(getNode));
  const count = computed(convertAsGetter(getCount));
  const group = computed(convertAsGetter(getGroup));

  watch(
    count,
    (count) => {
      const realNode = unref(node);
      const realGroup = unref(group);
      const existPorts = realNode
        .getPorts()
        .filter((it) => it.group === realGroup);

      for (let index = 0; index < count; index++) {
        const portId = `${realNode.id}-port-${realGroup}-${index + 1}`;
        //限制port数量,因为vue组件会mount多次,而绑定的node是同一个
        if (!realNode.hasPort(portId) && existPorts.length < count) {
          realNode.addPort({
            id: portId,
            group: realGroup,
          });
        }
      }
      //高度至少30,每新增一个port加15
      realNode.resize(150, Math.max(count * 15 + 15, 30));
    },
    { immediate: true }
  );
}
