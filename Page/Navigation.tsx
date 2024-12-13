import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/Home';
import Map from '../components/Map';
import Profile from '../components/Profile';
import Search from '../components/Search';
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
  프로필: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const Navigation = () => {
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
      <Tab.Screen name="프로필" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default Navigation;
