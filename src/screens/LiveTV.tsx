// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useMemo, useState, useRef, useEffect} from 'react';

import {
  BreakMarker,
  SeekBar,
  SegmentColorsConfig,
} from '@amazon-devices/kepler-ui-components';
import {Image, StyleSheet, Text, View} from 'react-native';
import {THUMBNAIL_BASE_URL, TOTAL_IMAGES} from '../constants/thumbnails';
import {COLORS} from '../constants/colors';
import Header from '../components/Header';
import {ScreenProps} from '../types/navigation';

const INITIAL_VALUE = 50;
const TOTAL_VALUE = 1000;
const STEP_VALUE = 10;

const PLAY_ICON = require('./../assets/images/play.png');
const PAUSE_ICON = require('./../assets/images/pause.png');
const EXTRA_SPACE_LIVE_POINT = 1.015; //1.5% -> 100% + 1.5% extra to have enough space for the live event icon.
const MINIMAL_SPACE_FOR_MARKERS = 0.01; //1% of minial space between markers.

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
    paddingBottom: 80,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 35,
    marginLeft: 220,
  },
  button: {
    backgroundColor: COLORS.WHITE,
    height: 60,
    width: 200,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    height: '100%',
    width: '100%',
  },
  playPauseIcon: {
    height: 90,
    width: 90,
  },
  liveMarker: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.RED,
    borderWidth: 3,
    borderColor: COLORS.WHITE,
    borderRadius: 12,
    top: -8,
    left: -3,
  },
  playPauseIconContainer: {
    position: 'absolute',
    top: 650,
  },
  focusedThumb: {
    height: 24,
    borderRadius: 12,
    width: 24,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.SHADOW_BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  unfocusedThumb: {
    height: 24,
    borderRadius: 12,
    width: 3,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.SHADOW_BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  belowMarker: {
    height: 100,
    width: 100,
    backgroundColor: 'transparent',
  },
  belowMarkerText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: '400',
    marginTop: 20,
    marginLeft: -10,
  },
  displayAboveThumb: {
    color: COLORS.WHITE,
    width: 40,
    height: 50,
  },
});

/**
 * Custom thumb icon with circular focused state and rectangular unfocused state.
 * Hidden when at live position.
 */
const ThumbIcon = ({focused}: {focused: boolean}) => (
  <View style={focused ? styles.focusedThumb : styles.unfocusedThumb} />
);

/**
 * "LIVE" label marker displayed at the live streaming position.
 * Indicates the current live broadcast point on the seek bar.
 */
const BelowMarker = (
  <View style={styles.belowMarker}>
    <Text style={styles.belowMarkerText}>LIVE</Text>
  </View>
);

