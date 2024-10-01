import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TaskComponent from './TaskComponent';
import { useDayContext } from '@/context/DayContext';
import { TaskViewModel } from '@/models/TaskViewModel';
import Day from '@/models/Day';
import { AuthContext } from '@/context/AuthContext';

const TaskList = ({ tasksArr }: { tasksArr: any }) => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState<TaskViewModel[]>([tasksArr]);
  const { currentDate, view } = useDayContext();

  console.log('Tasks: ', tasks);
  console.log('TasksArr: ', tasksArr);
  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      {Array.isArray(tasksArr) &&
        tasksArr.map((task: TaskViewModel, index: number) => {
          if (view === "week" && index === 0) {
            return (
              <React.Fragment key={task.id}>
                <TaskComponent task={task} onToggleComplete={handleToggleComplete} />
                {tasksArr.length > 1 && 
                <Text>& more</Text>
                }
              </React.Fragment>
            );
          } else if (view !== "week") {
            return (
              <TaskComponent key={task.id} task={task} onToggleComplete={handleToggleComplete} />
            );
          }
          return null;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default TaskList;
