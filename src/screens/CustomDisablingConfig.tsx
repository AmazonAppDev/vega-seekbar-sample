// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useRef, useState} from 'react';

import {
  DisplayAboveThumbProps,
  InteractionEventPayload,
  SeekBar,
} from '@amazon-devices/kepler-ui-components';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
 * Focused thumb component - only shown when seek bar has focus.
 * Shows conditional rendering based on focus state.
 */
const FocusedThumb = () => <View style={styles.focusedThumb} />;

/**
 * Unfocused thumb component - shown when seek bar loses focus.
 * Shows conditional rendering based on focus state.
 */
const UnfocusedThumb = () => <View style={styles.unfocusedThumb} />;

/**
 * Display component showing seeking feedback - only visible when focused.
 *
 * - Conditionally rendered based on focus state.
 * - Shows speed multiplier and directional icons during seeking.
 * - Shows how UI elements can be enabled/disabled.
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

const CustomDisablingConfig = ({route, navigation}: ScreenProps) => {
  const {tile} = route.params || {};
  const {name, title} = tile || {
    name: 'custom-disabling',
    title: 'Custom disabling configuration',
  };
  const seekBarRef = useRef<any>(null);

  // Focus state drives the custom disabling configuration.
  const [focused, setFocused] = useState(false);

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
   *
   * - Disabled when unfocused to prevent accidental activation.
   */
  const handleOnPressPlayPause = (value: number) => {
    console.log('onPlayPause: ', value);
  };

  /**
   * Handles focus events - enables full seek bar functionality.
   *
   * - Sets focused state which controls disabling configuration.
   * - Enables all interactions when seek bar gains focus.
   */
  const handleOnFocus = () => {
    setFocused(true);
    console.log('handleOnFocus ');
  };

  /**
   * Handles blur events - disables most seek bar functionality.
   *
   * - Sets unfocused state which triggers selective disabling.
   * - Demonstrates how to limit interactions when not actively seeking.
   */
  const handleOnBlur = () => {
    setFocused(false);
    console.log('handleOnBlur ');
  };

  /**
   * Handles fast forward button press and refocuses seek bar.
   *
   * - Programmatically returns focus to seek bar for continued interaction.
   */
  const handleOnFastForwardPress = () => {
    seekBarRef?.current?.requestTVFocus();
    console.log('handleOnFastForwardPress ');
  };

  /**
   * Handles rewind button press and refocuses seek bar.
   *
   * - Programmatically returns focus to seek bar for continued interaction.
   */
  const handleOnRewindPress = () => {
    seekBarRef?.current?.requestTVFocus();
    console.log('handleOnRewindPress ');
  };

  const handleOnSlidingStart = () => {
    console.log('handleOnSlidingStart ');
  };

  const handleOnSlidingEnd = () => {
    console.log('handleOnSlidingEnd ');
  };

  /**
   * Tracks all seek interaction changes for debugging and analytics.
   *
   * - Provides detailed interaction event data.
   * - Useful for understanding user behavior patterns.
   */
  const onSeekInteractionChange = (interaction: InteractionEventPayload) => {
    console.log('onSeekInteractionChange: ', interaction);
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
          hasTVPreferredFocus={true}
          ref={seekBarRef}
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
          partialDisablingConfiguration={{
            skipBackward: false, // Always allow skip backward buttons.
            skipForward: false, // Always allow skip forward buttons.
            left: !focused, // Disable left D-pad when unfocused.
            right: !focused, // Disable right D-pad when unfocused.
            back: !focused, // Disable back button when unfocused.
            playPause: !focused, // Disable play/pause when unfocused.
          }}
          displayAboveThumb={focused ? FastForwardRewindLabel : null} // Only show feedback when focused.
          thumbIcon={focused ? FocusedThumb : UnfocusedThumb} // Different thumb styles based on focus.
          currentValueIndicatorColor={focused ? COLORS.PRIMARY_BLUE : 'white'} // Dynamic color based on focus.
          disableThumbnail={!focused} // Only show thumbnails when focused.
          thumbnailImageSource={getThumbValue} // Dynamic thumbnail images based on position.
          thumbnailLabel={(thumbValue: number) => `${thumbValue}`} // Shows numeric position on thumbnail.
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
          onSeekInteractionChange={onSeekInteractionChange} // Track all interaction events.
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Captions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Episodes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Speed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 50,
    marginLeft: 180,
  },
  button: {
    backgroundColor: COLORS.SECONDARY_BLUE,
    height: 50,
    width: 200,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    height: '100%',
    width: '100%',
  },
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
    backgroundColor: 'white',
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
    color: 'white',
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

export default CustomDisablingConfig;
