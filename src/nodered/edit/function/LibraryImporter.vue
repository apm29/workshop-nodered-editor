<template>
  <table table="~" border="collapse" w="full">
    <div class="table-header-group">
      <div class="table-row" text="emerald-600 center">
        <div class="table-cell" border="~  emerald-500">模块名称</div>
        <div class="table-cell" border="~  emerald-500">导入为</div>
        <div class="table-cell" border="~  emerald-500">操作</div>
      </div>
    </div>
    <div class="table-row-group">
      <div class="table-row" v-for="(lib, index) of libs">
        <div class="table-cell" border="~  emerald-500">
          <el-input
            border="!none"
            placeholder="导入库名称"
            size="mini"
            v-model="lib.module"
          >
          </el-input>
        </div>
        <div class="table-cell" border="~  emerald-500">
          <el-input border="!none" placeholder="导入为" size="mini" v-model="lib.var">
          </el-input>
        </div>
        <div class="table-cell" border="~  emerald-500" text="center">
          <button rounded="full" @click="handleRemove(index)">
            <i class=" i-mdi-close"></i>
          </button>
        </div>
      </div>
      <div class="table-row">
        <div class="table-cell">
          <button rounded="~" text="blue-500" p="x-2" @click="handleAdd()">
            新增<i class=" i-mdi-plus"></i>
          </button>
        </div>
      </div>
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

<style lang="scss" scoped></style>
