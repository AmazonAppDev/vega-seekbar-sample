// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

// Renders only the first screen, like a stack at its initial route.
export const createStackNavigator = () => ({
  Navigator: ({children}) => {
    const [first] = React.Children.toArray(children);
    const Screen = first.props.component;
    return <Screen navigation={{}} />;
  },
  Screen: () => null,
});
