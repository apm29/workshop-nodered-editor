<template>
  <div>
    <PropsEditor
      :props.sync="data.props"
      :payload.sync="data.payload"
      :payloadType.sync="data.payloadType"
    />
    <el-form-item label="重复">
      <div>
        <el-checkbox m="!0" label="" v-model="data.once"></el-checkbox>
        立刻执行于
        <span inline="block" w="32">
          <el-input
            :disabled="!data.once"
            v-model="data.onceDelay"
            placeholder="单位秒"
          ></el-input>
        </span>
        秒后,随后
        <el-checkbox
          label=""
          :value="!!data.repeat"
          @input="data.repeat = $event ? 1 : ''"
        ></el-checkbox>
        重复,每隔
        <span inline="block" w="32">
          <el-input-number
            placeholder="重复间隔"
            :value="data.repeat"
            @input="data.repeat = $event || ''"
            :disabled="!data.repeat"
          ></el-input-number>
        </span>
        秒执行
      </div>
    </el-form-item>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import PropsEditor from "../components/PropsEditor.vue";
import { computed } from "vue";
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
