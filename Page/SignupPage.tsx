import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Signup_API } from '@env';
import axios from 'axios';

// 내비게이션 타입 정의
type RootStackParamList = {
  LoginMain: undefined;
  LoginPage: undefined;
  SignupPage: undefined;
  Home: undefined;
};

export default function SignupPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');

  // 회원가입 처리 함수
  const handleSignup = async () => {
    if (id === '' || email === '' || password === '' || confirmPassword === '' || phone === '') {
      setError('모든 필드를 입력해주세요');
    } else if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
    } else {
      setError('');
      try {
        const data = {
          username: id,
          password: password,
          email: email,
          phone: phone,
          address: '',
        };
        const apiUrl = Signup_API;
  
        // Axios POST 요청
        const response = await axios.post(apiUrl, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // 성공 처리
        if (response.status === 200) {
          alert('회원가입이 완료되었습니다!');
          navigation.navigate('LoginPage');
        }
      } catch (err: unknown) {
        // 오류 처리
        if (axios.isAxiosError(err)) {
          // Axios 에러의 경우
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
          }
        } else {
          // 일반적인 에러
          setError('알 수 없는 오류가 발생했습니다.');
        }
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.authButtonWrapper}>
      <TextInput
          style={styles.input}
          placeholder="아이디"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.signupButtonWrapper} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>

        <View style={styles.separatorWithText}>
          <Text style={styles.orText}>이미 계정이 있으신가요? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.LoginLink}>로그인</Text>
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
    backgroundColor: '#F3F7FF',
    padding: 20,
  },
  authButtonWrapper: {
    backgroundColor: '#fff',
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
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  signupButtonWrapper: {
    backgroundColor: '#5D63D1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  LoginLink: {
    fontSize: 14,
    color: '#5D63D1',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
