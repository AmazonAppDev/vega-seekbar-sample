// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {getTileByName} from '../utils/tileUtils';

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
    marginLeft: 80,
    marginHorizontal: 80,
  },
  description: {
    fontSize: 27,
    color: COLORS.WHITE,
    lineHeight: 50,
  },
});

export default Description;
