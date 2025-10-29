// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import {Pressable} from '@amazon-devices/react-native-kepler';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

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
    marginTop: 20,
    width: 200,
    height: 60,
    backgroundColor: 'rgba(59,59,59,0.25)',
    borderRadius: 30,
  },
  tileFocused: {
    backgroundColor: 'rgba(59,59,59,0.4)',
    borderWidth: 1,
    borderColor: 'white',
    transform: [{scale: 1.1}],
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
});
