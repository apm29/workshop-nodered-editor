export function convertVueNodeToNodeRedJson(cells) {
  if (!cells) {
    throw Error("错误的x6数据");
  }
  console.log(cells);
  const nodes = cells
    .filter((it) => !["dag-edge", "edge"].includes(it.shape))
    .map((it) => ({
      ...it.data,
      id: it.id,
      x: it.position.x,
      y: it.position.y,
      wires: [],
    }));
  const wires = cells.filter((it) => ["dag-edge", "edge"].includes(it.shape));
  nodes.forEach((node) => {
    const wiresArr = wires
      .filter((wire) => wire.source.cell === node.id)
      .reduce((arr, item) => {
        const index =
          parseInt(
            item.source.port.substring(item.source.port.lastIndexOf("-") + 1)
          ) - 1;
        if (!arr[index]) {
          arr[index] = [];
        }
        arr[index].push(item.target.cell);
        return arr;
      }, []);
    node.wires = wiresArr.filter((it) => it && it.every((c) => c));
  });
  console.log(nodes);
  return nodes;
}

export function convertNodeRedJsonToVueNode(noderedJson) {
  if (!noderedJson || !Array.isArray(noderedJson)) {
    throw Error("错误的 node-red json数据");
  }
  return {
    //节点
    nodes: (noderedJson || []).map((node) => ({
      x: node.x || 0,
      y: node.y || 0,
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
              port: `${target}-port-in-${index + 1}`,
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
