import { getAllFlowTemplates } from "~/api/nodered"

export function useAllFlowTemplate() {
  const templates = ref([])
  const loading = ref(false)
  async function getAll() {
    try {
      loading.value = true
      const { data } = await getAllFlowTemplates()
      templates.value = data || []
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false
    }
  }

  const search = useDebounceFn(getAll, 500)

  return {
    templates,
    loading,
    getAll,
    search
  }
}
