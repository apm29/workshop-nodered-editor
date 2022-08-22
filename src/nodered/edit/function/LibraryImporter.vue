<template>
  <table table="~" border="collapse" w="full" empty-cell="visible">
    <div class="table-header-group">
      <div class="table-row">
        <div class="table-cell">模块名称</div>
        <div class="table-cell">导入为</div>
        <div class="table-cell">操作</div>
      </div>
    </div>
    <div class="table-row-group">
      <div class="table-row" v-for="(lib, index) of libs" :key="index">
        <div class="table-cell">
          <el-input
            border="!none"
            placeholder="导入库名称"
            size="mini"
            v-model="lib.module"
          >
          </el-input>
        </div>
        <div class="table-cell">
          <el-input border="!none" placeholder="导入为" size="mini" v-model="lib.var">
          </el-input>
        </div>
        <div class="table-cell">
          <button rounded="full" @click="handleRemove(index)">
            <i class="i-mdi-close"></i>
          </button>
        </div>
      </div>
      <tr class="border border-gray-300 text-center">
        <td :colspan="3">
          <el-button
            rounded="~"
            w="!full"
            block="~"
            type="text"
            @click="handleAdd()"
            icon="el-icon-plus"
          >
            新增
          </el-button>
        </td>
      </tr>
    </div>
  </table>
</template>

<script setup>
const props = defineProps({
  libs: Array,
});
function handleAdd() {
  props.libs.push({
    module: "",
    var: "",
  });
}
function handleRemove(index) {
  props.libs.splice(index, 1);
}
</script>

<style lang="scss" scoped>
.table-cell {
  @apply border border-gray-300 text-center;
}
.table-row {
  @apply text-gray-600;
}
</style>
