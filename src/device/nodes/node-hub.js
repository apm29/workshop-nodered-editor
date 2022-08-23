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

export const NODE_HUB = "node-hub";

export function getHubNodeSize(label) {
  const size = G6.Util.getTextSize(label, nodeStyle.fontSize);
  const height = parseInt(size[1]) + nodeStyle.paddingVertical * 2;
  const iconSize = height;
  const width = parseInt(size[0]) + nodeStyle.paddingHorizontal * 2 + iconSize;
  return [width, height];
}

G6.registerNode(NODE_HUB, {
  /**
   * 绘制节点，包含文本
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 图形分组，节点中的图形对象的容器
   * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
   */
  draw(cfg, group) {
    const mainId = cfg.id;
    const [width, height] = getHubNodeSize(cfg.label);
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
