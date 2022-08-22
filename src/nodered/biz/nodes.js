import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import {
  convertNodeRedJsonToVueNode,
  convertVueNodeToNodeRedJson,
} from "../vue-node";
import { NodeTypes, ConfigTypes, TabTypes } from "../preset";
import { postNodeRedJsonByFlowId, getNodeRedJsonByFlowId } from "~/api/nodered"
import { MessageBox } from "element-ui";
const LocalNodes = useLocalStorage("local-nodes", []);
const LocalConfigs = useLocalStorage("local-configs", []);
const LocalTabs = useLocalStorage("local-tabs", []);

function convertAsGetter(getFn) {
  if (getFn instanceof Function) {
    return getFn;
  } else {
    return () => unref(getFn);
  }
}

export function useNodes(getFlowIdFn) {
  const flowId = computed(convertAsGetter(getFlowIdFn))
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

  function pullNodesFromServer() {
    getNodeRedJsonByFlowId(flowId.value).then(res => {
      const flows = res?.data?.nodes || []
      nodes.value = flows.filter(f => NodeTypes.includes(f.type))
      configs.value = flows.filter(f => ConfigTypes.includes(f.type))
      tabs.value = [res?.data ?? {}]
    })
  }
  watch(flowId, pullNodesFromServer, { immediate: true })

  async function pushNodesToServer() {
    const { value } = await MessageBox.prompt("输入流程名称", "提示")
    return postNodeRedJsonByFlowId(unref(flowId), unref(nodes), unref(configs), value)
  }

  return {
    //node-red格式的
    configs,
    nodes,
    tabs,
    flow,
    //x6格式的
    x6nodes,
    //push
    pushNodesToServer
  };
}
