import { useState } from 'react';
import { Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';

import ModalWindow from '../../components/ModalWindow/ModalWindow';
import FormField from '../../components/FormField/FormField';
import TaskItem from '../../components/TaskItem/TaskItem';
import SimpleButton from '../../components/SimpleButton/SimpleButton';

import { COLORS } from '../../const/colors';
import {
  buttonStyles,
  formFieldSettings,
  mockTasksData,
} from './tasksScreenData';

import { ModalWindowSettingsInterface } from '../../types/componentsTypes/ModalWindowInterfaces';
import {
  NewTaskValue,
  Task,
} from '../../types/componentsTypes/TaskItemInterfaces';

const HomeScreen = () => {
  const { control, getValues, reset, handleSubmit } = useForm<NewTaskValue>({
    defaultValues: { newTask: '' },
  });

  const [tasks, setTasks] = useState<Task[]>(mockTasksData);
  const [modalSettings, setModalSettings] =
    useState<ModalWindowSettingsInterface>({
      isVisible: false,
      title: 'Добавить задачу',
      buttonText: 'Добавить',
      content: (
        <FormField
          field={formFieldSettings}
          control={control}
          getValues={getValues}
        />
      ),
    });

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const addTask = (data: NewTaskValue) => {
    setTasks((prev) => [
      ...prev,
      {
        id: prev.at(-1)!.id + 1,
        title: data.newTask,
        isCompleted: false,
        dueDate: new Date(),
        createdAt: new Date(),
        repeatType: 'daily',
      },
    ]);
    reset();
    setModalSettings((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Мои задачи</Text>

        <FlatList
          data={tasks}
          keyExtractor={(item, index) => item.id + index.toString()}
          renderItem={({ item }) => (
            <TaskItem item={item} toggleTask={toggleTask} />
          )}
        />
        <SimpleButton
          buttonText="Добавить задачу"
          styles={buttonStyles}
          onPress={() =>
            setModalSettings((prev) => ({ ...prev, isVisible: true }))
          }
        />

        <ModalWindow
          modalSettings={modalSettings}
          onPressOverlay={() => {
            setModalSettings((prev) => ({ ...prev, isVisible: false }));
            reset();
          }}
          onPressButton={handleSubmit(addTask)}
        />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

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
  },
});
