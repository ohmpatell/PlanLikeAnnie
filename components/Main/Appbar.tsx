import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, Avatar, Dialog, Portal, Button } from 'react-native-paper';
import { AuthContext } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useDayContext } from '@/context/DayContext';
import NewTaskDialog from '@/components/Tasks/NewTaskDialog'; // Import the component

const AppBar: React.FC = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newTaskDialogVisible, setNewTaskDialogVisible] = useState(false);
  const colorScheme = useColorScheme() || 'light';
  const { view, setView, todaysDate, setCurrentDate, currentDate } = useDayContext();

  const openDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);
  const openNewTaskDialog = () => setNewTaskDialogVisible(true);
  const closeNewTaskDialog = () => setNewTaskDialogVisible(false);

  const handleLogout = () => {
    signOut(auth);
    logout();
    closeDialog();
  };

  const handleBackToWeek = () => setView(view === 'day' ? 'week' : 'day');
  const handleBackToDay = () => setCurrentDate(todaysDate);

  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: Colors[colorScheme].accent }}>
        <Appbar.Action icon={view === 'week' ? 'view-day' : 'view-week'} onPress={handleBackToWeek} color={Colors[colorScheme].text} style={{ marginLeft: 0 }} />
        <Appbar.Action icon="calendar-today" onPress={handleBackToDay} color={Colors[colorScheme].text} style={{ marginLeft: 0 }} />
        <View style={styles.centeredContainer}>
          <Text style={[styles.currentMonth, { color: Colors[colorScheme].text }]}>{currentMonth}</Text>
        </View>
        <Appbar.Content title="" titleStyle={{ color: Colors[colorScheme].text }} />
        <Appbar.Action icon="plus" onPress={openNewTaskDialog} color={Colors[colorScheme].text} style={{ marginLeft: 0 }} />
        <Avatar.Image size={40} source={require('@/assets/images/favicon.png')} onTouchEnd={openDialog} style={{ marginRight: 10 }} />
      </Appbar.Header>

      {/* Logout Confirmation Dialog */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog} style={{ backgroundColor: Colors[colorScheme].background }}>
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog} textColor={Colors[colorScheme].accent}>
              Cancel
            </Button>
            <Button onPress={handleLogout} textColor="red">
              Logout
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* New Task Dialog Integration */}
      <NewTaskDialog visible={newTaskDialogVisible} onClose={closeNewTaskDialog} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentMonth: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppBar;
