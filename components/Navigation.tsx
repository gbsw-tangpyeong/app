import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import Map from './Map';
import Profile from './Profile';
import Search from './Search';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

type TabNames = '홈' | '코스 검색' | '지도' | '프로필';

const tabIcons: Record<TabNames, { active: string; inactive: string }> = {
  홈: {
    active: 'home',
    inactive: 'home-outline',
  },
  '코스 검색': {
    active: 'search',
    inactive: 'search-outline',
  },
  지도: {
    active: 'map',
    inactive: 'map-outline',
  },
  프로필: {
    active: 'person',
    inactive: 'person-outline',
  },
};

type TabParamList = {
  홈: undefined;
  '코스 검색': undefined;
  지도: undefined;
  프로필: { setLoggedIn: (value: boolean) => void }; // setLoggedIn을 프로필 화면에 전달
};

const Tab = createBottomTabNavigator<TabParamList>();

const Navigation = ({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => {
        const { active } = tabIcons[route.name as TabNames];
        return {
          tabBarIcon: ({ color, size }) => (
            <Icon name={active} size={size} color={color} />
          ),
          tabBarActiveTintColor: '#5D63D1',
          tabBarInactiveTintColor: 'gray',
        };
      }}
    >
      <Tab.Screen name="홈" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="코스 검색" component={Search} options={{ headerShown: false }} />
      <Tab.Screen name="지도" component={Map} options={{ headerShown: false }} />
      <Tab.Screen
        name="프로필"
        component={Profile}
        initialParams={{ setLoggedIn: setIsLoggedIn }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
