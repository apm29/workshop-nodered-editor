<template>
  <PartialModal
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    :value="showEditDevice"
    @input="$emit('input', $event)"
  >
    <h3 class="mb-3 text-lg font-bold text-dark-400">
      {{ id ? "编辑挂载设备" : "新增子级设备" }}
    </h3>
    <el-form size="mini" label-width="8rem" :model="mountedFormData">
      <el-form-item :label="mountedFormData.id ? '当前设备等级' : '父级设备等级'">
        <el-tag class="font-bold"> {{ parentLevel }}级 </el-tag>
      </el-form-item>
      <el-form-item label="设备类型" required prop="businessTableName">
        <el-select
          v-model="mountedFormData.businessTableName"
          @change="mountedFormData.businessId = null"
        >
          <el-option
            v-for="option of typeDict"
            :key="option.name"
            :value="option.tableName"
            :label="option.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择已有设备" required prop="businessId">
        <HubSelector
          v-if="isMount485Hub"
          :id.sync="mountedFormData.businessId"
          :name.sync="mountedFormData.businessName"
          :level.sync="mountedFormData.level"
          :dict="hubDict"
        >
        </HubSelector>
        <NetSelector
          v-if="isMount485Net"
          :id.sync="mountedFormData.businessId"
          :name.sync="mountedFormData.businessName"
          :level.sync="mountedFormData.level"
          :dict="netDict"
        >
        </NetSelector>
        <CollectorSelector
          v-if="isMountCollector"
          :id.sync="mountedFormData.businessId"
          :name.sync="mountedFormData.businessName"
          :level.sync="mountedFormData.level"
          :dict="collectorDict"
        >
        </CollectorSelector>
        <EBoxSelector
          v-if="isMountElectricityBox"
          :id.sync="mountedFormData.businessId"
          :name.sync="mountedFormData.businessName"
          :level.sync="mountedFormData.level"
          :dict="electricityBoxDict"
        >
        </EBoxSelector>
        <ScannerSelector
          v-if="isMountScanner"
          :id.sync="mountedFormData.businessId"
          :name.sync="mountedFormData.businessName"
          :level.sync="mountedFormData.level"
          :dict="scannerDict"
        >
        </ScannerSelector>
        <ReaderSelector
          v-if="isMountReader"
          :id.sync="mountedFormData.businessId"
          :name.sync="mountedFormData.businessName"
          :level.sync="mountedFormData.level"
          :dict="readerDict"
        >
        </ReaderSelector>
        <SensorSelector
          v-if="isMountSensor"
          :id.sync="mountedFormData.businessId"
          :name.sync="mountedFormData.businessName"
          :level.sync="mountedFormData.level"
          :dict="sensorDict"
        >
        </SensorSelector>
        <SwitchSelector
          v-if="isMountSwitch"
          :id.sync="mountedFormData.businessId"
          :name.sync="mountedFormData.businessName"
          :level.sync="mountedFormData.level"
          :dict="switchDict"
        >
        </SwitchSelector>
        <el-button
          type="warning"
          class="ml-2"
          icon="el-icon-plus"
          @click="toggleShowAddDevice()"
        >
          添加设备
        </el-button>
      </el-form-item>
      <template v-if="isMount485Net">
        <el-form-item label="WS发送URL">
          <el-input v-model="mountedFormData.wsOut"></el-input>
        </el-form-item>
        <el-form-item label="WS接收URL">
          <el-input v-model="mountedFormData.wsIn"></el-input>
        </el-form-item>
      </template>

      <el-form-item>
        <el-alert
          v-if="mountedFormData.level < parentLevel && parentId"
          size="mini"
          type="warning"
          :closable="false"
        >
          {{
            mountedFormData.id
              ? "非根节点的新设备等级必须大于等于原设备"
              : "等级大的设备必须挂载在等级小的设备下"
          }}
        </el-alert></el-form-item
      >
      <el-form-item>
        <el-button @click="$emit('input', false)">取消</el-button>
        <el-button type="primary" @click="handleSaveMountedDevice"> 保存 </el-button>
      </el-form-item>
    </el-form>
    <DeviceEditor
      v-model="showAddDevice"
      :table-name.sync="mountedFormData.businessTableName"
      :table-dict="typeDict"
      @device:add="$emit('device:add', $event)"
    >
    </DeviceEditor>
  </PartialModal>
</template>

