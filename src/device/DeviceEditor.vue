<template>
  <PartialModal
    auto-width
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    :value="showEditDevice"
    @input="$emit('input', $event)"
  >
    <h3 class="mb-3 text-lg font-bold text-dark-400">添加设备</h3>
    <el-form size="mini" label-width="8rem" :model="formData">
      <el-form-item label="设备类型" prop="tableName">
        <el-select
          :disabled="disableSelectType"
          :value="propTableName"
          @input="$emit('update:tableName', $event)"
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
      <el-form-item
        v-if="
          isElectricityBox || is485Hub || isCollector || isSensor || isSwitch || is485Net
        "
        label="设备名称"
        required
        prop="name"
      >
        <el-input placeholder="输入设备名称" v-model="formData.name"> </el-input>
      </el-form-item>
      <el-form-item v-if="isElectricityBox" label="设备位置" required prop="place">
        <el-input placeholder="输入设备位置" v-model="formData.place"> </el-input>
      </el-form-item>
      <el-form-item
        v-if="isScanner || isReader"
        label="RFID设备编号"
        required
        prop="indexCode"
      >
        <el-input placeholder="输入RFID设备编号" v-model="formData.indexCode"> </el-input>
      </el-form-item>
      <el-form-item
        v-if="isScanner || isReader"
        label="RFID设备名称"
        required
        prop="remark"
      >
        <el-input placeholder="输入RFID设备名称" v-model="formData.remark"> </el-input>
      </el-form-item>
      <el-form-item v-else label="设备备注" required prop="remark">
        <el-input placeholder="输入设备备注" v-model="formData.remark"> </el-input>
      </el-form-item>
      <el-form-item label="设备IP" required prop="ip">
        <el-input placeholder="输入设备IP" v-model="formData.ip"> </el-input>
      </el-form-item>
      <el-form-item label="设备等级" required prop="level">
        <el-input-number placeholder="输入设备等级" v-model="formData.level">
        </el-input-number>
      </el-form-item>
      <el-form-item label="自有" required prop="isMyown">
        <el-checkbox :true-label="1" :false-label="0" v-model="formData.isMyown">
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('input', false)">取消</el-button>
        <el-button type="primary" @click="handleSaveDevice">
          {{ formData.id ? "保存修改" : "添加设备" }}
        </el-button>
      </el-form-item>
    </el-form>
  </PartialModal>
</template>

<script setup>
import PartialModal from "~/components/modal/PartialModal.vue";
import { addDevice } from "~/api/device/add.js";
import { DeviceTopographyTables } from "~/composables";
const props = defineProps({
  value: {
    type: Boolean,
  },
  disableSelectType: {
    type: Boolean,
  },
  tableName: {
    type: String,
  },
  tableDict: Array,
  rawFormData: Object,
});
const {
  value: showEditDevice,
  tableDict: typeDict,
  rawFormData,
  tableName: propTableName,
} = toRefs(props);
const emits = defineEmits(["input", "device:add"]);

const isElectricityBox = computed(
  () => propTableName.value === DeviceTopographyTables.EBOX
);
const is485Hub = computed(() => propTableName.value === DeviceTopographyTables.HUB);
const is485Net = computed(() => propTableName.value === DeviceTopographyTables.NET);
const isCollector = computed(
  () => propTableName.value === DeviceTopographyTables.COLLECTOR
);
const isSensor = computed(() => propTableName.value === DeviceTopographyTables.SENSOR);
const isSwitch = computed(() => propTableName.value === DeviceTopographyTables.SWITCH);
const isScanner = computed(() => propTableName.value === DeviceTopographyTables.SCANNER);
const isReader = computed(() => propTableName.value === DeviceTopographyTables.READER);

async function handleSaveDevice() {
  try {
    loading.value = true;
    await addDevice({
      ...formData.value,
      tableName: propTableName.value,
    });
    emits("input", false);
    emits("device:add", propTableName.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

//新增设备信息
const formData = ref({
  name: null,
  place: null,
  indexCode: null,
  remark: null,
  ip: null,
  id: null,
  level: null,
});

watch(rawFormData, () => {
  if (rawFormData.value) {
    formData.value = rawFormData.value;
  }
});

//获取设备挂载信息
const loading = ref(false);
</script>
