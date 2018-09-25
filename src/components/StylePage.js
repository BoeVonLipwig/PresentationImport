import colorList from "../assets/colors.json";

class StylePage {
  static parseStyles() {
    let colSchm = colorList[0]; // an object from colors.json
    let cssColors = {
      fg: colSchm.fg,
      bg: colSchm.bg,
      hl: colSchm.hl,
      ll: colSchm.ll
    };
    Object.keys(cssColors).forEach(value => {
      if (cssColors[value].constructor !== Array) {
        document.documentElement.style.setProperty(
          "--" + value,
          cssColors[value]
        );
      }
    });
  }
}

export default StylePage;
