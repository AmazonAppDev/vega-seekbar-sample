// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import {Pressable} from '@amazon-devices/react-native-kepler';
import LinearGradient from '@amazon-devices/react-linear-gradient';
import {COLORS} from '../constants/colors';
import Title from '../components/Title';

const Docs = ({navigation}: {navigation: any}) => {
  const [selectedQR, setSelectedQR] = useState(0);
  const firstButtonRef = useRef<any>(null);

  const docItems = [
    {
      title: 'API Documentation',
      description: 'Complete props and API reference for SeekBar component',
      qrImage: require('../assets/qrs/seekbar-docs.png'),
    },
    {
      title: 'Vega Sports App',
      description: 'Sports multimedia app with custom SeekBar integration',
      qrImage: require('../assets/qrs/vega-sports-app.png'),
    },
    {
      title: 'Vega Video App',
      description: 'Video player app with custom SeekBar integration',
      qrImage: require('../assets/qrs/vega-video-app.png'),
    },
  ];

  const scaleAnims = useRef(docItems.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    firstButtonRef.current?.focus();
  }, []);

  const handleFocus = (index: number) => {
    setSelectedQR(index);
  };

  return (
    <View style={styles.container}>
      <Title title="Documentation" navigation={navigation} />
      <View style={styles.mainContent}>
        <View style={styles.listContainer}>
          {docItems.map((item, index) => (
            <Animated.View
              key={index}
              style={{transform: [{scale: scaleAnims[index]}]}}>
              <Pressable
                ref={index === 0 ? firstButtonRef : null}
                style={({focused}) => {
                  Animated.timing(scaleAnims[index], {
                    toValue: focused ? 1.05 : 1,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();
                  return [
                    styles.button,
                    focused && styles.buttonFocused,
                    !focused && {backgroundColor: COLORS.TILE_BG_UNFOCUSED},
                  ];
                }}
                onFocus={() => {
                  handleFocus(index);
                }}>
                {({focused}: {focused: boolean}) => {
                  const content = (
                    <View style={styles.contentContainer}>
                      <Text style={styles.buttonText}>{item.title}</Text>
                      <Text style={styles.descriptionText}>
                        {item.description}
                      </Text>
                    </View>
                  );

                  return focused ? (
                    <LinearGradient
                      colors={[
                        COLORS.TILE_GRADIENT_START,
                        COLORS.TILE_GRADIENT_END,
                      ]}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.gradient}>
                      {content}
                    </LinearGradient>
                  ) : (
                    content
                  );
                }}
              </Pressable>
            </Animated.View>
          ))}
        </View>
        <View style={styles.qrContainer}>
          <Image
            source={docItems[selectedQR].qrImage}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLACK,
  },
  mainContent: {
    flex: 6,
    flexDirection: 'row',
    marginTop: 100,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 50,
  },
  qrContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    borderRadius: 15,
    marginVertical: 20,
    width: '100%',
    marginLeft: 20,
  },
  buttonFocused: {
    borderWidth: 1.5,
    borderColor: COLORS.TILE_BORDER,
  },
  gradient: {
    borderRadius: 15,
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    width: '100%',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.WHITE,
  },
  descriptionText: {
    fontSize: 25,
    color: COLORS.PRIMARY_BLUE,
  },
  qrImage: {
    width: 500,
    height: 500,
    borderWidth: 20,
    borderRadius: 20,
    borderColor: COLORS.LIGHT_GREY,
  },
});

export default Docs;
