import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import {
  convertNodeRedJsonToVueNode,
  convertVueNodeToNodeRedJson,
} from "../vue-node";
const LocalNodes = useLocalStorage("local-nodes", []);
const LocalConfigs = useLocalStorage("local-configs", []);
const LocalTabs = useLocalStorage("local-tabs", []);
export function useNodes() {
  const configs = ref(LocalConfigs);
  const nodes = ref(LocalNodes);
  const tabs = ref(LocalTabs);
  const flow = computed(() => {
    return [...configs.value, ...nodes.value, ...tabs.value];
  });
  const x6nodes = computed({
    //转换为{ nodes:[],edges:[]}形式
    get: () => convertNodeRedJsonToVueNode(nodes.value),
    //从cells[],转为node-red形式的json
    set: (cells) => (nodes.value = convertVueNodeToNodeRedJson(cells)),
  });
  return {
    //node-red格式的
    configs,
    nodes,
    tabs,
    flow,
    //x6格式的
    x6nodes,
  };
}
