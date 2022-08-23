import G6 from "@antv/g6";
const nodeStyle = {
  stroke: "#E4BF11",
  fill: "#f0fEfA",
  textColor: "#605d6c",
  fontSize: 6,
  paddingHorizontal: 10,
  paddingVertical: 4,
  radius: 2,
  lineWidth: 1,
  selectedLineWidth: 3,
  icon:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA41JREFUeF7tnMFtGzEQRcmT5QpsJBepiFzdgnNx6pAqkeqIL0kLuboI+RLDriDKicEK2UBWdteGIPIT/M9nS7Mz/+/n/CE0MfBnXYFonT3JBwhgTgIIAAHMK2CePgoAAcwrYJ4+CgABzCtgnj4KAAHMK2CePgoAAcwrYJ4+CgABzCtgnj4KAAHMK2CePgoAAcwrYJ4+CgABzCtgnj4KAAHMK2CePgoAATwr8Hu7+pZi+tRlH1N8uFisPztWwlIBdttlGgJ7ttjY1cMu4d3j6mtI6W7wbY/xfjZff3FSAjsC/Noun2MIV0MgpxBeLhebawjQcAXG5L9P2e0YsFMACPD67YYAR2qHAjQs/11qKAAKMGgB6QEaf/P79FAAFAAFOOAATSBNoIn2/02TI4AjgCOAI2Bc9ZgDNH4icARwBHAEcARwBPQVwAZiAxs/9I/SowegB6AHoAegB6AHGOEAc4DGWwJ6AHoAegB6AHoAegB6gH0FGAQxCGq862MQNAkwCoACoACHFWAO0DgfmAMwB2AOwByAOQBzAOYAzAGGOEATmKkJ/LeTJ4UPmUK08bUxPJXcWVRkDvBW590GcufPooQaZSfA5E6e89esrW8ssLMoOwGmdvK0hdb5symxsyg7AXaPy5+Bc/80dsTwNJtvPp724fd9KjsB9s1fSLfvexz+67ACMcTvuRdYZidAlxBN4GnEbqIJ7FPvmsGU0s3Yjr7TStTep7pzP8b4o9TCyiIKUBNMb6lRibeupnpAgCM0IEBN9MzwLCgA18FcB3MdzHUw18FcB3MdzHUwvwv4jwO4gAydd01fiQvABeACcAG4AFwALgAXgAvABeACaurQSzwLLgAXgAvABeACcAG4AFwALgAXgAso0XnXFAMXgAvABeACcAG4AFwALgAXgAvABdTUoZd4FlwALgAXgAvABeACcAG4AFwALgAXUKLzrinG5M6iAjt5aqpF9yx2+wGmdhaV2MkDASqowNgswO1nYZYK0POv31m0L0LBnTwV8P/VI9gdAbUBoH4eCKBGQBwfAogBUIeHAGoExPEhgBgAdXgIoEZAHB8CiAFQh4cAagTE8SGAGAB1eAigRkAcHwKIAVCHhwBqBMTxIYAYAHV4CKBGQBwfAogBUIeHAGoExPEhgBgAdXgIoEZAHB8CiAFQh4cAagTE8SGAGAB1eAigRkAcHwKIAVCHhwBqBMTx/wAOVWiQa//dcwAAAABJRU5ErkJggg==",
};

export const NODE_EMPTY = "node-empty";

export function getEmptyNodeSize(label) {
  const size = G6.Util.getTextSize(label, nodeStyle.fontSize);
  const height = parseInt(size[1]) + nodeStyle.paddingVertical * 2;
  const iconSize = height;
  const width = parseInt(size[0]) + nodeStyle.paddingHorizontal * 2 + iconSize;
  return [width, height];
}

G6.registerNode(NODE_EMPTY, {
  /**
   * 绘制节点，包含文本
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 图形分组，节点中的图形对象的容器
   * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
   */
  draw(cfg, group) {
    const mainId = cfg.id;
    const label = "未挂载设备";
    const [width, height] = getEmptyNodeSize(label);
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
    group.addShape("text", {
      // attrs: style
      attrs: {
        x: iconSize / 2, // 靠右
        y: 0,
        textAlign: "center",
        textBaseline: "middle",
        text: label,
        fill: nodeStyle.textColor,
        fontSize: nodeStyle.fontSize,
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: "text-shape",
    });
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
