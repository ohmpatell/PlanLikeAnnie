import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskList from '@/components/Tasks/TaskList';

const WeekView = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Notes'];

  const renderDayBox = (day: any) => (
    <View style={styles.dayBox} key={day}>
      <Text style={styles.dayTitle}>{day}</Text>
      <TaskList />
    </View>
  );

  return (
    <View style={styles.container}>
      {days.map(renderDayBox)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  dayBox: {
    width: '48%', 
    height: 180,
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
  },
});

export default WeekView;
