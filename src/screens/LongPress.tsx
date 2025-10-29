// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import {
  DisplayAboveThumbProps,
  SeekBar,
} from '@amazon-devices/kepler-ui-components';
import {Image, StyleSheet, Text, View} from 'react-native';
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
const TOTAL_VALUE = 2000;
const STEP_VALUE = 10;

const FAST_FORWARD_IMAGE = require('./../assets/images/fast_forward.png');
const REWIND_IMAGE = require('./../assets/images/rewind.png');

/**
 * Display component showing acceleration feedback during D-pad long press.
 *
 * - Shows speed multiplier (1x, 2x, 3x, etc.) when holding left/right D-pad buttons.
 * - Displays step values (-10, +10) for single presses.
 * - Includes directional icons to show the seeking direction.
 */
const FastForwardRewindLabel = ({mode, multiplier}: DisplayAboveThumbProps) => {
  const isFastMode = mode === 'fast_rewind' || mode === 'fast_forward';

  /**
   * Maps internal multiplier values to user-friendly speed labels.
   * Custom mapping provides intuitive speed progression for TV users.
   */
  const calculateSpeedLabel = (multiplierValue: number) => {
    const speedMap: Record<number, string> = {
      1: '1x',
      2: '2x',
      4: '3x',
      6: '4x',
      8: '5x',
    };

    return speedMap[multiplierValue] || '';
  };

  const getLabelText = () => {
    if (multiplier === 1) {
      if (mode === 'rewind') {
        return '-10';
      }
      if (mode === 'forward') {
        return '+10';
      }
    }
    if (isFastMode) {
      return calculateSpeedLabel(multiplier);
    }
    return '';
  };

  const showRewindImage = isFastMode && mode === 'fast_rewind';
  const showForwardImage = isFastMode && mode === 'fast_forward';

  return (
    <View style={styles.aboveThumb}>
      {showRewindImage && (
        <Image source={REWIND_IMAGE} style={styles.fastForwardRewindImage} />
      )}

      <Text style={styles.fastForwardRewindLabel}>{getLabelText()}</Text>

      {showForwardImage && (
        <Image
          source={FAST_FORWARD_IMAGE}
          style={styles.fastForwardRewindImage}
        />
      )}
    </View>
  );
};

const LongPress = ({route, navigation}: ScreenProps) => {
  const {tile} = route.params || {};
  const {name, title} = tile || {name: 'long-press', title: 'Long Press'};

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
          currentValue={INITIAL_VALUE}
          step={STEP_VALUE}
          totalValue={TOTAL_VALUE}
          onValueChange={handleOnValueChange}
          onPress={handleOnPress}
          thumbIcon={ThumbIcon}
          currentValueIndicatorColor={(focused) =>
            focused ? COLORS.PRIMARY_BLUE : COLORS.WHITE
          }
          displayAboveThumb={FastForwardRewindLabel} // Shows acceleration feedback.
          disabledWhenNotFocused={true} // Prevents accidental activation when not focused.
          disableThumbnail={true} // No preview thumbnails in long press example.
          enableLongPressAcceleration={true} // Core feature: enables D-pad long press acceleration.
          stepMultiplierFactor={2} // Doubles step size every acceleration interval (1x, 2x, 3x, ...).
          stepMultiplierFactorInterval={1000} // Change the speed every 1 second of holding.
          longPressIntervalDuration={200} // Fires seeking events every 200ms during long press.
          longPressDelay={1000} // Wait 1 second before starting long press acceleration.
          maxStepValue={80} // Maximum step size to prevent excessive jumping.
          trapFocus // Keeps focus within seek bar during interaction.
          enableAnimations // Smooth visual feedback during acceleration.
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
  fastForwardRewindImage: {
    height: 24,
    width: 24,
  },
  fastForwardRewindLabel: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.8,
    color: COLORS.WHITE,
  },
  aboveThumb: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 120,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default LongPress;
