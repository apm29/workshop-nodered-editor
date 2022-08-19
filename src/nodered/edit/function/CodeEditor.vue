<template>
  <div ref="editContainer" class="code-editor" w="full" min="h-200px"></div>
</template>

<script setup>
import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (["typescript", "javascript"].includes(label)) {
      return new tsWorker();
    }
    return new EditorWorker();
  },
};

const props = defineProps({
  value: String,
});
const emits = defineEmits(["input"]);
const editContainer = ref();
const internalValue = ref(props.value);
let monacoEditor = null;
watch(
  () => props.value,
  (value) => {
    // 防止改变编辑器内容时光标重定向
    if (value !== monacoEditor?.getValue()) {
      monacoEditor.setValue(value);
    }
  }
);
onMounted(() => {
  // 初始化编辑器
  monacoEditor = monaco.editor.create(editContainer.value, {
    // 初始化的dom节点
    value: props.value, // 初始化值
    language: "javascript", // 语言类型
    theme: "vs", // 主题
    readOnly: false,
    selectOnLineNumbers: true,
    renderSideBySide: false,
  });
  // 监听值变化
  monacoEditor.onDidChangeModelContent(() => {
    const currentValue = monacoEditor?.getValue();
    internalValue.value = currentValue;
    emits("input", currentValue);
  });
});

onBeforeUnmount(() => {
  monacoEditor?.dispose();
});
</script>

<style lang="scss" scoped></style>
