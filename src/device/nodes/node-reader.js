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
  icon: "data:image/png;base64,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",
};

export const NODE_READER = "node-reader";

export function getReaderNodeSize(label) {
  const size = G6.Util.getTextSize(label, nodeStyle.fontSize);
  const height = parseInt(size[1]) + nodeStyle.paddingVertical * 2;
  const iconSize = height;
  const width = parseInt(size[0]) + nodeStyle.paddingHorizontal * 2 + iconSize;
  return [width, height];
}

G6.registerNode(NODE_READER, {
  /**
   * ???????????????????????????
   * @param  {Object} cfg ??????????????????
   * @param  {G.Group} group ????????????????????????????????????????????????
   * @return {G.Shape} ???????????????????????? node.get('keyShape') ???????????????
   */
  draw(cfg, group) {
    const mainId = cfg.id;
    const [width, height] = getReaderNodeSize(cfg.label);
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
        fill: "#fff", //???????????????fill ????????????????????????
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
        fill: nodeStyle.fill, //???????????????fill ????????????????????????
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
      // ???????????????
      // ??????????????????????????????????????????????????? labeCfg ??????
      // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
      // style.text = cfg.label;
      const label = group.addShape("text", {
        // attrs: style
        attrs: {
          x: iconSize / 2, // ??????
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
  //  * ???????????????????????????????????????????????????
  //  * @param  {Object} cfg ??????????????????
  //  * @param  {G.Group} group ????????????????????????????????????????????????
  //  */
  // afterDraw(cfg, group) { },
  // /**
  //  * ???????????????????????????
  //  * @override
  //  * @param  {Object} cfg ??????????????????
  //  * @param  {Node} node ??????
  //  */
  // update(cfg, node) { },
  // /**
  //  * ???????????????????????????????????? afterDraw ????????????
  //  * @override
  //  * @param  {Object} cfg ??????????????????
  //  * @param  {Node} node ??????
  //  */
  // afterUpdate(cfg, node) { },
  /**
   * ?????????????????????????????????????????????????????????????????? draw ???????????????
   * ??????????????????????????? selected???active ???????????????????????????????????????????????????????????????
   * @param  {String} name ????????????
   * @param  {Object} value ?????????
   * @param  {Node} node ??????
   */
  setState(name, value, node) {
    const group = node.getContainer();
    const shape = group.get("children")[0]; // ???????????? draw ?????????
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
  //  * ???????????????????????????????????????
  //  * @param  {Object} cfg ??????????????????
  //  * @return {Array|null} ??????????????????????????????????????????,????????? null??????????????????
  //  */
  // getAnchorPoints(cfg) { },
});
