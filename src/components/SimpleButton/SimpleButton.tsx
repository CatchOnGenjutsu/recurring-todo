import { Text, TouchableOpacity } from 'react-native';
import { ButtonPropsInterface } from '../../types/componentsTypes/ButtonInterfaces';

const SimpleButton = ({
  buttonText,
  styles,
  onPress,
}: ButtonPropsInterface) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default SimpleButton;
