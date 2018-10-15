import _ from "lodash";

function replaceAll(target, search, replacement) {
  if (!_.isString(target)) return target;
  return target.split(search).join(replacement);
}

function replaceSelector(target, selStr, typeStr, colStr, zStr) {
  target.forEach(style => {
    style.selector = replaceAll(
      replaceAll(style.selector, "var(--selector)", selStr),
      "var(--typename)",
      typeStr
    );
    Object.keys(style.style).forEach(key => {
      style.style[key] = replaceAll(
        replaceAll(style.style[key], "var(--nodecolor)", colStr),
        "var(--zindex)",
        zStr
      );
    });
  });
  return target;
}

function replaceColours(target, cssColors) {
  Object.keys(cssColors).forEach(value => {
    if (cssColors[value].constructor !== Array) {
      target = replaceAll(target, "var(--" + value + ")", cssColors[value]);
    }
  });
  return target;
}

function isHexColor(target) {
  if (typeof target === "string") {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(target);
  }
  if (typeof target === "number") {
    return isHexColor(target.toString());
  }
  return false;
}

function isNumber(target) {
  if (typeof target === "number") return true;
  if (typeof target === "string") return !isNaN(parseInt(target, 10));
  return false;
}

function caseIndexOf(target, query) {
  return target.findIndex(item => query.toLowerCase() === item.toLowerCase());
}

function containsAny(target, query) {
  return query.some(function(v) {
    return caseIndexOf(target, v) >= 0;
  });
}

function returnByType(target, query) {
  return target.find(or => {
    return caseIndexOf(or.subtype, query) > -1;
  });
}

function substractArray(target, query) {
  return target.filter(elem => {
    return query.indexOf(elem) < 0;
  });
}

function unique(array) {
  return array.filter((x, i) => {
    return array.indexOf(x) === i;
  });
}

