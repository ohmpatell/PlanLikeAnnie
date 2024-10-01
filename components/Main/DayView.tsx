// @/components/Main/DayView.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import TaskList from '@/components/Tasks/TaskList';
import { useDayContext } from '@/context/DayContext';
import DayNavigation from '@/components/Main/DayNavigation';
import Day from '@/models/Day';
import { AuthContext } from '@/context/AuthContext';

const DayView: React.FC = () => {
  const { currentDate, getDayTasks, isNotes } = useDayContext();
  const [tasks, setTasks] = useState(getDayTasks(currentDate));
  const translateX = useSharedValue(0);
  const [prevDate, setPrevDate] = useState(currentDate);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      const day = new Day(new Date(currentDate));
      const t = await day.fetchTasks(currentUser.uid);
      // console.log('Tasks fetched: ', t);
      setTasks(t);
    };
    fetchTasks();

    // console.log('Tasks: ', tasks);
    const direction = currentDate > prevDate ? 1 : -1;

    translateX.value = withTiming(direction * -400, { duration: 200 }, () => {

      translateX.value = direction * 400;
      translateX.value = withTiming(0, { duration: 200 });
    });

    runOnJS(setPrevDate)(currentDate);
  }, [currentDate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.tasksContainer, animatedStyle]}>
        <Text style={styles.dateTitle}>{isNotes ? 'Notes' : currentDate.toDateString()}</Text>
        {tasks.length > 0 && 
          <TaskList tasksArr={tasks}/>
        }
        </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  tasksContainer: {
    padding: 10,
  },
  dateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DayView;
