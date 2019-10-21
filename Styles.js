//import React from 'react';
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Colors
// eslint-disable-next-line
const colors = {
  White: "#FFFFFF",
  Black: "#000000",
  Black75: "#404040",
  Black50: "#808080",
  Black25: "#BFBFBF",
  Black20: "#CCCCCC",
  Black15: "#D9D9D9",
  Black10: "#E6E6E6",
  Black05: "#F2F2F2",
  Black02: "#FAFCFD",
  Black01: "#FCFCFC",
};

const styleAliases = {
  w: "width",
  rw: "width",
  h: "height",
  rh: "height",
  minW: "minWidth",
  minH: "minHeight",
  maxW: "maxWidth",
  maxH: "maxHeight",

  p: "padding,paddingTop,paddingRight,paddingBottom,paddingLeft",
  pSq: "padding,paddingTop,paddingRight,paddingBottom,paddingLeft",
  px: "paddingHorizontal,paddingLeft,paddingRight",
  py: "paddingVertical,paddingTop,paddingBottom",
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pl: "paddingLeft",

  m: "margin,marginTop,marginRight,marginBottom,marginLeft",
  mSq: "margin,marginTop,marginRight,marginBottom,marginLeft",
  mx: "marginHorizontal,marginLeft,marginRight",
  my: "marginVertical,marginTop,marginBottom",
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",
  ml: "marginLeft",

  top: "top",
  right: "right",
  bottom: "bottom",
  left: "bottom",

  rTop: "top",
  rRght: "right",
  rBottom: "bottom",
  rLeft: "bottom",

  opacity: "opacity",
  zIndex: "zIndex",

  txt: "fontSize",
  lineHeight: "lineHeight",

  border: "borderWidth,borderLeftWidth,borderRightWidth,borderTopWidth,borderBottomWidth@borderSideColor|colors",

  // border default width hairline
  borderX: "borderLeftWidth,borderRightWidth@borderSideColor|colors",
  borderY: "borderTopWidth,borderBottomWidth@borderSideColor|colors",

  borderTop: "borderTopWidth@borderSideColor|colors",
  borderRight: "borderRightWidth@borderSideColor|colors",
  borderBottom: "borderBottomWidth@borderSideColor|colors",
  borderLeft: "borderLeftWidth@borderSideColor|colors",

  borderRadius: "borderRadius,borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius",
  borderRadiusTop: "borderTopLeftRadius,borderTopRightRadius",
  borderRadiusBottom: "borderBottomLeftRadius,borderBottomRightRadius",
  borderRadiusLeft: "borderTopLeftRadius,borderBottomLeftRadius",
  borderRadiusRight: "borderTopRightRadius,borderBottomRightRadius",

  scale: "transform",

  sizeSq: "width,height",
  rSizeSq: "width,height",
};

