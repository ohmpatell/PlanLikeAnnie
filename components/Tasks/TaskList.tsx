import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskComponent from './TaskComponent';
import { useDayContext } from '@/context/DayContext';
import { TaskViewModel } from '@/models/TaskViewModel';
import Day from '@/models/Day';
import { AuthContext } from '@/context/AuthContext';

const TaskList = ({ date }: { date: any }) => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState<TaskViewModel[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("DATE: ", date);
      const day = new Day(new Date(date));
      console.log("DAY: ", day);
      const tasks = await day.fetchTasks(currentUser.uid);
      setTasks(tasks);
    };

    fetchTasks();
  }, [date, currentUser.uid]);

  const handleToggleComplete = (id: string) => {
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
