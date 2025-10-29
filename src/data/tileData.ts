// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export const tileData = [
  {
    name: 'basic-usage',
    title: 'Basic usage',
    description: 'Simple SeekBar with essential navigation and styling',
    detailedDescription:
      'Demonstrates fundamental SeekBar implementation with custom thumb icons, value change events, step-based seeking, and TV-optimized focus management. Perfect starting point for basic video player controls.',
    image: 'basic-usage.png',
  },
  {
    name: 'markers',
    title: 'Markers',
    description: 'SeekBar with custom tick marks and positioning',
    detailedDescription:
      'Shows how to add visual markers and tick marks along the seek bar for precise positioning. \nThis example includes custom marker nodes and arrow indicators for better visual feedback.',
    image: 'markers.png',
  },
  {
    name: 'break-markers',
    title: 'Break markers & segments',
    description: 'Dynamic markers with segment colors and animations',
    detailedDescription:
      'Advanced marker system with break points, segment coloring, and smooth animations. Ideal for content with ad breaks, chapters, or different content sections requiring visual distinction.',
    image: 'break-markers.png',
  },
  {
    name: 'seeking-limits',
    title: 'Seeking limits',
    description: 'SeekBar with restricted upper and lower limits',
    detailedDescription:
      'Implements seek limits to restrict user navigation within specific time ranges. Essential for content with restricted access or time-limited viewing windows.',
    image: 'seeking-limits.png',
  },
  {
    name: 'long-press',
    title: 'Long Press',
    description: 'Speed acceleration on button hold',
    detailedDescription:
      'Enables speed increase during long press interactions using left and right D-pad buttons on the remote control. \nFeatures configurable acceleration intervals, multipliers, and maximum step values for custom seeking experience.',
    image: 'long-press.png',
  },
  {
    name: 'fast-forward-rewind',
    title: 'Fast forward / Rewind',
    description: 'Skip controls with visual feedback labels',
    detailedDescription:
      'Implements fast forward and rewind functionality using skip forward (>>) and skip backward (<<) single button presses with visual speed indicators and custom labels. Includes skip acceleration modes and directional feedback for intuitive navigation.',
    image: 'fffr.png',
  },
  {
    name: 'thumbnail-images',
    title: 'Thumbnail images',
    description: 'Video preview images during seek interactions',
    detailedDescription:
      'Displays video frame thumbnails during seeking operations with custom labels and formatting. Enhances user experience by showing visual previews of content at different time positions.',
    image: 'thumbnail.png',
  },
  {
    name: 'custom-disabling',
    title: 'Custom disabling configuration',
    description: 'Granular control over interaction types and states',
    detailedDescription:
      'Demonstrates partial disabling configuration for fine-grained control over specific interactions. \nWhen the seekbar is not focused, D-pad controls are disabled while fast forward and rewind buttons (<< | >>) remain enabled.\n\nAllows selective enabling/disabling of skip, select, navigation, and playback controls based on focus state.',
    image: 'disabling.png',
  },
  {
    name: 'live-tv',
    title: 'Live TV',
    description: 'Dynamic limits for live streaming content',
    detailedDescription:
      'Specialized implementation for live streaming with dynamic seek limits, live point indicators, and segment colors. \nFeatures real-time boundary updates and live content visualization.',
    image: 'live.png',
  },
  {
    name: 'advanced-usage',
    title: 'Advanced usage',
    description: 'Full-featured SeekBar with all advanced capabilities',
    detailedDescription:
      'Comprehensive example showcasing all SeekBar features including thumbnails, markers, animations, acceleration modes, custom labels, and complete event handling for professional video player implementation.',
    image: 'advanced-usage.png',
  },
];
