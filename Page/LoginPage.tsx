import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// 내비게이션 타입 정의
type RootStackParamList = {
  LoginMain: undefined;
  LoginPage: undefined;
  SignupPage: undefined;
  Home: undefined;
};

interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (email && password) {
      console.log('로그인 시도:', email, password);
      setIsLoggedIn(true);
    } else {
      console.log('이메일 또는 비밀번호를 입력해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authButtonWrapper}>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { /* 비밀번호 찾기 기능 추가 */ }}>
          <Text style={styles.forgotPasswordText}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>

        <View style={styles.separatorWithText}>
          <Text style={styles.orText}>회원가입이 아직 없으신가요?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
            <Text style={styles.signupLink}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F7FF', // 배경색
    padding: 20,
  },
  authButtonWrapper: {
    backgroundColor: '#fff', // 전체 컨테이너 배경을 하얀색으로
    borderRadius: 8,
    paddingTop: 50,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: 350,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  loginButtonWrapper: {
    marginBottom: 15,
    backgroundColor: '#5D63D1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#5D63D1',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  separatorWithText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  orText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  signupLink: {
    fontSize: 14,
    color: '#5D63D1',
    fontWeight: 'bold',
  },
});
