import { computed, watch, unref } from "vue";
import { getTextWidth } from "~/helpers/font.js";
function convertAsGetter(getFn) {
  if (getFn instanceof Function) {
    return getFn;
  } else {
    return () => unref(getFn);
  }
}

export function useLabels(getNode, getLabel) {
  const node = computed(convertAsGetter(getNode));
  const label = computed(convertAsGetter(getLabel));

  watch(
    label,
    (label) => {
      const realNode = unref(node);
      const width = getTextWidth(label, "bold 16px Arial");
      if (width > 118) {
        realNode.resize(width + 32, realNode.size().height);
      }
    },
    { immediate: true }
  );
}
