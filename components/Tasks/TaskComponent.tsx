import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Task } from '@/models/Task';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useDayContext } from '@/context/DayContext';
import { TaskViewModel } from '@/models/TaskViewModel';

interface TaskComponentProps {
  task: TaskViewModel;
  onToggleComplete: (id: string) => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, onToggleComplete }) => {
  const colorScheme = useColorScheme() || 'light';
  const [completed, setCompleted] = useState(task.completed);

  const { view } = useDayContext();

  const handleToggleComplete = () => {
    setCompleted(!completed);
    task.completed = !task.completed;
    Task.update(task);
    onToggleComplete(task.id);
  };

  return (
    <View style={styles.container}>
      {view == 'day' && (
        <Checkbox
          status={completed ? 'checked' : 'unchecked'}
          onPress={handleToggleComplete}
          color={Colors[colorScheme].tint}
        />
      )}
      
      <TouchableOpacity onPress={handleToggleComplete} style={styles.textContainer}>
        <Text style={[
          styles.text,
          completed && styles.completedText,
          { color: Colors[colorScheme].text }
        ]}>
            { view == 'week' && (
                <Text>
                    -&nbsp;
                </Text>)}
            <Text style={styles.title}>{task.title} </Text>
            {task.description && view == 'day' && (
                <Text>
                    - {task.description}
                </Text>
            )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
  },
  title:{
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskComponent;
