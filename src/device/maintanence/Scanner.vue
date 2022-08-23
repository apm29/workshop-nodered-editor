<template>
  <div class="flex flex-col max-h-full h-full px-1 shadow ebox flex-nowrap">
    <div class="toolbar">
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-refresh"
        plain
        @click="onPagination"
      >
        刷新
      </el-button>

      <el-button size="mini" type="primary" icon="el-icon-plus" plain @click="handleAdd">
        新增
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      highlight-current-row
      class="flex-grow"
      :data="pagedData"
      height="100%"
      size="mini"
    >
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="level" label="等级" />
      <el-table-column prop="indexCode" label="设备编号" />
      <el-table-column prop="ip" label="设备IP" />
      <el-table-column width="160" prop="remark" label="备注"> </el-table-column>
      <el-table-column prop="op" label="操作" width="280" fixed="right">
        <template #default="{ row }">
          <div class="space-x-3">
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(row)">
              <el-button
                size="mini"
                type="text"
                class="text-red-500 hover:text-red-400"
                icon="el-icon-delete"
                slot="reference"
              >
                删除
              </el-button>
            </el-popconfirm>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="py-1"
      :current-page.sync="page"
      :page-sizes="[30, 50, 100, 500]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onPagination"
      @current-change="onPagination"
    >
    </el-pagination>
    <DeviceEditor
      v-model="showAddDevice"
      :table-name="DeviceTopographyTables.SCANNER"
      :table-dict="typeDict"
      :raw-form-data="currentEditForm"
      @device:add="onPagination"
      disable-select-type
    >
    </DeviceEditor>
  </div>
</template>

<script setup>
import { getPagedRFIDScanner } from "~/api/device/paged";
import { deleteDevice } from "~/api/device/add";
import DeviceEditor from "../DeviceEditor.vue";
import { useToggle } from "@vueuse/core";
import { DeviceTopographyTables } from "~/composables";
defineProps({
  typeDict: Array,
});

//分页
const pagedData = ref([]);
const page = ref(1);
const pageSize = ref(30);
const total = ref(0);
const loading = ref(false);
const onPagination = async function ({ refresh } = {}) {
  if (refresh) {
    page.value = 1;
    pagedData.value = [];
  }
  loading.value = true;
  try {
    const res = await getPagedRFIDScanner({
      pageNo: unref(page),
      pageSize: unref(pageSize),
    });
    pagedData.value = res.data.records;
    total.value = Number(res.data.total);
  } finally {
    loading.value = false;
  }
};
onMounted(onPagination);

//新增.编辑
const [showAddDevice, toggleShowAddDevice] = useToggle();
const currentEditForm = ref({});
function handleAdd() {
  currentEditForm.value = {};
  toggleShowAddDevice();
}
function handleEdit(row) {
  currentEditForm.value = row;
  toggleShowAddDevice();
}

//删除
async function handleDelete(row) {
  await deleteDevice(row.id, DeviceTopographyTables.SCANNER);
  await onPagination();
}
</script>
<style lang="scss">
.ebox {
  .el-table__header-wrapper {
    @apply sticky top-0 z-1;
  }

  .el-table::before {
    height: 0;
  }
}
.toolbar {
  @apply min-h-3rem bg-white overflow-x-auto px-2 flex flex-wrap items-center justify-end border-b;
  > * {
    @apply mr-2;
  }
}
</style>