const LiveTV = ({route, navigation}: ScreenProps) => {
  const {tile} = route.params || {};
  const {name, title} = tile || {name: 'live-tv', title: 'Live TV'};
  const [progress, setProgress] = useState<number>(INITIAL_VALUE);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  /**
   * Use refs for seek limits to avoid unnecessary re-renders during live updates.
   * Live TV requires frequent limits updates without triggering component re-renders.
   */
  const lowerSeekLimitRef = useRef<number>(20);
  const upperSeekLimitRef = useRef<number>(50);

  /**
   * State to trigger re-renders only when seek limits actually change.
   * Optimizes performance for live streaming scenarios with dynamic boundaries.
   */
  const [seekLimits, setSeekLimits] = useState({
    lower: lowerSeekLimitRef.current,
    upper: upperSeekLimitRef.current,
  });

  /**
   * Simulates live TV streaming with dynamic progress and limits updates.
   *
   * - Updates progress and seek limits continuously to mimic live broadcast.
   * - Pauses updates when user is actively seeking to prevent interference.
   * - Lower limit advances slower than upper limit to maintain seekable window.
   */
  useEffect(() => {
    if (isPaused) {
      return;
    }

    const intervalId = setInterval(() => {
      // Progressive window expansion: lower limit advances by 1, upper by 3.
      // This creates an expanding seekable window.
      upperSeekLimitRef.current += 3;

      if (progress > TOTAL_VALUE) {
        return;
      }

      setProgress((prev) => prev + 3);

      if (upperSeekLimitRef.current > TOTAL_VALUE) {
        return;
      }

      setSeekLimits({
        lower: lowerSeekLimitRef.current,
        upper: upperSeekLimitRef.current,
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [progress, isPaused]);

  /**
   * Dynamic markers that adapt to live TV state and focus.
   *
   * - Live marker shows red dot when at live position and focused.
   * - "LIVE" text marker when not at live position or unfocused.
   * - Lower limit marker only shown when there's sufficient space.
   */
  const initialMarkers = useMemo<BreakMarker[]>(() => {
    const markers: BreakMarker[] = [
      {
        position: seekLimits.upper,
        pointColor: COLORS.RED,
        node:
          isLive && isFocused ? (
            <View style={styles.liveMarker} />
          ) : (
            BelowMarker
          ),
      },
    ];

    // Add lower limit marker only if there's sufficient space.
    if (
      seekLimits.upper - seekLimits.lower >
      TOTAL_VALUE * MINIMAL_SPACE_FOR_MARKERS
    ) {
      markers.unshift({
        position: seekLimits.lower,
        type: 'break',
      });
    }

    return markers;
  }, [seekLimits.lower, seekLimits.upper, isLive, isFocused]);

  /**
   * Conditionally displays text above thumb - hidden during live playback.
   * Only shows additional context when user is seeking in recorded content.
   */
  const DisplayAboveThumb = useMemo(() => {
    return isLive || !isPaused ? null : (
      <Text style={styles.displayAboveThumb}>{'text'}</Text>
    );
  }, [isLive, isPaused]);

  /**
   * Segment colors that differentiate between recorded and live content.
   *
   * - Segment 0: Previous content - not live section - disabled area.
   * - Segment 1: Live/current content (white when focused, grey when unfocused).
   */
  const segmentColors: SegmentColorsConfig = {
    0: {
      progressedColor: COLORS.LIGHT_GREY,
      seekColor: COLORS.LIGHT_GREY,
    },
    1: {
      progressedColor: isFocused ? COLORS.WHITE : COLORS.MEDIUM_GREY,
    },
  };

  /**
   * Handles press events and resumes live playback.
   *
   * - Sets new progress position from user selection.
   * - Resumes live updates after seeking.
   */
  const handleOnPress = (value: number) => {
    setProgress(value);
    setIsPaused(false);
  };

  /**
   * Tracks seeking position and determines live status.
   *
   * - Updates live state based on proximity to upper seek limit.
   * - Triggers UI changes when entering/leaving live position.
   */
  const onValueChange = (value: number) => {
    console.log('onValueChange: ', value);
    setIsLive(value >= seekLimits.upper - 1);
  };

  /**
   * Pauses live updates when user starts seeking.
   * Prevents interference with user interaction during seeking.
   */
  const onSlidingStart = () => {
    setIsPaused(true);
    console.log('onSlidingStart');
  };

  const onSlidingEnd = () => {
    console.log('onSlidingEnd');
  };

  /**
   * Handles fast forward and pauses live updates.
   * Prevents automatic progress updates during manual seeking.
   */
  const onFastForward = () => {
    console.log('onFastForward');
    setIsPaused(true);
  };

  /**
   * Handles rewind and pauses live updates.
   * Prevents automatic progress updates during manual seeking.
   */
  const onRewind = () => {
    console.log('onRewind');
    setIsPaused(true);
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
      <View style={styles.playPauseIconContainer}>
        <Image
          source={isPaused ? PAUSE_ICON : PLAY_ICON}
          style={styles.playPauseIcon}
        />
      </View>

      <View style={styles.seekbar}>
        <SeekBar
          hasTVPreferredFocus={true}
          currentValue={progress}
          totalValue={TOTAL_VALUE * EXTRA_SPACE_LIVE_POINT} // Extra space beyond 100% for live point.
          step={STEP_VALUE}
          thumbnailImageSource={getThumbValue}
          onPress={handleOnPress}
          onValueChange={onValueChange}
          onSlidingStart={onSlidingStart}
          onSlidingEnd={onSlidingEnd}
          onRewindPress={onRewind}
          onFastForwardPress={onFastForward}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          thumbnailLabel={(thumb: number) => `${thumb}`}
          trapFocus // Keeps focus within seek bar during interaction.
          disabledWhenNotFocused={true} // Prevents accidental activation when not focused.
          displayAboveThumb={DisplayAboveThumb} // Conditional display based on live state.
          disableThumbnail={isLive || !isPaused} // No thumbnails during live playback.
          thumbIcon={isLive ? null : ThumbIcon} // Hide thumb at live position.
          markers={initialMarkers} // Dynamic markers that adapt to live state.
          lowerSeekLimit={seekLimits.lower} // Dynamic lower limit for live content.
          upperSeekLimit={seekLimits.upper} // Dynamic upper limit (live point).
          enableAnimations={true} // Smooth transitions for live updates.
          segmentColors={segmentColors} // Different colors for recorded vs live content.
        />
      </View>
    </View>
  );
};

export default LiveTV;
