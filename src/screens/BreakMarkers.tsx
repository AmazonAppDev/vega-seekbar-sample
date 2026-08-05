// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useMemo, useState} from 'react';

import {
  BreakMarker,
  SeekBar,
  SegmentColorsConfig,
} from '@amazon-devices/kepler-ui-components';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../constants/colors';
import Header from '../components/Header';
import {ScreenProps} from '../types/navigation';
import {scaleUxToDp} from '../utils/scaleUxToDp';

const INITIAL_VALUE = 0;
const TOTAL_VALUE = 300;
const STEP_VALUE = 5;

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

  focusedThumb: {
    height: scaleUxToDp(30),
    borderRadius: scaleUxToDp(15),
    width: scaleUxToDp(30),
    backgroundColor: COLORS.PRIMARY_BLUE,
  },
  unfocusedThumb: {
    height: scaleUxToDp(30),
    borderRadius: scaleUxToDp(15),
    width: scaleUxToDp(10),
    backgroundColor: COLORS.WHITE,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: scaleUxToDp(50),
  },
  button: {
    backgroundColor: COLORS.PRIMARY_BLUE,
    height: scaleUxToDp(60),
    width: scaleUxToDp(200),
    borderRadius: scaleUxToDp(20),
    marginRight: scaleUxToDp(10),
  },
  buttonText: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: scaleUxToDp(25),
    fontWeight: 'bold',
    textAlignVertical: 'center',
    height: '100%',
    width: '100%',
  },
  belowMarker: {
    height: scaleUxToDp(100),
    width: scaleUxToDp(100),
    backgroundColor: 'transparent',
  },
  belowMarkerText: {
    color: COLORS.WHITE,
    fontSize: scaleUxToDp(20),
    fontWeight: '400',
    marginTop: scaleUxToDp(20),
    marginLeft: scaleUxToDp(0),
  },
});

/**
 * Custom thumb icon with circular focused state and rectangular unfocused state.
 * Provides clear visual feedback for TV remote navigation.
 */
const ThumbIcon = ({focused}: {focused: boolean}) => (
  <View style={focused ? styles.focusedThumb : styles.unfocusedThumb} />
);

/**
 * Label component displayed below active markers.
 * Shows "Ad" text to indicate advertisement break points.
 */
const BelowMarker = (
  <View style={styles.belowMarker}>
    <Text style={styles.belowMarkerText}>Ad</Text>
  </View>
);

/**
 * Initial set of break markers and content markers.
 * Mixing marker types: break points (ad breaks) and content points (chapters).
 */
const initialMarkers: BreakMarker[] = [
  {
    position: 5,
    type: 'break',
  },
  {
    position: 20,
    pointColor: COLORS.PRIMARY_BLUE,
  },
  {
    position: 40,
    type: 'break',
  },
  {
    position: 120,
    pointColor: COLORS.PRIMARY_BLUE,
  },
  {
    position: 190,
    type: 'break',
  },
  {
    position: 270,
    pointColor: COLORS.PRIMARY_BLUE,
  },
];

