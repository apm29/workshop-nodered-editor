<template>
  <el-tabs class="device-topography bg-white" type="border-card">
    <el-tab-pane label="电箱" lazy>
      <EBox :type-dict="topographyTables" />
    </el-tab-pane>
    <el-tab-pane label="交换机" lazy>
      <Switchs :type-dict="topographyTables" />
    </el-tab-pane>
    <el-tab-pane label="采集器" lazy>
      <Collectors :type-dict="topographyTables" />
    </el-tab-pane>
    <el-tab-pane label="传感器" lazy>
      <Sensor :type-dict="topographyTables" />
    </el-tab-pane>
    <el-tab-pane label="485HUB" lazy>
      <Hub :type-dict="topographyTables" />
    </el-tab-pane>
    <el-tab-pane label="485转网口" lazy>
      <Net :type-dict="topographyTables" />
    </el-tab-pane>
    <el-tab-pane label="RFID扫描器(入库)" lazy>
      <Scanner :type-dict="topographyTables" />
    </el-tab-pane>
    <el-tab-pane label="RFID扫描器(投料)" lazy>
      <Reader :type-dict="topographyTables" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "DeviceTopograghyDict",
};
</script>
<script setup>
import EBox from "~/device/maintanence/EBox.vue";
import Switchs from "~/device/maintanence/Switchs.vue";
import Collectors from "~/device/maintanence/Collectors.vue";
import Sensor from "~/device/maintanence/Sensor.vue";
import Hub from "~/device/maintanence/Hub.vue";
import Net from "~/device/maintanence/Net.vue";
import Scanner from "~/device/maintanence/Scanner.vue";
import Reader from "~/device/maintanence/Reader.vue";

import { useDeviceTopographyTableNames } from "~/composables";

const { topographyTables } = useDeviceTopographyTableNames();
</script>
<style lang="scss">
.device-topography {
  @apply flex flex-col pb-5 h-full;
  .el-tabs__content {
    @apply flex-grow  border-l border-r border-b shadow p-1;
  }

  .el-tab-pane {
    @apply h-full overflow-auto 
    scrollbar-thin  scrollbar-thumb-gray-300  scrollbar-track-gray-100 scrollbar-thumb-rounded;
  }

  .el-tabs__header {
    @apply mb-0;
  }
  // 使table的fixed部分覆盖住的滚动条可以滑动
  .el-table__fixed {
    pointer-events: none;
    .el-table__fixed-body-wrapper,
    .el-table__fixed-header-wrapper {
      pointer-events: auto;
    }
  }
}
</style>
