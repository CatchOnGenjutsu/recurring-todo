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
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  task: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