class StyleCytoscape {
  static parseStyles(allNodes, colorList, styleList, styleJson) {
    // Creates an object that maps types to subtypes based on roles. If
    // no role exists, then the subtype is the type. Eg. Project -> Project.
    let typ = unique(allNodes.map(a => a.data("type")));
    let nodeType = {};
    typ.forEach(
      tp =>
        (nodeType[tp] = unique(
          allNodes.map(a => {
            let subtype = a.nodes(`[type = "${tp}"]`).data("role");
            return subtype !== undefined ? subtype : tp;
          })
        ))
    );

    let colSchm = colorList[styleList.colorScheme]; // an object from colors.json
    let typeAr = Object.keys(nodeType); // person, school and project

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

    //colNum, colNumOride, and nodeStyles all have the same form going from all information to no information

    // copy all existing node styling override for Types into nodeStyles.type,
    // fill colNumOride with type indices that have been override
    styleList.nodeOverride.forEach(oride => {
      if (containsAny(oride.subtype, typeAr)) {
        nodeStyles.type[nodeStyles.type.length] = oride;
        if (isNumber(oride.color)) {
          nodeStyles.type[nodeStyles.type.length - 1].color = parseInt(
            oride.color,
            10
          );
          colNumOride.type[colNumOride.type.length] = oride.color;
        }
      }
    });

    // nodeStlyes.type will now be filled where the oride.subtype is in typeAr. So person, school, project

    // assign new node styling override into nodeStyles.type for remaining types,
    // and reassigns index for faulty "color" fields (empty, not a number/valid hexvalue)
    typeAr.forEach((key, index) => {
      let typeOride = returnByType(nodeStyles.type, key);
      let availColNum = substractArray(colNum.type, colNumOride.type);

      if (typeOride) {
        if (
          (!isHexColor(typeOride.color) && !isNumber(typeOride.color)) ||
          (isNumber(typeOride.color) && typeOride.color >= colNum.type.length)
        ) {
          returnByType(nodeStyles.type, key).color =
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
      return returnByType(
        nodeStyles.type,
        subAr.type[caseIndexOf(subAr.subtype, subtype)]
      );
    }

    // copy all existing node styling override for subtypes into nodeStyles.subtype,
    // fill corresponding subtypeArrays in colNumOride with subtype indices that have been override
    styleList.nodeOverride.forEach(oride => {
      if (
        containsAny(oride.subtype, subAr.subtype) &&
        !containsAny(oride.subtype, typeAr)
      ) {
        nodeStyles.subtype[nodeStyles.subtype.length] = oride;
        if (
          isNumber(oride.color) &&
          isNumber(getTypeBySub(oride.subtype[0]).color)
        ) {
          nodeStyles.subtype[nodeStyles.subtype.length - 1].color = parseInt(
            oride.color,
            10
          );
          colNumOride.subtype[getTypeBySub(oride.subtype[0]).color][
            colNumOride.subtype.length
          ] = oride.color;
        }
      }
    });

    // exactly the same for original data and new data

    // assign new node styling override into nodeStyles.subtype for remaining subtypes,
    // and reassigns index for faulty "color" fields (empty, not a number/valid hexvalue)
    subAr.subtype.forEach((subName, index) => {
      let availColNum = [];
      let typeOfSub = getTypeBySub(subName);
      let typeColOfSub = typeOfSub.color;
      let typeOride = returnByType(nodeStyles.subtype, subName);
      if (isNumber(typeColOfSub)) {
        availColNum = substractArray(
          colNum.subtype[typeColOfSub],
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

        if (caseIndexOf(typeAr, subName) > -1) {
          nodeStyles.subtype[nodeStyles.subtype.length - 1].color = isHexColor(
            typeOfSub.color
          )
            ? typeOfSub.color
            : colNum.subtype[typeColOfSub][0];
        }

        if (availColNum) {
          colNumOride.subtype[typeColOfSub][
            colNumOride.subtype[typeColOfSub].length
          ] = availColNum[0];
        }
      }

      if (typeOride) {
        if (availColNum) {
          if (
            (!isHexColor(typeOride.color) && !isNumber(typeOride.color)) ||
            (isNumber(typeOride.color) &&
              typeOride.color >= colNum.subtype[typeColOfSub].length)
          ) {
            returnByType(nodeStyles.subtype, subName).color =
              availColNum.length > 0
                ? availColNum[0]
                : colNum.subtype[typeColOfSub][0];
            colNumOride.subtype[typeColOfSub][
              colNumOride.subtype[typeColOfSub].length
            ] = availColNum[0];
          }
        } else if (!isHexColor(typeOride.color)) {
          returnByType(nodeStyles.subtype, subName).color = typeColOfSub;
        }
        returnByType(nodeStyles.subtype, subName).shape = typeOfSub.shape
          ? typeOfSub.shape
          : "circle";
      }

      returnByType(nodeStyles.subtype, subName).type = typeOfSub.label;
    });

    let cssColors = {
      fg: colSchm.fg,
      bg: colSchm.bg,
      hl: colSchm.hl,
      ll: colSchm.ll
    };

    let moreStyle = [];

    //Assign default styling for all nodes of a certain type
    nodeStyles.type.forEach(style => {
      style.subtype.forEach(subName => {
        let nodeStyle = JSON.parse(
          JSON.stringify(
            style.shape === "ring"
              ? styleJson.type.concat(styleJson.ring)
              : styleJson.type
          )
        );
        let nodeColor = isNumber(style.color)
          ? colSchm.node[style.color][0]
          : style.color;
        moreStyle = moreStyle.concat(
          replaceSelector(
            nodeStyle,
            "type",
            subName,
            nodeColor,
            caseIndexOf(typeAr, subName) + 1
          )
        );
      });
    });

    //Assign further styling override for nodes of certain role(subtype)
    nodeStyles.subtype.forEach(style => {
      style.subtype.forEach(subName => {
        let nodeStyle = JSON.parse(
          JSON.stringify(
            style.shape === "ring"
              ? styleJson.type.concat(styleJson.ring)
              : styleJson.type
          )
        );
        let typeStyle = getTypeBySub(subName);
        let nodeColor =
          isNumber(typeStyle.color) && isNumber(style.color)
            ? colSchm.node[typeStyle.color][style.color]
            : isHexColor(style.color)
              ? style.color
              : typeStyle.color;
        moreStyle = moreStyle.concat(
          replaceSelector(
            nodeStyle,
            "role",
            subName,
            nodeColor,
            caseIndexOf(
              typeAr,
              typeStyle.subtype[typeStyle.subtype.length - 1]
            ) + 1
          )
        );
      });
    });

    styleJson.styles.splice(5, 0, ...moreStyle);

    Object.keys(styleJson.styles).forEach(itemKey => {
      let item = styleJson.styles[itemKey];
      Object.keys(item.style).forEach(styleKey => {
        item.style[styleKey] = replaceColours(item.style[styleKey], cssColors);
      });
    });

    this.nodeStyles = nodeStyles;

    return {
      stylesheet: styleJson.styles,
      nodeStyles: nodeStyles
    };
  }

  static sortBySubType(a, b) {
    let subStyles = this.nodeStyles.subtype;
    let typeStyles = this.nodeStyles.type;
    let typeAr = _.map(typeStyles, typ => typ.label);
    let subAr = _.map(subStyles, typ => typ.label);
    let atype = a.data("type")
      ? _.find(typeStyles, typ => caseIndexOf(typ.subtype, a.data("type")) > -1)
      : undefined;
    let btype = b.data("type")
      ? _.find(typeStyles, typ => caseIndexOf(typ.subtype, b.data("type")) > -1)
      : undefined;
    let aStyle = a.data("role")
      ? _.find(subStyles, typ => caseIndexOf(typ.subtype, a.data("role")) > -1)
      : undefined;
    let bStyle = b.data("role")
      ? _.find(subStyles, typ => caseIndexOf(typ.subtype, b.data("role")) > -1)
      : undefined;

    //to maintain ordering per type > per subtype, for nodes of type=key, assign mock types
    if (aStyle && bStyle && a.data("type") === "key") {
      atype =
        caseIndexOf(typeAr, aStyle.type) > -1
          ? _.find(typeStyles, typ => typ.label === aStyle.type)
          : atype;
      btype =
        caseIndexOf(typeAr, bStyle.type) > -1
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
        orderA = isHexColor(atype.color)
          ? caseIndexOf(typeAr, atype.label) + 10
          : atype.color;
        orderB = isHexColor(atype.color)
          ? caseIndexOf(typeAr, btype.label) + 10
          : btype.color;
      } else {
        orderA = isHexColor(aStyle.color)
          ? caseIndexOf(subAr, aStyle.label) + 10
          : aStyle.color;
        orderB = isHexColor(bStyle.color)
          ? caseIndexOf(subAr, bStyle.label) + 10
          : bStyle.color;
      }
      return orderA - orderB;
    }
  }
}
export default StyleCytoscape;
