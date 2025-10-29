// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Title from './Title';
import Icon from './Icon';
import Description from './Description';

interface HeaderProps {
  title: string;
  name: string;
  navigation: any;
}

const Header = ({title, name, navigation}: HeaderProps) => (
  <>
    <Title title={title} navigation={navigation} />
    <Icon name={name} />
    <Description tileName={name} />
  </>
);

export default Header;
