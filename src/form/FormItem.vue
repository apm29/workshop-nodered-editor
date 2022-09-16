<template>
  <el-form-item
    ref="formItemRef"
    v-bind="$attrs"
    :label="label"
    label-width="8rem"
    :prop="prop"
  >
    <component
      :is="componentName"
      v-model="internalProp"
      :placeholder="placeholder"
      block="!inline"
    ></component>
  </el-form-item>
</template>

<script setup>
import Vue from "vue";
import CodeEditor from "~/nodered/edit/function/CodeEditor.vue";
const props = defineProps({
  //标签
  label: {
    type: [String],
  },
  //属性名称,string
  prop: {
    type: [String],
    required: true,
  },
  //或者是一对get set方法,get方法入参为form
  getProp: {
    type: [Function],
  },
  setProp: {
    type: [Function],
  },
  //输入类型
  type: {
    type: [String, Symbol],
    required: true,
  },
});

if (!props.prop && !props.getProp) {
  console.warn("FormItem组件需要指定prop属性或者getProp方法");
}
if (!props.type) {
  console.warn(`FormItem组件未指定类型`);
}
if (props.getProp && !(props.getProp instanceof Function)) {
  console.warn("FormItem组件getProp必须为方法");
}

if (props.setProp && !(props.setProp instanceof Function)) {
  console.warn("FormItem组件setProp必须为方法");
}

const getForm = inject("getForm");
const getRules = inject("getRules");

if (!getForm || !getRules) {
  console.warn("FormItem组件需要父/祖父组件存在FormProvider");
}

const form = computed(getForm);
const rules = computed(getRules);

const formItemRef = ref();
if (props.prop) {
  //设置默认值
  Vue.set(unref(form), props.prop, null);
  //设置rules
  Vue.set(unref(rules), props.prop, [
    {
      validator: function (rule, value, callback) {
        if (!value && value !== 0) {
          callback(new Error(`请输入${props.label}`));
        } else {
          callback();
        }
      },
      message: `请输入${props.label}`,
      trigger: ["blur", "change"],
    },
  ]);
}
nextTick(() => {
  unref(formItemRef).clearValidate();
});

//设置placeholder
const placeholder = computed(() => `请输入${props.label}`);

//根据type获取组件名称
const componentNameTypeMap = new Map();
componentNameTypeMap.set("text", "el-input");
componentNameTypeMap.set("number", "el-input-number");
componentNameTypeMap.set("code", CodeEditor);

const componentName = computed(() => componentNameTypeMap.get(unref(props.type)));

//计算属性值
const internalProp = computed({
  get: () => {
    const formModel = unref(form);
    if (props.getProp) {
      return props.getProp(formModel);
    } else if (props.prop) {
      return formModel[props.prop];
    } else {
      return null;
    }
  },
  set: (value) => {
    if (props.setProp) {
      props.setProp(formModel);
    } else if (props.prop) {
      const formModel = unref(form);
      formModel[props.prop] = value;
    }
  },
});
</script>

<style lang="scss" scoped></style>
