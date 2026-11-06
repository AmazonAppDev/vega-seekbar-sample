// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useRef} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Tile} from '../components/Tile';
import {Button} from '../components/Button';
import {tileData} from '../data/tileData';
import {COLORS} from '../constants/colors';
import {useIsFocused} from '@amazon-devices/react-navigation__native';
import {scaleUxToDp} from '../utils/scaleUxToDp';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const styles = getStyles();
  const tileRefs = useRef(tileData.map(() => React.createRef<any>()));
  const lastFocusedIndex = useRef(0);

  const isFocused = useIsFocused();

  if (isFocused) {
    setTimeout(() => {
      tileRefs.current[lastFocusedIndex.current]?.current?.requestTVFocus();
    }, 200);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.appName}>Seek Bar </Text>
              <View style={styles.separator} />
              <Text style={[styles.appName]}>Sample App</Text>
            </View>
            <View>
              <Image
                source={require('../assets/images/logo.png')}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
          </View>
        </View>

        <View style={styles.subtitleSection}>
          <Text style={styles.subtitle}>Examples </Text>

          <View style={styles.buttonContainer}>
            <Button text={'Docs'} navigation={navigation} />
          </View>
        </View>
      </View>

      {[0, 1, 2].map((rowIndex) => {
        const TILES_PER_ROW = 4;
        const startIndex = rowIndex * TILES_PER_ROW;
        const endIndex = startIndex + TILES_PER_ROW;
        const rowTiles = tileData?.slice(startIndex, endIndex) || [];

        return (
          <View key={rowIndex} style={styles.tilesRow}>
            {rowTiles.map((tile, index) => {
              const tileIndex = startIndex + index;
              return (
                <Tile
                  navigation={navigation}
                  key={index}
                  tile={tile}
                  tileRef={tileRefs.current[tileIndex]}
                  onFocus={() => {
                    lastFocusedIndex.current = tileIndex;
                  }}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.LIGHT_BLACK,
      paddingHorizontal: scaleUxToDp(50),
    },
    headerContainer: {
      height: '24%',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    leftSection: {
      justifyContent: 'space-evenly',
      marginBottom: scaleUxToDp(20),
    },
    subtitleSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleRow: {
      flexDirection: 'row',
      marginTop: scaleUxToDp(20),
    },
    separator: {
      width: scaleUxToDp(2),
      backgroundColor: 'white',
      marginLeft: scaleUxToDp(10),
      marginRight: scaleUxToDp(20),
      height: scaleUxToDp(30),
      marginTop: scaleUxToDp(7),
    },
    buttonContainer: {
      justifyContent: 'center',
      marginBottom: scaleUxToDp(20),
    },
    tilesRow: {
      flexDirection: 'row',
      height: '25.3%',
      backgroundColor: '#161616',
      justifyContent: 'flex-start',
    },
    logo: {
      width: scaleUxToDp(180),
      height: scaleUxToDp(40),
      marginTop: scaleUxToDp(10),
    },
    appName: {
      fontSize: scaleUxToDp(35),
      fontWeight: '500',
      color: 'white',
    },
    subtitle: {
      marginVertical: 0,
      fontSize: scaleUxToDp(55),
      fontWeight: '400',
      color: '#00ADE1',
    },
  });
