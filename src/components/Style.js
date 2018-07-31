import React from "react";
import _ from "lodash";

String.prototype.replaceAll = function(search, replacement) {
  let target = this;
  return target.split(search).join(replacement);
};

String.prototype.insertBefore = function(strToFind, strToInsert) {
  let target = this;
  let n = target.lastIndexOf(strToFind);
  if (n < 0) return target;
  return target.substring(0, n) + strToInsert + target.substring(n);
};

String.prototype.replaceSelector = function(selStr, typeStr, colStr, zStr) {
  let target = this;
  return target
    .replaceAll("var(--selector)", selStr)
    .replaceAll("var(--typename)", typeStr)
    .replaceAll("var(--nodecolor)", colStr)
    .replaceAll("var(--zindex)", zStr);
};

String.prototype.isHexColor = function() {
  let target = this;
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(target);
};

Number.prototype.isHexColor = function() {
  let target = this;
  return target.toString().isHexColor();
};

String.prototype.isNumber = function() {
  let target = this;
  return !isNaN(parseInt(target));
};

Number.prototype.isNumber = function() {
  return true;
};

Array.prototype.curbIndex = function(index) {
  let target = this;
  return index < target.length ? target[index] : target[target.length - 1];
};

Array.prototype.caseIndexOf = function(query) {
  let target = this;
  return target.findIndex(item => query.toLowerCase() === item.toLowerCase());
};

Array.prototype.containsAny = function(query) {
  let target = this;
  return query.some(function(v) {
    return target.caseIndexOf(v) >= 0;
  });
};

Array.prototype.containsType = function(query) {
  let target = this;
  return target.some(oride => oride.subtype.caseIndexOf(query) > -1);
};

Array.prototype.returnByType = function(query) {
  let target = this;
  return target.find(or => {
    return or.subtype.caseIndexOf(query) > -1;
  });
};

Array.prototype.substractArray = function(query) {
  let target = this;
  return target.filter(elem => {
    return query.indexOf(elem) < 0;
  });
};

Array.prototype.unique = function() {
  let target = this;
  return target.filter(function(x, i) {
    return target.indexOf(x) === i;
  });
};

