// LoginScreen.tsx
import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {auth} from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';



const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);
  const colorScheme = useColorScheme() || 'light';
  const handleLogin = async () => {
    try {
        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        login(userCreds.user);

    } catch (error: any) {
      if (error.code === "auth/invalid-login-credentials") {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <View style={[styles.container,  { backgroundColor: Colors[colorScheme].background }]  }>
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button buttonColor={Colors[colorScheme].accent} mode="contained-tonal" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Text style={[styles.link, { color: Colors[colorScheme].tint }]} onPress={() => navigation.navigate('screens/RegisterScreen' as never)}>
        Don't have an account? Register here
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
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
