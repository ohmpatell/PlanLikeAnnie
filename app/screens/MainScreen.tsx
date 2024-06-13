import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskList from '@/components/Tasks/TaskList';
import AppBar from '@/components/Appbar';
import WeekView from '@/components/Main/WeekView';

const MainScreen: React.FC = () => { 
  return (
    <View style={styles.container}>
      <AppBar/>
      <WeekView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  

});

export default MainScreen;
