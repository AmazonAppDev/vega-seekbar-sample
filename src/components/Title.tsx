// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {COLORS} from '../constants/colors';
import {Pressable} from '@amazon-devices/react-native-kepler';

const ARROW_BACK = require('../assets/images/arrow-back.png');

interface TitleProps {
  title: string;
  navigation: any;
}

const Title = ({title, navigation}: TitleProps) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Pressable
          onPress={handleBack}
          style={({focused}) => [
            styles.backButton,
            focused && styles.backButtonFocused,
          ]}>
          <Image
            source={ARROW_BACK}
            style={styles.backArrow}
            resizeMode="center"
          />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    marginHorizontal: 80,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
    marginLeft: -25,
  },
  backButtonFocused: {
    borderColor: COLORS.TILE_BORDER,
    backgroundColor: COLORS.TILE_BG_UNFOCUSED,
  },
  backArrow: {
    width: 50,
    height: 50,
    tintColor: COLORS.WHITE,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});

export default Title;
