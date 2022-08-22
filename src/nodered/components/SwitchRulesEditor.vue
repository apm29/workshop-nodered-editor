<template>
  <div border="~" rounded="~" p="x-3 y-4">
    <Draggable
      :animation="200"
      ghost-class="ghost"
      @start="$emit('update:dragging', true)"
      @end="$emit('update:dragging', false)"
      :list="rules"
      handle=".handle"
      group="draggable-list"
    >
      <div
        v-for="(rule, index) of rules"
        :key="index"
        flex="~"
        items="center"
        gap="x-2"
        m="b-2"
      >
        <i class="i-mdi-menu handle" text="2xl" cursor="move"></i>
        <div max="w-48">
          <el-select size="mini" v-model="rule.t">
            <el-option-group label="值类型">
              <el-option
                :value="rule.value"
                :key="rule.value"
                :label="rule.label"
                v-for="rule of ValueRuleTypes"
              ></el-option>
            </el-option-group>
            <el-option-group label="序列类型">
              <el-option
                :value="rule.value"
                :key="rule.value"
                :label="rule.label"
                v-for="rule of SequenceRuleTypes"
              ></el-option>
            </el-option-group>
            <el-option-group label="其他">
              <el-option
                :value="rule.value"
                :key="rule.value"
                :label="rule.label"
                v-for="rule of OtherRuleTypes"
              ></el-option>
            </el-option-group>
          </el-select>
        </div>
        <div flex="grow">
          <PropEditor
            v-if="FullRules.find((r) => r.value === rule.t)?.noInput !== true"
            size="mini"
            :v.sync="rule.v"
            :vt.sync="rule.vt"
            :types="SwitchValueTypes"
            placeholder="值"
          ></PropEditor>
          <PropEditor
            v-if="FullRules.find((r) => r.value === rule.t)?.v2 === true"
            size="mini"
            :v.sync="rule.v"
            :vt.sync="rule.vt"
            :types="SwitchValueTypes"
            placeholder="值"
          ></PropEditor>
        </div>
        <i class="i-mdi-arrow-right" text="gray-500"></i>
        <span font="bold">{{ index + 1 }}</span>
        <el-button
          border="~"
          rounded="~"
          p="x-2"
          @click="handleRemove(index)"
          icon="el-icon-close"
          type="danger"
          plain
        >
        </el-button>
      </div>
    </Draggable>
    <el-button
      m="t-4"
      border="~"
      rounded="~"
      cursor="pointer"
      bg="hover:gray-200"
      text="gray-500 sm"
      p="x-4 y-1"
      @click="handleAddProp"
      icon="el-icon-plus"
    >
      添加
    </el-button>
  </div>
</template>

<script setup>
import { SwitchValueTypes } from "../edit/const.js";
import Draggable from "vuedraggable";
import { computed, watch } from "vue";
import PropEditor from "./PropEditor.vue";
const ValueRuleTypes = [
  {
    value: "eq",
    label: "==",
  },
  {
    value: "neq",
    label: "!=",
  },
  {
    value: "lt",
    label: "<",
  },
  {
    value: "lte",
    label: "<=",
  },
  {
    value: "gt",
    label: ">",
  },
  {
    value: "gte",
    label: ">=",
  },
  {
    value: "hask",
    label: "拥有键",
  },
  {
    value: "btwn",
    label: "在之间",
    v2: true,
  },
  {
    value: "cont",
    label: "包含",
  },
  {
    value: "regex",
    label: "匹配正则表达式",
  },
  {
    value: "true",
    label: "为真",
    noInput: true,
  },
  {
    value: "false",
    label: "为假",
    noInput: true,
  },
  {
    value: "null",
    label: "为空",
    noInput: true,
  },
  {
    value: "nnull",
    label: "非空",
    noInput: true,
  },
  {
    value: "istype",
    label: "类型是",
    select: true,
  },
  {
    value: "empty",
    label: "为空",
    noInput: true,
  },
  {
    value: "nempty",
    label: "非空",
    noInput: true,
  },
];
const SequenceRuleTypes = [
  {
    value: "head",
    label: "头",
  },
  {
    value: "index",
    label: "索引在..中间",
    v2: true,
  },
  {
    value: "tail",
    label: "尾",
  },
];
const OtherRuleTypes = [
  {
    value: "jsonata_exp",
    label: "JSONata表达式",
  },
  {
    value: "else",
    label: "除此以外",
    noInput: true,
  },
];
const FullRules = ref([...ValueRuleTypes, ...SequenceRuleTypes, ...OtherRuleTypes]);
const prop = defineProps({
  rules: Array,
  outputs: Number,
  dragging: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits("update:outputs");
function handleAddProp() {
  prop.rules.push({
    v: null,
    vt: "str",
    t: "eq",
  });
}
function handleRemove(index) {
  prop.rules.splice(index, 1);
}
const ruleCount = computed(() => prop.rules?.length ?? 0);
watch(ruleCount, (count) => {
  emits("update:outputs", count);
});
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.3s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
