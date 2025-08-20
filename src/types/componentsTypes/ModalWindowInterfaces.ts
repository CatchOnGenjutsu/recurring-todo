import { JSX } from 'react';

export interface ModalWindowPropsInterface {
  onPressOverlay: () => void;
  onPressButton: () => void;
  modalSettings: ModalWindowSettingsInterface;
}

export interface ModalWindowSettingsInterface {
  isVisible: boolean;
  title?: string;
  textMessage?: string;
  content?: JSX.Element;
  buttonText?: string;
  buttons?: JSX.Element[];
}