class Style extends React.Component {
  static parseStyles(allNodes, colorList, styleList, data) {
    //

    //
    let typ = allNodes.map(a => a.data("type")).unique();
    let nodeType = {};
    typ.forEach(
      tp =>
        (nodeType[tp] = allNodes
          .map(a => {
            let subtype = a.nodes(`[type = "${tp}"]`).data("role");
            return subtype !== undefined ? subtype : tp;
          })
          .unique())
    );

    let colSchm = colorList[styleList.colorScheme];
    let typeAr = Object.keys(nodeType);

    let subAr = {
      type: _.flatMap(nodeType, (val, key) => {
        return _.map(val, v => {
          return key;
        });
      }),
      subtype: _.flatMap(nodeType)
    };

    let colNum = {
      type: _.map(colSchm.node, (val, index) => {
        return index;
      }),
      subtype: _.map(colSchm.node, val => {
        return _.map(val, (v, ind) => {
          return ind;
        });
      })
    };

    let colNumOride = {
      // arrays of types and subtypes indicies that have been override
      type: [],
      subtype: colSchm.node.slice().fill([])
    };

    let nodeStyles = {
      type: [],
      subtype: []
    };

    // copy all existing node styling override for Types into nodeStyles.type,
    // fill colNumOride with type indices that have been override
    styleList.nodeOverride.forEach(oride => {
      if (oride.subtype.containsAny(typeAr)) {
        nodeStyles.type[nodeStyles.type.length] = oride;
        if (oride.color.isNumber()) {
          nodeStyles.type[nodeStyles.type.length - 1].color = parseInt(
            oride.color
          );
          colNumOride.type[colNumOride.type.length] = oride.color;
        }
      }
    });

    // assign new node styling override into nodeStyles.type for remaining types,
    // and reassigns index for faulty "color" fields (empty, not a number/valid hexvalue)
    typeAr.forEach((key, index) => {
      let typeOride = nodeStyles.type.returnByType(key);
      let availColNum = colNum.type.substractArray(colNumOride.type);

      if (typeOride) {
        if (
          (!typeOride.color.isHexColor() && !typeOride.color.isNumber()) ||
          (typeOride.color.isNumber() && typeOride.color >= colNum.type.length)
        ) {
          nodeStyles.type.returnByType(key).color =
            availColNum.length > 0 ? availColNum[0] : colNum.type[0];
          colNumOride.type[colNumOride.type.length] = availColNum[0];
        }
      }

      if (!typeOride) {
        nodeStyles.type[nodeStyles.type.length] = {
          label: key,
          subtype: [key],
          color: availColNum.length > 0 ? availColNum[0] : colNum.type[0]
        };
        colNumOride.type[colNumOride.type.length] = availColNum[0];
      }
    });

    // allow for quick lookup of what the assigned color is for the type containing a subtype
    function getTypeBySub(subtype) {
      return nodeStyles.type.returnByType(
        subAr.type[subAr.subtype.caseIndexOf(subtype)]
      );
    }

    // copy all existing node styling override for subtypes into nodeStyles.subtype,
    // fill corresponding subtypeArrays in colNumOride with subtype indices that have been override
    styleList.nodeOverride.forEach(oride => {
      if (
        oride.subtype.containsAny(subAr.subtype) &&
        !oride.subtype.containsAny(typeAr)
      ) {
        nodeStyles.subtype[nodeStyles.subtype.length] = oride;
        if (
          oride.color.isNumber() &&
          getTypeBySub(oride.subtype[0]).color.isNumber()
        ) {
          nodeStyles.subtype[nodeStyles.subtype.length - 1].color = parseInt(
            oride.color
          );
          colNumOride.subtype[getTypeBySub(oride.subtype[0]).color][
            colNumOride.subtype.length
          ] =
            oride.color;
        }
      }
    });

    // assign new node styling override into nodeStyles.subtype for remaining subtypes,
    // and reassigns index for faulty "color" fields (empty, not a number/valid hexvalue)
    subAr.subtype.forEach((subName, index) => {
      let availColNum = [];
      let typeOfSub = getTypeBySub(subName);
      let typeColOfSub = typeOfSub.color;
      let typeOride = nodeStyles.subtype.returnByType(subName);
      if (typeColOfSub.isNumber()) {
        availColNum = colNum.subtype[typeColOfSub].substractArray(
          colNumOride.subtype[typeColOfSub]
        );
      }

      if (!typeOride) {
        nodeStyles.subtype[nodeStyles.subtype.length] = {
          label: subName,
          subtype: [subName],
          color: availColNum
            ? availColNum.length > 0
              ? availColNum[0]
              : colNum.subtype[typeColOfSub][0]
            : typeColOfSub,
          shape: typeOfSub.shape ? typeOfSub.shape : "circle"
        };

        if (typeAr.caseIndexOf(subName) > -1) {
          nodeStyles.subtype[
            nodeStyles.subtype.length - 1
          ].color = typeOfSub.color.isHexColor()
            ? typeOfSub.color
            : colNum.subtype[typeColOfSub][0];
        }

        if (availColNum) {
          colNumOride.subtype[typeColOfSub][
            colNumOride.subtype[typeColOfSub].length
          ] =
            availColNum[0];
        }
      }

      if (typeOride) {
        if (availColNum) {
          if (
            (!typeOride.color.isHexColor() && !typeOride.color.isNumber()) ||
            (typeOride.color.isNumber() &&
              typeOride.color >= colNum.subtype[typeColOfSub].length)
          ) {
            nodeStyles.subtype.returnByType(subName).color =
              availColNum.length > 0
                ? availColNum[0]
                : colNum.subtype[typeColOfSub][0];
            colNumOride.subtype[typeColOfSub][
              colNumOride.subtype[typeColOfSub].length
            ] =
              availColNum[0];
          }
        } else if (!typeOride.color.isHexColor()) {
          nodeStyles.subtype.returnByType(subName).color = typeColOfSub;
        }
        nodeStyles.subtype.returnByType(subName).shape = typeOfSub.shape
          ? typeOfSub.shape
          : "circle";
      }

      nodeStyles.subtype.returnByType(subName).type = typeOfSub.label;
    });

    let cssColors = {
      fg: styleList.fg.isHexColor() ? styleList.fg : colSchm.fg,
      bg: styleList.bg.isHexColor() ? styleList.bg : colSchm.bg,
      hl: styleList.hl.isHexColor() ? styleList.hl : colSchm.hl,
      ll: styleList.ll.isHexColor() ? styleList.ll : colSchm.ll
    };

    // Styles Css
    Object.keys(cssColors).forEach(value => {
      if (cssColors[value].constructor !== Array) {
        document.documentElement.style.setProperty(
          "--" + value.replaceAll(".", "-"),
          cssColors[value]
        );
        data = data.replaceAll(
          "var(--" + value.replaceAll(".", "-") + ")",
          cssColors[value]
        );
      }
    });
    //

    let typeString = data
      .split("/*type")
      .pop()
      .split("type*/")
      .shift();
    let ringString = data
      .split("/*ring")
      .pop()
      .split("ring*/")
      .shift();
    let beforeStr = "/*ring";
    let styleString = "";
    //Assign default styling for all nodes of a certain type
    nodeStyles.type.forEach(style => {
      let styleString =
        style.shape === "ring" ? typeString + ringString : typeString;
      style.subtype.forEach(subName => {
        let nodeColor = style.color.isNumber()
          ? colSchm.node[style.color][0]
          : style.color;
        data = data.insertBefore(
          beforeStr,
          styleString.replaceSelector(
            "type",
            subName,
            nodeColor,
            typeAr.caseIndexOf(subName) + 1
          )
        );
      });
    });

    //Assign further styling override for nodes of certain role(subtype)
    nodeStyles.subtype.forEach(style => {
      let styleString =
        style.shape === "ring" ? typeString + ringString : typeString;
      style.subtype.forEach(subName => {
        let typeStyle = getTypeBySub(subName);
        let nodeColor =
          typeStyle.color.isNumber() && style.color.isNumber()
            ? colSchm.node[typeStyle.color][style.color]
            : style.color.isHexColor()
              ? style.color
              : typeStyle.color;
        data = data.insertBefore(
          beforeStr,
          styleString.replaceSelector(
            "role",
            subName,
            nodeColor,
            typeAr.caseIndexOf(
              typeStyle.subtype[typeStyle.subtype.length - 1]
            ) + 1
          )
        );
      });
    });

    this.nodeStyles = nodeStyles;

    return {
      stylesheet: data,
      nodeStyles: nodeStyles
    };
  }

