// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useRef} from 'react';
import {View, StyleSheet, Animated, Text, Image} from 'react-native';
import {Pressable} from '@amazon-devices/react-native-kepler';
import {COLORS} from '../constants/colors';
import {scaleUxToDp} from '../utils/scaleUxToDp';

interface TileProps {
  tile: {
    name: string;
    title: string;
    description: string;
    image: string;
  };
  navigation: any;
  tileRef?: React.RefObject<any>;
  onFocus?: () => void;
}

const imageMap: {[key: string]: any} = {
  'basic-usage.png': require('../assets/images/basic-usage.png'),
  'markers.png': require('../assets/images/markers.png'),
  'break-markers.png': require('../assets/images/break-markers.png'),
  'seeking-limits.png': require('../assets/images/seeking-limits.png'),
  'long-press.png': require('../assets/images/long-press.png'),
  'fffr.png': require('../assets/images/fffr.png'),
  'thumbnail.png': require('../assets/images/thumbnail.png'),
  'disabling.png': require('../assets/images/disabling.png'),
  'live.png': require('../assets/images/live.png'),
  'advanced-usage.png': require('../assets/images/advanced-usage.png'),
};

export const Tile = ({tile, navigation, tileRef, onFocus}: TileProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPress = () => {
    navigation.navigate(tile.name, {tile});
  };

  return (
    <Animated.View style={[styles.tile, {transform: [{scale: scaleAnim}]}]}>
      <Pressable
        ref={tileRef}
        focusable={true}
        style={({focused}) => {
          Animated.timing(scaleAnim, {
            toValue: focused ? 1.08 : 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
          return [
            styles.pressable,
            focused && styles.tileFocused,
            !focused && {backgroundColor: COLORS.TILE_BG_UNFOCUSED},
          ];
        }}
        onFocus={onFocus}
        onPress={onPress}>
        {({focused}: {focused: boolean}) => {
          const content = (
            <View style={styles.contentContainer}>
              <Image
                source={imageMap[tile.image]}
                resizeMode="contain"
                style={styles.icon}
              />
              <Text style={styles.title}>{tile.title}</Text>
              <Text style={styles.description}>{tile.description}</Text>
            </View>
          );

          return focused ? (
            <View
              style={[
                styles.gradient,
                {
                  experimental_backgroundImage: `linear-gradient(to right, ${COLORS.TILE_GRADIENT_START}, ${COLORS.TILE_GRADIENT_END})`,
                },
              ]}>
              {content}
            </View>
          ) : (
            content
          );
        }}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tile: {
    marginTop: scaleUxToDp(10),
    width: '23%',
    height: '85%',
    marginRight: '2.5%',
  },
  pressable: {
    flex: 1,
    borderRadius: scaleUxToDp(15),
  },
  tileFocused: {
    borderWidth: scaleUxToDp(1.5),
    borderColor: COLORS.TILE_BORDER,
  },
  gradient: {
    flex: 1,
    borderRadius: scaleUxToDp(15),
  },
  icon: {
    width: scaleUxToDp(100),
    height: scaleUxToDp(50),
    marginTop: scaleUxToDp(20),
  },
  contentContainer: {
    paddingHorizontal: scaleUxToDp(30),
    flex: 1,
  },
  title: {
    fontSize: scaleUxToDp(25),
    color: COLORS.WHITE,
    fontWeight: '500',
    marginVertical: scaleUxToDp(5),
  },
  description: {
    fontSize: scaleUxToDp(18),
    color: COLORS.TILE_DESCRIPTION,
    fontWeight: '500',
    marginTop: scaleUxToDp(10),
  },
});
