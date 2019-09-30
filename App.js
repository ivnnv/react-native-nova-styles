import React from 'react';
import { Platform, Dimensions, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Tester from "./Tester";

const { width, height } = Dimensions.get("window");

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Tester />
    </View>
  );
};

// Colors
const colors = {
  'White': "#FFFFFF",
  'Black': "#000000",
  'Black75': "#404040",
  'Black50': "#808080",
  'Black25': "#BFBFBF",
};

let colorConstants = {}
Object.keys(colors).forEach(colorKey => {
  colorConstants['$col'+colorKey] = colors[colorKey]
});

// Other Constants
const regularConstants = {
  // Constants
  $platformOS: Platform.OS === "android" ? "md" : Platform.OS,
  $width: width,
  $height: height,
  $rel: width <= 320 ? 22 : width <= 375 ? 26 : width <= 414 ? 28 : 30,

  // Debug
  $outline: 0,
};

// This way we can share the same colors object between the app and Styles.js
// TODO: Initialize Styles.js using sent "colors" object instead copy-pasting it
EStyleSheet.build({...colorConstants, ...regularConstants});