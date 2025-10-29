// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import {HomeScreen} from './screens/HomeScreen';
import {NavigationContainer} from '@amazon-devices/react-navigation__native';
import {createStackNavigator} from '@amazon-devices/react-navigation__stack';
import BasicUsage from './screens/BasicUsage';
import WithMarkers from './screens/WithMarkers';
import BreakMarkers from './screens/BreakMarkers';
import Limits from './screens/Limits';
import LongPress from './screens/LongPress';
import FastForwardRewind from './screens/FastForwardRewind';
import Thumbnail from './screens/Thumbnail';
import CustomDisablingConfig from './screens/CustomDisablingConfig';
import LiveTV from './screens/LiveTV';
import ComplexUsage from './screens/ComplexUsage';
import Docs from './screens/Docs';

const Stack = createStackNavigator();

export const App = () => {
  const screenOptions = {animationEnabled: false, headerShown: false};

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen key={1} name={'home'} component={HomeScreen} />
        <Stack.Screen key={2} name={'basic-usage'} component={BasicUsage} />
        <Stack.Screen key={3} name={'markers'} component={WithMarkers} />
        <Stack.Screen key={4} name={'break-markers'} component={BreakMarkers} />
        <Stack.Screen key={5} name={'seeking-limits'} component={Limits} />
        <Stack.Screen key={6} name={'long-press'} component={LongPress} />
        <Stack.Screen
          key={7}
          name={'fast-forward-rewind'}
          component={FastForwardRewind}
        />
        <Stack.Screen key={8} name={'thumbnail-images'} component={Thumbnail} />
        <Stack.Screen
          key={9}
          name={'custom-disabling'}
          component={CustomDisablingConfig}
        />
        <Stack.Screen key={10} name={'live-tv'} component={LiveTV} />
        <Stack.Screen
          key={11}
          name={'advanced-usage'}
          component={ComplexUsage}
        />
        <Stack.Screen key={12} name={'docs'} component={Docs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
