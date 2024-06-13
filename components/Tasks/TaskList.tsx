import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskComponent from './TaskComponent';
import Task from '@/models/Task';

const taskData = new Task('user123', 'Learn Firebase', 'Complete Firebase integration', new Date());

const TaskList = () => {
  const [tasks, setTasks] = useState([taskData]);

  const handleToggleComplete = (id: any) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} onToggleComplete={handleToggleComplete} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default TaskList;