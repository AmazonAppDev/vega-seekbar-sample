// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import {
  DisplayAboveThumbProps,
  SeekBar,
} from '@amazon-devices/kepler-ui-components';
import {Image, StyleSheet, Text, View} from 'react-native';
import {THUMBNAIL_BASE_URL, TOTAL_IMAGES} from '../constants/thumbnails';
import {COLORS} from '../constants/colors';
import Header from '../components/Header';
import {ScreenProps} from '../types/navigation';

const INITIAL_VALUE = 0;
const TOTAL_VALUE = 7000;
const STEP_VALUE = 10;
const FAST_FORWARD_IMAGE = require('./../assets/images/fast_forward.png');
const REWIND_IMAGE = require('./../assets/images/rewind.png');

/**
 * Custom thumb icon with circular focused state and rectangular unfocused state.
 * Provides clear visual feedback for TV remote navigation.
 */
const ThumbIcon = ({focused}: {focused: boolean}) => (
  <View style={focused ? styles.focusedThumb : styles.unfocusedThumb} />
);

/**
 * Comprehensive display component showing all seeking feedback types.
 *
 * - Shows speed multiplier and directional icons during acceleration.
 * - Demonstrates complete above-thumb feedback in advanced usage.
 */
const FastForwardRewindLabel = ({mode, multiplier}: DisplayAboveThumbProps) => {
  const isFastMode = mode === 'fast_rewind' || mode === 'fast_forward';

  const getLabelText = () => {
    if (multiplier === 1) {
      if (mode === 'rewind') {
        return '-10';
      }
      if (mode === 'forward') {
        return '+10';
      }
      if (isFastMode) {
        return '1x';
      }
    }
    if (isFastMode) {
      return `${multiplier}x`;
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

/**
 * Below-thumb label component for additional context display.
 * Demonstrates layered feedback approach in comprehensive implementation.
 */
const BelowLabel = () => {
  return (
    <View style={styles.belowLabel}>
      <Text style={styles.fastForwardRewindLabel}>Text</Text>
    </View>
  );
};

const ComplexUsage = ({route, navigation}: ScreenProps) => {
  const {tile} = route.params || {};
  const {name, title} = tile || {
    name: 'advanced-usage',
    title: 'Advanced usage',
  };

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

  /**
   * Handles play/pause button interactions.
   */
  const handleOnPressPlayPause = (value: number) => {
    console.log('onPlayPause: ', value);
  };

  /**
   * Handles focus events for complete interaction tracking.
   * Part of comprehensive event monitoring in advanced implementation.
   */
  const handleOnFocus = () => {
    console.log('handleOnFocus ');
  };

  /**
   * Handles blur events for complete interaction tracking.
   * Part of comprehensive event monitoring in advanced implementation.
   */
  const handleOnBlur = () => {
    console.log('handleOnBlur ');
  };

  /**
   * Handles fast forward button interactions.
   * Demonstrates complete skip control integration.
   */
  const handleOnFastForwardPress = () => {
    console.log('handleOnFastForwardPress ');
  };

  /**
   * Handles rewind button interactions.
   * Demonstrates complete skip control integration.
   */
  const handleOnRewindPress = () => {
    console.log('handleOnRewindPress ');
  };

  /**
   * Handles sliding start events for comprehensive interaction tracking.
   */
  const handleOnSlidingStart = () => {
    console.log('handleOnSlidingStart ');
  };

  /**
   * Handles sliding end events for comprehensive interaction tracking.
   */
  const handleOnSlidingEnd = () => {
    console.log('handleOnSlidingEnd ');
  };

  /**
   * Creates thumbnail images for recorded content preview.
   *
   * - Only used when not at live position and seeking is paused.
   * - Generates sequential URLs: baseurl/10.jpg, baseurl/11.jpg, baseurl/12.jpg, etc.
   * - Zero-pads single digits (01.jpg, 02.jpg) for consistent naming convention.
   */
  const getThumbValue = React.useCallback((thumbValue: number) => {
    const index = Math.floor(thumbValue / STEP_VALUE);
    const imageNumber = (index % TOTAL_IMAGES) + 1;
    const paddedNumber =
      imageNumber < 10 ? `0${imageNumber}` : `${imageNumber}`;

    return {
      uri: `${THUMBNAIL_BASE_URL}${paddedNumber}.jpg`,
    };
  }, []);

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
          onPlayPause={handleOnPressPlayPause}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onSlidingStart={handleOnSlidingStart}
          onSlidingEnd={handleOnSlidingEnd}
          onFastForwardPress={handleOnFastForwardPress}
          onRewindPress={handleOnRewindPress}
          thumbIcon={ThumbIcon}
          currentValueIndicatorColor={(focused: boolean) =>
            focused ? COLORS.PRIMARY_BLUE : COLORS.WHITE
          }
          disabledWhenNotFocused={true} // Standard focus management.
          displayAboveThumb={FastForwardRewindLabel} // Comprehensive above-thumb feedback.
          displayBelowThumb={BelowLabel} // Additional below-thumb context.
          disableThumbnail={false} // Enable thumbnail previews for advanced usage.
          thumbnailImageSource={getThumbValue} // Dynamic thumbnail generation.
          thumbnailLabel={(thumb: number) => `${thumb}`} // Numeric position labels.
          markers={[
            // Multiple content markers demonstrating various positions.
            {
              position: 600,
              pointColor: COLORS.YELLOW, // Highlighted marker with different color.
            },
            {
              position: 1100,
              pointColor: COLORS.PRIMARY_BLUE,
            },
            {
              position: 1900,
              pointColor: COLORS.PRIMARY_BLUE,
            },
            {
              position: 2800,
              pointColor: COLORS.PRIMARY_BLUE,
            },
            {
              position: 4900,
              pointColor: COLORS.PRIMARY_BLUE,
            },
            {
              position: 6400,
              pointColor: COLORS.PRIMARY_BLUE,
            },
          ]}
          enableSkipForwardBackwardAcceleration={true} // Enables skip forward/backward acceleration (<< >>).
          enableLongPressAcceleration={true} // Enables D-pad long press acceleration.
          stepMultiplierFactor={1} // Incremental step increase for acceleration (1x, 2x, 3x, 4x, ...).
          stepMultiplierFactorInterval={1000} // Accelerates every 1 second of repeated skipping.
          longPressIntervalDuration={200} // Fires skip events every 200ms while seeking.
          longPressDelay={1000} // Delay before acceleration starts.
          maxStepValue={50} // Maximum step size limit.
          trapFocus // Keeps focus within seek bar during interaction.
          enableAnimations={true} // Smooth visual feedback during skip acceleration.
          animationDuration={200} // Animation timing in milliseconds.
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
    width: '85%',
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
  belowLabel: {
    position: 'absolute',
    height: 30,
    width: 80,
    borderRadius: 20,
    top: 30,
    backgroundColor: COLORS.SECONDARY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ComplexUsage;
