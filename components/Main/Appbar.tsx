import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, Avatar, Dialog, Portal, Button, TextInput } from 'react-native-paper';
import { AuthContext } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useDayContext } from '@/context/DayContext';
import DatePicker from 'react-native-neat-date-picker'
import Task from '@/models/Task';



const AppBar: React.FC = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newTaskDialogVisible, setNewTaskDialogVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { logout } = useContext(AuthContext);
  const colorScheme = useColorScheme() || 'light';
  const { view ,setView, todaysDate, setCurrentDate, currentDate } = useDayContext();

  const [taskDate, setTaskDate] = useState(currentDate);
  const openNewTaskDialog = () => setNewTaskDialogVisible(true);
  const closeNewTaskDialog = () => setNewTaskDialogVisible(false);


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

  const handleSaveTask = () => {
    
    const task = new Task('user123', taskName, taskDescription, taskDate);
    
    currentDate.addTask(taskName, taskDescription, taskDate);
  };

  const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (output: any) => {
        setCurrentDate(output.date);
        setTaskDate(output.date);
        hideDatePicker();
      };

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
      <Appbar.Action
          icon="plus"
          onPress={openNewTaskDialog}
          color={Colors[colorScheme].text}
          style={{ marginLeft: 0 }}
        />
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

      <Portal>
       <Dialog visible={newTaskDialogVisible} onDismiss={closeNewTaskDialog}
          style={{ backgroundColor: Colors[colorScheme].background, justifyContent: 'center' }}
        >
          <Dialog.Title>New Task</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Task Name"
              value={taskName}
              onChangeText={setTaskName}
              theme={{ colors: { background: Colors[colorScheme].background, primary: Colors[colorScheme].text } }}
              mode='outlined'
              style={styles.input}
            />
            <TextInput
              label="Task Description"
              value={taskDescription}
              onChangeText={setTaskDescription}
              theme={{ colors: { background: Colors[colorScheme].background, primary: Colors[colorScheme].text } }}
              mode="outlined"
              style={styles.input}
            />
            <Button onPress={showDatePicker} textColor={Colors[colorScheme].text} mode="contained-tonal" buttonColor={Colors[colorScheme].accent}>
              {taskDate.toDateString()}
            </Button>
            

          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeNewTaskDialog} textColor={Colors[colorScheme].accent}>Cancel</Button>
            <Button onPress={handleSaveTask} textColor={Colors[colorScheme].accent}>Save</Button>
          </Dialog.Actions>
        </Dialog>
        <DatePicker
              isVisible={isDatePickerVisible}
              mode={'single'}
              onCancel={hideDatePicker}
              onConfirm={handleConfirm}
              
              colorOptions={{backgroundColor: Colors[colorScheme].background, 
                selectedDateBackgroundColor: Colors[colorScheme].accent,
                weekDaysColor: Colors[colorScheme].tint,
                confirmButtonColor: Colors[colorScheme].tint,
                headerColor: Colors[colorScheme].accent,
               }}
         />
      </Portal>

    </View>
  );
};
 const styles = StyleSheet.create({
    input: {
      marginBottom: 10,
    },
    datePicker: {
      marginTop: 10,
      marginBottom: 20,
    },
  });

export default AppBar;


// import React, { useContext, useState } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { Appbar, Avatar, Dialog, Portal, Button, TextInput } from 'react-native-paper';
// import { AuthContext } from '@/context/AuthContext';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { Colors } from '@/constants/Colors';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/firebaseConfig';
// import { useDayContext } from '@/context/DayContext';
// import DatePicker from 'react-native-neat-date-picker'


// const AppBar: React.FC = () => {
//   const [dialogVisible, setDialogVisible] = useState(false);
//   const [newTaskDialogVisible, setNewTaskDialogVisible] = useState(false);
//   const [taskName, setTaskName] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const { logout } = useContext(AuthContext);
//   const colorScheme = useColorScheme() || 'light';
//   const { view ,setView, todaysDate, setCurrentDate, currentDate } = useDayContext();
//   const [taskDate, setTaskDate] = useState(currentDate.date);

//   const openDialog = () => setDialogVisible(true);
//   const closeDialog = () => setDialogVisible(false);

//   const openNewTaskDialog = () => setNewTaskDialogVisible(true);
//   const closeNewTaskDialog = () => setNewTaskDialogVisible(false);

