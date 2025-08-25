import { StyleSheet } from 'react-native';

import { COLORS } from '../../../const/colors';

import { FieldConfigInterface } from '../../../types/componentsTypes/FormFieldInterfaces';

export const formFieldsSettings: FieldConfigInterface[] = [
  {
    id: 'name',
    type: 'text',
    placeholder: 'Введите имя',
    isRequired: true,
  },
  {
    id: 'email',
    type: 'text',
    placeholder: 'Введите почту',
    isRequired: true,
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Введите пароль',
    isRequired: true,
  },
];

export interface RegistrationFormValuesInterface {
  name: string;
  email: string;
  password: string;
}

export const formFieldDefaultValues: RegistrationFormValuesInterface = {
  name: '',
  email: '',
  password: '',
};

export const buttonStyles = StyleSheet.create({
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
