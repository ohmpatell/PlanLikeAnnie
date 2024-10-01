import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDayContext } from '@/context/DayContext';
import { IconButton } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const DayNavigation: React.FC = () => {
  const { currentDate, setCurrentDate, getWeekRange, view } = useDayContext();
    const colorScheme = useColorScheme() || 'light';

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    view == 'week' ? newDate.setDate(newDate.getDate() - 7) : newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    view == 'week' ? newDate.setDate(newDate.getDate() + 7) : newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    
  };

  const weekRange = getWeekRange(currentDate);

  const weekString = weekRange && weekRange.length === 7
    ? `${weekRange[0].toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })} - ${weekRange[6].toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })}`
    : '';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrev}>
        <IconButton mode='contained-tonal' iconColor={Colors[colorScheme].text} containerColor={Colors[colorScheme].accent} 
        icon={view == "week" ? "chevron-triple-left" : "chevron-left" } size={24} /> 
      </TouchableOpacity>

      <Text style={styles.weekText}>
        {view === 'week' ? weekString : currentDate.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })}
      </Text>
            
      <TouchableOpacity onPress={handleNext}>
          <IconButton mode='contained-tonal' iconColor={Colors[colorScheme].text} containerColor={Colors[colorScheme].accent} 
          icon={view == "week" ? "chevron-triple-right" : "chevron-right" } size={24} /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  arrow: {
    fontSize: 24,
    color: 'red',
  },
  weekText: {
    fontSize: 18,
  },
});

export default DayNavigation;
