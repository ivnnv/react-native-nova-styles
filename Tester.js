import React from "react";
import { Text, View, SafeAreaView } from 'react-native';
import { ESS, SFlat } from './Styles';

export default function Tester() {
  return (
    <SafeAreaView>
      <View style={SFlat('rw100 rh100 bgBlack25')}>
        <View style={SFlat('rh10 fRow')}>
          <View style={SFlat('rw15 rh100 bgBlack50 fullCentered')}>
            <Text style={ESS.colorWhite}>left</Text>
          </View>
          <View style={SFlat('flex1 fGrow rh100 borderLeft2White borderRight2Black25 bgBlack75 fullCentered')}>
            <Text style={ESS.colorWhite}>right</Text>
          </View>
        </View>
        <View style={SFlat('rh90 bgBlack fullCentered')}>
          <View style={SFlat('pAbsolute top5 rSizeSq75 borderRadius20 borderLeft5White borderRight5Black50 bgBlack25 fullCentered')}>
            <Text style={SFlat('opacity05 scale2d5 colorWhite')}>text 2.5x{'\n'}0.5 opacity</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};