import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginMainScreen from './Page/LoginMainPage';
import LoginPage from './Page/LoginPage';
import SignupPage from './Page/SignupPage';
import Navigation from './Page/Navigation';
import SettingPage from './Page/SettingPage';
import GoalSettingPage from './Page/GoalSettingPage';
import CourseDetailScreen from './components/CourseDetailScreen';
import AllActivitiesScreen from './components/AllActivitiesScreen';
import ActivitiesDetailScreen from './components/ActivitiesDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Home"
              children={(props) => <Navigation {...props} setIsLoggedIn={setIsLoggedIn} />}
            />
            <Stack.Screen name="SettingPage" component={SettingPage} />
            <Stack.Screen name="GoalSettingPage" component={GoalSettingPage} />
            <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
            <Stack.Screen name="AllActivities" component={AllActivitiesScreen} />
            <Stack.Screen name="ActivitiesDetailScreen" component={ActivitiesDetailScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginMain" component={LoginMainScreen} />
            <Stack.Screen name="LoginPage">
              {(props) => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="SignupPage" component={SignupPage} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
