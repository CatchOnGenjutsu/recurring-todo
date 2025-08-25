import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useForm } from 'react-hook-form';

import FormField from '../../../components/FormField/FormField';
import SimpleButton from '../../../components/SimpleButton/SimpleButton';
import ModalWindow from '../../../components/ModalWindow/ModalWindow';

import {
  buttonStyles,
  formFieldDefaultValues,
  formFieldsSettings,
  RegistrationFormValuesInterface,
} from './registrationScreenData';

import { COLORS } from '../../../const/colors';

import { UsersRepository } from '../../../db/repositories/UsersRepository';
import { ModalWindowSettingsInterface } from '../../../types/componentsTypes/ModalWindowInterfaces';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
const RegistrationScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalSettings, setModalSettings] =
    useState<ModalWindowSettingsInterface>({
      isVisible: false,
      buttonText: 'Закрыть',
    });
  const { control, handleSubmit, getValues, reset } =
    useForm<RegistrationFormValuesInterface>({
      defaultValues: formFieldDefaultValues,
    });

  const addUser = async (data: RegistrationFormValuesInterface) => {
    console.log('data', data);

    try {
      await UsersRepository.create(data.name, data.email, data.password);
      const updatedUsers = await UsersRepository.getAll();
      setUsers(updatedUsers);
      setModalSettings((prev) => ({
        ...prev,
        isVisible: true,
        content: (
          <Text style={styles.successText}>
            {'Вы успешно зарегистрировались'}
          </Text>
        ),
      }));
    } catch (error: any) {
      console.log(error);
      setModalSettings((prev) => ({
        ...prev,
        isVisible: true,
        content: (
          <Text style={styles.errorText}>
            {error.message || 'Ошибка регистрации'}
          </Text>
        ),
      }));
    }
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Регистрация</Text>
      <FlatList
        data={formFieldsSettings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FormField field={item} control={control} getValues={getValues} />
        )}
      />
      <SimpleButton
        buttonText="Зарегистрироваться"
        styles={buttonStyles}
        onPress={handleSubmit(addUser)}
      />
      <ModalWindow
        modalSettings={modalSettings}
        onPressOverlay={() => {
          setModalSettings((prev) => ({ ...prev, isVisible: false }));
          reset();
        }}
        onPressButton={() => {
          setModalSettings((prev) => ({ ...prev, isVisible: false }));
          reset();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  errorText: {
    color: COLORS.error,
  },
  successText: {
    color: COLORS.primary,
  },
});

export default RegistrationScreen;
