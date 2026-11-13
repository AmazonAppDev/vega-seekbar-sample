// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useState} from 'react';

import {SeekBar} from '@amazon-devices/kepler-ui-components';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS} from '../constants/colors';
import Header from '../components/Header';
import {ScreenProps} from '../types/navigation';
import {scaleUxToDp} from '../utils/scaleUxToDp';

type TickMarker = {
  position: number;
  node: () => React.ReactElement;
};

const TOTAL_VALUE = 32;
const TICK_SIZE = scaleUxToDp(8);
const THUMB_SIZE = scaleUxToDp(36);
const SEEKBAR_HEIGHT = scaleUxToDp(8);
const DEFAULT_BAR_PROGRESS = 10;
const STEP_VALUE = 1;
const INITIAL_VALUE = 10;
const ARROW = require('./../assets/images/arrow_up.png');

/**
 * Helper function to create circular marker styles.
 * Helps to have a consistent circular appearance for tick markers.
 */
const circleStyle = (diameter: number): ViewStyle => {
  return {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
  };
};

/**
 * Generate tick markers for every position on the seek bar.
 * Creates visual reference points to help users understand precise positioning.
 */
const ticks: TickMarker[] = [];
for (let i = 0; i <= TOTAL_VALUE; i++) {
  ticks.push({
    position: i,
    node: () => (
      <View
        style={[circleStyle(TICK_SIZE), styles.tickStyle]}
        key={`tick-${i}`}
      />
    ),
  });
}

/**
 * Custom thumb icon with circular focused state and rectangular unfocused state.
 * Provides clear visual feedback for TV remote navigation.
 */
const ThumbIcon = ({focused}: {focused: boolean}) => (
  <View style={focused ? styles.focusedThumb : styles.unfocusedThumb} />
);

const WithMarkers = ({route, navigation}: ScreenProps) => {
  const {tile} = route.params || {};
  const {name, title} = tile || {name: 'markers', title: 'Markers'};

  // Track selected position with small offset to trigger marker updates.
  const [selectedProgress, setSelectedProgress] = useState<number>(
    DEFAULT_BAR_PROGRESS + 0.001,
  );

  /**
   * Handles press events and updates the arrow marker position.
   *
   * - Updates selectedProgress to move the arrow indicator.
   * - Small offset (0.001) ensures marker re-renders properly.
   */
  const handleOnPress = (value: number) => {
    console.log('handleOnPress: ', value);
    setSelectedProgress(value + 0.001);
  };

  /**
   * Handles continuous value changes during seeking operations.
   *
   * - onValueChange fires continuously during dragging/sliding for real-time feedback.
   * - Logging here helps developers understand the frequency and timing of updates.
   */
  const handleOnValueChange = (value: number) => {
    console.log('handleOnValueChange: ', value);
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
          barStyle={styles.bar}
          thumbIcon={ThumbIcon}
          onPress={handleOnPress}
          onPlayPause={handleOnPress}
          onValueChange={handleOnValueChange}
          timeShiftIndicatorStyle={styles.seekbarTrackTimeshiftPart}
          currentValueIndicatorColor={'transparent'} // Hide default indicator to show custom markers.
          disabledWhenNotFocused={true} // Prevents accidental activation when not focused.
          disableThumbnail={true} // No preview thumbnails in markers example.
          trapFocus // Keeps focus within seek bar during interaction.
          markers={[
            {
              position: selectedProgress, // Dynamic arrow marker that follows user selection.
              node: (
                <Image
                  source={ARROW}
                  resizeMode="contain"
                  style={styles.savedDelayArrow}
                  key={'arrow'}
                />
              ),
            },
            ...ticks, // Spread all tick markers across the seek bar.
          ]}
        />
      </View>
    </View>
  );
};

export default WithMarkers;

const styles = StyleSheet.create({
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
    paddingBottom: scaleUxToDp(80),
  },
  bar: {
    height: SEEKBAR_HEIGHT,
  },
  seekbarTrackTimeshiftPart: {
    backgroundColor: 'transparent',
  },
  savedDelayArrow: {
    width: scaleUxToDp(30),
    height: scaleUxToDp(30),
    left: '-50%',
    top: (SEEKBAR_HEIGHT + THUMB_SIZE) / 2,
  },
  tickStyle: {
    position: 'relative',
    top: (SEEKBAR_HEIGHT - TICK_SIZE) / 2,
    left: '-50%',
    backgroundColor: COLORS.WHITE,
  },
  focusedThumb: {
    borderRadius: scaleUxToDp(20),
    height: THUMB_SIZE,
    width: THUMB_SIZE,
    backgroundColor: COLORS.PRIMARY_BLUE,
  },
  unfocusedThumb: {
    borderRadius: scaleUxToDp(20),
    height: THUMB_SIZE,
    width: scaleUxToDp(10),
    backgroundColor: COLORS.PRIMARY_BLUE,
  },
});
