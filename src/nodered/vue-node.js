export function convertVueNodeToNodeRedJson(cells) {
  if (!cells) {
    throw Error("错误的x6数据");
  }
  const nodes = cells
    .filter((it) => !["dag-edge", "edge"].includes(it.shape))
    .map((it) => ({
      ...it.data,
      id: it.id,
      x: parseFloat(it.position.x),
      y: parseFloat(it.position.y),
      wires: [],
    }));
  const wires = cells.filter((it) => ["dag-edge", "edge"].includes(it.shape));
  nodes.forEach((node) => {
    const wiresArr = getNodeRedWiresFromX6Edges(wires
      .filter((wire) => wire.source.cell === node.id))
    node.wires = wiresArr.filter((it) => it && it.every((c) => c));
  });
  return nodes;
}

export function getNodeRedWiresFromX6Edges(edges) {
  return edges.reduce((arr, item) => {
    const index =
      parseInt(
        item.source.port.substring(item.source.port.lastIndexOf("-") + 1)
      ) - 1;
    if (!arr[index]) {
      arr[index] = [];
    }
    arr[index].push(item.target.cell);
    return arr;
  }, [])
}

export function convertNodeRedJsonToVueNode(noderedJson) {
  if (!noderedJson || !Array.isArray(noderedJson)) {
    throw Error("错误的 node-red json数据");
  }
  return {
    //节点
    nodes: (noderedJson || []).map((node) => ({
      x: parseFloat(node.x) || 0,
      y: parseFloat(node.y) || 0,
      id: node.id,
      shape: node.type,
      data: node,
    })),
    //边
    edges: (noderedJson || []).flatMap((node) => {
      return (node.wires || [])
        .filter((it) => it && it.every((c) => c))
        .flatMap((targets, index) => {
          return (targets || []).map((target) => ({
            shape: "dag-edge",
            target: {
              cell: `${target}`,
              //这里默认所有节点的in只有一个
              port: `${target}-port-in-1`,
            },
            source: {
              cell: `${node.id}`,
              port: `${node.id}-port-out-${index + 1}`,
            },
            attrs: {
              line: {
                stroke: "#525153",
                strokeWidth: 1,
                targetMarker: {
                  name: "classic",
                  size: 5,
                },
              },
            },
            zIndex: 0,
          }));
        });
    }),
  };
}
