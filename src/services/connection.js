import { NetInfo } from 'react-native';

export default {
  get() {
    return new Promise((resolve) => {
      NetInfo.addEventListener('connectionChange', ({ type }) => resolve(type));
    });
  },
};

// Cross platform values for ConnectionType:
// none - device is offline
// wifi - device is online and connected via wifi, or is the iOS simulator
// cellular - device is connected via Edge, 3G, WiMax, or LTE
// unknown - error case and the network status is unknown
