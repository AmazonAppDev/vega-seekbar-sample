// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {getTileByName} from '../utils/tileUtils';
import {scaleUxToDp} from '../utils/scaleUxToDp';

interface DescriptionProps {
  tileName: string;
}

const Description = ({tileName}: DescriptionProps) => {
  const tileInfo = getTileByName(tileName);

  if (!tileInfo) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{tileInfo.detailedDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignSelf: 'flex-start',
    marginLeft: scaleUxToDp(80),
    marginHorizontal: scaleUxToDp(80),
  },
  description: {
    fontSize: scaleUxToDp(27),
    color: COLORS.WHITE,
    lineHeight: scaleUxToDp(50),
  },
});

export default Description;
