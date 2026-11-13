// Provide Dimensions mock before any RN module loads
jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
  const dimensions = {width: 1920, height: 1080, scale: 1, fontScale: 1};
  return {
    __esModule: true,
    default: {
      get: jest.fn(() => dimensions),
      set: jest.fn(),
      addEventListener: jest.fn(() => ({remove: jest.fn()})),
      removeEventListener: jest.fn(),
    },
  };
});

// Mock NativeAnimatedModule
jest.mock('react-native/Libraries/Animated/NativeAnimatedModule', () => ({
  __esModule: true,
  default: {
    startOperationBatch: jest.fn(),
    finishOperationBatch: jest.fn(),
    createAnimatedNode: jest.fn(),
    updateAnimatedNodeConfig: jest.fn(),
    getValue: jest.fn(),
    startListeningToAnimatedNodeValue: jest.fn(),
    stopListeningToAnimatedNodeValue: jest.fn(),
    connectAnimatedNodes: jest.fn(),
    disconnectAnimatedNodes: jest.fn(),
    startAnimatingNode: jest.fn(),
    stopAnimation: jest.fn(),
    setAnimatedNodeValue: jest.fn(),
    setAnimatedNodeOffset: jest.fn(),
    flattenAnimatedNodeOffset: jest.fn(),
    extractAnimatedNodeOffset: jest.fn(),
    connectAnimatedNodeToView: jest.fn(),
    disconnectAnimatedNodeFromView: jest.fn(),
    restoreDefaultValues: jest.fn(),
    dropAnimatedNode: jest.fn(),
    addAnimatedEventToView: jest.fn(),
    removeAnimatedEventFromView: jest.fn(),
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  },
}));
