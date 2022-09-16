<template>
  <div bg="dark-500">
    <div grid="~ xl:cols-6 lg:cols-4 md:cols-3 sm:cols-2 cols-1 " p="x-12 y-10" gap="8">
      <router-link class="router-link" to="/device-maintanence">
        <i i-mdi-devices></i>
        设备维护
      </router-link>
      <router-link class="router-link" to="/device-topography">
        <i i-carbon-container-services></i>
        设备拓扑
      </router-link>
      <router-link class="router-link" to="/device-config">
        <i i-carbon-cloud-services></i>
        设备配置
      </router-link>

      <router-link class="router-link" to="/node/node-template">
        <i i-carbon-pcn-p-node></i>
        节点模板
      </router-link>
      <router-link class="router-link" to="/node/flow-template">
        <i i-carbon-ibm-cloud-pak-manta-automated-data-lineage></i>
        流程模板
      </router-link>
      <router-link class="router-link" to="/test" v-if="isDevelopmentMode">
        <i i-carbon-ai-status-complete></i>
        测试
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { isMobile } from "~/helpers/device";
import { useRouter } from "~/composables";

const isDevelopmentMode = import.meta.env.MODE === "development";

const router = useRouter();
if (isMobile()) {
  router.replace("/mobile");
}
</script>

<style lang="scss" scoped>
.router-link {
  @apply flex flex-col items-center text-white bg-sky-600 px-12 py-8 hover:shadow transition-all;
  i {
    @apply text-5xl;
  }
}
</style>
