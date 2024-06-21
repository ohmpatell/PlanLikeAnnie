// @/components/Main/MainScreen.tsx
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AppBar from '@/components/Main/Appbar';
import { AuthContext } from '@/context/AuthContext';
import { useDayContext } from '@/context/DayContext';
import WeekView from '@/components/Main/WeekView';
import DayView from '@/components/Main/DayView';
import DayNavigation from '@/components/Main/DayNavigation';

const MainScreen: React.FC = () => {
  const { view } = useDayContext();

  return (
    <View style={styles.container}>
      <AppBar/>
      <DayNavigation />
      {view === 'week' ? <WeekView /> : <DayView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
