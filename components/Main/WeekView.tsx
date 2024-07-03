// @/components/Main/WeekView.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import TaskList from '@/components/Tasks/TaskList';
import { useDayContext } from '@/context/DayContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const WeekView: React.FC = () => {
  const { currentDate, getWeekRange, setCurrentDate, setView, isNotes, setIsNotes, todaysDate } = useDayContext();
  const [week, setWeek] = useState(getWeekRange(currentDate));
  const [prevDate, setPrevDate] = useState(currentDate);
  const translateX = useSharedValue(0);

  useEffect(() => {
    setIsNotes(false);
    const newWeek = getWeekRange(currentDate);
    const direction = currentDate > prevDate ? 1 : -1;


    runOnJS(setWeek)(newWeek);

    if (newWeek.some((date: any, i: any) => date !== week[i])) {
        translateX.value = withTiming(direction * -400, { duration: 200 }, () => {
        translateX.value = direction * 400;
        translateX.value = withTiming(0, { duration: 200 });
      });
    }

    runOnJS(setPrevDate)(currentDate);
  }, [currentDate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleDayPress = (date?: Date) => {
    date ? setCurrentDate(date) : setIsNotes(true);
    setView('day');
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const renderDayBox = (day: string, index: number) => (
    <TouchableOpacity style={styles.dayBox} key={day} onPress={() => handleDayPress(week[index])}>
      <Text style={[styles.dayTitle, week[index].toDateString() === todaysDate.toDateString() ? styles.todayTitle : null]}>
        {`${day}, ${week[index].getDate()}`}
      </Text>      
      <TaskList date={week[index]}/>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.weekContainer, animatedStyle]}>
        {week.map((_: any, index: any) => renderDayBox(days[index], index))}
        <TouchableOpacity style={styles.dayBox} onPress={() => handleDayPress()}>
          <Text style={styles.dayTitle}>Notes</Text>
          <TaskList date={"notes"}/>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  weekContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  dayBox: {
    width: '48%',
    height: 165,
    marginBottom: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 1,
    borderRadius: 50,
    textAlign: 'center',
  },

  todayTitle: {
    backgroundColor: Colors.light.accent,
  },
});

export default WeekView;
