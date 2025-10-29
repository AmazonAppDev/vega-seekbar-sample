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
const TOTAL_VALUE = 3000;
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
 * Display component showing seeking feedback above the thumbnail preview.
 *
 * - Shows speed multiplier and directional icons during seeking.
 * - Complements thumbnail preview with additional context.
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
 * Label component displayed below the thumbnail preview.
 * Provides additional context or metadata about the current position.
 */
const BelowLabel = () => {
  return (
    <View style={styles.belowLabel}>
      <Text style={styles.fastForwardRewindLabel}>Text</Text>
    </View>
  );
};

const Thumbnail = ({route, navigation}: ScreenProps) => {
  const {tile} = route.params || {};
  const {name, title} = tile || {
    name: 'thumbnail-images',
    title: 'Thumbnail images',
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
          thumbIcon={ThumbIcon}
          currentValueIndicatorColor={(focused) =>
            focused ? COLORS.PRIMARY_BLUE : COLORS.WHITE
          }
          disabledWhenNotFocused={true} // Prevents accidental activation when not focused.
          displayAboveThumb={FastForwardRewindLabel} // Shows seeking feedback above thumbnail.
          displayBelowThumb={BelowLabel} // Shows additional context below thumbnail.
          disableThumbnail={false} // Core feature: enables thumbnail preview during seeking.
          thumbnailImageSource={getThumbValue} // Dynamic image source based on position.
          thumbnailLabel={(thumb) => `${thumb}`} // Shows numeric position on thumbnail.
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
    width: '82%',
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
    backgroundColor: COLORS.SEGMENT_BLUE_1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Thumbnail;
