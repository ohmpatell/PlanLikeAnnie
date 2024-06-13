import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Task } from '@/models/Task';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface TaskComponentProps {
  task: Task;
  onToggleComplete: (id: string) => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, onToggleComplete }) => {
  const colorScheme = useColorScheme() || 'light';
  const [completed, setCompleted] = useState(task.completed);

  const handleToggleComplete = () => {
    setCompleted(!completed);
    onToggleComplete(task.id);
  };

  return (
    <View style={styles.container}>
      <Checkbox
        status={completed ? 'checked' : 'unchecked'}
        onPress={handleToggleComplete}
        color={Colors[colorScheme].tint}
      />
      <TouchableOpacity onPress={handleToggleComplete} style={styles.textContainer}>
        <Text style={[
          styles.text,
          completed && styles.completedText,
          { color: Colors[colorScheme].text }
        ]}>
            <Text style={styles.title}>{task.name} </Text>
            {task.description && (
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
