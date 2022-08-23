import { DeviceTopographyTables } from "~/composables"

export function convertTreeData(tree) {
  if (Array.isArray(tree)) {
    const processedTree = processTreeItem(tree);
    if (processedTree.length === 1) {
      return processedTree[0];
    } else {
      return {
        id: "0",
        label: "根节点",
        type: "node-start",
        children: processedTree,
      };
    }
  } else {
    return {
      ...tree,
      children: processTreeItem(tree.children),
    };
  }
}

function processTreeItem(tree) {
  if (!tree || !Array.isArray(tree) || !tree.length) {
    return [];
  }
  return tree.map((it) => {
    return convertNode(it);
  });
}

function convertNode(node) {
  return {
    topographyBusiness: node,
    id: String(node.id),
    label: node.label || getNodeLabel(node),
    type: node.type || getNodeType(node),
    children: processTreeItem(node.children || []),
  };
}

function getNodeLabel(node) {
  if (node.businessId && node.businessName) {
    return node.businessName;
  }
  return "未挂载设备";
}

function getNodeType(node) {
  if (node.businessId && node.businessName) {
    return getNodeDeviceType(node.businessTableName);
  }
  return "node-empty";
}

function getNodeDeviceType(tableName) {
  switch (tableName) {
    case DeviceTopographyTables.HUB:
      return "node-hub";
    case DeviceTopographyTables.NET:
      return "node-net";
    case DeviceTopographyTables.COLLECTOR:
      return "node-collector";
    case DeviceTopographyTables.EBOX:
      return "node-electricity-box";
    case DeviceTopographyTables.SENSOR:
      return "node-sensor";
    case DeviceTopographyTables.SWITCH:
      return "node-switch";
    case DeviceTopographyTables.SCANNER:
      return "node-scanner";
    case DeviceTopographyTables.READER:
      return "node-reader";
    default:
      return;
  }
}