//   const handleLogout = () => {
//     signOut(auth);
//     logout();
//     closeDialog();
//   };

//   const handleBackToWeek = () => {
//     view === 'day' ? setView('week') : setView('day');
//   };

//   const handleBackToToday = () => {
//     setCurrentDate(todaysDate);
//   };

//   const handleSaveTask = () => {
//     currentDate.addTask(taskName, taskDescription, taskDate);


//   };

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (output: any) => {
//     const date = new Date(output.dateString);
//     setTaskDate(date);
//     hideDatePicker();
//   };

//   return (
//     <View>
//       <Appbar.Header style={{ backgroundColor: Colors[colorScheme].accent }}>
//         <Appbar.Action
//           icon={view === 'week' ? "view-day" : "view-week"}
//           onPress={handleBackToWeek}
//           color={Colors[colorScheme].text}
//           style={{ marginLeft: 0 }}
//         />
//         <Appbar.Action
//           icon="calendar-today"
//           onPress={handleBackToToday}
//           color={Colors[colorScheme].text}
//           style={{ marginLeft: 0 }}
//         />
//         <Appbar.Content title="" titleStyle={{ color: Colors[colorScheme].text }} />
//         <Appbar.Action
//           icon="plus"
//           onPress={openNewTaskDialog}
//           color={Colors[colorScheme].text}
//           style={{ marginLeft: 0 }}
//         />
//         <Avatar.Image
//           size={40}
//           source={require('@/assets/images/favicon.png')}
//           onTouchEnd={openDialog}
//           style={{ marginRight: 10 }}
//         />
//       </Appbar.Header>

//       <Portal>
//         <Dialog visible={dialogVisible} onDismiss={closeDialog}
//           style={{ backgroundColor: Colors[colorScheme].background }}
//         >
//           <Dialog.Title>Confirm Logout</Dialog.Title>
//           <Dialog.Content>
//             <Text>Are you sure you want to logout?</Text>
//           </Dialog.Content>
//           <Dialog.Actions>
//             <Button onPress={closeDialog} textColor={Colors[colorScheme].accent}>Cancel</Button>
//             <Button onPress={handleLogout} textColor='red'>Logout</Button>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>

//       <Portal>
//         <Dialog visible={newTaskDialogVisible} onDismiss={closeNewTaskDialog}
//           style={{ backgroundColor: Colors[colorScheme].background, justifyContent: 'center' }}
//         >
//           <Dialog.Title>New Task</Dialog.Title>
//           <Dialog.Content>
//             <TextInput
//               label="Task Name"
//               value={taskName}
//               onChangeText={setTaskName}
//               theme={{ colors: { background: Colors[colorScheme].background, primary: Colors[colorScheme].text } }}
//               mode='outlined'
//               style={styles.input}
//             />
//             <TextInput
//               label="Task Description"
//               value={taskDescription}
//               onChangeText={setTaskDescription}
//               theme={{ colors: { background: Colors[colorScheme].background, primary: Colors[colorScheme].text } }}
//               mode="outlined"
//               style={styles.input}
//             />
//             <Button onPress={showDatePicker} textColor={Colors[colorScheme].text} mode="contained-tonal" buttonColor={Colors[colorScheme].accent}>
//             {taskDate.toDateString()}
//             </Button>
            

//           </Dialog.Content>
//           <Dialog.Actions>
//             <Button onPress={closeNewTaskDialog} textColor={Colors[colorScheme].accent}>Cancel</Button>
//             <Button onPress={handleSaveTask} textColor={Colors[colorScheme].accent}>Save</Button>
//           </Dialog.Actions>
//         </Dialog>
//         <DatePicker
//               isVisible={isDatePickerVisible}
//               mode={'single'}
//               onCancel={hideDatePicker}
//               onConfirm={handleConfirm}
              
//               colorOptions={{backgroundColor: Colors[colorScheme].background, 
//                 selectedDateBackgroundColor: Colors[colorScheme].accent,
//                 weekDaysColor: Colors[colorScheme].tint,
//                 confirmButtonColor: Colors[colorScheme].tint,
//                 headerColor: Colors[colorScheme].accent,
//               }}
//             />
//       </Portal>

      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     marginBottom: 10,
//   },
//   datePicker: {
//     marginTop: 10,
//     marginBottom: 20,
//   },
// });

// export default AppBar;
