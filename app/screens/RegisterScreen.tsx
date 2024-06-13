import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { AuthContext } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const colorScheme = useColorScheme() || 'light';

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCreds = await createUserWithEmailAndPassword(auth, email, password);
      login(userCreds.user);
    } catch (error: any) {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (errorCode === "auth/invalid-email") {
        setError("Invalid Email");
      } else if (errorCode === "auth/weak-password") {
        setError("Weak Password: Password should be at least 6 characters");
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <Image
        source={require('@/assets/images/icon.png')} 
        style={styles.logo}
      />
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Plan Like Annie</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        theme={{ colors: { background: Colors[colorScheme].background, primary: Colors[colorScheme].text } }}
        mode='outlined'

      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        theme={{ colors: { background: Colors[colorScheme].background, primary: Colors[colorScheme].text } }}
        mode='outlined'
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
        theme={{ colors: { background: Colors[colorScheme].background, primary: Colors[colorScheme].text } }}
        mode='outlined'
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button buttonColor={Colors[colorScheme].accent} mode="contained-tonal" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Text style={[styles.link, { color: Colors[colorScheme].tint }]} onPress={() => navigation.navigate('screens/LoginScreen' as never)}>
        Already have an account? Login here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
  },
});

export default RegisterScreen;
