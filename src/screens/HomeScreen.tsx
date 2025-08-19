import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useForm } from 'react-hook-form';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import FormField from '../components/FormField/FormField';
import { COLORS } from '../const/colors';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

interface NewTaskValue {
  newTask: string;
}

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Купить быстро', completed: false },
    { id: '2', title: 'Сделать зарядку', completed: false },
    { id: '3', title: 'Почитать 20 минут', completed: false },
  ]);

  const { control, getValues, reset, handleSubmit } = useForm<NewTaskValue>({
    defaultValues: { newTask: '' },
  });

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const addTask = (data: NewTaskValue) => {
    setTasks((prev) => [
      ...prev,
      { id: uuidv4(), title: data.newTask, completed: false },
    ]);
    reset();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Мои задачи</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleTask(item.id)}
            style={styles.task}
          >
            <Text style={[styles.taskText, item.completed && styles.completed]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Добавить задачу</Text>
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
            reset();
          }}
        >
          <View style={styles.modalOverlay}>
            <Pressable style={styles.modalContainer}>
              <Text style={styles.header}>Добавить задачу</Text>
              <FormField
                field={{
                  id: 'newTask',
                  type: 'text',
                  placeholder: 'Введите название задачи',
                  isRequired: true,
                }}
                control={control}
                getValues={getValues}
              />

              <Pressable style={styles.button} onPress={handleSubmit(addTask)}>
                <Text style={styles.buttonText}>Добавить</Text>
              </Pressable>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  completed: {
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
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
  modalContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
    flex: 1,
    justifyContent: 'center',
  },
  task: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    padding: 15,
  },
  taskText: {
    fontSize: 18,
  },
});
