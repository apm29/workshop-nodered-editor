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

export const NODE_SENSOR = "node-sensor";

export function getSensorNodeSize(label) {
  const size = G6.Util.getTextSize(label, nodeStyle.fontSize);
  const height = parseInt(size[1]) + nodeStyle.paddingVertical * 2;
  const iconSize = height;
  const width = parseInt(size[0]) + nodeStyle.paddingHorizontal * 2 + iconSize;
  return [width, height];
}

G6.registerNode(NODE_SENSOR, {
  /**
   * 绘制节点，包含文本
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 图形分组，节点中的图形对象的容器
   * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
   */
  draw(cfg, group) {
    const mainId = cfg.id;
    const [width, height] = getSensorNodeSize(cfg.label);
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
