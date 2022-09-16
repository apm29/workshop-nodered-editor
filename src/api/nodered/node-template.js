import { remote } from "~/composables";
import camelCase from "camelcase";

//根据类型添加节点模板
export function addNodeTemplate(type, form) {
  const name = camelCase(type, { pascalCase: true })
  return remote.postForm({
    url: `/java/nodeRed${name}/add`,
    data: form
  })
}

//根据类型查询节点模板
export function getAllNodeTemplate(type) {
  const name = camelCase(type, { pascalCase: true })
  return remote.postForm({
    url: `/java/nodeRed${name}/getList`,
  })
}
