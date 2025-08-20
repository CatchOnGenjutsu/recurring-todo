import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonPropsInterface {
  styles: {
    button: StyleProp<ViewStyle>;
    buttonText: StyleProp<TextStyle>;
  };
  buttonText: string;
  onPress: () => void;
}
