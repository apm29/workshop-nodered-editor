<template>
  <div bg="dark-500" h="screen" overflow="y-auto">
    <div grid="~ cols-2" h="auto" items="start" justify="start" gap="3" p="3">
      <router-link class="router-link" to="/mobile/device-maintanence">
        <i i-mdi-devices></i>
        设备维护
      </router-link>
      <router-link class="router-link" to="/mobile/device-topography">
        <i i-carbon-container-services></i>
        设备拓扑
      </router-link>
      <router-link class="router-link" to="/mobile/device-config">
        <i i-carbon-cloud-services></i>
        设备配置
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { isMobile } from "~/helpers/device";
import { useRouter } from "~/composables";
const router = useRouter();
if (!isMobile()) {
  router.push("/");
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