const generateStyles = styleAliases => {
  const measures = Array.from({ length: 101 }, (_, k) => k);
  const decimals = {
    "10": 0.1,
    "25": 0.25,
    "33": 0.3333,
    "50": 0.5,
    "66": 0.6666,
    "75": 0.75,
  };
  const fontRems = {
    "1": "0.75",
    "2": "0.875",
    "3": "1",
    "4": "1.175",
    "5": "1.666",
    "6": "2",
  };

  let styles = {};

  Object.keys(styleAliases).map(baseStyle => {
    // We need to preprocess the rules to iterate and get an array of styles of the parent definition
    const [definition, decorator] = styleAliases[baseStyle].split("@");
    const rules = definition.split(",");

    const localKeys = [];
    const localStyles = {};
    if (
      [
        "w",
        "rw",
        "h",
        "rh",
        "minW",
        "minH",
        "maxW",
        "maxH",
        "p",
        "px",
        "py",
        "pt",
        "pr",
        "pr",
        "pb",
        "pl",
        "rTop",
        "rRight",
        "rBottom",
        "rLeft",
        "m",
        "mx",
        "my",
        "mt",
        "mr",
        "mr",
        "mb",
        "ml",
        "top",
        "bottom",
        "left",
        "right",
      ].includes(baseStyle)
    ) {
      measures.forEach(rMeasure => {
        const lk = `${baseStyle}${rMeasure}`;
        localKeys.push(lk);
        if (rMeasure < 100) {
          Object.keys(decimals).forEach(decimal => {
            localKeys.push(`${lk}d${decimal}`);
          });
        }
      });

      localKeys.forEach(lk => {
        localStyles[lk] = {};
        let finalValue = null;
        rules.forEach(rule => {
          if (
            [
              "w",
              "rw",
              "h",
              "rh",
              "minW",
              "minH",
              "maxW",
              "maxH",
              "p",
              "px",
              "py",
              "pt",
              "pr",
              "pr",
              "pb",
              "pl",
              "m",
              "mx",
              "my",
              "mt",
              "mr",
              "mr",
              "mb",
              "ml",
              "top",
              "right",
              "bottom",
              "left",
              "rTop",
              "rRight",
              "rBottom",
              "rLeft",
            ].includes(baseStyle)
          ) {
            const [measureValue, dec] = lk.replace(baseStyle, "").split("d");
            const decimalValue = dec ? parseFloat(decimals[dec]) : 0;

            if (["rw", "rh", "rTop", "rRight", "rBottom", "rLeft"].includes(baseStyle)) {
              // relativeMeasure: in percentage (only for pure Width and Height)
              finalValue = String(parseFloat(parseInt(measureValue, 10) + decimalValue)) + "%";
            } else {
              // absoluteMeasure: in pixels
              const widthRules = [
                "width",
                "minWidth",
                "maxWidth",
                "padding",
                "margin",
                "paddingLeft",
                "paddingRight",
                "marginLeft",
                "marginRight",
                "paddingHorizontal",
                "marginHorizontal",
                "right",
                "left",
              ];
              const heightRules = [
                "height",
                "minHeight",
                "maxHeight",
                "padding",
                "margin",
                "paddingTop",
                "paddingBottom",
                "marginTop",
                "marginBottom",
                "paddingVertical",
                "marginVertical",
                "top",
                "bottom",
              ];

              if (widthRules.includes(rule)) {
                finalValue = (width * parseFloat(parseInt(measureValue, 10) + decimalValue)) / 100;
              }
              if (heightRules.includes(rule)) {
                finalValue = (height * parseFloat(parseInt(measureValue, 10) + decimalValue)) / 100;
              }
            }
          }

          localStyles[lk][rule] = finalValue;
        });
      });
    } else if (baseStyle === "opacity") {
      measures.forEach(rMeasure => {
        const intMeasure = parseInt(rMeasure, 10);
        if (intMeasure > 0 && intMeasure % 5 === 0) {
          const decimal = String(intMeasure / 100)
            .split(".")
            .join("");
          const lk = `${baseStyle}${decimal}`;
          localStyles[lk] = {};
          rules.forEach(rule => {
            localStyles[lk][rule] = rMeasure / 100;
          });
        }
      });
    } else if (baseStyle === "scale") {
      measures.forEach(rMeasure => {
        const intMeasure = parseInt(rMeasure, 10);
        if (intMeasure <= 30) {
          const [measureValue, dec] = String(intMeasure / 10).split(".");
          const lk = `${baseStyle}${measureValue}${dec ? "d" + dec : ""}`;
          localStyles[lk] = {};
          rules.forEach(rule => {
            localStyles[lk][rule] = [{ scale: rMeasure / 10 }];
          });
        }
      });
    } else if (["txt", "lineHeight"].includes(baseStyle)) {
      Object.keys(fontRems).map(size => {
        const lk = `${baseStyle}${size}`;
        localStyles[lk] = {};
        rules.forEach(rule => {
          localStyles[lk][rule] = `${fontRems[size]}rem`;
        });
      });
    } else if (
      [
        "border",
        "borderX",
        "borderY",
        "borderX",
        "borderTop",
        "borderRight",
        "borderBottom",
        "borderLeft",
        "borderRadius",
        "borderRadiusTop",
        "borderRadiusBottom",
        "borderRadiusLeft",
        "borderRadiusRight",
      ].includes(baseStyle)
    ) {
      measures.forEach(rMeasure => {
        const intMeasure = parseInt(rMeasure, 10);
        if (
          (["borderRadius", "borderRadiusTop", "borderRadiusBottom", "borderRadiusLeft", "borderRadiusRight"].includes(
            baseStyle
          ) &&
            intMeasure % 5 === 0) ||
          ([
            "border",
            "borderX",
            "borderY",
            "borderX",
            "borderTop",
            "borderRight",
            "borderBottom",
            "borderLeft",
          ].includes(baseStyle) &&
            intMeasure <= 20)
        ) {
          // Radiuses go on 5 intervals and < 50
          // Borders go on 1 interval and < 20
          const lk = `${baseStyle}${rMeasure}`;
          localStyles[lk] = {};
          rules.forEach(rule => {
            localStyles[lk][rule] = intMeasure;
            if (decorator) {
              const [extraRule, extraRuleValue] = decorator.split("|");
              // eslint-disable-next-line
              const cols = eval(extraRuleValue);
              Object.keys(cols).map(colorKey => {
                localStyles[`${lk}${colorKey}`] = {};

                rules.forEach(r => {
                  localStyles[`${lk}${colorKey}`][r] = intMeasure;
                  const sideKey = extraRule.replace("Side", r.replace("border", "").replace("Width", "")); //
                  localStyles[`${lk}${colorKey}`][sideKey] = cols[colorKey];
                });
              });
            }
          });
        }
      });
    } else if (["rSizeSq", "sizeSq", "pSq", "mSq"].includes(baseStyle)) {
      measures.forEach(rMeasure => {
        const lk = `${baseStyle}${rMeasure}`;
        localStyles[lk] = {};
        rules.forEach(rule => {
          if (baseStyle === "rSizeSq") {
            localStyles[lk][rule] = rMeasure + "%";
          } else {
            localStyles[lk][rule] = (width * parseInt(rMeasure, 10)) / 100;
          }
        });
      });
    }

    styles = {
      ...styles,
      ...localStyles,
    };
  });

  return styles;
};

