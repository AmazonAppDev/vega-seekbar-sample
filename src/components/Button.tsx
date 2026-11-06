// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import {Pressable} from '@amazon-devices/react-native-kepler';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {scaleUxToDp} from '../utils/scaleUxToDp';

interface ButtonProps {
  text: string;
  navigation: any;
}

export const Button = ({text, navigation}: ButtonProps) => {
  return (
    <Pressable
      onPress={() => navigation.navigate('docs')}
      focusable={true}
      style={({focused}) => [styles.tile, focused && styles.tileFocused]}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tile: {
    justifyContent: 'center',
    marginTop: scaleUxToDp(20),
    width: scaleUxToDp(200),
    height: scaleUxToDp(60),
    backgroundColor: 'rgba(59,59,59,0.25)',
    borderRadius: scaleUxToDp(30),
  },
  tileFocused: {
    backgroundColor: 'rgba(59,59,59,0.4)',
    borderWidth: scaleUxToDp(1),
    borderColor: 'white',
    transform: [{scale: 1.1}],
  },
  buttonText: {
    color: 'white',
    fontSize: scaleUxToDp(25),
    fontWeight: '600',
    textAlign: 'center',
  },
});
