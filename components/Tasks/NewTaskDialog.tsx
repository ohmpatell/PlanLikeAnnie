import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-neat-date-picker';
import { AuthContext } from '@/context/AuthContext';
import { useDayContext } from '@/context/DayContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Task from '@/models/Task';

interface NewTaskDialogProps {
  visible: boolean;
  onClose: () => void;
  task?: Task;
}

const NewTaskDialog: React.FC<NewTaskDialogProps> = ({ visible, onClose, task }) => {
  const { currentUser } = useContext(AuthContext);
  const { todaysDate, setCurrentDate } = useDayContext();
  const colorScheme = useColorScheme() || 'light';

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState(todaysDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const editMode = task !== undefined;


  const handleSaveTask = () => {
    if (currentUser) {
      const newTask = new Task(currentUser.uid, taskName, taskDescription, taskDate);
      setCurrentDate(taskDate);
    }
    onClose();
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (output: any) => {
    setTaskDate(output.date);
    hideDatePicker();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose} style={{ backgroundColor: Colors[colorScheme].background }}>
        <Dialog.Title>New Task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Task Name"
            value={taskName}
            onChangeText={setTaskName}
            theme={{ colors: { background: Colors[colorScheme].background, primary: Colors[colorScheme].text } }}
            mode="outlined"
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
          <Button onPress={onClose} textColor={Colors[colorScheme].accent}>
            Cancel
          </Button>
          <Button onPress={handleSaveTask} textColor={Colors[colorScheme].accent}>
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
      <DatePicker
        isVisible={isDatePickerVisible}
        mode={'single'}
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
        colorOptions={{
          backgroundColor: Colors[colorScheme].background,
          selectedDateBackgroundColor: Colors[colorScheme].accent,
          weekDaysColor: Colors[colorScheme].tint,
          confirmButtonColor: Colors[colorScheme].tint,
          headerColor: Colors[colorScheme].accent,
        }}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});

export default NewTaskDialog;