const BreakMarkers = ({route, navigation}: ScreenProps) => {
  const {tile} = route.params || {};
  const {name, title} = tile || {
    name: 'break-markers',
    title: 'Break markers & segments',
  };
  const [progress, setProgress] = useState<number>(INITIAL_VALUE);
  const [markers, setMarkers] = useState<BreakMarker[]>(initialMarkers);

  /**
   * Removes the first marker from the current marker set.
   *
   * - Shows dynamic marker management.
   * - Removes markers in order for predictable behavior.
   */
  const handleOnRemoveMarker = () => {
    setMarkers((prevMarkers) => {
      if (prevMarkers.length === 0) {
        return [];
      }
      const newMarkers = [...prevMarkers];
      newMarkers.shift();
      return newMarkers;
    });
  };

  /**
   * Adds the next available marker from the initial set.
   *
   * - Finds first missing marker from initialMarkers.
   * - Maintains sorted order by position for consistent display.
   */
  const handleOnAddMarker = () => {
    setMarkers((prevMarkers) => {
      if (prevMarkers.length >= initialMarkers.length) {
        return prevMarkers;
      }

      const nextMarker = initialMarkers.find(
        (initialMarker) =>
          !prevMarkers.some(
            (currentMarker) =>
              currentMarker.position === initialMarker.position,
          ),
      );

      if (!nextMarker) {
        return prevMarkers;
      }

      const newMarkers = [...prevMarkers, nextMarker];

      return newMarkers.sort((a, b) => a.position - b.position);
    });
  };

  /**
   * Handles press/selection events on the seek bar.
   *
   * - onPress fires when user makes a definitive selection (button press ("select")).
   * - Different from onValueChange which fires during continuous interaction.
   */
  const handleOnPress = (value: number) => {
    setProgress(value);
  };

  /**
   * Dynamically calculates marker display based on current progress.
   *
   * - Finds the last passed marker to highlight current content section.
   * - Changes marker colors based on progress position.
   */
  const pointMarkers = useMemo(() => {
    // Find the last marker before current progress position.
    let lastMarkerBeforeProgress: BreakMarker | null = null;
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].position <= progress) {
        lastMarkerBeforeProgress = markers[i];
      }
    }

    return markers.map((marker) => {
      if (marker.type === 'break') {
        return {
          ...marker,
        };
      }

      return {
        node: marker === lastMarkerBeforeProgress ? BelowMarker : null,
        position: marker.position,
        pointColor:
          marker === lastMarkerBeforeProgress
            ? COLORS.PRIMARY_BLUE
            : COLORS.YELLOW,
      };
    });
  }, [progress, markers]);

  /**
   * Segment color configuration for different content sections.
   *
   * - Maps segment indices to color schemes (base, progressed, seek states).
   */
  const segmentColors: SegmentColorsConfig = {
    0: {
      progressedColor: COLORS.SEGMENT_YELLOW_2,
      seekColor: COLORS.SEGMENT_BLUE_3,
      baseColor: COLORS.SEGMENT_YELLOW_1,
    },
    2: {
      progressedColor: COLORS.SEGMENT_YELLOW_2,
      seekColor: COLORS.SEGMENT_BLUE_3,
      baseColor: COLORS.SEGMENT_YELLOW_1,
    },
    4: {
      baseColor: COLORS.SEGMENT_YELLOW_1,
      progressedColor: COLORS.SEGMENT_YELLOW_2,
    },
    10: {
      progressedColor: COLORS.PRIMARY_BLUE,
    },
  };

  return (
    <View style={styles.container}>
      <Header title={title} name={name} navigation={navigation} />

      <View style={styles.seekbar}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleOnRemoveMarker}
            style={styles.button}>
            <Text style={styles.buttonText}>Remove marker</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOnAddMarker} style={styles.button}>
            <Text style={styles.buttonText}>Add marker</Text>
          </TouchableOpacity>
        </View>
        <SeekBar
          hasTVPreferredFocus={true}
          currentValue={progress}
          totalValue={TOTAL_VALUE}
          step={STEP_VALUE}
          thumbIcon={ThumbIcon}
          onPress={handleOnPress}
          trapFocus // Keeps focus within seek bar during interaction.
          disabledWhenNotFocused={true} // Prevents accidental activation when not focused.
          disableThumbnail={true} // No preview thumbnails in break markers example.
          markers={pointMarkers} // Dynamic markers that change based on progress.
          currentValueIndicatorColor={(focused: boolean) =>
            focused ? COLORS.PRIMARY_BLUE : COLORS.GREY
          }
          segmentColors={segmentColors} // Color-coded segments for different content types.
          enableAnimations // Enable animations to have smooth transitions changing between positions.
        />
      </View>
    </View>
  );
};

export default BreakMarkers;
