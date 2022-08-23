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

export const NODE_ELECTRICITY_BOX = "node-electricity-box";

export function getElectricityBoxNodeSize(label) {
  const size = G6.Util.getTextSize(label, nodeStyle.fontSize);
  const height = parseInt(size[1]) + nodeStyle.paddingVertical * 2;
  const iconSize = height;
  const width = parseInt(size[0]) + nodeStyle.paddingHorizontal * 2 + iconSize;
  return [width, height];
}

G6.registerNode(NODE_ELECTRICITY_BOX, {
  /**
   * 绘制节点，包含文本
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 图形分组，节点中的图形对象的容器
   * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
   */
  draw(cfg, group) {
    const mainId = cfg.id;
    const [width, height] = getElectricityBoxNodeSize(cfg.label);
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
