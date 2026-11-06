// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import {SeekBar} from '@amazon-devices/kepler-ui-components';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/colors';
import Header from '../components/Header';
import {ScreenProps} from '../types/navigation';

/**
 * Custom thumb icon with circular focused state and rectangular unfocused state.
 * Provides clear visual feedback for TV remote navigation.
 */
const ThumbIcon = ({focused}: {focused: boolean}) => (
  <View style={focused ? styles.focusedThumb : styles.unfocusedThumb} />
);

const INITIAL_VALUE = 0;
const TOTAL_VALUE = 500;
const STEP_VALUE = 10;

const BasicUsage = ({route, navigation}: ScreenProps) => {
  // Extract navigation parameters for the screen's header.
  const {tile} = route.params || {};
  const {name, title} = tile || {name: 'basic-usage', title: 'Basic usage'};

  /**
   * Handles continuous value changes during seeking operations.
   *
   * - onValueChange fires continuously during dragging/sliding for real-time feedback.
   * - Logging here helps developers understand the frequency and timing of updates.
   */
  const handleOnValueChange = (value: number) => {
    console.log('onValueChange: ', value);
  };

  /**
   * Handles press/selection events on the seek bar.
   *
   * - onPress fires when user makes a definitive selection (button press ("select")).
   * - Different from onValueChange which fires during continuous interaction.
   */
  const handleOnPress = (value: number) => {
    console.log('onPress: ', value);
  };

  return (
    <View style={styles.container}>
      <Header title={title} name={name} navigation={navigation} />
      <View style={styles.seekbar}>
        <SeekBar
          hasTVPreferredFocus={true}
          currentValue={INITIAL_VALUE}
          totalValue={TOTAL_VALUE}
          step={STEP_VALUE}
          onPress={handleOnPress}
          onValueChange={handleOnValueChange}
          trapFocus={true} // Prevents focus from leaving the seek bar during interaction.
          disabledWhenNotFocused={true} // Disables interaction when not focused - prevents accidental activation.
          disableThumbnail={true} // No preview thumbnails in basic example.
          thumbIcon={ThumbIcon} // Custom thumb for better TV visibility.
          currentValueIndicatorColor={(
            focused: boolean, // Dynamic color feedback based on focus state.
          ) => (focused ? COLORS.PRIMARY_BLUE : COLORS.WHITE)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  focusedThumb: {
    height: 40,
    borderRadius: 20,
    width: 40,
    backgroundColor: COLORS.PRIMARY_BLUE,
  },
  unfocusedThumb: {
    height: 40,
    borderRadius: 20,
    width: 10,
    backgroundColor: COLORS.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLACK,
    alignItems: 'center',
  },
  seekbar: {
    flex: 3,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    paddingBottom: 80,
  },
});

export default BasicUsage;
