// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface ScreenProps {
  route: {
    params?: {
      tile?: {
        name: string;
        title: string;
      };
    };
  };
  navigation: any;
}