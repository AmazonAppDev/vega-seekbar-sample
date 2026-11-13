// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('@amazon-devices/react-navigation__native', () => {
  const actual = jest.requireActual('@amazon-devices/react-navigation__native');
  return {
    ...actual,
    useIsFocused: () => false,
  };
});

import {App} from '../src/App';

beforeEach(() => jest.useFakeTimers());
afterEach(async () => {
  await ReactTestRenderer.act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

describe('Template App Snapshot tests', () => {
  test('Initial App screen', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<App />);
    });
  });
});