  static sortBySubType(a, b) {
    let subStyles = this.nodeStyles.subtype;
    let typeStyles = this.nodeStyles.type;
    let typeAr = _.map(typeStyles, typ => typ.label);
    let subAr = _.map(subStyles, typ => typ.label);
    let atype = a.data("type")
      ? _.find(typeStyles, typ => typ.subtype.caseIndexOf(a.data("type")) > -1)
      : undefined;
    let btype = b.data("type")
      ? _.find(typeStyles, typ => typ.subtype.caseIndexOf(b.data("type")) > -1)
      : undefined;
    let aStyle = a.data("role")
      ? _.find(subStyles, typ => typ.subtype.caseIndexOf(a.data("role")) > -1)
      : undefined;
    let bStyle = b.data("role")
      ? _.find(subStyles, typ => typ.subtype.caseIndexOf(b.data("role")) > -1)
      : undefined;

    //to maintain ordering per type > per subtype, for nodes of type=key, assign mock types
    if (aStyle && bStyle && a.data("type") === "key") {
      atype =
        typeAr.caseIndexOf(aStyle.type) > -1
          ? _.find(typeStyles, typ => typ.label === aStyle.type)
          : atype;
      btype =
        typeAr.caseIndexOf(bStyle.type) > -1
          ? _.find(typeStyles, typ => typ.label === bStyle.type)
          : btype;
    }

    // objects with no role properties (Key Label, Bbox) placed first
    if (!atype || !btype) {
      return -1;
    } else {
      let orderA = 0;
      let orderB = 0;
      if (!aStyle || !bStyle || atype !== btype) {
        orderA = atype.color.isHexColor()
          ? typeAr.caseIndexOf(atype.label) + 10
          : atype.color;
        orderB = atype.color.isHexColor()
          ? typeAr.caseIndexOf(btype.label) + 10
          : btype.color;
      } else {
        orderA = aStyle.color.isHexColor()
          ? subAr.caseIndexOf(aStyle.label) + 10
          : aStyle.color;
        orderB = bStyle.color.isHexColor()
          ? subAr.caseIndexOf(bStyle.label) + 10
          : bStyle.color;
      }
      return orderA - orderB;
    }
  }
}
export default Style;
