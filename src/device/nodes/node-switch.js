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

export const NODE_SWITCH = "node-switch";

export function getSwitchNodeSize(label) {
  const size = G6.Util.getTextSize(label, nodeStyle.fontSize);
  const height = parseInt(size[1]) + nodeStyle.paddingVertical * 2;
  const iconSize = height;
  const width = parseInt(size[0]) + nodeStyle.paddingHorizontal * 2 + iconSize;
  return [width, height];
}

G6.registerNode(NODE_SWITCH, {
  /**
   * 绘制节点，包含文本
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 图形分组，节点中的图形对象的容器
   * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
   */
  draw(cfg, group) {
    const mainId = cfg.id;
    const [width, height] = getSwitchNodeSize(cfg.label);
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
