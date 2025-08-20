import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { COLORS } from '../../const/colors';

import { ModalWindowPropsInterface } from '../../types/componentsTypes/ModalWindowInterfaces';

const ModalWindow = ({
  modalSettings,
  onPressOverlay,
  onPressButton,
}: ModalWindowPropsInterface) => {
  return (
    <Modal transparent animationType="fade" visible={modalSettings.isVisible}>
      <TouchableWithoutFeedback onPress={onPressOverlay}>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalContainer}>
            {modalSettings.title && (
              <Text style={styles.title}>{modalSettings.title}</Text>
            )}
            {modalSettings.textMessage && (
              <Text style={styles.textMessage}>
                {modalSettings.textMessage}
              </Text>
            )}
            {modalSettings.content && modalSettings.content}

            {modalSettings.buttonText && (
              <Pressable style={styles.button} onPress={onPressButton}>
                <Text style={styles.buttonText}>
                  {modalSettings.buttonText}
                </Text>
              </Pressable>
            )}
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.overlay,
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    lineHeight: 21,
  },
});

export default ModalWindow;