const generatedStyles = generateStyles(styleAliases);

// Global variables
const ESS = EStyleSheet.create({
  // Constants
  $os: "$platformOS",

  // Widths
  $w: "$width",
  $h: "$height",

  $iconSize: "$rel",
  $iconSizeXXS: "$rel * 0.5",
  $iconSizeXS: "$rel * 0.6666",
  $iconSizeS: "$rel * 0.8",
  $iconSizeM: "$rel * 1",
  $iconSizeL: "$rel * 1.2",
  $iconSizeXL: "$rel * 1.3333",
  $iconSizeXXL: "$rel * 2",

  $cWhite: "$colWhite",
  $cBlack: "$colBlack",
  $cBlack75: "$colBlack75",
  $cBlack50: "$colBlack50",
  $cBlack25: "$colBlack25",
  $cBlack10: "$colBlack10",

  // Face colors
  colorWhite: { color: "$colWhite" },
  colorBlack: { color: "$colBlack" },
  colorBlack75: { color: "$colBlack75" },
  colorBlack50: { color: "$colBlack50" },
  colorBlack25: { color: "$colBlack25" },
  colorBlack10: { color: "$colBlack10" },

  // Backgrounds
  bgWhite: { backgroundColor: "rgba(255, 255, 255, 1)" },
  bgWhite75: { backgroundColor: "rgba(255, 255, 255, 0.75)" },
  bgWhite66: { backgroundColor: "rgba(255, 255, 255, 0.66)" },
  bgWhite50: { backgroundColor: "rgba(255, 255, 255, 0.5)" },
  bgWhite25: { backgroundColor: "rgba(255, 255, 255, 0.25)" },
  bgBlack: { backgroundColor: "rgba(0, 0, 0, 1)" },
  bgBlack75: { backgroundColor: "$colBlack75" },
  bgBlack50: { backgroundColor: "$colBlack50" },
  bgBlack25: { backgroundColor: "$colBlack25" },
  bgBlack20: { backgroundColor: "$colBlack20" },
  bgBlack15: { backgroundColor: "$colBlack15" },
  bgBlack10: { backgroundColor: "$colBlack10" },
  bgBlack05: { backgroundColor: "$colBlack05" },
  bgBlack01: { backgroundColor: "$colBlack01" },
  bgNone: { backgroundColor: "transparent" },
  bgKeyboardIOSLight: { backgroundColor: "#D0D3D7" },
  bgKeyboardIOSDark: { backgroundColor: "#3c3c3c" },

  flex1: {
    flex: 1,
  },

  txt: {
    fontFamily: "NunitoSans",
  },
  txtBold: {
    fontFamily: "NunitoSansBold",
  },
  txtLight: {
    fontFamily: "NunitoSansLight",
  },

  textLeft: {
    textAlign: "left",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  textJustify: {
    textAlign: "justify",
  },
  textUnderline: {
    textDecorationLine: "underline",
  },
  textUppercase: {
    textTransform: "uppercase",
  },
  textLowercase: {
    textTransform: "lowercase",
  },

  justifyAround: {
    justifyContent: "space-around",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  alignCenter: {
    alignItems: "center",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  alignStretch: {
    alignItems: "stretch",
  },
  alignSelfStart: {
    alignSelf: "flex-start",
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
  alignSelfEnd: {
    alignSelf: "flex-end",
  },
  fColumn: {
    flexDirection: "column",
  },
  fRow: {
    flexDirection: "row",
  },
  fColumnRev: {
    flexDirection: "column-reverse",
  },
  fRowRev: {
    flexDirection: "row-reverse",
  },
  fGrow: {
    flexGrow: 1,
  },
  fShrink: {
    flexShrink: 1,
  },
  fBasis: {
    flexBasis: 1,
  },
  fWrap: {
    flexWrap: "wrap",
  },

  overflowHidden: {
    overflow: "hidden",
  },

  fullCentered: {
    justifyContent: "center",
    alignItems: "center",
  },

  pAbsolute: {
    position: "absolute",
  },
  pRelative: {
    position: "relative",
  },
  aspectRatio1: {
    aspectRatio: 1,
  },

  // Aliases
  ...generatedStyles,
});

const StyleFlatten = styles => EStyleSheet.flatten(styles.split(" ").map(s => ESS[s]));

module.exports = {
  ESS,
  SFlat: StyleFlatten
};
