import { Platform, TouchableNativeFeedback, TouchableHighlight } from 'react-native';

export default (Platform.OS === 'ios') ? TouchableHighlight : TouchableNativeFeedback;
