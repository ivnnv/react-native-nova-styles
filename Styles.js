//import React from 'react';
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Colors
const colors = {
  'White': "#FFFFFF",
  'Black': "#000000",
  'Black75': "#404040",
  'Black50': "#808080",
  'Black25': "#BFBFBF",
};

const styleAliases = {
  w: 'width',
  rw: 'width',
  h: 'height',
  rh: 'height',

  p: 'padding,paddingTop,paddingRight,paddingBottom,paddingLeft',
  pSq: 'padding,paddingTop,paddingRight,paddingBottom,paddingLeft',
  px: 'paddingHorizontal,paddingLeft,paddingRight',
  py: 'paddingVertical,paddingTop,paddingBottom',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',

  m: 'margin,marginTop,marginRight,marginBottom,marginLeft',
  mSq: 'margin,marginTop,marginRight,marginBottom,marginLeft',
  mx: 'marginHorizontal,marginLeft,marginRight',
  my: 'marginVertical,marginTop,marginBottom',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',

  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'bottom',

  rTop: 'top',
  rRght: 'right',
  rBottom: 'bottom',
  rLeft: 'bottom',

  opacity: 'opacity',
  zIndex: 'zIndex',

  text: 'fontSize',
  lineHeight: 'lineHeight',

  border: 'borderWidth,borderLeftWidth,borderRightWidth,borderTopWidth,borderBottomWidth@borderSideColor|colors',

  // border default width hairline
  borderX: 'borderLeftWidth,borderRightWidth@borderSideColor|colors',
  borderY: 'borderTopWidth,borderBottomWidth@borderSideColor|colors',

  borderTop: 'borderTopWidth@borderSideColor|colors',
  borderRight: 'borderRightWidth@borderSideColor|colors',
  borderBottom: 'borderBottomWidth@borderSideColor|colors',
  borderLeft: 'borderLeftWidth@borderSideColor|colors',

  borderRadius: 'borderRadius,borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius',
  borderRadiusTop: 'borderTopLeftRadius,borderTopRightRadius',
  borderRadiusBottom: 'borderBottomLeftRadius,borderBottomRightRadius',
  borderRadiusLeft: 'borderTopLeftRadius,borderBottomLeftRadius',
  borderRadiusRight: 'borderTopRightRadius,borderBottomRightRadius',

  scale: 'transform',

  sizeSq: 'width,height',
  rSizeSq: 'width,height',
};

