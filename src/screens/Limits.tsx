// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import {SeekBar} from '@amazon-devices/kepler-ui-components';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/colors';
import Header from '../components/Header';
import {ScreenProps} from '../types/navigation';

const INITIAL_VALUE = 100;
const TOTAL_VALUE = 500;
const STEP_VALUE = 10;
const LOWER_SEEK_LIMIT = 100;
const UPPER_SEEK_LIMIT = 400;
const ARROW = require('./../assets/images/arrow_up.png');

/**
 * Custom thumb icon with circular focused state and rectangular unfocused state.
 * Provides clear visual feedback for TV remote navigation.
 */
const ThumbIcon = ({focused}: {focused: boolean}) => (
  <View style={focused ? styles.focusedThumb : styles.unfocusedThumb} />
);

const Limits = ({route, navigation}: ScreenProps) => {
  const {tile} = route.params || {};
  const {name, title} = tile || {
    name: 'seeking-limits',
    title: 'Seeking limits',
  };

  /**
   * Handles continuous value changes during seeking operations.
   *
   * - Fires continuously during dragging/sliding within allowed limits.
   * - Values are automatically constrained by lowerSeekLimit and upperSeekLimit.
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
          currentValue={INITIAL_VALUE}
          step={STEP_VALUE}
          totalValue={TOTAL_VALUE}
          onValueChange={handleOnValueChange}
          onPress={handleOnPress}
          thumbIcon={ThumbIcon}
          currentValueIndicatorColor={(focused: boolean) =>
            focused ? COLORS.PRIMARY_BLUE : COLORS.WHITE
          }
          disabledWhenNotFocused={true} // Prevents accidental activation when not focused.
          disableThumbnail={true} // No preview thumbnails in limits example.
          lowerSeekLimit={LOWER_SEEK_LIMIT} // Restricts seeking below this value.
          upperSeekLimit={UPPER_SEEK_LIMIT} // Restricts seeking above this value.
          markers={Markers} // Visual indicators showing the limits.
          trapFocus // Keeps focus within seek bar during interaction.
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
    backgroundColor: COLORS.PRIMARY_BLUE,
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
  marker: {
    height: 30,
    width: 6,
    borderRadius: 4,
    backgroundColor: COLORS.WHITE,
    position: 'relative',
    top: -10,
  },
  savedDelayArrow: {
    left: '-50%',
    top: 30,
  },
});

/**
 * Arrow marker component to indicate seeking limits.
 */
const Arrow = () => (
  <Image
    source={ARROW}
    resizeMode="contain"
    style={styles.savedDelayArrow}
    key={'arrow'}
  />
);

/**
 * Vertical line marker to show limits.
 */
const Limit = () => <View style={styles.marker} key="lower" />;

/**
 * Marker configuration showing both lower and upper seek limits.
 *
 * - Arrows point to exact limit positions.
 * - Positioned at limits to clearly define seekable range.
 */
const Markers = [
  {
    position: LOWER_SEEK_LIMIT,
    node: Arrow,
  },
  {
    position: LOWER_SEEK_LIMIT - 1,
    node: Limit,
  },
  {
    position: UPPER_SEEK_LIMIT,
    node: Arrow,
  },
  {
    position: UPPER_SEEK_LIMIT - 1,
    node: Limit,
  },
];

export default Limits;
