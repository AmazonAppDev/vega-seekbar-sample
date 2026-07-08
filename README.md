Vega Seek Bar Sample App
========================

The Vega Seek Bar Sample App demonstrates how to implement advanced seek bar functionality for TV apps with comprehensive examples and TV-optimized interactions.

![App Preview](./docs/images/home.png)

Introduction
------------

**Key features**

- Basic implementations with playback controls for video progress tracking.
- Advanced implementations with trickplay images, Live TV support, and dynamic seeking limits.
- Seeking controls including fast forward, rewind, and long press.
- Visual feedback with markers for advertising and video segments.
- Optimized navigation for TV remote controls when seeking.
- Custom disabling configurations.
- Speed acceleration and skip controls.

**Note**: While this app contains recommendations, there are always different approaches to building components, screens, or using libraries. This guide serves as a starting point for what needs to be done, but we encourage you to explore and adopt best practices that suit your specific project requirements.


Build and run the app
---------------------

### Prerequisites

Before you launch the sample app, make sure that you have [installed the Vega Developer Tools](https://developer.amazon.com/docs/vega/latest/install-vega-sdk.html) and NodeJS 18-20.

### Step 1: Build the app

After you download the source code from GitHub, you can build the Vega Seek Bar Sample App from the command line to generate VPKG files. The VPKG files run on the Vega Virtual Device and Vega OS Fire TV Stick.

You can also use [Vega Studio](https://developer.amazon.com/docs/vega/latest/setup-extension.html) with Visual Studio Code to build the app.

1. At the command prompt, navigate to the Vega Seek Bar Sample App source code directory. 

2. To install the app dependencies, run the following command. 

   ```
   npm install
   ```

3. To build the app to generate .vpkg files, run the following command.

   ```
   npm run build:app
   ```

4. At the command prompt, in the **build** folder, verify that you generated the VPKG files for your device's architecture.

   - **armv7-release/vegaseekbarapp_armv7.vpkg**&mdash;generated on x86_64 and Mac-M series devices to run on the Vega OS Fire TV Stick.
   - **x86_64-release/vegaseekbarapp_x86_64.vpkg**&mdash;generated on x86_64 device to run on the VVD.
   - **aarch64-release/vegaseekbarapp_aarch64.vpkg**&mdash;generated on Mac M-series device to run on the VVD.

### Step 2: Run the app

#### Vega Virtual Device

1. To start the Vega Virtual Device, at the command prompt, run the following command.

   ```
   vega virtual-device start
   ```

2. Go to the directory where you placed the VPKG files. 

3. To install and launch the app on the Vega Virtual Device, run the following command, depending on your device architecture.

   - On Mac M-series based devices.

     ```
     vega run-app build/aarch64-release/vegaseekbarapp_aarch64.vpkg
     ```

   - On x86_64 based devices.
     ```
     vega run-app build/x86_64-release/vegaseekbarapp_x86_64.vpkg
     ```

#### Vega OS Fire TV Stick

1. Turn on your Vega OS Fire TV Stick.

2. To install and launch the app on your Vega OS Fire TV Stick, run the following command.

   ```
   vega run-app build/armv7-release/vegaseekbarapp_armv7.vpkg
   ```

Seek bar examples
-----------------

The app includes comprehensive seek bar examples accessible from the home screen. Each example corresponds to a complete implementation in the `src/screens` folder, providing ready-to-use code snippets that you can integrate into your own apps.

- **[Basic usage](./src/screens/BasicUsage.tsx)**&mdash;Simple SeekBar with essential navigation and styling, demonstrating fundamental implementation with custom thumb icons and TV-optimized focus management. 

  ![Basic Usage](./docs/images/basic-usage.png)



- **[Markers](./src/screens/WithMarkers.tsx)**&mdash;SeekBar with custom tick marks and positioning, showing how to add visual markers and arrow indicators for precise positioning.

  ![Markers](./docs/images/markers.png)



- **[Break Markers & Segments](./src/screens/BreakMarkers.tsx)**&mdash;Advanced marker system with break points, segment coloring, and smooth animations for content with ad breaks or chapters.

  ![Break Markers & Segments](./docs/images/break-markers.png)



- **[Seeking Limits](./src/screens/Limits.tsx)**&mdash;SeekBar with restricted upper and lower limits to restrict user navigation within specific time ranges.

  ![Seeking Limits](./docs/images/seeking-limits.png)



- **[Long Press](./src/screens/LongPress.tsx)**&mdash;Progressive speed acceleration on button hold using D-pad buttons with configurable acceleration intervals and multipliers.

  ![Long Press](./docs/images/long-press.png)



- **[Fast Forward / Rewind](./src/screens/FastForwardRewind.tsx)**&mdash;Skip controls with visual feedback labels implementing fast forward and rewind functionality with speed indicators.

  ![Fast Forward / Rewind](./docs/images/fast-forward-rewind.png)



- **[Thumbnail Images](./src/screens/Thumbnail.tsx)**&mdash;Video preview images during seek interactions with custom labels and formatting for enhanced user experience.

  ![Thumbnail Images](./docs/images/images.png)



- **[Custom Disabling Configuration](./src/screens/CustomDisablingConfig.tsx)**&mdash;Granular control over interaction types and states with selective enabling/disabling of controls based on focus state.

  ![Disabling Configuration](./docs/images/disabling.png)



- **[Live TV](./src/screens/LiveTV.tsx)**&mdash;Dynamic limits for live streaming content with real-time updates and live point indicators.

  ![Live TV](./docs/images/live-tv.png)



- **[Advanced Usage](./src/screens/ComplexUsage.tsx)**&mdash;Comprehensive example showcasing all SeekBar features including thumbnails, markers, animations, and complete event handling.

  ![Advanced Usage](./docs/images/advanced-usage.png)

Troubleshooting the app
-----------------------

If you're facing unexpected issues while trying to build and run the app (for example, the build is failing randomly, the app is not starting, the app is crashing randomly), try the following solutions:

1. To remove the **node_modules** folder, the **package-lock.json** file and other files related to your previous builds, run the following command. 

   ```
   npm run clean
   ```

2. To clear the cache while you are working in debug mode, run the following command. 
   
   ```
   npm run start -- --reset-cache
   ```

## Credits and attribution

All screenshots, images, and icons in the **./docs/images/**, **./src/assets/** directories were created internally by Amazon and are included under the same license as this project.


License
-------

See [LICENSE](LICENSE.txt) file.

Release notes
-------------

### v0.21

Welcome to the first release of the Vega Seek Bar Sample App! This sample app provides you with everything needed to implement professional-grade seek bar functionality in Fire TV apps.

**Core Features**

- **10 Complete Seek Bar Examples**&mdash;From basic usage to advanced implementations with live TV support.
- **TV-First Design**&mdash;Built specifically for Fire TV with optimized remote control interactions and focus management.
- **Production-Ready Components**&mdash;Professional seek bar implementations ready for integration into your apps.

**Example Library**

- **Basic Usage**&mdash;Basic seek bar with essential controls.
- **Visual Markers**&mdash;Custom tick marks and positioning indicators.
- **Break Markers & Segments**&mdash;Advanced marker system with animations and segment coloring.
- **Seeking Limits**&mdash;Limit restrictions for controlled navigation.
- **Long Press Controls**&mdash;Progressive speed acceleration with configurable intervals.
- **Fast Forward/Rewind**&mdash;Skip functionality with visual feedback.
- **Thumbnail Previews**&mdash;Video frame thumbnails during seeking.
- **Custom Disabling**&mdash;Detailed control over interaction states.
- **Live TV Support**&mdash;Dynamic limits for streaming content.
- **Advanced Integration**&mdash;Complete feature showcase with professional implementation control over interaction states.