const generateStyles = (styleAliases) => {
  const measures = Array.from({length: 101}, (_, k) => k);
  const decimals = {
    '25': 0.25,
    '33': 0.3333,
    '5': 0.50,
    '66': 0.6666,
    '75': 0.75,
  };
  const fontRems = {
    '1': '0.66',
    '2': '0.85',
    '3': '1',
    '4': '1.15',
    '5': '1.66',
    '6': '1',
  };

  let styles = {};

  Object.keys(styleAliases).map(baseStyle => {
    // We need to preprocess the rules to iterate and get an array of styles of the parent definition
    const [definition, decorator] = styleAliases[baseStyle].split('@');
    const rules = definition.split(',');

    let localKeys = [];
    let localStyles = {}
    if (['w', 'rw', 'h', 'rh', 'p', 'px', 'py', 'pr', 'pr', 'pb', 'pl', 'rTop', 'rRight', 'rBottom', 'rLeft',
        'm', 'mx', 'my', 'mr', 'mr', 'mb', 'ml', 'top', 'bottom', 'left', 'right'].includes(baseStyle))
    {
      measures.forEach(rMeasure => {
        const lk = `${baseStyle}${rMeasure}`
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
          if ([
            'w', 'rw', 'h', 'rh',
            'p', 'px', 'py', 'pr', 'pr', 'pb', 'pl',
            'm', 'mx', 'my', 'mr', 'mr', 'mb', 'ml',
            'top', 'right', 'bottom', 'left', 'rTop', 'rRight', 'rBottom', 'rLeft'].includes(baseStyle))
          {
            let [measureValue, dec] = lk.replace(baseStyle, '').split('d');
            let decimalValue = dec ? parseFloat(decimals[dec]) : 0;

            if (['rw', 'rh', 'rTop', 'rRight', 'rBottom', 'rLeft'].includes(baseStyle)) {
              // relativeMeasure: in percentage (only for pure Width and Height)
              finalValue = String(parseFloat(parseInt(measureValue)+decimalValue))+'%';
            } else {
              // absoluteMeasure: in pixels
              const widthRules = [
                'width', 'padding', 'margin', 'paddingLeft', 'paddingRight', 'marginLeft',
                'marginRight', 'paddingHorizontal', 'marginHorizontal', 'right', 'left'
              ];
              const heightRules = [
                'height', 'padding', 'margin', 'paddingTop', 'paddingBottom', 'marginTop',
                'marginBottom', 'paddingVertical', 'marginVertical', 'top', 'bottom'
              ];

              if (widthRules.includes(rule)) {
                finalValue = width * (parseInt(measureValue)+decimalValue) / 100;
              }
              if (heightRules.includes(rule)) {
                finalValue = height * (parseInt(measureValue)+decimalValue) / 100;
              }
            }
          }

          localStyles[lk][rule] = finalValue;
        });
      });
    } else if (baseStyle === 'opacity') {
      measures.forEach(rMeasure => {
        const intMeasure = parseInt(rMeasure);
        if (intMeasure > 0 && intMeasure % 5 === 0) {
          let decimal = String(intMeasure / 100).split('.').join('');
          const lk = `${baseStyle}${(decimal)}`;
          localStyles[lk] = {};
          rules.forEach(rule => {
            localStyles[lk][rule] = rMeasure / 100;
          });
        }
      });
    } else if (baseStyle === 'scale') {
      measures.forEach(rMeasure => {
        const intMeasure = parseInt(rMeasure);
        if (intMeasure <= 30) {
          let [measureValue, dec] = String(intMeasure / 10).split('.');
          const lk = `${baseStyle}${measureValue}${dec ? 'd'+dec : ''}`;
          localStyles[lk] = {};
          rules.forEach(rule => {
            localStyles[lk][rule] = [{ scale: rMeasure / 10 }]
          });
        }
      });
    } else if (['text', 'lineHeight'].includes(baseStyle)) {
      Object.keys(fontRems).map(size => {
        const lk = `${baseStyle}${size}`;
        localStyles[lk] = {};
        rules.forEach(rule => {
          localStyles[lk][rule] = `${fontRems[size]}rem`;
        });
      });
    } else if ([
      'border', 'borderX', 'borderY', 'borderX',
      'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
      'borderRadius', 'borderRadiusTop', 'borderRadiusBottom', 'borderRadiusLeft', 'borderRadiusRight'
    ].includes(baseStyle)) {
      measures.forEach(rMeasure => {
        const intMeasure = parseInt(rMeasure);
        if ((['borderRadius', 'borderRadiusTop', 'borderRadiusBottom', 'borderRadiusLeft', 'borderRadiusRight']
          .includes(baseStyle) && intMeasure % 5 === 0 && intMeasure <= 50) ||
          (['border', 'borderX', 'borderY', 'borderX', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft']
          .includes(baseStyle) && intMeasure <= 20))
        {
          // Radiuses go on 5 intervals and < 50
          // Borders go on 1 interval and < 20
          const lk = `${baseStyle}${rMeasure}`;
          localStyles[lk] = {};
          rules.forEach(rule => {
            localStyles[lk][rule] = intMeasure;
            if (decorator) {
              const [extraRule, extraRuleValue] = decorator.split('|');
              const cols = eval(extraRuleValue);
              Object.keys(cols).map(colorKey => {
                localStyles[`${lk}${colorKey}`] = {}

                rules.forEach(r => {
                  localStyles[`${lk}${colorKey}`][r] = intMeasure;
                  let sideKey = extraRule.replace('Side', r.replace('border', '').replace('Width', '')) //
                  localStyles[`${lk}${colorKey}`][sideKey] = cols[colorKey];
                });
              });
            }
          });
        };
      });
    } else if (['rSizeSq', 'sizeSq', 'pSq', 'mSq'].includes(baseStyle)) {
      measures.forEach(rMeasure => {
        const lk = `${baseStyle}${rMeasure}`;
        localStyles[lk] = {};
        rules.forEach(rule => {
          if (baseStyle === 'rSizeSq') {
            localStyles[lk][rule] = rMeasure+'%'
          } else {
            localStyles[lk][rule] = width * parseInt(rMeasure) / 100;
          }
        });
      });
    }

    styles = {
      ...styles,
      ...localStyles
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

  $cWhite: "$colWhite",
  $cBlack: "$colBlack",
  $cBlack75: "$colBlack75",
  $cBlack50: "$colBlack50",
  $cBlack25: "$colBlack25",

  // Face colors
  colorWhite: { color: "$colWhite" },
  colorBlack: { color: "$colBlack" },
  colorBlack75: { color: "$colBlack75" },
  colorBlack50: { color: "$colBlack50" },
  colorBlack25: { color: "$colBlack25" },

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
  bgNone: { backgroundColor: "transparent" },
  bgKeyboardIOS: { backgroundColor: "#D0D3D7" },

  flex1: {
    flex: 1,
  },

  txt: {
    fontFamily: 'OpenSans',
  },
  txtBold: {
    fontFamily: 'OpenSansBold',
  },

  textLeft: {
    textAlign: 'left'
  },
  textCenter: {
    textAlign: 'center'
  },
  textRight: {
    textAlign: 'right'
  },
  textJustify: {
    textAlign: 'justify'
  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
  textUppercase: {
    textTransform: 'uppercase'
  },
  textLowercase: {
    textTransform: 'lowercase'
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

  // Aliases
  ...generatedStyles
});

const StyleFlatten = styles => EStyleSheet.flatten(styles.split(" ").map(s => ESS[s]));

module.exports = {
  ESS,
  SFlat: StyleFlatten
};
