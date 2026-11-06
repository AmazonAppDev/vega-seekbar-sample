// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {scaleUxToDp} from '../utils/scaleUxToDp';

interface IconProps {
  name: string;
}

const imageMap: {[key: string]: any} = {
  'basic-usage': require('../assets/images/basic-usage.png'),
  markers: require('../assets/images/markers.png'),
  'break-markers': require('../assets/images/break-markers.png'),
  'seeking-limits': require('../assets/images/seeking-limits.png'),
  'long-press': require('../assets/images/long-press.png'),
  'fast-forward-rewind': require('../assets/images/fffr.png'),
  'thumbnail-images': require('../assets/images/thumbnail.png'),
  'custom-disabling': require('../assets/images/disabling.png'),
  'live-tv': require('../assets/images/live.png'),
  'advanced-usage': require('../assets/images/advanced-usage.png'),
};

const Icon = ({name}: IconProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageMap[name]}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scaleUxToDp(80),
    flex: 1.1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginBottom: scaleUxToDp(20),
    marginTop: scaleUxToDp(10),
  },
  image: {
    width: scaleUxToDp(200),
    height: scaleUxToDp(150),
  },
});

export default Icon;
