import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginMainScreen from './Page/LoginMainPage';
import LoginPage from './Page/LoginPage';
import SignupPage from './Page/SignupPage';
import Navigation from './Page/Navigation';
import SettingPage from './Page/SettingPage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Navigation} />
            <Stack.Screen name="SettingPage" component={SettingPage} /> 
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginMain" component={LoginMainScreen} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="SignupPage" component={SignupPage} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
