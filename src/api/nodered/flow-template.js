import { remote } from "~/composables";

export function addFlowTemplate({
  name, receiveNodeRedNodeTemplateIds, sendNodeRedNodeTemplateIds
}) {
  return remote.postForm({
    url: `/java/nodeRedFlowTemplate/add`,
    data: {
      name, receiveNodeRedNodeTemplateIds, sendNodeRedNodeTemplateIds
    }
  })
}

export function getAllFlowTemplates() {
  return remote.postForm({
    url: `/java/nodeRedFlowTemplate/getList`,
  })
}
