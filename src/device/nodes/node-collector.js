import G6 from "@antv/g6";
const nodeStyle = {
  stroke: "#4e7eff",
  fill: "#ebf1ff",
  textColor: "#121212",
  fontSize: 8,
  paddingHorizontal: 20,
  paddingVertical: 4,
  radius: 2,
  lineWidth: 1,
  selectedLineWidth: 3,
  icon:
    "data:image/png;base64,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",
};

export const NODE_COLLECTOR = "node-collector";

export function getCollectorNodeSize(label) {
  const size = G6.Util.getTextSize(label, nodeStyle.fontSize);
  const height = parseInt(size[1]) + nodeStyle.paddingVertical * 2;
  const iconSize = height;
  const width = parseInt(size[0]) + nodeStyle.paddingHorizontal * 2 + iconSize;
  return [width, height];
}

G6.registerNode(NODE_COLLECTOR, {
  /**
   * 绘制节点，包含文本
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 图形分组，节点中的图形对象的容器
   * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
   */
  draw(cfg, group) {
    const mainId = cfg.id;
    const [width, height] = getCollectorNodeSize(cfg.label);
    const offsetX = -width / 2;
    const offsetY = -height / 2;
    const iconSize = height;
    const keyShape = group.addShape("rect", {
      attrs: {
        id: `keyshape-${mainId}`,
        x: offsetX,
        y: offsetY,
        width: width,
        height: height,
        stroke: nodeStyle.stroke,
        fill: "#fff", //此处必须有fill 不然不能触发事件
        radius: nodeStyle.radius,
        lineWidth: nodeStyle.lineWidth,
      },
    });
    group.addShape("rect", {
      attrs: {
        id: `colored-${mainId}`,
        x: offsetX,
        y: offsetY,
        width: iconSize,
        height: iconSize,
        stroke: nodeStyle.stroke,
        fill: nodeStyle.fill, //此处必须有fill 不然不能触发事件
        radius: [nodeStyle.radius, 0, 0, nodeStyle.radius],
      },
    });

    group.addShape("image", {
      // attrs: style
      attrs: {
        x: offsetX,
        y: offsetY - iconSize + height + 1,
        width: iconSize,
        height: iconSize - 2,
        img: nodeStyle.icon,
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: "icon-shape",
    });
    if (cfg.label) {
      // 如果有文本
      // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
      // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
      // style.text = cfg.label;
      const label = group.addShape("text", {
        // attrs: style
        attrs: {
          x: iconSize / 2, // 靠右
          y: 0,
          textAlign: "center",
          textBaseline: "middle",
          text: cfg.label,
          fill: nodeStyle.textColor,
          fontSize: nodeStyle.fontSize,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: "text-shape",
      });
    }
    return keyShape;
  },
  // /**
  //  * 绘制后的附加操作，默认没有任何操作
  //  * @param  {Object} cfg 节点的配置项
  //  * @param  {G.Group} group 图形分组，节点中的图形对象的容器
  //  */
  // afterDraw(cfg, group) { },
  // /**
  //  * 更新节点，包含文本
  //  * @override
  //  * @param  {Object} cfg 节点的配置项
  //  * @param  {Node} node 节点
  //  */
  // update(cfg, node) { },
  // /**
  //  * 更新节点后的操作，一般同 afterDraw 配合使用
  //  * @override
  //  * @param  {Object} cfg 节点的配置项
  //  * @param  {Node} node 节点
  //  */
  // afterUpdate(cfg, node) { },
  /**
   * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
   * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
   * @param  {String} name 状态名称
   * @param  {Object} value 状态值
   * @param  {Node} node 节点
   */
  setState(name, value, node) {
    const group = node.getContainer();
    const shape = group.get("children")[0]; // 顺序根据 draw 时确定
    if (name === "selected") {
      if (value) {
        shape.attr("lineWidth", nodeStyle.selectedLineWidth);
        shape.attr("shadowColor", nodeStyle.stroke);
        shape.attr("shadowBlur", 6);
      } else {
        shape.attr("lineWidth", nodeStyle.lineWidth);
        shape.attr("shadowColor", null);
        shape.attr("shadowBlur", 0);
      }
    }
  },
  // /**
  //  * 获取锚点（相关边的连入点）
  //  * @param  {Object} cfg 节点的配置项
  //  * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
  //  */
  // getAnchorPoints(cfg) { },
});
