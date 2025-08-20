import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { TaskItemPropsInterface } from '../../types/componentsTypes/TaskItemInterfaces';
import { COLORS } from '../../const/colors';

const TaskItem = ({ item, toggleTask }: TaskItemPropsInterface) => {
  return (
    <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.task}>
      <Text style={[styles.taskText, item.completed && styles.completed]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  completed: {
    color: COLORS.primary,
    textDecorationLine: 'line-through',
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

export default TaskItem;
