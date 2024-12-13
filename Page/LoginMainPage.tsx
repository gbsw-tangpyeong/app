import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// 내비게이션 타입 정의
type RootStackParamList = {
  LoginMain: undefined;
  LoginPage: undefined;
  SignupPage: undefined;
  Home: undefined;
};

export default function LoginMainPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로고</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="로그인"
          onPress={() => navigation.navigate('LoginPage')} 
        />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate('SignupPage')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10, // 버튼 사이의 간격
  },
});