<script setup>
import PartialModal from "~/components/modal/PartialModal.vue";
import DeviceEditor from "./DeviceEditor.vue";
import HubSelector from "./selector/HubSelector.vue";
import NetSelector from "./selector/NetSelector.vue";
import CollectorSelector from "./selector/CollectorSelector.vue";
import EBoxSelector from "./selector/EBoxSelector.vue";
import ScannerSelector from "./selector/ScannerSelector.vue";
import ReaderSelector from "./selector/ReaderSelector.vue";
import SensorSelector from "./selector/SensorSelector.vue";
import SwitchSelector from "./selector/SwitchSelector.vue";
import { DeviceTopographyTables } from "~/composables";
import {
  addDeviceTopoTreeNode,
  updateDeviceTopoTreeNode,
  getDeviceTopoTreeNode,
} from "~/api/device/tree.js";
import { useToggle } from "@vueuse/core";
import { Message } from "element-ui";
const props = defineProps({
  value: {
    type: Boolean,
  },
  parentNodeId: {
    type: [String, Number],
  },
  parentNodeLevel: {
    type: [String, Number],
  },
  nodeId: {
    type: [String, Number],
  },
  tableDict: Array,
  hubDict: Array,
  netDict: Array,
  collectorDict: Array,
  electricityBoxDict: Array,
  sensorDict: Array,
  switchDict: Array,
  scannerDict: Array,
  readerDict: Array,
});
const {
  value: showEditDevice,
  parentNodeId: parentId,
  parentNodeLevel: parentLevel,
  nodeId: id,
  tableDict: typeDict,
} = toRefs(props);
const emits = defineEmits(["input", "device:add", "device:mount"]);

const [showAddDevice, toggleShowAddDevice] = useToggle();

const isMountElectricityBox = computed(
  () => mountedFormData.value.businessTableName === DeviceTopographyTables.EBOX
);
const isMount485Hub = computed(
  () => mountedFormData.value.businessTableName === DeviceTopographyTables.HUB
);
const isMount485Net = computed(
  () => mountedFormData.value.businessTableName === DeviceTopographyTables.NET
);
const isMountCollector = computed(
  () => mountedFormData.value.businessTableName === DeviceTopographyTables.COLLECTOR
);
const isMountSensor = computed(
  () => mountedFormData.value.businessTableName === DeviceTopographyTables.SENSOR
);
const isMountSwitch = computed(
  () => mountedFormData.value.businessTableName === DeviceTopographyTables.SWITCH
);
const isMountScanner = computed(
  () => mountedFormData.value.businessTableName === DeviceTopographyTables.SCANNER
);
const isMountReader = computed(
  () => mountedFormData.value.businessTableName === DeviceTopographyTables.READER
);

async function handleSaveMountedDevice() {
  if (!mountedFormData.value.id) {
    //新增子级
    await addDeviceTopoTreeNode({
      parentId: parentId.value,
      businessTableName: mountedFormData.value.businessTableName,
      businessName: mountedFormData.value.businessName,
      businessId: mountedFormData.value.businessId,
      "node_red_websocket_out:1:path": mountedFormData.value.wsOut,
      "node_red_websocket_in:1:path": mountedFormData.value.wsIn,
    });
  } else {
    //编辑当前
    await updateDeviceTopoTreeNode({
      id: mountedFormData.value.id,
      parentId: parentId.value,
      businessTableName: mountedFormData.value.businessTableName,
      businessName: mountedFormData.value.businessName,
      businessId: mountedFormData.value.businessId,
      "node_red_websocket_out:1:path": mountedFormData.value.wsOut,
      "node_red_websocket_in:1:path": mountedFormData.value.wsIn,
    });
  }
  emits("device:mount", parentId.value);
  emits("input", false);
}

//获取设备挂载信息
const loading = ref(false);
async function getDeviceMounted(id) {
  if (id) {
    try {
      loading.value = true;
      const { data: mountedDevice } = await getDeviceTopoTreeNode(id);
      mountedFormData.value = {
        id: mountedDevice.id,
        businessId: mountedDevice.businessId,
        businessName: mountedDevice.businessName,
        businessTableName: mountedDevice.businessTableName,
        wsOut: null,
        wsIn: null,
      };
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  } else {
    mountedFormData.value = {
      id: null,
      businessTableName: null,
      businessName: null,
      businessId: null,
      wsOut: "ws://127.0.0.1/out",
      wsIn: "ws://127.0.0.1/in",
    };
  }
}

//挂载设备信息
const mountedFormData = ref({
  id: null,
  businessTableName: null,
  businessName: null,
  businessId: null,
  level: null,
  wsOut: "ws://127.0.0.1/out",
  wsIn: "ws://127.0.0.1/in",
});

watch(id, getDeviceMounted, { immediate: true });
</script>
