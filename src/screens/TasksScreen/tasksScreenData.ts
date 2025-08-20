import { StyleSheet } from 'react-native';

import { COLORS } from '../../const/colors';

import { FieldConfigInterface } from '../../types/componentsTypes/FormFieldInterfaces';
import { Task } from '../../types/componentsTypes/TaskItemInterfaces';

export const formFieldSettings: FieldConfigInterface = {
  id: 'newTask',
  type: 'text',
  placeholder: 'Введите название задачи',
  isRequired: true,
};

export const mockTasksData: Task[] = [
  { id: '1', title: 'Купить быстро', completed: false },
  { id: '2', title: 'Сделать зарядку', completed: false },
  { id: '3', title: 'Почитать 20 минут', completed: false },
];

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
