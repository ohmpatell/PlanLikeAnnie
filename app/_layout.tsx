// RootLayout.tsx
import React, { useContext, useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen';
import { AuthContext, AuthContextProvider } from '@/context/AuthContext';
import { PaperProvider } from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

function RootComponent() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Navigation />
    </ThemeProvider>
  );
}

function Navigation() {
  const { currentUser, login, logout } = useContext(AuthContext);

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser ? (
          <Stack.Screen name="screens/MainScreen" component={MainScreen} />
        ) : (
          <>
            <Stack.Screen name="screens/LoginScreen" component={LoginScreen} />
            <Stack.Screen name="screens/RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <PaperProvider>
        <RootComponent />
      </PaperProvider>
    </AuthContextProvider>
  );
}
