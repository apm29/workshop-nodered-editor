import { getAllNodeTemplate } from "~/api/nodered"

export function useAllNodeTemplate(getType) {
  const type = computed(getType)
  const templates = ref([])
  const loading = ref(false)
  async function getAll() {
    try {
      loading.value = true
      const { data } = await getAllNodeTemplate(type.value)
      templates.value = data || []
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false
    }
  }

  const search = useDebounceFn(getAll, 500)

  watch(type, getAll)

  return {
    templates,
    loading,
    getAll,
    search
  }
}
