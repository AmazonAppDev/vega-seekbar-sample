// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import {tileData} from '../data/tileData';

export const getTileByName = (name: string) => {
  return tileData.filter((tile) => tile.name === name)[0];
};
