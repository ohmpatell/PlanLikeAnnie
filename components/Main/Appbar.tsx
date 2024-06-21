import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, Avatar, Dialog, Portal, Button } from 'react-native-paper';
import { AuthContext } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useDayContext } from '@/context/DayContext';


const AppBar: React.FC = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const { logout } = useContext(AuthContext);
  const colorScheme = useColorScheme() || 'light';
  const { view ,setView, todaysDate, setCurrentDate } = useDayContext();

  const openDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);

  const handleLogout = () => {
      signOut(auth);
      logout();
    closeDialog();
  };

  const handleBackToWeek = () => {
    view == 'day' ? setView('week') : setView('day');
  };

  const handleBackToDay = () => {
    setCurrentDate(todaysDate);
  }

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: Colors[colorScheme].accent }}>
      <Appbar.Action
        icon={view == 'week' ? "view-day" : "view-week"}
        onPress={() => {
          handleBackToWeek();
        }}
        color={Colors[colorScheme].text} 
        style={{ marginLeft: 0 }} 
      />
      <Appbar.Action
        icon="calendar-today"
        onPress={() => {
          handleBackToDay();
        }}
        color={Colors[colorScheme].text} 
        style={{ marginLeft: 0 }}
      />

      <Appbar.Content title="" titleStyle={{ color: Colors[colorScheme].text }} />
      
      <Avatar.Image
        size={40}
        source={require('@/assets/images/favicon.png')}
        onTouchEnd={openDialog}
        style={{ marginRight: 10 }} 
      />
    </Appbar.Header>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}
        style={{ backgroundColor: Colors[colorScheme].background }}
        >
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog} textColor={Colors[colorScheme].accent}>Cancel</Button>
            <Button onPress={handleLogout} textColor='red'>Logout</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};


export default AppBar;
